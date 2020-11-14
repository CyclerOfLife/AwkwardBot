import { Command } from 'discord-akairo';
import { Message, Collection } from 'discord.js';
import { MessageEmbed } from 'discord.js';

export default class ReloadCommand extends Command {
	public constructor () {
		super('reload', {
			aliases:
				[
					'reload',
				],
			description:
				{
					content: 'Reloads all commands, inhibitors, listeners, and settings.',
					ownerOnly: true,
				},
			category: 'Owner',
			ownerOnly: true,
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { command }: { command: any }) {
		if (!command) {
			await this.client.commandHandler.reloadAll();
			this.client.listenerHandler.reloadAll();
			console.info('Reloaded All Commands');

			return message.util!.send(new MessageEmbed().setDescription('Reloaded All Commands!'));
		}
		else {
			await this.client.commandHandler.modules.get(`${command.id}`).reload();
			console.info('Reloaded ' + `${command.id}` + ' Command');
		}
		return message.util!.send(
			new MessageEmbed().setDescription(`Reloaded ${command.id} Command!`).setFooter(`Made by Taylor#1837`),
		);
	}
}
