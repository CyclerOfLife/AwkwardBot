import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class ResumeCommand extends Command {
    public constructor() {
        super('resume', {
            aliases: ["resume"],
            category: "Music",
            description: {
                content: "Resume the music your playing",
                usage: "resume",
                examples: ['resume']
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