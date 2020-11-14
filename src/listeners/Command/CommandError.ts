import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";
import { TextChannel } from "discord.js";


export default class ErrorListener extends Listener {
    public constructor() {
        super("listeners-error-handler", {
            emitter: "commandHandler",
            event: "error"
        });
    }

    public async exec(error: Error, message: Message, command: Command) {
        (this.client.channels.cache.get('738823299295084674') as TextChannel).send(new this.client.embed().setDescription(
            `There was a error in ${message.guild.name}(${message.guild.id}). - <#${message.channel.id}>\nError: ${error} - Command: ${command.id}`
        ))
        console.error(`Error: ${error}`);
        return message.util?.send(
            new this.client.embed(message).setDescription(`There was an error while trying to execute this command. Please report this to the developer.\n\n\`${error}\``)
        );
    }
}


