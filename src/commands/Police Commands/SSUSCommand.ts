import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class SSUs extends Command {
    public constructor() {
        super("ssus", {
            aliases: ["ssus", "ssucount"],
            category: "Police Commands",
            description: {
                content: "Find out how many ssu's ended up being revealed today",
                usage: "pstop",
                examples: ["pstop"]
            },
            cooldown: 3000
        });
    }

    public exec(message: Message) {
        return message.util.send(new this.client.embed(
        )
            .setTitle('Total SSUS')
            .setDescription(`You have a total of \`${this.client.ssu.size || '0'}\` ssu's active`))
    }
}