import {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
	Flag,
} from 'discord-akairo';
import {Message, Collection} from 'discord.js';
import {join} from 'path';
import { nodes, owners} from '../Config';

import Embed from './embed';

import guildsData from './database/Guild';
import membersData from './database/Member';
import usersData from './database/User';
import {
	numberWithCommas,
	check_emojis,
	networkLevel,
	swlvl,
	calcTag,
	findOrCreateMember,
	findOrCreateGuild,
	findOrCreateUser,
} from './Functions';
import OtherUtils from './Utils';

declare module 'discord-akairo' {
	interface AkairoClient {
		commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        manager;
        embed;
        Embed;
		comma;
		usersData;
		guildsData;
		membersData;
		findOrCreateUser;
		findOrCreateMember;
		findOrCreateGuild;
		ssu;
		infractions;
		priority;
		check_emojis;
		rp;
		romanize;
		getEmoji;
		getChannel;
		convertRank;
		fetchRank;
		getMember;
		getRole;
		getUser;
		snipes;
		utils;
		version;
	}
}

interface BotOptions {
    token?: string;
    owners?: string | string[];
}

export default class BotClient extends AkairoClient {
	public config: BotOptions;
	public constructor(config: BotOptions) {
		super({
			ownerID: config.owners,
		});
		this.config = config;
		this.check_emojis = check_emojis;
		this.embed = Embed;
		this.comma = numberWithCommas;
		this.usersData = usersData;
		this.guildsData = guildsData;
		this.membersData = membersData;
		this.findOrCreateUser = findOrCreateUser;
		this.findOrCreateMember = findOrCreateMember;
        this.findOrCreateGuild = findOrCreateGuild;
		this.Embed = Embed;
		this.check_emojis = check_emojis;
		this.utils = new OtherUtils();
		this.commandHandler = new CommandHandler(this, {
			directory: join(__dirname, '..', 'commands'),
			prefix: async (msg: Message) => {
				let prefix = 'awk!';
				if (!msg.guild) return prefix;
				const guild = await this.findOrCreateGuild({id: msg.guild.id});
				if (guild) prefix = guild.prefix;
				return prefix;
			},
			allowMention: true,
			handleEdits: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			defaultCooldown: 3000,
			argumentDefaults: {
				prompt: {
					modifyStart: (_: Message, str: string): string =>
						`${str}\n\nType \`cancel\` to cancel the command...`,
					modifyRetry: (_: Message, str: string): string =>
						`${str}\n\nType \`cancel\` to cancel the command...`,
					timeout: `You took too long! I've cancelled the command`,
					ended: `You exceeded the maximum amount of trys, I've cancelled the command`,
					cancel: () =>
						new this.embed()
							.setTitle('Cancelled')
							.setColor('RED')
							.setDescription(`I cancelled the command`),
					retries: 3,
					time: 30000,
				},
			},
			ignorePermissions: owners,
			extensions: ['.js'],
		});
		this.listenerHandler = new ListenerHandler(this, {
			directory: join(__dirname, '..', 'listeners'),
			extensions: ['.js'],
        });
        /*
		this.ws
			.on('VOICE_STATE_UPDATE', (state, _) =>
				this.lavalink.voiceStateUpdate(state)
			)
			.on('VOICE_SERVER_UPDATE', (info, _) =>
				this.lavalink.voiceServerUpdate(info)
			)
			.on('GUILD_CREATE', (guild, _) => {
				for (const state of guild.voice_states)
					this.lavalink.voiceStateUpdate(state);
            });
            */
	}

	private async _init(): Promise<void> {
		this.commandHandler.resolver.addType(
			'existingTag',
			async (msg: Message, word: string) => {
				if (!word || !msg.guild || this.commandHandler.modules.has(word))
					return Flag.fail(word);

				let guild: any = await this.findOrCreateGuild({id: msg.guild.id});

				let data = guild.customCommands.filter((c) => c.name == word);

				return data.length ? Flag.fail(word) : word;
			}
		);

		this.commandHandler.resolver.addType(
			'catAlias',
			async (msg: Message, word: string) => {
				let cat = this.commandHandler.categories.get(word.toLowerCase());
				if (cat) {
					if (cat!.id === 'Owner') {
						if (!this.ownerID.includes(msg.author.id)) {
							return null;
						}
					}
				}

				let command = this.commandHandler.findCommand(word.toLowerCase());
				if (command) {
					if (command!.categoryID === 'Owner') {
						if (!this.ownerID.includes(msg.author.id)) {
							return null;
						}
					}
				}

				return this.commandHandler.findCommand(word.toLowerCase())
					? this.commandHandler.findCommand(word.toLowerCase())
					: this.commandHandler.categories.get(word.toLowerCase())
					? this.commandHandler.categories.get(word.toLowerCase())
					: null;
			}
		);

		this.commandHandler.resolver.addType(
			'tag',
			async (msg: Message, word: string) => {
				if (!word || !msg.guild || this.commandHandler.modules.has(word))
					return Flag.fail(word);

				let guild: any = await this.findOrCreateGuild({id: msg.guild.id});

				let data = guild.customCommands.filter((c) => c.name == word);

				return data.length ? word : Flag.fail(word);
			}
		);

		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async broadcastEval(evalStr, onlyOneValid) {
		const results = await this.shard!.broadcastEval(evalStr);
		if (onlyOneValid) return results.find((r) => r);
		return results;
	}

	public async start(): Promise<string> {
		await this._init();
		return this.login(this.config.token);
	}
}
//@ts-ignore
String.prototype.titleCase = function () {
	var splitStr = this.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
};
