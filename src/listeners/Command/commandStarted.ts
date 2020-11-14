import { Listener, Command } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { Message } from 'discord.js';

export default class commandStartedListener extends Listener {
	public constructor () {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
		});
	}

	public async exec (message: Message, command: Command) {
		console.log(
			`${message.author.tag} Ran ${command.aliases[0]} Command, In ${
				message.guild ? message.guild.name :
				'DM'} ${
				message.guild ? `(${message.guild.id})` :
				''}`,
		);
	}
}
