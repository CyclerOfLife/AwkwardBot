import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Player } from "erela.js"
export default class VolumeCommand extends Command {
  constructor() {
    super("volume", {
      aliases: ["volume", "v"],
      category: "Music",
      description: {
        content: "Change the volume with a Command", 
        usage: "volume [amount]",
        examples: ["volume"]
      },
      
    });
  }

  async exec (message: Message, args: string[]) {
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
    if (!args.length) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("#fff000")
                .setDescription(`⭕ The current volume is \`${player.volume}%\``)
        );
    }
    if (parseInt(args[0]) < 0 || parseInt(args[0]) > 200) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("❌ Please provide a valid volume")
        );
    }
    player.setVolume(parseInt(args[0]));
    return message.channel.send(
        new MessageEmbed()
            .setColor("#ffff00")
            .setDescription(`✅ Set the volume to \`${args[0]}%\``)
    );
  }
}