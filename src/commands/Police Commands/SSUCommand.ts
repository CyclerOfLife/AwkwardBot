import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class ssuCommand extends Command {
    public constructor() {
        super("ssu", {
            aliases: ["ssu"],
            category: "Police Commands",
            description: {
                content: "Request a server start up for your ER:LC roblox server",
                usage: "ssu",
                examples: ["ssu"]
            },
            cooldown: 3000
        });
    }

    public exec(message: Message) {
        if (!this.client.ssu.has(message.author.id, message.guild.id)) {
            this.client.ssu.set(message.author.id, message.guild.id)
            setInterval(() => {
                this.client.ssu.delete(message.author.id)
            }, 1.8e+7)

            if(this.client.ssu.size >= 4) 
            message.channel.send('Hey, you should ask someone to start a rp, there are ' + this.client.ssu.size + ` ssus active.`)
            return message.util.send(new MessageEmbed()
                .setTitle("Requested Server Start Up")
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .addField("Who requested a SSU?", `${message.author} did!`,)
                .addField("Reminder!", `Do awk!ssu to request a server start up!\n You can also do awk!dssu to delete your past ssu.`,)
                .setColor("#01fef8")
                .setFooter(`Made by Taylor#1837`)
                .setImage("https://media.giphy.com/media/wuOtkQMVrqdRS/giphy.gif")
                .setTimestamp())
        }
        else {
            message.reply('You already Requested a SSU')
        }
    }
}