import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Player } from "erela.js";
export default class SkiptoCommand extends Command {
  public constructor() {
    super("skipto", {
      aliases: ["skipto"],
      category: "Music",
      description: {
        content: "Skip towards the music",
        usage: "skipto (song number)",
        examples: ["skip"],
      },
    });
  }
  public async exec(message: Message, args: string[]): Promise<Message> {
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
    if (parseInt(args[0]) > player.queue.length || parseInt(args[0]) === 0) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("❌ Invalid song number")
        );
    }
    player.queue.splice(0, parseInt(args[0]) - 1);
    player.stop();
    return message.channel.send(
        new MessageEmbed()
            .setColor("#ffff00")
            .setDescription(`✅ Skipped to song number \`${args[0]}\``)
    );
    }
}
