import { Command, Flag } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed} from "discord.js"
import { stripIndents } from "common-tags"
const { Utils } = require("erela.js")

export default class LoopCommand extends Command {
  public constructor() {
    super("loop", {
      aliases: ["loop", "repeat"],
      category: "Music",
      channel: "guild",
      description: {
        content: "Loop yo music",
        usage: "loop [ -t | -q ]",
        examples: ["loop -t", "loop -q"]
      },
      args: [
        {
            id: "track",
            match: "flag",
            flag: ["-t", "track"]
        },

        {
            id: "queue",
            match: "flag",
            flag: ["-q", "queue"]
        }
    ]
      
    });
  }
  public async exec(message: Message, {track, queue }: {track: string, queue: string}) {
    const player = this.client.manager.players.get(message.guild.id);
    if(!player) return message.util.send(new MessageEmbed()
    .setTitle(`No players!!`)
    .setDescription(`There is no song/s currently playing in this guild!`)
    .setColor("RANDOM"));

    if(track) {
      if(player.trackRepeat === false) {
        player.setTrackRepeat(true);
        const embed = new MessageEmbed()
        .setAuthor("Repeat on")
        
        return message.channel.send(embed)
    } else {
        player.setTrackRepeat(false);
        const embed = new MessageEmbed()
        .setAuthor("Stopped Repeating")
        return message.channel.send(embed)
    }
}
      if(queue) {
        if(player.queueRepeat === false) {
          player.setQueueRepeat(true);
          const embed = new MessageEmbed()
          .setAuthor("Repeating The Queue")
          return message.channel.send(embed)
      } else {
          player.setQueueRepeat(false);
          const embed = new MessageEmbed()
          .setAuthor("Stopped Repeating The Queue")
          return message.channel.send(embed)
      }
      }
      else {
        if(player.trackRepeat === true) {
          await player.setTrackRepeat(!player.trackRepeat)
          return message.util.send(new MessageEmbed()
        .setTitle(`Stopped the looped track!`)
        .setDescription(`Have a great day vibing`)
        .setColor("RANDOM"))
        } else if(player.queueRepeat === true) {

          await player.setQueueRepeat(!player.queueRepeat)
          
          return message.util.send(new MessageEmbed()
        .setTitle(`Stopped the looped queue!`)
        .setDescription(`Have a great day vibing`)
        .setColor("RANDOM"))
        } else if(!player.queueRepeat && !player.trackRepeat) {
          return message.util.send(new MessageEmbed()
          .setTitle("Incorrect usage!")
          .setDescription(`
          Valid usage:
          \`loop -t\` or \`loop\`(when the track is on repeat)
          \`loop -q\` or \`loop\`(when the queue is on repeat)`)
          .setColor("RANDOM"))
        }
      }
  }
}