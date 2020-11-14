import { Command } from "discord-akairo";
import { Message } from "discord.js"
import { MessageEmbed } from "discord.js";
import rpstopCommand from "./RPStopCommand";

export default class RPCommand extends Command {
    public constructor() {
        super("rp", {
            aliases: ["rpstart", "rp"],
            category: "Police Commands",
            description: {
                content: "Start a rp in your ER:LC ROBLOX SERVER",
                usage: "rp",
                examples: ["rp"]
            },
            userPermissions: ["MANAGE_MESSAGES"],
            cooldown: 3000
        });
    }

    public exec(message: Message) {
        if(!this.client.rp.has(message.guild.id)) {
            this.client.rp.set(message.guild.id)
        message.util.send(new MessageEmbed()
        .setTitle("🚨🚨Roleplay Start🚨🚨")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addField("Who started the RP?", `${message.author} did!`, true)
        .setDescription("This is an official rp, you will have to join unless you go to rp-excuses.")
        .addField("Reminder!", `Do awk!ssu to request a server start up!\n You can also do awk!dssu to delete your past ssu.`)
        .setColor("#01fef8")
        .setFooter(`Made by Taylor#1837`)
        .setImage("https://blog.hostbaby.com/wp-content/uploads/2012/01/police-siren-animated.gif")
        .setTimestamp())
        message.util.send("@everyone")
        } else {
            message.channel.send('Theres already a rp.')
        }
    }
}