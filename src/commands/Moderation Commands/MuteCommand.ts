import ms from 'ms';
import { Command } from 'discord-akairo';
import { GuildMember, Message, Permissions, User } from 'discord.js';

export default class MuteCommand extends Command {
	public constructor () {
		super('mute', {
			aliases:
				[
					'mute',
				],
			category: 'Moderation Commands',
			description:
				{
					content: `Mute a bad bad user :((`,
					usage: 'mute <member> <duration> [reason]',
					examples:
						[
							'mute @Taylor 10m',
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
								start: `Please mention a member to mute`,
								retry: `Please mention a valid member`,
							},
					},
					{
						id: 'duration',
						type:
							(_, str): number | null => {
								if (!str) return null;
								const duration = ms(str);
								if (duration && duration >= 1000 && !isNaN(duration)) return duration;
								return null;
							},
						prompt:
							{
								start: `For how long do you want the mute to last?`,
								retry: `Please use a proper time format, thats over 1 second.`,
							},
					},
					{
						id: 'reason',
						match: 'rest',
						type: 'string',
						default: 'No reason provided.',
					},
				],
			cooldown: 3000,
		});
	}

	public async exec (
		message: Message,
		{ member, duration, reason }: { member: GuildMember; duration: number; reason: string },
	) {
		if (
			member.roles.highest.position >= message.member.roles.highest.position &&
			message.author.id !== message.guild.owner.id
		)
			return message.util.send(
				new this.client.embed(message)
					.setTitle(`Not eligible`)
					.setDescription(`This person has a higher role, or equivalent roles to you!`),
			);
		if (member.id === message.author.id) return message.reply(new this.client.embed(message).setDescription(`No.`));
		let muterole = message.guild.roles.cache.find((r) => r.name === 'Muted');
		if (!muterole) {
			try {
				muterole = await message.guild.roles.create({
					data:
						{
							name: 'Muted',
							color: '#514f48',
							permissions: [],
						},
				});
				console.log(`success`);
			} catch (e) {
				console.log(e.stack);
			}
		}
		await message.guild.channels.cache.forEach(async (channel, id) => {
			await channel.updateOverwrite(muterole, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				SEND_TTS_MESSAGES: false,
				ATTACH_FILES: false,
				SPEAK: false,
			});
		});

		await member.roles.add(muterole.id);

		message.util.send(
			new this.client.embed(message)
				.setTitle(`Muted.`)
				.setColor('#3291a8')
				.setDescription(`Muted \`${member.user.tag}\` successfully.`),
		);

		const time = duration.toString();
		setTimeout(function () {
			member.roles.remove(muterole.id);
		}, ms(time));
	}
}
