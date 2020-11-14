import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
const fetch = require('node-fetch');
export default class CuddleCommand extends Command {
	public constructor () {
		super('cuddle', {
			aliases:
				[
					'cuddle',
				],
			category: 'Emoji',
			description:
				{
					content: 'cuddle a friend or let me cuddle you',
					usage: 'cuddle <MEMBER>',
					example:
						[
							'cuddle Taylor#0021',
							'cuddle Taylor',
							'cuddle',
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
										`${msg.author}, Please mention, or say the name of the user to cuddle!`,
								retry:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to cuddle!`,
							},
					},
				],
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const data = await (await fetch('https://nekos.life/api/v2/img/cuddle')).json();
		return message.util.send(
			new MessageEmbed()
				.setTitle(`🥺${member.user.username}🥺, has been cuddled by 🥺${message.author.username}🥺`)
				.setImage(data.url),
		);
	}
}
