import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import moment from "moment";
export default class HypixelCommand extends Command {
    constructor() {
        super("Hypixel", {
            aliases: ['hypixel', 'player', 'hyp'],
            category: "Hypixel",
            channel: "guild",
            args: [
                {
                    id: "query",
                    type: 'string',
                    match: "rest",
                    prompt: {
                        start: "Whats the players name?" // Make sure you delete this when adding Verification
                    }
                }
            ],
            description: {
                content: "Find out the basics statistics of a user",
                usage: "hypixel [ player ]",
                examples: ["hypixel ohhTaylor"]
            },
        });
    }

    public async exec(message: Message, { query }: { query: any }) {
        let username = query;
    let msg = await message.reply('Fetching stats of ' + username);
    await fetch('https://api.slothpixel.me/api/players/' + username)
    .then(res => res.json())
    .then( async( {
        error, level, karma, achievement_points, last_game, quests_completed, first_login, last_logout, links, online
    }, sloth) => {
        await fetch('https://api.plancke.io/hypixel/v1/player?player=' + username)
        .then(res => res.json())
        .then(({record, success}) => {
            if(error) return msg.edit(new MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${error}` +  ` If this is wrong, please message Taylor#1837`)
            .setFooter(this.client.version)
            );
            if(success !== true) return msg.edit(new MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${error}` +  ` If this is wrong, please message Taylor#1837`)
            .setFooter(this.client.version)
            );
            msg.edit(new MessageEmbed()
            .setTitle(`**${record._custom.names.stripped.prefix_guild_tag_name}**`)
            .setColor("RANDOM")
            .setThumbnail(`https://minotar.net/helm/${username}.png`)
            .addFields(
                { name: `**Level**`, value: `\`${level}\``, inline: true},
                { name: `**Karma**`, value: `\`${comma(karma)}\``, inline: true},
                { name: `**Online**`, value: `\`${online === true ? 'Yep!' : "No..."}\``, inline: true},
                { name: `**Achievement Points**`, value: `\`${comma(achievement_points)}\``, inline: true},
                { name: `**Last Game**`, value: `\`${last_game}\``, inline: true},
                { name: `**Quest Completed**`, value: `\`${comma(quests_completed)}\``, inline: true},
                { name: `**First / Last login**`, value: `\`${convert(first_login)} - ${convert(last_logout)}\``, inline: true},
                { name: `**LINKS**`, value: `${links.TWITTER !== null ? `**Twitter**: \`${links.TWITTER}\`\n` : ''} ${links.YOUTUBE !== null ? `**YouTuber**: \`${links.YOUTUBE}\`\n` : ''} ${links.INSTAGRAM !== null ? `**Instagram**: \`${links.INSTAGRAM}\`\n` :''} ${links.TWITCH !== null ? `**Twitch**: \`${links.TWITCH}\`\n` : ""} ${links.MIXER !== null ? `**Mixer**: \`${links.MIXER}\`\n` : ""} ${links.DISCORD !== null ? `**Discord**: \`${links.DISCORD}\`` : ''}`, inline: true},
            )
            .setFooter(this.client.version)
            );
        }).catch(err => {
            msg.edit('ERROR, please try again later.');
            console.log(err);
        });
    })
    .catch(err => {
        msg.edit('ERROR, please try again later.');
        console.log(err);
    });
        function comma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function convert(x){
            var date = new Date(x);
            return moment(date).format("ll")
           }
    }
    
}