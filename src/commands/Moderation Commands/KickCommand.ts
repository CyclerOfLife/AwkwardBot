import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { stripIndents } from 'common-tags';
export default class KickCommand extends Command {
	public constructor () {
		super('kick', {
			aliases:
				[
					'kick',
				],
			userPermissions:
				[
					'KICK_MEMBERS',
				],
			clientPermissions:
				[
					'KICK_MEMBERS',
				],
			category: 'Moderation Commands',
			description:
				{
					content: 'Kick a bad bad bad member',
					usage: 'kick <user> <optional reason>',
					examples:
						[
							'kick [Dank Memer] idk',
						],
				},
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start: `Hey! Please provide a user!`,
							},
					},
					{
						id: 'reason',
						match: 'text',
						default: 'No reason provided!',
					},
				],
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { member, reason }) {
		if (
			member.roles.highest.position >= message.member.roles.highest.position &&
			message.author.id !== message.guild.owner.id
		)
			return message.util.send(
				this.client
					.embed(message)
					.setFooter(`Made by Taylor#1837`)
					.setTitle(`Not eligible`)
					.setDescription(`This person has a higher role, or equivalent roles to you!`),
			);
		await member
			.kick({ reason: reason })
			.then(
				message.util.send(
					new MessageEmbed()
						.setTitle(`Kicked ${member.user.tag}!`)
						.setDescription(`I've successfully kicked a user for: *${reason}*!`),
				),
			)
			.catch((err) => console.error(err));
	}
}
