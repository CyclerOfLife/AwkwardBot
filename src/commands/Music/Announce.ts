import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Player } from "erela.js";

export default class Announce extends Command {
  constructor() {
    super("announce", {
      aliases: ["announce", "notifications", "alerts"],
      channel: "guild",
      category: "Music",
      description: {
        content: "Enable the music notifications, or vise versa.", 
        usage: "announce",
        examples: [
          "announce",
          "notifications",
          "alerts"
        ]
      },
    });
  }

  async exec (message: Message) {
    let colour = await this.client.findOrCreateGuild({ id: message.guild!.id }).then(guild => guild.colour)

    let guild = await this.client.findOrCreateGuild({id: message.guild!.id})

    guild.notifications = !guild.notifications

    guild.save()

    return message.util!.send(new this.client.Embed(message, colour)
        .setDescription(`I have \`${guild.notifications ? "Enabled" : "Disabled"}\` Notifications`)
    )
  }
}