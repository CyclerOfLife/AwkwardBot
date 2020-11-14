import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js"
export default class LeaveCommand extends Command {
  constructor() {
    super("leave", {
      aliases: ["leave"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Leave Command", 
        usage: "leave",
        examples: ["leave"]
      },
      
    });
  }

  async exec (message: Message) {
    if (!message.guild.me.voice.channel) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("#ff0000")
              .setDescription("❌ I'm not connected to a voice channel")
      );
  }
  if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("#ff0000")
              .setDescription("❌ Please connect to the same voice channel to the bot to use the command")
      );
  }
  this.client.manager.players.get(message.guild.id).destroy();
  return message.channel.send(
      new MessageEmbed()
          .setColor("#ffff00")
          .setDescription("✅ Cleared the queue and left the voice channel")
  );
  }
}