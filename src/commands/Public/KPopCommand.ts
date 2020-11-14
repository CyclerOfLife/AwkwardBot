import { DuncateApi } from "duncans-api-wrapper";
import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

const api = new DuncateApi()

export default class KpopCommand extends Command {
  public constructor() {
    super("kpop", {
      aliases: ["kpop"],
      channel: "guild",
      category: "Public Commands",
      args: [
        {
            id: "query",
            type: "string",
            match: "rest",
            default: null
          }
      ],
      description: {
        content: "Check out some ho- some nice kpop people ;))",
        usage: "kpop",
        examples: ["kpop"]
      },
      cooldown: 0
    });
  }

  public async exec(message: Message, { query }: { query: string}): Promise<Message> {

    let data;

    if(!query){
      data = await api.kpop()
    }else{
      data = await api.kpop(query)
    }

    if(!data) return message.util!.send(new MessageEmbed()
      .setDescription("Unknown Artist")
    )

    return message.util!.send(new MessageEmbed()
        .setDescription(`Name: ${data.data.name}\nBand: ${data.data.band}`)
        .setImage(data.data.img)
        .setFooter(`Made by Taylor#1837`)

    )
  }
}