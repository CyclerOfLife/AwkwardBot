import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "erela.js";

export default class EQCommand extends Command {
    public constructor() {
        super("eq", {
            aliases: ["eq"],
            category: "Music",
            description: {
                content: "Oui... lets party this music up!",
                usage: "eq [ -party | -bass | -radio | -pop | -tb | -soft ]",
                examples: ["eq -party", "eq -bass", "eq -radio", "eq -pop", "eq -tb", "eq -soft"]
            },
            ratelimit: 10,
            args: [
                {
                    id: "party",
                    match: "flag",
                    flag: ["-party", "-p"]
                },
                {
                    id: "bass",
                    match: "flag",
                    flag: ["-bass", "-b"]
                },
                {
                    id: "radio",
                    match: "flag",
                    flag: ["-radio", "r"]
                },
                {
                    id: "pop",
                    match: "flag",
                    flag: ["-pop", "-po"]
                },
                {
                    id: "tb",
                    match: "flag",
                    flag: ["-tb", "-treblebass"]
                },
                {
                    id: "soft",
                    match: "flag",
                    flag: ["-soft", "-s"]
                },
                {
                    id: "off",
                    match: "flag",
                    flag: ["-off", "off", "-o"]
                }
            ],
        });
    }

    public async exec(message: Message, { party, bass, radio, pop, tb, soft, off}: { party: string, bass: string, radio: string, pop: string, tb: string, soft: string, off: string}): Promise<Message> {
        const player: Player = this.client.manager.players.get(message.guild.id);
        if(!player) return message.util.send(new MessageEmbed()
        .setTitle(`No queue found!`)
        .setDescription(`I did not find any music playing in this guild!`)
        .setColor("RANDOM"))
        if(party) {
            await player.setEQ(
                { band: 0, gain: -1.16 },
                { band: 1, gain: 0.28 },
                { band: 2, gain: 0.42 },
                { band: 3, gain: 0.5 },
                { band: 4, gain: 0.36 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.3 },
                { band: 7, gain: -0.21 },
                { band: 8, gain: -0.21 }    
            );
           return message.util.send(new MessageEmbed()
           .setTitle(`Party time~~!`)
           .setDescription(`Successfully set EQ Band to Parttay!`)
           .setColor("RANDOM"))
        }

        if(bass) {
            await player.setEQ(
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.7 },
                { band: 2, gain: 0.8 },
                { band: 3, gain: 0.55 },
                { band: 4, gain: 0.25 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.25 },
                { band: 7, gain: -0.45 },
                { band: 8, gain: -0.55 },
                { band: 9, gain: -0.7 },    
                { band: 10, gain: -0.3 },    
                { band: 11, gain: -0.25 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
           );

           
           return message.util.send(new MessageEmbed()
           .setTitle(`Bass time!`)
           .setDescription(`Successfully set EQ Band to Bass!\n :flushed: MY EARRRS :flushed:`)
           .setColor("RANDOM"))
        }

        if(radio) {
            await player.setEQ(
                { band: 0, gain: 0.65 },
                { band: 1, gain: 0.45 },
                { band: 2, gain: -0.45 },
                { band: 3, gain: -0.65 },
                { band: 4, gain: -0.35 },
                { band: 5, gain: 0.45 },
                { band: 6, gain: 0.55 },
                { band: 7, gain: 0.6 },
                { band: 8, gain: 0.6 },
                { band: 9, gain: 0.6 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
            );
           return message.util.send(new MessageEmbed()
           .setTitle(`Radio time!`)
           .setDescription(`Successfully set EQ Band to the Old Times Radio!`)
           .setColor("RANDOM"))
        }
        if(pop) {
            await player.setEQ(
                { band: 0, gain: -0.25 },
                { band: 1, gain: 0.48 },
                { band: 2, gain: 0.59 },
                { band: 3, gain: 0.72 },
                { band: 4, gain: 0.56 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.24 },
                { band: 7, gain: -0.24 },
                { band: 8, gain: -0.16 },
                { band: 9, gain: -0.16 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
            );
            return message.util.send(new MessageEmbed()
           .setTitle(`Pop time!`)
           .setDescription(`Successfully set EQ Band to POP!\n we be vibing~`)
           .setColor("RANDOM"))
        }
        if(tb) {
            await player.setEQ(
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },    
                { band: 10, gain: 0.55 },    
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },  
                { band: 13, gain: 0 }    
            );
            return message.util.send(new MessageEmbed()
           .setTitle(`Treble~~~ and :flushed: BASSS :flushed: time!`)
           .setDescription(`Successfully set EQ Band to Treble Bass!\n :flushed: MY Ears feel-`)
           .setColor("RANDOM"))
            
        }
        if(soft) {
            player.setEQ(
                { band: 0, gain: 0 },
                { band: 1, gain: 0 },
                { band: 2, gain: 0 },
                { band: 3, gain: 0 },
                { band: 4, gain: 0 },
                { band: 5, gain: 0 },
                { band: 6, gain: 0 },
                { band: 7, gain: 0 },
                { band: 8, gain: -0.25 },
                { band: 9, gain: -0.25 },
                { band: 10, gain: -0.25 },
                { band: 11, gain: -0.25 },
                { band: 12, gain: -0.25 },
                { band: 13, gain: -0.25 }
            );
            return message.util.send(new MessageEmbed()
           .setTitle(`Soft... :pensive:`)
           .setDescription(`Successfully set EQ Band to Soft!\n swing the soft romantic musi-`)
           .setColor("RANDOM"))
        }
        if(off) {
            await player.clearEQ();
            return message.util.send(new MessageEmbed()
            .setTitle(`ears- relief`)
            .setDescription(`Turned off the hurting sad eq that damages ears.`)
            .setColor("RANDOM"))
        }
        
        message.util.send(new MessageEmbed()
           .setTitle(`Invalid Usage!`)
           .setDescription(`The correct usage is.. \`eq [ -party | -bass | -radio | -pop | -tb | -soft | off ]\`
           Examples:
           \`eq -party\`, \`eq -bass\`, \`eq -radio\`, \`eq -pop\`, \`eq -tb\`, \`eq -soft\`
           `)
           .setColor("RANDOM"))
    }
}