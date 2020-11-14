import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
export default class LevelUpSettings extends Command {
	public constructor() {
		super('levelup', {
			category: 'Settings',
			aliases:
				[
					'levelup',
					'levelsettings',
				],
			channel: 'guild',
			clientPermissions:
				[
					'SEND_MESSAGES',
				],
			description: {
				content: "Turn on and off level up",
				usage: 'levelup',
				examples: ["levelup"]
			},
			typing: true,
		});
	}

	public async exec(message: Message) {
		let user = await this.client.findOrCreateMember({ id: message.author.id, guildId: message.guild.id });
		if (user.level_updates === true) {
			user.level_updates = false;
			message.util.send(`Successfully turned level up messages \`off\``);
			user.save();
		}
		else {
			user.level_updates = true;
			message.util.send(`Successfully turned level up messages \`on\``);
			user.save();
		}
	}
}
