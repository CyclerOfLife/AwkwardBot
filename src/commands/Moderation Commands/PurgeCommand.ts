import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { TextChannel } from 'discord.js';

export default class PurgeCommand extends Command {
	public constructor() {
		super('purge', {
			aliases:
				[
					'purge',
				],
			category: 'Moderation Commands',
			description:
			{
				content: 'Removes x amount of messages from the current channel',
				usage: 'purge <amount 1-100>',
				examples:
					[
						'purge 45',
					],
			},
			userPermissions:
				[
					'MANAGE_MESSAGES',
				],
			clientPermissions:
				[
					'MANAGE_MESSAGES',
				],
			args:
				[
					{
						id: 'amount',
						type: 'number',
						prompt:
						{
							start:
								(message: Message) =>
									`${message.member}, how many messages would you like to remove?`,
							retry:
								(message: Message) =>
									`${message.member}, please provide a numberic number which is between 1 and 100.`,
						},
					},
				],
			channel: 'guild',
			cooldown: 3000,
		});
	}
	public async exec(message: Message, { amount }: { amount: number }): Promise<Message | Message[]> {
		const messages = await message.channel.messages.fetch({ limit: amount });
		if (message.channel.type !== 'dm') {
			await message.channel.bulkDelete(messages, false);

			const embed = new this.client.embed(message)
				.setTitle(`Purge successfull!`)
				.setFooter(`Made by Taylor#1837`)
				.setDescription(`Successfully removed \`${messages.size} out of ${amount}\` messages.`);
			return message.reply({ embed });
		}
	}
}
