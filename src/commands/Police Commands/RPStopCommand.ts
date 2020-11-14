import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
export default class rpstopCommand extends Command {
    public constructor() {
        super("rpstop", {
            aliases: ["rpstop", "rpend"],
            category: "Police Commands",
            description: {
                content: "stop the current rp",
                usage: "rpstop",
                examples: ['rpstop']
            },
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3000
        });
    }

    public exec(message: Message) {
        if(this.client.rp.has(message.guild.id)) {
            this.client.rp.delete(message.guild.id)
        message.util.send(new MessageEmbed()
        .setTitle("🚨🚨Roleplay OVER🚨🚨")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addField("Who stopped the RP?", `${message.author} did!`, true)
        .setDescription("Please rate the rp from 1 - 10 in #general" + ' ' + "\n Please leave the game and have a good night!")
        .addField("Reminder!", `Do awk!ssu to do a server start up!\n You can also do awk!dssu to delete your past ssu. \n Do awk!sc for the game server code.`)
        .setColor("#01fef8")
        .setFooter(`Made by Taylor#1837`)
        .setImage("https://blog.hostbaby.com/wp-content/uploads/2012/01/police-siren-animated.gif")
        .setTimestamp())
        message.util.send("@everyone")
        } else {
            message.reply("The rp has not started, what are you stopping?")
        }
    }
}