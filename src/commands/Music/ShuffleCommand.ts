import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "erela.js";

export default class ShuffleCommand extends Command {
    public constructor() {
        super('shuffle', {
            aliases: ['shuffle'],
            category: "Music",
            description: {
                content: "Shuffle your queue :sunglasses:",
                usage: 'shuffle',
                examples: ['shuffle']
            }
        });
    }

    public async exec(message: Message) {
        const player: Player = this.client.manager.players.get(message.guild.id);
        if (!player.queue.length) {
            if (!player.queue.current) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("#ff0000")
                        .setDescription("❌ There aren't any playing songs")
                );
            }
        }

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("❌ Please connect to the same voice channel to the bot to use the command")
            );
        }
        player.queue.shuffle();
        return message.channel.send(
            new MessageEmbed()
                .setColor("#ffff00")
                .setDescription("✅ The queue has been shuffled")
        );
    }
}