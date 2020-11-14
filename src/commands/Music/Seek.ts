import { Command, Flag } from "discord-akairo";
import { Message } from "discord.js";
import { Player } from "erela.js";
import ms from "ms";

import { MessageEmbed } from "discord.js";
export default class SeekCommand extends Command {
  constructor() {
    super("seek", {
      aliases: ["seek"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Seeks to a position in a song.", 
        usage: "seek [ amount ]",
        examples: [
          "seek 100",
        ]
      },
    });
  }

  async exec (message: Message, args: string[]) {
    if (!args.length || args.length > 3) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("#ff0000")
              .setTitle("User input required")
              .setDescription(`Correct usage: \`${this.description.usage}\``)
              .setFooter("() - Required | [] - Optional")
      );
  }
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
  let timeToSeek: number = 0;
  for (const i in args) {
      let timetoMultiply: number;
      if (args.length === 3) {
          if (parseInt(i) === 0) timetoMultiply = parseInt(args[i]) * 3600;
          if (parseInt(i) === 1) timetoMultiply = parseInt(args[i]) * 60;
          if (parseInt(i) === 2) timetoMultiply = parseInt(args[i]);
      } else if (args.length === 2) {
          if (parseInt(i) === 0) timetoMultiply = parseInt(args[i]) * 60;
          if (parseInt(i) === 1) timetoMultiply = parseInt(args[i]);
      } else timetoMultiply = parseInt(args[i]);
      timeToSeek += timetoMultiply;
      timetoMultiply = 0;
  }
  if (timeToSeek * 1000 > player.queue[0].duration) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("#ff0000")
              .setDescription("❌ Cannot seek to that time!")
      );
  }
  player.seek(timeToSeek * 1000);
  return message.channel.send(
      new MessageEmbed()
          .setColor("#ffff00")
          .setDescription(`✅ Seeked the song to \`${this.client.utils.formatTime(timeToSeek * 1000)}\``)
  );
  }
}