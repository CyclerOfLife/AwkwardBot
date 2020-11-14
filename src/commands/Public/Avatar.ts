import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av"],
            category: "Public Commands",
            description: {
                content: "Display profile pics :O",
                usage: "avatar <optional member>",
                examples: [
                    "avatar",
                    "avatar @Taylor#0001",
                    "avatar Taylor"
                ],
            },
            ratelimit: 10,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) =>  msg.member,
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | Number => {
                        if(str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-size="],
                    default: 2048
                }
            ],
            cooldown: 3000
        });
    }
    public exec(message: Message, { member, size }: {member: GuildMember, size: number}): Promise<Message> {
        return message.util.send(new MessageEmbed()
        .setTitle(`Avatar | ${member.user.tag}`)
        .setColor("RANDOM")
        .setImage(member.user.displayAvatarURL({size: size as ImageSize}))
        .setFooter(`Made by Taylor#1837`)
        )
    };
}