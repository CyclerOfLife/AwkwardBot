
import { Command } from "discord-akairo";
  
import { Message, MessageEmbed } from "discord.js";
import { Player } from "erela.js";
import { stripIndents } from "common-tags";

export default class NowplayingCommand extends Command {
  constructor() {
    super("nowplaying", {
      aliases: ["nowplaying", "np"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Show your current now playing song.", 
        usage: "nowplaying",
        examples: [
          "nowplaying"
        ]
      },
    });
  }

  async exec (message: Message): Promise<Message> {
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
    return message.channel.send(
        new MessageEmbed()
            .setColor("#fff000")
            .setTitle(`Now Playing ${player.queue.current.title} - ${player.queue.current.requester}`)
            .setThumbnail(player.queue.current.thumbnail)
            .addField("Progress", `${this.client.utils.createBar(player.position, player.queue.current.duration, 10)}`)
    );
  }
}