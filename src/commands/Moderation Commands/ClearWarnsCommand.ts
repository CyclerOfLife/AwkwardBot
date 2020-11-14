import { Command } from 'discord-akairo';
import { Message, User, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import Warns from '../../client/database/Warns';

export default class ClearWarnsCommand extends Command {
	public constructor () {
		super('clearwarns', {
			aliases:
				[
					'clearwarns',
					'clearinfractions',
				],
			category: 'Moderation Commands',
			description:
				{
					content: 'Clear the warns of a user',
					usage: 'clearwarns <user>',
					examples:
						[
							'clearwarns Taylor',
						],
				},

			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start: `Please mention a user`,
								retry: `Please mention a valid user.`,
							},
					},
				],
			cooldown: 3000,
		});
	}

	public async exec (message: Message, { member, page }: { member: GuildMember; page: number }) {
		if (Warns.findOne({ user: member.user.id, guild: message.guild.id }).length) {
			const embed = new this.client.embed();
			embed.setAuthor(`Infractions | ${member.user.tag}`, member.user.displayAvatarURL);
			embed.setTimestamp().setDescription('All infractions has been removed');
			embed.setColor('RANDOM');
			await Warns.deleteOne({ user: member.user.id, guild: message.guild.id });
			message.util.send(embed);
		}
		else {
			message.reply("This user doesn't have any infractions");
			message.delete();
		}
	}
}
