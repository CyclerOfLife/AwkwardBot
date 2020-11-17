import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import moment from "moment";
import pageEmbed from "@awkwarddev/djspage";
export default class DuelsCommand extends Command {
    constructor() {
        super("duels", {
            aliases: ["duels", 'd'],
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
                    id: 'mode',
                    type: 'string',
                    default: `overall`
                }
            ],
            description: {
                content: "Find out the basics statistics of a user",
                usage: "hypixel [ player ]",
                examples: ["hypixel ohhTaylor"]
            },
        });
    }

    public async exec(message: Message, { query, mode }: { query: any, mode: string}) {
        let username = query
        mode = mode.toLowerCase();
        let msg = await message.reply(`Fetching for \`${username}\`, mode: \`${mode}\` `);
    
            if(mode === "overall") {
                await fetch('https://api.plancke.io/hypixel/v1/player?player=' + username)
                .then(res => res.json())
                .then( ({
                    success,
                    record,
                }) => {
                    if(success !== true) return msg.edit(' ', new MessageEmbed().setTitle("Error!")
                    .setDescription(`Hey, we encountered a error. This might be the username! It might be why we can't find anything, or maybe the user never joined Hypixel.net\n I pulled up the NameMC link for you!\n https://namemc.com/search?q=${username}`)
                    .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
                    .setFooter(this.client.version)
                    );
    
                    let duels = record.stats.Duels;
                    let kdr = (duels.kills / duels.deaths).toFixed(2) || "0";
                    let wlr = (duels.wins / duels.losses).toFixed(2) || "0";
                    let MSHR = (duels.melee_hits / duels.melee_swings).toFixed(2) || "0";
                    return msg.edit(new MessageEmbed().setTitle(`${username}`)
                    .setImage(`https://hypixel.paniek.de/signature/${record.uuid}/general-tooltip`)
                    .setThumbnail(`https://minotar.net/helm/${username}/100.png`)
                    .addFields(
                        {name: `**Wins**`, value: `\`${duels.wins || 0}\``, inline: true},
                        {name: `**Losses**`, value: `\`${duels.losses || 0}\``, inline: true},
                        {name: `**Games Played**`, value: `\`${duels.games_played_duels || 0}\``, inline: true},
                        {name: `**Kills**`, value: `\`${duels.kills || 0}\``, inline: true},
                        {name: `**Deaths**`, value: `\`${duels.deaths || 0}\``, inline: true},
                        {name: `**KDR**`, value: `\`${kdr || 0}\``, inline: true},
                        {name: `**WLR**`, value: `\`${wlr || 0}\``, inline: true},
                        {name: `**Melee Swings**`, value: `\`${duels.melee_swings || 0}\``, inline: true},
                        {name: `**Melee Hits**`, value: `\`${duels.melee_hits || 0}\``, inline: true},
                        {name: `**MSHR**`, value: `\`${MSHR || 0}%\``, inline: true},
                        {name: `**Damage Dealt**`, value: `\`${duels.damage_dealt || 0}\``, inline: true},
                        {name: `**Health Regenerated**`, value: `\`${duels.health_regenerated || 0}\``, inline: true},
                        {name: `**Winstreak**`, value: `\`${duels.current_winstreak_mode_uhc_duel || 0}\``, inline: true},
                        {name: `**Best Winstreak**`, value: `\`${duels.best_overall_winstreak || 0}\``, inline: true}
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
                    );
                });
           } 
           else if(mode === "uhc") {
            await fetch('https://api.slothpixel.me/api/players/' + username)
            .then(res => res.json())
            .then( async({
                error,
                stats, username, uuid
            }) => {
                if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
                .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
                .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
                .setFooter(this.client.version))
                let duels = stats.Duels;
                let kdr = (duels.uhc_duel_kills / duels.uhc_duel_deaths).toFixed(2) || "0";
                let wlr = (duels.uhc_duel_wins / duels.uhc_duel_losses).toFixed(2) || "0";
                let MSHR = (duels.uhc_duel_melee_hits / duels.uhc_duel_melee_swings).toFixed(2) || "0";
                let overall = new MessageEmbed().setTitle(`${username}`)
                .setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`)
                .setThumbnail(`https://minotar.net/helm/${username}/100.png`)
                .addFields(
                    {name: `**Wins**`, value: `\`${duels.uhc_duel_wins || 0}\``, inline: true},
                    {name: `**Losses**`, value: `\`${duels.uhc_duel_losses || 0}\``, inline: true},
                    {name: `**Games Played**`, value: `\`${duels.uhc_duel_rounds_played || 0}\``, inline: true},
                    {name: `**Kills**`, value: `\`${duels.uhc_duel_kills || 0}\``, inline: true},
                    {name: `**Deaths**`, value: `\`${duels.uhc_duel_deaths || 0}\``, inline: true},
                    {name: `**KDR**`, value: `\`${kdr || 0}\``, inline: true},
                    {name: `**WLR**`, value: `\`${wlr || 0}\``, inline: true},
                    {name: `**Melee Swings**`, value: `\`${duels.uhc_duel_melee_swings || 0}\``, inline: true},
                    {name: `**Melee Hits**`, value: `\`${duels.uhc_duel_melee_hits || 0}\``, inline: true},
                    {name: `**MSHR**`, value: `\`${MSHR || 0}%\``, inline: true},
                    {name: `**Damage Dealt**`, value: `\`${duels.damage_dealt || 0}\``, inline: true},
                    {name: `**Health Regenerated**`, value: `\`${duels.uhc_duel_health_regenerated || 0}\``, inline: true},
                    {name: `**Winstreak**`, value: `\`${duels.current_winstreak_mode_uhc_duel || 0}\``, inline: true},
                    {name: `**Best Winstreak**`, value: `\`${duels.duels_winstreak_best_uhc_duel || 0}\``, inline: true}
                )
                .setColor("RANDOM")
                .setFooter(this.client.version);
                // doubles
                let doubleskdr = (duels.uhc_doubles_kills / duels.uhc_doubles_deaths).toFixed(2) || "0";
                let doubleswlr = (duels.uhc_doubles_losses / duels.uhc_doubles_losses).toFixed(2) || "0";
                let MSHRdoubles = (duels.uhc_doubles_melee_hits / duels.uhc_doubles_melee_swings).toFixed(2) || "0";
                let doubles = new MessageEmbed().setTitle(`${username}`)
                .setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`)
                .setThumbnail(`https://minotar.net/helm/${username}/100.png`)
                .addFields(
                    {name: `**Wins**`, value: `\`${duels.uhc_doubles_wins || 0}\``, inline: true},
                    {name: `**Losses**`, value: `\`${duels.uhc_doubles_losses || 0}\``, inline: true},
                    {name: `**Games Played**`, value: `\`${duels.uhc_doubles_rounds_played || 0}\``, inline: true},
                    {name: `**Kills**`, value: `\`${duels.uhc_doubles_kills || 0}\``, inline: true},
                    {name: `**Deaths**`, value: `\`${duels.uhc_doubles_deaths || 0}\``, inline: true},
                    {name: `**KDR**`, value: `\`${doubleskdr || 0}\``, inline: true},
                    {name: `**WLR**`, value: `\`${doubleswlr || 0}\``, inline: true},
                    {name: `**Melee Swings**`, value: `\`${duels.uhc_doubles_melee_hits || 0}\``, inline: true},
                    {name: `**Melee Hits**`, value: `\`${duels.uhc_doubles_melee_swings || 0}\``, inline: true},
                    {name: `**MSHR**`, value: `\`${MSHRdoubles || 0}%\``, inline: true},
                    {name: `**Damage Dealt**`, value: `\`${duels.damage_dealt || 0}\``, inline: true},
                    {name: `**Health Regenerated**`, value: `\`${duels.uhc_doubles_health_regenerated || 0}\``, inline: true},
                    {name: `**Winstreak**`, value: `\`${duels.current_winstreak_mode_uhc_doubles || 0}\``, inline: true},
                    {name: `**Best Winstreak**`, value: `\`${duels.duels_winstreak_best_uhc_doubles || 0}\``, inline: true}
                )
                .setColor("RANDOM")
                .setFooter(this.client.version);
                new pageEmbed([], { filter: (reaction, user) => user.id === message.author.id, timeout: 60000 })
                .add(overall)
                .add(doubles)
                .setTransform((embed, index, total) => embed.setFooter(`${this.client.version} | Page ${index + 1} / ${total}`)) 
                .start(message.channel);
            }).catch(err => { 
                console.log(err)
                return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
                .setDescription(`Hey, we encountered a error. Please try again later!`)
                .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
                .setFooter(this.client.version)
                );
            });
           } else if(mode === "blitz") {
            await fetch('https://api.slothpixel.me/api/players/' + username)
            .then(res => res.json())
            .then( async({
                error,
                stats, username, uuid
            }) => {
                if(error) return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
                .setDescription(`Hey, we encountered a error. Heres what we're recieving: \`${error}\`.`)
                .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
                .setFooter(this.client.version))
                let duels = stats.Duels;
                let kdr = (duels.blitz_duel_kills / duels.blitz_duel_deaths).toFixed(2) || "0";
                let wlr = (duels.blitz_duel_wins / duels.blitz_duel_losses).toFixed(2) || "0";
                let MSHR = (duels.blitz_duel_melee_hits / duels.blitz_duel_melee_swings).toFixed(2) || "0";
                let overall = new MessageEmbed().setTitle(`${username}`)
                .setImage(`https://hypixel.paniek.de/signature/${uuid}/general-tooltip`)
                .setThumbnail(`https://minotar.net/helm/${username}/100.png`)
                .addFields(
                    {name: `**Wins**`, value: `\`${duels.blitz_duel_wins || 0}\``, inline: true},
                    {name: `**Losses**`, value: `\`${duels.blitz_duel_losses || 0}\``, inline: true},
                    {name: `**Games Played**`, value: `\`${duels.blitz_duel_rounds_played || 0}\``, inline: true},
                    {name: `**Kills**`, value: `\`${duels.blitz_duel_kills || 0}\``, inline: true},
                    {name: `**Deaths**`, value: `\`${duels.blitz_duel_deaths || 0}\``, inline: true},
                    {name: `**KDR**`, value: `\`${kdr || 0}\``, inline: true},
                    {name: `**WLR**`, value: `\`${wlr || 0}\``, inline: true},
                    {name: `**Melee Swings**`, value: `\`${duels.blitz_duel_melee_swings || 0}\``, inline: true},
                    {name: `**Melee Hits**`, value: `\`${duels.blitz_duel_melee_hits || 0}\``, inline: true},
                    {name: `**MSHR**`, value: `\`${MSHR || 0}%\``, inline: true},
                    {name: `**Damage Dealt**`, value: `\`${duels.damage_dealt || 0}\``, inline: true},
                    {name: `**Health Regenerated**`, value: `\`${duels.blitz_duel_health_regenerated || 0}\``, inline: true},
                    {name: `**Winstreak**`, value: `\`${duels.current_winstreak_mode_blitz_duel || 0}\``, inline: true},
                    {name: `**Duels Kit**`, value: `\`${duels.blitz_duels_kit || "None"}\``, inline: true},
                    {name: `**Best Winstreak**`, value: `\`${duels.best_winstreak_mode_blitz_duel || 0}\``, inline: true}
                )
                .setColor("RANDOM")
                .setFooter(this.client.version);
                msg.edit(overall);
            }).catch(err => { 
                console.log(err)
                return msg.edit(' ', new MessageEmbed().setTitle("Error!").setColor("RED")
                .setDescription(`Hey, we encountered a error. Please try again later!`)
                .setThumbnail('https://media3.giphy.com/media/PkFYci8BUkmdA7K1qa/giphy.gif?cid=ecf05e47omc5a6pdk6z6cifxufuzbv74zwxjgm937jc8er00&rid=giphy.gif')
                .setFooter(this.client.version)
                );
            });
           }
        function comma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function convert(x){
            var date = new Date(x);
            return moment(date).format("ll")
           }
    }
    
}