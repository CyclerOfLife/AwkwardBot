import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import fetch from 'node-fetch';
export default class kissCommand extends Command {
	public constructor () {
		super('kiss', {
			aliases:
				[
					'kiss',
				],
			category: 'Emoji',
			description:
				{
					content: 'Kiss a loved one',
					usage: 'kiss <MEMBER>',
					example:
						[
							'kiss Taylor#0021',
							'kiss Taylor',
							'kiss',
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
										`${msg.author}, Please mention, or say the name of the user to kiss!`,
								retry:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to kiss!`,
							},
					},
				],
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const data = await (await fetch('https://nekos.life/api/v2/img/kiss')).json();
		return message.util.send(
			new MessageEmbed()
				.setTitle(` ❤️ 🥺${member.user.username}🥺, has been kissed by 🥺${message.author.username}🥺 ❤️`)
				.setImage(data.url),
		);
	}
}
