import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class EmbedCommand extends Command {
    public constructor() {
        super('embed', {
            aliases: ['embed', 'newembed'],
            userPermissions: ["EMBED_LINKS"],
            description: {
                content: 'Embed a few text!',
                usage: 'embed <title> <description>',
                examples: ['embed hello, hello. Hi', 'embed im gonna ping everyone ty -ping']
            },
            category: 'Public Commands',
            args: [
                {
                    id: "title",
                    prompt: {
                        start: `
                        Hey, whats the title?
                        TIP: You can seperate your title from the description by using quotes... '-ping'
                        `
                    }
                },
                {
                    id: 'string',
                    type: 'string',
                    match: 'restContent',
                    prompt: {
                        start: `Please send what I shall put in the embed.
                        TIP: You can seperate your title from the description by using quotes... '-ping'`
                    },

                }
            ],
            cooldown: 3000
        });
    }

    public async exec(message: Message, { string, ping, title}) {
            message.delete();
            return message.util.send (
                new this.client.embed(message)
                .setTitle(title)
                .setColor("RANDOM")
                .setDescription(string)
                .setFooter(`Made by Taylor#1837`)
                )
    }
}