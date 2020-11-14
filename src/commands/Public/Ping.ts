import { Command } from "discord-akairo"
import { Message } from "discord.js";


export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping", "api"],
            category: "Public Commands",
            description: {
                content: "Check latency of the API",
                usage: "ping",
                examples: [
                    "ping"
                ],
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(new this.client.embed(message)
        .setDescription(`Pong! ${Math.round(this.client.ws.ping)}ms`)
        .setFooter(`Made by Taylor#1837`)
        );
    }
}