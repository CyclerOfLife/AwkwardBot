import { Command } from "discord-akairo";

import { Message, MessageEmbed, MessageReaction, ReactionCollector } from "discord.js";
import { Player, Track, UnresolvedTrack } from "erela.js";
import ms from "ms";
export default class QueueCommand extends Command {
    constructor() {
        super("queue", {
            aliases: ["queue", 'q'],
            category: "Music",
            description: {
                content: "Queue Command",
                usage: "queue",
                examples: ["queue"]
            },

        });
    }


    async exec(message: Message) {
        const player: Player = this.client.manager.players.get(message.guild.id);
        if (!player.queue.length) {
            if (player.queue.current) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("#fff000")
                        .setTitle("Now Playing")
                        .setThumbnail(player.queue.current.thumbnail)
                        .addField("Song", player.queue.current.title)
                        .addField("Requester", player.queue.current.requester)
                        .addField("Progress", `${this.client.utils.createBar(player.position, player.queue.current.duration, 10)}`)
                );
            }
            return message.channel.send(
                new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("❌ There aren't any playing songs")
            );
        }
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("❌ Please connect to the same voice channel to the bot to use the command")
            );
        }

        const totalDuration: number = player.queue.map((map: Track | UnresolvedTrack):number => map.duration).reduce((acc: any, cur: any) => acc + cur, 0);
        const embed: MessageEmbed = new MessageEmbed()
            .setColor("#fff000")
            .setTitle("Queue")
            .setDescription(`**__UP NEXT__**:`);
        if (player.queue.length > 10) {
            let songs: (Track | UnresolvedTrack)[];
            let index: number = 0;
            const createMSG = (start: number): MessageEmbed => {
                if (start < 0 || start >= player.queue.length) {
                    start = 0;
                    index = 0;
                }
                const embed1: MessageEmbed = new MessageEmbed()
                    .setColor("#fff000")
                    .setTitle("Queue")
                    .setDescription(`Page: ${(start / 10) + 1} / ${Math.ceil(player.queue.length / 10)}`)
                    .setFooter(`➡ - Next Page | ⬅ - Previous Page | ❌ - Close Queue
                    \nTotal duration of the queue ${this.client.utils.formatTime(totalDuration, true)} | ${player.queue.totalSize} ${player.queue.totalSize > 1 ? "songs" : "song"} in queue`);
                songs = player.queue.slice(start, start + 10);
                for (let i: number = 0; i < songs.length; ++i) {
                    embed1.addField(`\`${player.queue.indexOf(songs[i]) + 1}\` \`${songs[i].title}\``, `Requested by ${songs[i].requester}`);
                }
                return embed1;
            }
            
            message.channel.send(createMSG(0)).then((msg: Message) => {
                msg.react("➡");
                msg.react("❌");
                const collector: ReactionCollector = msg.createReactionCollector(
                    (reaction: any, user: any): boolean =>
                        (["➡", "⬅", "❌"].includes(reaction.emoji.name)) && (user.id === message.author.id)
                    , {
                        time: ms("120s")
                    });
                collector.on("collect", (m: MessageReaction) => {
                    msg.reactions.removeAll().then(async () => {
                        if (m.emoji.name === "❌") {
                            collector.stop("Cancelled");
                            return msg.delete();
                        }
                        m.emoji.name === "⬅" ? index -= 10 : index += 10;
                        msg.edit(createMSG(index));
                        if (index !== 0) await msg.react("⬅");
                        await msg.react("➡");
                        if (index + 10 < songs.length) await msg.react("➡");
                        await msg.react("❌");
                    });
                });
                
            });
        } else {
            for (let i: number = 0; i < player.queue.length; i++) {
                embed.addField(`\`${i + 1}\` \`${player.queue[i].title}\``, `Requested by ${player.queue[i].requester}`);
            }
            embed.setFooter(`Total duration of the queue ${this.client.utils.formatTime(totalDuration, true)} | ${player.queue.totalSize} ${player.queue.totalSize > 1 ? "songs" : "song"} in queue`);
            return message.channel.send(embed);
        }
    }
}