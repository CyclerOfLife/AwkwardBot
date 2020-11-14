import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import { TextChannel } from 'discord.js';

export default class UnBanCommand extends Command {
	public constructor() {
		super('unban', {
			aliases:
				[
					'unban',
				],
			userPermissions:
				[
					'BAN_MEMBERS',
				],
			category: 'Moderation Commands',
			clientPermissions:
				[
					'BAN_MEMBERS',
				],
			description:
			{
				content: 'Unban a user that was already banned.',
				usage: 'unban <user_id>',
				examples:
					[
						'unban [Dank Memer]',
					],
			},
			args:
				[
					{
						id: 'member',
						type:
							async (_, id) => {
								const user = await this.client.users.fetch(id);
								return user;
							},
						prompt:
						{
							start: `Please send a user id!`,
							retry:
								`Please send a valid user id
                        https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-`,
						},
					},
				],
			cooldown: 3000,
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }) {
		const banList = await message.guild.fetchBans();
		if (banList.has(member.id)) {
			await message.guild.members.unban(member.id).catch((err) => console.log(err));
			message.util.send(
				new MessageEmbed()
					.setTitle(`Unbanned a user successfully`)
					.setDescription(`Unbanned ${member}! Have fun moderating.`),
			);
		} else {
			return message.reply(new this.client.embed().setDescription(`Yo, this persons already unbanned lel`));
		}
	}
}
