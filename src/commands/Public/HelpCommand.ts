import { Command, PrefixSupplier } from 'discord-akairo';
import { Category } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
export default class HelpCommand extends Command {
	public constructor () {
		super('help', {
			category: 'Public Commands',
			aliases:
				[
					'help',
				],
			description:
				{
					content: 'Displays a list of available command, or detailed information for a specific command.',
					usage: 'help [ optional command ]',
				},
			clientPermissions:
				[
					'EMBED_LINKS',
				],
			ratelimit: 2,
			args:
				[
					{
						id: 'command',
						type: 'commandAlias',
					},
				],
			cooldown: 3000,
		});
	}

	async exec (message: Message, { command }: { command: any }): Promise<Message> {
		let prefix = 'awk!';
		if (message.guild) {
			const guild = await this.client.findOrCreateGuild({ id: message.guild.id });
			if (guild) prefix = guild.prefix;
		}
		if (!command) {
			let embed = new MessageEmbed()
				.setFooter(`Made by Taylor#1837`)
				.addField(
					`❯ Commands`,
					`A list of available commands.\n For more info on a command, type \`${prefix}help <command>\`\n [Support Server](https://discord.gg/P4bt26M)`,
				);
			for (const [
				name,
				category,
			] of this.handler.categories.filter(
				(c: Category<string, Command>) =>
					![
						'flag',
						...(
							this.client.ownerID.includes(message.author.id) ? [
								'flag',
							] :
							[
								'Owner',
								'flag',
							]),
					].includes(c.id),
			)) {
				embed.addField(
					`❯ ${name}`,
					category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(', ') ||
						'None [ERROR]'
				);
			}

			return message.util!.send(embed);
		}
		if (command.ownerOnly && message.author.id !== this.client.ownerID) return;
		let embed = new MessageEmbed()
			.setAuthor(
				`Help - ${command}`,

					message.guild ? message.guild.iconURL({ dynamic: true }) :
					message.author.displayAvatarURL({ dynamic: true }),
			)
			.setColor('#0FF')
			.setTitle(`\`${command.aliases[0]}\``)
			.addField(
				'❯ Description',
				`${
					command.description.content ? command.description.content :
					''} ${
					command.description.ownerOnly ? '\n**[Owner Only]**' :
					''}`,
			)
			.setFooter(
				`${prefix}${
					command.description.usage ? command.description.usage :
					''}`,
			);
		if (command.aliases.length > 1) embed.addField('❯ Aliases', `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples && command.description.examples.length)
			embed.addField('❯ Examples', `\`${command.description.examples.join(`\`\n\``)}\``, true);

		return message.util!.send(embed);
	}
}
