import { Listener, Command } from 'discord-akairo';
import { Message } from 'discord.js';

import ms from 'ms';

export default class CooldownListener extends Listener {
	public constructor () {
		super('listener-cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown',
		});
	}

	public exec (message: Message, cmd: Command, remaining: number) {
		return message.util.send(
			new this.client.embed().errorEmbed(
				`Please wait: \`${ms(remaining)}\` before using the command \`${cmd}\` again!`,
			),
		);
	}
}
