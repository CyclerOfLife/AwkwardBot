import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class TagCommand extends Command {
    public constructor() {
        super("tag-queueloop", {
            category: "flag",
            typing: true
        });

    }

    public async exec (message: Message) {

        let player = this.client.manager.players.get(message.guild!.id)

        const { channel } = message.member!.voice;

        if(!player) return message.channel.send(new MessageEmbed().setDescription("There is no player for this guild"));
        if(!channel || channel.id !== player.voiceChannel.id) return message.channel.send(new MessageEmbed().setDescription("You need to be in the same voice channel as me to use Leave Command"));

        player.setQueueRepeat(true)

        return message.util!.send(new MessageEmbed().setDescription("Looping Queue"))

    }
}
