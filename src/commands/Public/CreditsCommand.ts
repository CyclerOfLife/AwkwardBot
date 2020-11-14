import { MessageEmbed, Message } from "discord.js"
import { Command } from "discord-akairo";


export default class CreditsCommand extends Command {
    public constructor() {
        super("credits", {
            aliases: ['credits', "botinfo"],
            category: "Public Commands",
            description: {
                content: "Who created this bot? What language is it made from? Well, this command answers it all",
                usage: "credits",
                examples: ['credits']
            },
            cooldown: 3000
        });
    }

    public exec(message: Message) {
        let embed = new MessageEmbed()
            .setTitle(`Bot information`)
            .setAuthor(`${this.client.users.cache.get("699681088301301841").tag} Created this bot`, this.client.users.cache.get("699681088301301841").displayAvatarURL())
            .setThumbnail(this.client.users.cache.get("699681088301301841").displayAvatarURL())
            .addField(`Website`, `[Website Here](https://awkwardbot.codes/ 'This is one of the websites i worked on the most')`)
            .addField(`Library`, `The library used is **Discord.JS**.`)
            .addField(`Amount of Servers`, this.client.guilds.cache.size)
            .addField(`TOP.GG`, `[Invite Me!](https://top.gg/bot/699684790382887072 'Top.GG invite link- thats if your lazy to go to **my** website') `)
            .addField('Donate to me', '[Support the developer](https://patreon.com/taylorthedev)')
            .setDescription(`
        Hey! I'm Taylor- the bot creator talking right now. So, you may be asking if you want to talk to me.
        Of course you can, just hit me up with a friend request: Taylor#1837
        `)
            .addField(`Will this be open source?`, `Soon... Maybe. I'm deciding!`)
            .setTimestamp()
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL())
        message.util.send(embed)
    }
}