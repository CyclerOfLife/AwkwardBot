import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

export default class dssuCommand extends Command {
	public constructor () {
		super('dssu', {
			aliases:
				[
					'dssu',
				],
			category: 'Police Commands',
			description:
				{
					content: 'Delete your previous SSU',
					usage: 'dssu',
					examples:
						[
							'dssu',
						],
				},
			cooldown: 3000,
		});
	}

	public exec (message: Message) {
		if (this.client.ssu.has(message.author.id, message.guild.id)){
		this.client.ssu.delete(message.author.id, message.guild.id)
			return message.util.send(
				new MessageEmbed()
					.setTitle('Deleted Recent Server Start Up')
					.setAuthor(message.author.tag, message.author.avatarURL())
					.addField('Who deleted a SSU?', `${message.author} did!`)
					.addField(
						'Reminder!',
						`Do awk!ssu to request a server start up!\n You can also do awk!dssu to delete your past ssu.`,
					)
					.setColor('#01fef8')
					.setFooter(`Made by Taylor#1837`)
					.setImage('https://media.giphy.com/media/wuOtkQMVrqdRS/giphy.gif')
					.setTimestamp(),
			);
		}
		else {
			message.reply('You never created a SSU.');
		}
	}
}
