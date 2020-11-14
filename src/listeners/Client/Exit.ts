import { Listener, Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Guild } from 'discord.js';

export default class ExitListener extends Listener {
	public constructor () {
		super('listeners-exit', {
			emitter: 'process',
			event: 'exit',
		});
	}

	public async exec () {
		console.log(`Exited Process`);
	}
}
