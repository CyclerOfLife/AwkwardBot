import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Player } from "erela.js";
import { MessageEmbed } from "discord.js";

export default class RemoveCommand extends Command {
  constructor() {
    super("remove", {
      aliases: ["remove"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Removes song from the current queue", 
        usage: "remove [ song ]",
        examples: [
          "remove 1",
          "remove 18",
        ]
      },
      args: [
          {
              id: 'queue',
              type: 'number',
              prompt: {
                  start: 'Please send a number in the queue for me to remove',
                  retry: `Thats not a valid number!`
              }
          }
      ],
    });
  }

  public async exec (message: Message, { queue }: { queue: number }) {
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
    if (isNaN(queue)) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("❌ Please provide a valid number!"));
        }
    player.queue.remove(queue - 1);
    return message.channel.send(
        new MessageEmbed()
            .setColor("#ffff00")
            .setDescription(`✅ Removed song number \`${queue}\``)
    );
  }
}