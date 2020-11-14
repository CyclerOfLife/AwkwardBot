import { Command } from 'discord-akairo';
import { Message, GuildMember, MessageEmbed } from 'discord.js';
import warns from '../../client/database/Warns';
import Warns from '../../client/database/Warns';
export default class WarnCommand extends Command {
	public constructor () {
		super('warn', {
			aliases:
				[
					'warn',
					'warnum',
					'w',
				],
			category: 'Moderation Commands',
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start: 'Please provide a member to warn',
								retry: 'I need a valid member to warn',
							},
					},

					{
						id: 'reason',
						type: 'string',
						match: 'rest',
						default: 'No reason provided',
					},
				],
			description:
				{
					content: 'Warns a member in the guild',
					usage: 'warn [member] <reason>',
					examples:
						[
							'warn @Taylor Bad bad bad developer',
							'warn taylor really bad developing skill',
							'warn 161531717272436731',
						],
				},
			userPermissions:
				[
					'MANAGE_MESSAGES',
				],
			channel: 'guild',
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { member, reason }: { member: GuildMember; reason: string }) {
		if (
			member.roles.highest.position >= message.member.roles.highest.position &&
			message.author.id !== message.guild.owner.id
		)
			return message.util.send(
				new this.client.embed(message)
					.setTitle(`Not eligible`)
					.setDescription(`This person has a higher role, or equivalent roles to you!`),
			);
		warns.findOne({ guild: message.guild.id, user: member.id }, async (err, data) => {
			if (err) console.log(err);
			if (!data) {
				let newWarns = new warns({
					user: member.id,
					guild: message.guild.id,
					warns:
						[
							{
								moderator: message.author.id,
								reason: reason,
							},
						],
				});
				newWarns.save();
				message.util.send(
					new this.client.embed().setTitle(
						member.user.tag + ' has been warned with the reason *' + reason + '*',
					),
				);
			}
			else {
				data.warns.unshift({
					moderator: message.author.id,
					reason: reason,
				});
				message.util.send(
					new this.client.embed().setTitle(
						member.user.tag + ' has been warned with the reason *' + reason + '*',
					),
				);
			}
		});
	}
}
