import { Command } from 'discord-akairo';
import { Message, User, MessageEmbed } from 'discord.js';
import dateformat from 'dateformat';
import { GuildMember } from 'discord.js';
import Warns from '../../client/database/Warns';

export default class InfractionsCommand extends Command {
	public constructor () {
		super('infractions', {
			userPermissions:
				[
					'MANAGE_MESSAGES',
				],
			aliases:
				[
					'warns',
					'infractions',
				],
			channel: 'guild',
			description:
				{
					content: 'View the warns of a user',
					usage: 'warns <user>',
					examples:
						[
							'warns Taylor',
						],
				},
			args:
				[
					{
						id: 'user',
						type: 'member',
						prompt:
							{
								start: 'Please provide a user to view the infractions on',
								retry: 'I need a valid user',
							},
					},
				],
			category: 'Moderation Commands',
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { user }: { user: GuildMember }) {
		Warns.find({ guild: message.guild.id, user: user.id }, async (err, data) => {
			if (err) console.log(err);
			if (!data.length) return message.channel.send(`${user.user.tag} has no warns in this guild!`);
			let Embed = new MessageEmbed()
				.setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
				.setDescription(
					data.map((d) => {
						return d.warns
							.map(
								(w, i) =>
									`${i++} - Moderator: <@${message.guild.members.cache.get(w.moderator)
										.id}> - Reason: ${w.reason}`,
							)
							.join('\n');
					}),
				);
			message.channel.send(Embed);
		});
	}
}
