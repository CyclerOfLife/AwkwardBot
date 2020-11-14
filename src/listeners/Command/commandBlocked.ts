import { Listener, Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class commandBlockedListener extends Listener {
	public constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked',
		});
	}

	public async exec(message: Message, command: Command, reason: String): Promise<Message | any> {
		switch (reason) {
			case 'owner':
				return;
				break;

			case 'guild':
				return message.util.send(
					new MessageEmbed().setDescription(
						`You can only use the command: \`${command}\` in a guild/server`,
					),
				);
				break;
		}
	}
}
