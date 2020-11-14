import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PauseCommand extends Command {
    public constructor() {
        super('pause', {
            aliases: ["pause"],
            category: "Music",
            description: {
                content: "Pause the music your playing",
                usage: "pause",
                examples: ['pause']
            }
        });
    }

    public async exec(message: Message) {
        const player = this.client.manager.players.get(message.guild.id);

        if(!player) return message.util.send(new MessageEmbed()
        .setTitle(`No music being played!`)
        .setColor("RANDOM"));


        try {
            player.pause(player.playing);
            return message.util.send(new MessageEmbed()
            .setTitle(`${player.playing ? "Resumed" : "Paused"}`).setColor("RANDOM"))
        } catch(err) {
            console.error(err)
        }
    }
    
}