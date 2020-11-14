/** @format */

import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { Message, TextChannel } from 'discord.js';
import moment from 'moment';
export default class SnipeCommand extends Command {
	public constructor() {
		super('snipe', {
			aliases: ['snipe'],
			description: {
				content: 'View a recently deleted message',
				usage: 'snipe <optional channel>',
				examples: ['snipe #general'],
			},
			category: 'Public Commands',
		});
	}
	public exec(message: Message) {
		let msg = this.client.snipes.get(message.channel.id);
		if (!msg)
			return message.reply(
				new this.client.embed()
					.setTitle('Invalid snipe!')
					.setDescription('Nothing to snipe with my sniper!')
			);
		let embed = new MessageEmbed()
			.setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
			.setDescription(msg.content)
			.setFooter(moment(msg.time).format('MMMM Do YYYY, h:mm:ss a'));
		msg.image ? embed.setImage(msg.image) : '';
		message.util.send(embed);
	}
}
