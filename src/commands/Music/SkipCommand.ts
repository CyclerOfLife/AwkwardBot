import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Player } from "erela.js";
export default class SkipCommand extends Command {
  public constructor() {
    super("skip", {
      aliases: ["skip"],
      category: "Music",
      description: {
        content: "Skip the music",
        usage: "skip",
        examples: ["skip"]
      },
      
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
    player.stop();
    return message.channel.send(
        new MessageEmbed()
            .setColor("#ffff00")
            .setDescription("✅ Skipped the song")
    );
  }
  
}