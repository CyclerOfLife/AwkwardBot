import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import moment from "moment";
import pageEmbed from "@awkwarddev/djspage";
export default class BedwarsCommand extends Command {
    constructor() {
        super("bedwars", {
            aliases: ["bw", 'bedwars'],
            category: "Hypixel",
            channel: "guild",
            args: [
                {
                    id: "query",
                    type: 'string',
                    prompt: {
                        start: "Whats the players name?" // Make sure you delete this when adding Verification
                    }
                },
                { 
                    id: 'mode1',
                    type: 'string',
                    default: `overall`
                }
            ],
            description: {
                content: "Find out the basics statistics of a user",
                usage: "bedwars [ player ]",
                examples: ["bedwars ohhTaylor"]
            },
        });
    }

    public async exec(message: Message, { query, mode1 }: { query: any, mode1: string}) {
    let username = query;
    let mode = mode1.toLowerCase()
    let msg = await message.reply(`Fetching for \`${username}\`, mode: \`${mode}\` `);

    if(mode === "overall") {
        await fetch('https://api.slothpixel.me/api/players/' + username)
        .then(res => res.json())
        .then( ({
            error,
            stats, username, uuid,
        }) => {
            if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!")
            .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
            .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
            .setFooter(this.client.version))

            let bedwars = stats.BedWars;

            return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
            .addFields(
                {name: `**Level**`, value: `\`${bedwars.level}\``, inline: true},
                {name: `**Wins**`, value: `\`${bedwars.wins}\``, inline: true},
                {name: `**Losses**`, value: `\`${bedwars.losses}\``, inline: true},
                {name: `**Games Played**`, value: `\`${bedwars.games_played}\``, inline: true},
                {name: `**Kills**`, value: `\`${bedwars.kills}\``, inline: true},
                {name: `**Deaths**`, value: `\`${bedwars.deaths}\``, inline: true},
                {name: `**KDR**`, value: `\`${bedwars.k_d}\``, inline: true},
                {name: `**WLR**`, value: `\`${bedwars.w_l}\``, inline: true},
                {name: `**Beds Broken**`, value: `\`${bedwars.beds_broken}\``, inline: true},
                {name: `**Beds Lost**`, value: `\`${bedwars.beds_lost}\``, inline: true},
                {name: `**BBLR**`, value: `\`${bedwars.bed_ratio}\``, inline: true},
                {name: `**Final Kills**`, value: `\`${bedwars.final_kills || "0"}\``, inline: true},
                {name: `**Final Deaths**`, value: `\`${bedwars.final_deaths || "0"}\``, inline: true},
                {name: `**FKDR**`, value: `\`${bedwars.final_k_d || "Infinity"}\``, inline: true},
                {name: `**Void kills**`, value: `\`${bedwars.void_kills}\``, inline: true},
                {name: `**Void deaths**`, value: `\`${bedwars.void_deaths}\``, inline: true},
                {name: `**Winstreak**`, value: `\`${bedwars.winstreak}\``, inline: true},
            )
            .setColor("RANDOM")
            .setFooter(this.client.version)
            )
        }).catch(err => { 
            console.log(err)
            return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
            .setDescription(`Hey, we encountered a error. Please try again later!`)
            .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
            .setFooter(this.client.version))
        });
   } else if(mode === "fours") {
    await fetch('https://api.slothpixel.me/api/players/' + username)
    .then(res => res.json())
    .then( ({
        error,
        stats, username, uuid
    }) => {
        if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
        let bedwars = stats.BedWars.gamemodes['4v4v4v4'];
        let kdr = (bedwars.kills / bedwars.deaths).toFixed(2) || "0"
        let fkdr = (bedwars.final_kills / bedwars.final_deaths).toFixed(2)|| "Infinite"
        let bblr = (bedwars.beds_broken / bedwars.beds_lost).toFixed(2)|| "Infinite"

        return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
        .addFields(
            {name: `**Wins**`, value: `\`${bedwars.wins}\``, inline: true},
            {name: `**Losses**`, value: `\`${bedwars.losses}\``, inline: true},
            {name: `**Games Played**`, value: `\`${bedwars.games_played}\``, inline: true},
            {name: `**Kills**`, value: `\`${bedwars.kills}\``, inline: true},
            {name: `**Deaths**`, value: `\`${bedwars.deaths}\``, inline: true},
            {name: `**KDR**`, value: `\`${kdr}\``, inline: true},
            {name: `**Beds Broken**`, value: `\`${bedwars.beds_broken}\``, inline: true},
            {name: `**Beds Lost**`, value: `\`${bedwars.beds_lost}\``, inline: true},
            {name: `**BBLR**`, value: `\`${bblr}\``, inline: true},
            {name: `**Final Kills**`, value: `\`${bedwars.final_kills}\``, inline: true},
            {name: `**Final Deaths**`, value: `\`${bedwars.final_deaths}\``, inline: true},
            {name: `**FKDR**`, value: `\`${fkdr}\``, inline: true},
            {name: `**Void kills**`, value: `\`${bedwars.void_kills}\``, inline: true},
            {name: `**Void final deaths**`, value: `\`${bedwars.void_final_deaths}\``, inline: true},
            {name: `**Winstreak**`, value: `\`${bedwars.winstreak}\``, inline: true},
        )
        .setColor("RANDOM")
        .setFooter(this.client.version)
        )
    }).catch(err => { 
        console.log(err)
        return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Please try again later!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
    });
   } else if(mode === "threes") {
    await fetch('https://api.slothpixel.me/api/players/' + username)
    .then(res => res.json())
    .then( ({
        error,
        stats, username, uuid
    }) => {
        if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
        let bedwars = stats.BedWars.gamemodes['3v3v3v3'];
        let kdr = (bedwars.kills / bedwars.deaths).toFixed(2) || "0"
        let fkdr = (bedwars.final_kills / bedwars.final_deaths).toFixed(2)|| "Infinite"
        let bblr = (bedwars.beds_broken / bedwars.beds_lost).toFixed(2)|| "Infinite"

        return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
        .addFields(
            {name: `**Wins**`, value: `\`${bedwars.wins}\``, inline: true},
            {name: `**Losses**`, value: `\`${bedwars.losses}\``, inline: true},
            {name: `**Games Played**`, value: `\`${bedwars.games_played}\``, inline: true},
            {name: `**Kills**`, value: `\`${bedwars.kills}\``, inline: true},
            {name: `**Deaths**`, value: `\`${bedwars.deaths}\``, inline: true},
            {name: `**KDR**`, value: `\`${kdr}\``, inline: true},
            {name: `**Beds Broken**`, value: `\`${bedwars.beds_broken}\``, inline: true},
            {name: `**Beds Lost**`, value: `\`${bedwars.beds_lost}\``, inline: true},
            {name: `**BBLR**`, value: `\`${bblr}\``, inline: true},
            {name: `**Final Kills**`, value: `\`${bedwars.final_kills}\``, inline: true},
            {name: `**Final Deaths**`, value: `\`${bedwars.final_deaths}\``, inline: true},
            {name: `**FKDR**`, value: `\`${fkdr}\``, inline: true},
            {name: `**Void kills**`, value: `\`${bedwars.void_kills}\``, inline: true},
            {name: `**Void final deaths**`, value: `\`${bedwars.void_final_deaths}\``, inline: true},
            {name: `**Winstreak**`, value: `\`${bedwars.winstreak}\``, inline: true},
        )
        .setColor("RANDOM")
        .setFooter(this.client.version)
        )
    }).catch(err => { 
        console.log(err)
        return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Please try again later!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
    });
   } else if(mode === "solos") {
    await fetch('https://api.slothpixel.me/api/players/' + username)
    .then(res => res.json())
    .then( ({
        error,
        stats, username, uuid
    }) => {
        if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
        let bedwars = stats.BedWars.gamemodes.solo;
        let kdr = (bedwars.kills / bedwars.deaths).toFixed(2) || "0"
        let fkdr = (bedwars.final_kills / bedwars.final_deaths).toFixed(2)|| "Infinite"
        let bblr = (bedwars.beds_broken / bedwars.beds_lost).toFixed(2)|| "Infinite"

        return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
        .addFields(
            {name: `**Wins**`, value: `\`${bedwars.wins}\``, inline: true},
            {name: `**Losses**`, value: `\`${bedwars.losses}\``, inline: true},
            {name: `**Games Played**`, value: `\`${bedwars.games_played}\``, inline: true},
            {name: `**Kills**`, value: `\`${bedwars.kills}\``, inline: true},
            {name: `**Deaths**`, value: `\`${bedwars.deaths}\``, inline: true},
            {name: `**KDR**`, value: `\`${kdr}\``, inline: true},
            {name: `**Beds Broken**`, value: `\`${bedwars.beds_broken}\``, inline: true},
            {name: `**Beds Lost**`, value: `\`${bedwars.beds_lost}\``, inline: true},
            {name: `**BBLR**`, value: `\`${bblr}\``, inline: true},
            {name: `**Final Kills**`, value: `\`${bedwars.final_kills}\``, inline: true},
            {name: `**Final Deaths**`, value: `\`${bedwars.final_deaths}\``, inline: true},
            {name: `**FKDR**`, value: `\`${fkdr}\``, inline: true},
            {name: `**Void kills**`, value: `\`${bedwars.void_kills}\``, inline: true},
            {name: `**Void final deaths**`, value: `\`${bedwars.void_final_deaths}\``, inline: true},
            {name: `**Winstreak**`, value: `\`${bedwars.winstreak}\``, inline: true},
        )
        .setColor("RANDOM")
        .setFooter(this.client.version)
        )
    }).catch(err => { 
        console.log(err)
        return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Please try again later!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
    });
   } else if(mode === "doubles") {
    await fetch('https://api.slothpixel.me/api/players/' + username)
    .then(res => res.json())
    .then( ({
        error,
        stats, username, uuid
    }) => {
        if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
        let bedwars = stats.BedWars.gamemodes.doubles
        let kdr = (bedwars.kills / bedwars.deaths).toFixed(2) || "0"
        let fkdr = (bedwars.final_kills / bedwars.final_deaths).toFixed(2)|| "Infinite"
        let bblr = (bedwars.beds_broken / bedwars.beds_lost).toFixed(2)|| "Infinite"

        return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
        .addFields(
            {name: `**Wins**`, value: `\`${bedwars.wins}\``, inline: true},
            {name: `**Losses**`, value: `\`${bedwars.losses}\``, inline: true},
            {name: `**Games Played**`, value: `\`${bedwars.games_played}\``, inline: true},
            {name: `**Kills**`, value: `\`${bedwars.kills}\``, inline: true},
            {name: `**Deaths**`, value: `\`${bedwars.deaths}\``, inline: true},
            {name: `**KDR**`, value: `\`${kdr}\``, inline: true},
            {name: `**Beds Broken**`, value: `\`${bedwars.beds_broken}\``, inline: true},
            {name: `**Beds Lost**`, value: `\`${bedwars.beds_lost}\``, inline: true},
            {name: `**BBLR**`, value: `\`${bblr}\``, inline: true},
            {name: `**Final Kills**`, value: `\`${bedwars.final_kills}\``, inline: true},
            {name: `**Final Deaths**`, value: `\`${bedwars.final_deaths}\``, inline: true},
            {name: `**FKDR**`, value: `\`${fkdr}\``, inline: true},
            {name: `**Void kills**`, value: `\`${bedwars.void_kills}\``, inline: true},
            {name: `**Void final deaths**`, value: `\`${bedwars.void_final_deaths}\``, inline: true},
            {name: `**Winstreak**`, value: `\`${bedwars.winstreak}\``, inline: true},
        )
        .setColor("RANDOM")
        .setFooter(this.client.version)
        )
    }).catch(err => { 
        console.log(err)
        return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Please try again later!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
    });
   } else if(mode === "4v4") {
    await fetch('https://api.plancke.io/hypixel/v1/player?player=' + username)
    .then(res => res.json())
    .then( ({
        success,
        record
    }) => {
        if(success === false) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error... It might've been a invalid username!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version))
        let uuid = record.uuid;
        let bedwars = record.stats.Bedwars;
        let username = record.displayname;
        let kdr = (bedwars.two_four_kills_bedwars / bedwars.two_four_deaths_bedwars).toFixed(2) || "0";
        let fkdr = (bedwars.two_four_final_kills_bedwars / bedwars.two_four_final_deaths_bedwars).toFixed(2) || "0";
        let bblr = (bedwars.two_four_beds_broken_bedwars / bedwars.two_four_beds_lost_bedwars).toFixed(2) || "0";

        return msg.edit(new MessageEmbed().setTitle(`${username}`).setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`).setThumbnail(`https://minotar.net/helm/${username}/100.png`)
        .addFields(
            {name: `**Wins**`, value: `\`${bedwars.two_four_wins_bedwars || 0}\``, inline: true},
            {name: `**Losses**`, value: `\`${bedwars.two_four_losses_bedwars || 0}\``, inline: true},
            {name: `**Games Played**`, value: `\`${bedwars.games_played || 0}\``, inline: true},
            {name: `**Kills**`, value: `\`${bedwars.two_four_kills_bedwars || 0}\``, inline: true},
            {name: `**Deaths**`, value: `\`${bedwars.two_four_deaths_bedwars || 0}\``, inline: true},
            {name: `**KDR**`, value: `\`${kdr || 0}\``, inline: true},
            {name: `**Beds Broken**`, value: `\`${bedwars.two_four_beds_broken_bedwars || 0}\``, inline: true},
            {name: `**Beds Lost**`, value: `\`${bedwars.two_four_beds_lost_bedwars || 0}\``, inline: true},
            {name: `**BBLR**`, value: `\`${bblr !== null ? bblr : 0 || 0}\``, inline: true},
            {name: `**Final Kills**`, value: `\`${bedwars.two_four_final_kills_bedwars || 0}\``, inline: true},
            {name: `**Final Deaths**`, value: `\`${bedwars.two_four_final_deaths_bedwars || 0}\``, inline: true},
            {name: `**FKDR**`, value: `\`${fkdr || 0}\``, inline: true},
            {name: `**Void kills**`, value: `\`${bedwars.two_four_void_kills_bedwars || 0}\``, inline: true},
            {name: `**Void final deaths**`, value: `\`${bedwars.two_four_void_final_deaths_bedwars || 0}\``, inline: true},
            {name: `**Winstreak**`, value: `\`${bedwars.two_four_winstreak || 0}\``, inline: true},
        )
        .setColor("RANDOM")
        .setFooter(this.client.version)
        )
    }).catch(err => { 
        console.log(err)
        return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
        .setDescription(`Hey, we encountered a error. Please try again later!`)
        .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
        .setFooter(this.client.version)
        )
            });
        }    
    }
}