import { Command } from "discord-akairo";
import { Message, MessageCollector, MessageEmbed, VoiceChannel } from "discord.js";
import { Player, SearchResult, Track } from "erela.js";
import ms from "ms";

export default class PlayCommand extends Command {
    constructor() {
        super("play", {
            aliases: ["play", 'p'],
            category: "Music",
            channel: "guild",
            args: [
                {
                    id: "query",
                    type: async (message: Message, song: String) => {
                        if (!message.member.voice.channel) return "This user is not in a voice channel!"
                        let player = await this.client.manager.players.get(message.guild.id)
                        if (player) {
                            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return "This user is in the incorrect voice channel";
                        }
                        if (message.attachments.size) return message.attachments.first()!.proxyURL
                        if (song) return song
                    },
                    match: "rest",
                    prompt: {
                        start: "What would you like to play?"
                    }
                }
            ],
            description: {
                content: "Play some frickin music.",
                usage: "play [ url/search query ]",
                examples: ["play ncs"]
            },
        });
    }

    public async exec(message: Message, { query }: { query: any }) {
        let colour = await this.client.findOrCreateGuild({ id: message.guild.id }).then(guild => guild.colour)

        if (query == "This user is not in a voice channel!") return message.util!.send(new this.client.Embed(message, colour).setDescription("You need to be in a voice channel."))

        if (query == "This user is in the incorrect voice channel") return message.util!.send(new this.client.Embed(message, colour).setDescription(`You need to be in the same voice channel as me to use Play Command.`));
        let channel = message.member.voice.channel;

        if (!channel.joinable) {
            return message.util!.send(new this.client.Embed(message, colour).setDescription("I don't have permission to enter this voice-channel."))
        } else if (!channel.speakable) {
            return message.util!.send(new this.client.Embed(message, colour).setDescription("I don't have permission to speak this voice-channel."))
        }
        try {
            let player: Player = this.client.manager.players.get(message.guild.id);

            const botVoice: VoiceChannel = message.guild.me.voice.channel;

            if (!player) {
                player = this.client.manager.create({
                    selfDeafen: true,
                    guild: message.guild.id,
                    voiceChannel: channel.id,
                    textChannel: message.channel.id,
                    volume: 100
                });
            } else if (channel.id !== botVoice.id) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("#ff0000")
                        .setDescription("❗ Please connect to the same voice channel to the bot to use the command")
                );
            } else if (botVoice && !player) {
                return player.destroy();
            }

            const res: SearchResult = await this.client.manager.search(query, message.author);
            switch (res.loadType) {
                case "TRACK_LOADED":
                    message.channel.send(
                        new MessageEmbed()
                            .setColor("#ffff00")
                            .setTitle("Added to queue")
                            .setThumbnail(res.tracks[0].thumbnail)
                            .addField("Title", res.tracks[0].title, true)
                            .addField("Requester", res.tracks[0].requester)
                            .addField("Duration", this.client.utils.formatTime(res.tracks[0].duration))
                    );
                    player.queue.add(res.tracks[0]);
                    if (!botVoice) player.connect();
                    if (!player.playing) player.play();
                    break;
                case "SEARCH_RESULT":
                    const tracks: Track[] = res.tracks.slice(0, 5);
                    const embed: MessageEmbed = new MessageEmbed()
                        .setColor("#ffff22")
                        .setTitle(`Search results for \`${query}\``)
                        .setDescription(`Choose a number from 1 - ${tracks.length}`);
                    tracks.forEach((track: Track) => {
                        embed.addField(`\`${tracks.indexOf(track) + 1}\` \`${track.title}\``, track.uri, false);
                    });
                    embed.setFooter("Press cancel to cancel. Timeout 120 seconds");
                    message.channel.send(embed);
                    const collector: MessageCollector = message.channel.createMessageCollector(
                        (m: any): boolean => (m.author.id === message.author.id) &&
                            (((m.content < tracks.length + 1) && (m.content > 0)) || (m.content === "cancel"))
                        , {
                            time: ms("120s"),
                            max: 1
                        });
                        collector.on("collect", (m: any) => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")
                        message.channel.send(
                            new MessageEmbed()
                                .setColor("#ffff00")
                                .setTitle("Added to queue")
                                .setThumbnail(tracks[parseInt(m.content) - 1].thumbnail)
                                .addField("Title", tracks[parseInt(m.content) - 1].title, true)
                                .addField("Requester", tracks[parseInt(m.content) - 1].requester)
                                .addField("Duration", this.client.utils.formatTime(tracks[parseInt(m.content) - 1].duration))
                        );
                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        if (!botVoice) player.connect();
                        if (!player.playing) player.play();
                    });
                    collector.on("end", (_, reason) => {
                        message.react('⏲️')
                        if (["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                    });
                    break;
                case "NO_MATCHES":
                    message.channel.send(
                        new MessageEmbed()
                            .setColor("#ff0000")
                            .setDescription("❌ No results found")
                    );
                    if (!botVoice) player.destroy();
                    break;
                case "PLAYLIST_LOADED":
                    res.tracks.forEach((track: Track) => player.queue.add(track));
                    message.channel.send(
                        new MessageEmbed()
                            .setColor("#ffff00")
                            .setTitle("Added playlist to queue")
                            .setDescription(`${res.tracks.length} ${res.tracks.length > 1 ? "songs" : "song"} in playlist`)
                            .setThumbnail(res.tracks[0].thumbnail)
                            .addField("Playlist", res.playlist.name)
                            .addField("Requester", res.tracks[0].requester)
                            .addField("Duration", this.client.utils.formatTime(res.playlist.duration))
                    );
                    if (!botVoice) player.connect();
                    if (!player.playing) player.play();
                    break;
            }
        } catch (err) {
            console.log(err)
            return message.reply(`Error, sorry please try again later and report the error to Taylor#1837`)
        }
    }
}