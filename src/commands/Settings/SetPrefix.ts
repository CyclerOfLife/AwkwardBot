import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SetPrefixCommand extends Command {
	public constructor () {
		super('setprefix', {
			aliases:
				[
					'setprefix',
					'prefix',
				],
			userPermissions: 'MANAGE_GUILD',
			category: 'Settings',
			description:
				{
					content: 'Set the prefix for the guild!',
					usage: 'setprefix <prefix>',
					examples:
						[
							'setprefix awkward ',
						],
				},
			args:
				[
					{
						id: 'prefix',
						type: 'string',
						prompt:
							{
								start: `Please send a prefix I should set.`,
								retry: `Please send a valid prefix`,
							},
					},
				],
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { prefix }) {
		if (prefix.length > 5)
			return message.util!.send(
				new this.client.embed(
					message,
					await this.client.findOrCreateGuild({ id: message.guild!.id }).then((guild) => guild.colour),
				).setDescription('The Max length of a prefix is 5'),
			);
		let guild = await this.client.findOrCreateGuild({ id: message.guild!.id });
		guild.prefix = prefix;
		guild.save();
		return message.util!.send(
			new this.client.embed(
				message,
				await this.client.findOrCreateGuild({ id: message.guild!.id }).then((guild) => guild.colour),
			).setDescription(`New prefix \`${prefix}\``),
		);
	}
}
