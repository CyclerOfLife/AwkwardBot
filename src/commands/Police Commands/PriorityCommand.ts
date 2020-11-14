import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
const talkedRecently = new Set();

export default class PriorityCommand extends Command {
    public constructor() {
        super("pstart", {
            aliases: ["pstart"],
            category: "Police Commands",
            description: {
                content: "Request a Priority for your ER:LC roblox server",
                usage: "pstart",
                examples: ["pstart"]
            },
            args: [
                {
                    id: "text",
                    match: "content",
                    default: "**NO FUCKING REASON**"
                }
            ],
            ratelimit: 1,
            cooldown: 10e4
        });
    }

    public exec(message: Message, { text }) {
        if(this.client.rp.has(message.guild.id)) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 5 minutes before doing a crime priority..");
        } else {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 60000 * 5);
            this.client.priority.set(message.author.id, message.guild.id)
            return message.util.send(new MessageEmbed()
                .setTitle(`${message.author.username} started a priority for: ${text}`)
                .setColor("RED")
                .setDescription("Someone started a priority! No one start a priority till it is finished, and its cooldown is gone.")
                .addField(`Who Started a priority!`, `${message.author.tag} did!`)
                .addField(`How do I stop a priority?`, `They can do \`awk!pend\` when its over!`)
                .addField("Reminders!", `Set reminders/timers with the timer command`)
                .setTimestamp()
                .setFooter(`Made by Taylor#1837`)
                )
            }
        } else {
            message.reply('Uh- you cant start a priority with no rp active.')
        }
    }
}