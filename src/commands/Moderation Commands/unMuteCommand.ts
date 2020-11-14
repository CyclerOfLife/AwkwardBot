import { Command } from 'discord-akairo';
import { GuildMember, Message, Permissions, User } from 'discord.js';

export default class UNMUTECOMMAND extends Command {
	public constructor () {
		super('unmute', {
			aliases:
				[
					'unmute',
				],
			category: 'Moderation Commands',
			description:
				{
					content: `Unmute a good good good user :((`,
					usage: 'unmute <member> <duration> [reason]',
					examples:
						[
							'unmute @Taylor 10m',
						],
				},
			channel: 'guild',
			clientPermissions:
				[
					'MANAGE_ROLES',
				],
			userPermissions:
				[
					'MANAGE_ROLES',
				],
			ratelimit: 2,
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start: (message: Message) => `Please mention a member to unmute`,
								retry: (message: Message) => `Please mention a valid member`,
							},
					},
				],
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember; duration: number; reason: string }) {
		if (
			member.roles.highest.position >= message.member.roles.highest.position &&
			message.author.id !== message.guild.owner.id
		)
			return message.util.send(
				new this.client.embed(message)
					.setTitle(`Not eligible`)
					.setDescription(`This person has a higher role, or equivalent roles to you!`),
			);
		let muterole = message.guild.roles.cache.find((r) => r.name === 'Muted');

		if (member.roles.cache.has(muterole.id)) {
			return message.util.send(
				new this.client.embed(message)
					.setTitle(`Unmuted.`)
					.setColor('#3291a8')
					.setAuthor(`Moderator\n${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setFooter(`Made by Taylor#1837`)
					.setDescription(`Unmuted \`${member.user.tag}\` successfully.`),
			);
		}
		else {
			message.util.send(new this.client.embed(message).setTitle(`Invalid! EROROR: \`NOT MUTED.\``));
		}
	}
}
