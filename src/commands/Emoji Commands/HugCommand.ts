import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import fetch from 'node-fetch';
export default class HugCommand extends Command {
	public constructor () {
		super('hug', {
			aliases:
				[
					'hug',
				],
			category: 'Emoji',
			description:
				{
					content: 'Hug a friend or let me hug you',
					usage: 'hug <MEMBER>',
					example:
						[
							'hug Taylor#0021',
							'hug Taylor',
							'hug',
						],
				},
			ratelimit: 2515,
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to hug!`,
								retry:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to hug!`,
							},
					},
				],
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const data = await (await fetch('https://nekos.life/api/v2/img/hug')).json();
		return message.util.send(
			new MessageEmbed()
				.setTitle(`🥺${member.user.username}🥺, has been hugged by 🥺${message.author.username}🥺`)
				.setImage(data.url),
		);
	}
}
