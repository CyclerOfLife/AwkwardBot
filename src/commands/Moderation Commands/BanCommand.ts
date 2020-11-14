import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import { TextChannel } from 'discord.js';

export default class BanCommand extends Command {
	public constructor() {
		super('ban', {
			aliases:
				[
					'ban',
				],
			category: 'Moderation Commands',
			description:
			{
				content: 'Ban a bad bad member',
				usage: 'ban <member> <reason>',
				examples:
					[
						'ban taylor bad bad development',
						'ban @Taylor#2014 bad bad development',
					],
			},
			ratelimit: 10,
			userPermissions:
				[
					'BAN_MEMBERS',
				],
			clientPermissions:
				[
					'BAN_MEMBERS' || 'ADMINISTRATOR',
				],
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
						{
							start: (msg: Message) => `${msg.author}, Please provide a member..`,
							retry: (msg: Message) => `${msg.author}, Please provide a valid member...`,
						},
					},
					{
						id: 'reason',
						type: 'string',
						match: 'restContent',
						default: 'No reason provided',
					},
				],
			cooldown: 3000,
		});
	}

	public async exec(
		message: Message,
		{ member, reason }: { member: GuildMember; reason: string },
		): Promise<Message> {
		if (
			member.roles.highest.position >= message.member.roles.highest.position &&
			message.author.id !== message.guild.owner.id
		)
			return message.util.reply(`This member has a higher or equal role to you!`);
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`Hey, this user has a role above me.`)
		if (!member.bannable) return message.util.send(`Hey, I can't ban this member!`)
		await member.ban({ reason: reason }).catch((err) => {
			console.log(err);
			message.util.send(`Error, please try again!\n For indepth use:\n ${err}`);
		});
		message.util.send(`${message.author.tag} has banned ${member.user.tag} for: *${reason}*`);
	}
}
