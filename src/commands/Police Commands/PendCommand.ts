import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
export default class pstopCommand extends Command {
    public constructor() {
        super("pstop", {
            aliases: ["pstop", "pend"],
            category: "Police Commands",
            description: {
                content: "Request a priority stop for your ER:LC roblox server",
                usage: "pstop",
                examples: ["pstop"]
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: (_) => _.member
                },
                {
                    id: 'reason',
                    default: 'No reason at all.',
                    match: 'restContent'
                }
            ],
            cooldown: 3000
        });
    }

    public exec(message: Message, { member, reason }: { member: GuildMember, reason: string }) {
        if(member.id != message.author.id && this.client.priority.has(member.id, message.guild.id)) {
                this.client.priority.delete(member.id, message.guild.id)
                return message.reply(new this.client.embed()
                .setDescription(`${message.author.tag} has successfully deleted/stopped ${member.user.tag}'s priority.`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL()))
            }
    

    // If there was no Member mentioned.
    if(this.client.rp.has(message.guild.id) && this.client.priority.has(member.id, message.guild.id)) {
        return message.util.send(new MessageEmbed()
            .setTitle("Priority")
            .setColor("RED")
            .setDescription("Someone stopped a priority! No one start a priority till it has been 10 minutes and its cooldown is gone.")
            .addField(`Who Stopped a priority!`, `${message.author.tag} did!`)
            .addField(`How do I start a priority?`, `They can do \`awk!priority\``)
            .setTimestamp()
            .setFooter(`Made by Taylor#1837`)
            )
        } else {
            message.reply('You don\'t have a priority open!')
        }
    }
}