import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "erela.js";

export default class Stopcommand extends Command {
  constructor() {
    super("stop", {
      aliases: ["stop", 'die', "cq", "clearq", 'clear'],
      channel: "guild",
      category: "Music",
      description: {
        content: "Stops da music",
        usage: "stop",
        examples: [
          "stop",
          "cq",
          "clearq"
        ]
      },
    });
  }

  public async exec(message: Message) {
    const player: Player = this.client.manager.players.get(message.guild.id);
    if (!player.queue.length) {
      if(!player.queue.current && message.guild.me.voice.channel) return player.destroy(), player.disconnect();
      if (!player.queue.current) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(":x: There aren't any playing songs")
        );
      }
    }
    if (!message.guild.me.voice.channel) return message.react("❌");
    if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("#ff0000")
          .setDescription(":x: Please connect to the same voice channel to the bot to use the command")
      );
    }
    player.stop();
    player.pause(true);
    player.setQueueRepeat(false);
    player.setTrackRepeat(false);
    if (player.queue.length > 0) player.queue.clear();
    player.destroy();
    player.disconnect();
    return message.channel.send(
      new MessageEmbed()
        .setColor("#ffff00")
        .setDescription(":white_check_mark: Stopped the vibe.")
    );
  }
}