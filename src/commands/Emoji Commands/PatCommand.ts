import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import fetch from 'node-fetch';
export default class patCommand extends Command {
	public constructor () {
		super('pat', {
			aliases:
				[
					'pat',
				],
			category: 'Emoji',
			description:
				{
					content: 'pat a friend or let me pat you',
					usage: 'pat <MEMBER>',
					example:
						[
							'pat Taylor#0021',
							'pat Taylor',
							'pat',
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
										`${msg.author}, Please mention, or say the name of the user to pat!`,
								retry:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to pat!`,
							},
					},
				],
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const data = await (await fetch('https://nekos.life/api/v2/img/pat')).json();
		return message.util.send(
			new MessageEmbed()
				.setTitle(`${member.user.username}, has been patted by ${message.author.username}`)
				.setImage(data.url),
		);
	}
}
