import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from "discord.js";
// Message and MessageEmbed are classes from Discord.js
import moment from "moment"
const emojies = {
  "HOUSE_BALANCE": "<:balance:715633726515707945>",
  "EARLY_SUPPORTER": "<:early_supporter:712566987993251841>",
  "VERIFIED_DEVELOPER": "<:verified_bot:712566988198641681>",
  "DISCORD_EMPLOYEE": "<:discordstaff:715633728440762563>",
  "DISCORD_PARTNER": "<:discordpartner:715633728239435847>",
  "HYPESQUAD_EVENTS": "<:hypeshiny:715633726578753607>",
  "BUGHUNTER_LEVEL_2": "<:BugHunter:715633726272438323>",
  "BUGHUNTER_LEVEL_1": "<:discordstaff2:715633727983845447>",
  "HOUSE_BRAVERY": "<:bravery:715633725735698525>",
  "HOUSE_BRILLIANCE": "<:brilliance:715633726356193341>",
  "VERIFIED_BOT": "<:verified:715633726754783253>"
}
const statuses = {
  "desktop": "🖥️ Desktop",
  "mobile": "📱 Mobile",
  "web": "Web",
  "none": "None!"
}
let statues = {
  online: `<:online:707823901069279252> Online`,
  idle: `<a:idle:707823901157228545> Idle`,
  dnd: `<:dnd:707823903317295195> DND`,
  offline: `<:offline:707823899127185418> Offline`
};
export default class UserinfoCommand extends Command {
  public constructor() {
    super("userinfo", {
      aliases: ["userinfo", "ui", "user"],
      category: "Public Commands",
      channel: "guild",
      description: {
        content: "Find out information of a user!", // creepy.... ;-;
        usage: "userinfo <optional user>",
        examples: ['userinfo Taylor'],
      },
      args: [
        {
          id: "member",
          type: "member",
          default: msg => msg.member
        }
      ]
    });
  }

  public async exec(message: Message, { member }: { member: GuildMember }) {
    if (!message.guild.member(member.id).presence.clientStatus) {
      return message.util!.send(new this.client.embed()
        .addField("Username:", member.user.username, true)
        .addField("Discriminator:", member.user.discriminator, true)
        .addField("Nickname:", member.nickname ?? "None", true)
        .addField("Bot:", `${member.user.bot ? "Yes" : "🧍 Nah they a person (Or a self bot o-o)"}`, true)
        .addField("Online status:", `${statues[member.user.presence.status] || "None, offline?"}`, true)
        .addField("Account was Created At:", moment(member.user.createdAt).format("LL"), true)
        .addField("They Joined At:", moment(member.joinedAt).format("LL"), true)
        .addField("Are dey Boosting:", member.premiumSince ? `Dey been boosting Since ${moment(member.premiumSince).format("LL")}` : "Not boosting", true)
        .addField(`Special Badges [${member.user.flags.toArray().length}]:`, member.user.flags.toArray().length ? member.user.flags.toArray().map(x => emojies[x]).join(" ") : "No Specialll~ Badges", true)
        .addField(`Roles [${member.roles.cache.size - 1}]:`, `${member.roles.cache.map(role => role).filter(role => role.name !== "@everyone").sort((a, b) => b.position - a.position).slice(0, 15).join(", ")} ${member.roles.cache.size > 15 ? "..." : "ez"}`, false)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setFooter(`User ID: ${member.id}`)
      )
    } else if (message.guild.member(member.id).presence.clientStatus) {
      return message.util!.send(new this.client.embed()
        .addField("Username:", member.user.username, true)
        .addField("Discriminator:", member.user.discriminator, true)
        .addField("Nickname:", member.nickname ?? "None", true)
        .addField("Bot:", `${member.user.bot ? "Yes" : "🧍 Nah they a person. (Or a self bot o-o)"}`, true)
        .addField("Online status:", `${statues[member.user.presence.status] || "None, offline?"}`, true)
        .addField("Device- :eyes::", member.user.presence.clientStatus ? Object.keys(member.user.presence.clientStatus).map(x => statuses[x]) : "N/A", true)
        .addField("Account was Created At:", moment(member.user.createdAt).format("LL"), true)
        .addField("They Joined At:", moment(member.joinedAt).format("LL"), true)
        .addField("Are dey Boosting:", member.premiumSince ? `Dey been boosting Since ${moment(member.premiumSince).format("LL")}` : "Not boosting", true)
        .addField(`Special Badges [${member.user.flags.toArray().length}]:`, member.user.flags.toArray().length ? member.user.flags.toArray().map(x => emojies[x]).join(" ") : "No Specialll~ Badges", true)
        .addField(`Roles [${member.roles.cache.size - 1}]:`, `${member.roles.cache.map(role => role).filter(role => role.name !== "@everyone").sort((a, b) => b.position - a.position).slice(0, 15).join(", ")} ${member.roles.cache.size > 15 ? "..." : "ez"}`, false)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setFooter(`User ID: ${member.id}`))
    }
  }
}