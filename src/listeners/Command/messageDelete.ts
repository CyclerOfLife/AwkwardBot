/** @format */

import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
export default class MessageDelete extends Listener {
	public constructor() {
		super('messageDelete', {
			emitter: 'client',
			event: 'messageDelete',
			category: 'Client',
		});
	}
	public exec(message: Message) {
		this.client.snipes.set(message.channel.id, {
			content: message.content,
			author: message.author,
			image: message.attachments.first()
				? message.attachments.first().proxyURL
				: null,
			time: Date.now(),
		});
	}
}
