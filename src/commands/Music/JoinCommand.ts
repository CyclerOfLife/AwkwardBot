import { Command } from "discord-akairo";
import { Message, MessageEmbed, VoiceChannel } from "discord.js";
import { Player } from "erela.js";
import ms from "ms";

export default class JoinCommand extends Command {
  constructor() {
    super("join", {
      aliases: ["join"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Join Command",
        usage: "join",
        examples: ["join"]
      },

    });
  }

  async exec(message: Message): Promise<Message> {
    const memberVoice = message.member.voice.channelID;
    if (!memberVoice) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("#ff0000")
          .setDescription("❗ Please connect to a voice channel first to use the command")
      );
    }

    let player: Player = this.client.manager.players.get(message.guild.id);

    const botVoice = message.guild.me.voice.channelID;

    if (!player) {
      player = this.client.manager.create({
        selfDeafen: false,
        guild: message.guild.id,
        voiceChannel: memberVoice,
        textChannel: message.channel.id,
        volume: 100
      });
      player.connect();
      message.channel.send(
        new MessageEmbed()
          .setColor("#ffff00")
          .setDescription("✅ Joined the voice channel")
      );
    } else if (memberVoice !== botVoice) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("#ff0000")
          .setDescription("❗ Please connect to the same voice channel to the bot to use the command")
      );
    }

    setTimeout(() => {
      if (player.queue.current) return;
      player.destroy();
      return message.channel.send(
        new MessageEmbed()
          .setColor("#ff0000")
          .setDescription("❗ No songs are in the voice. Left the voice channel")
      );
    }, ms("10s"));
  }


}