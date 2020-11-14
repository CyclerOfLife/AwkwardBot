import { Command } from 'discord-akairo';
import { Message, Util } from 'discord.js';
import { GuildMember } from 'discord.js';
import Blacklist from "../../client/database/User"
export default class BlacklistCommand extends Command {
    public constructor() {
        super('blacklist', {
            aliases: ['blacklist'],
            ownerOnly: true,
            category: "Owner",
            args: [
                {
                    id: 'user',
                    type: 'member',
                    prompt: {
                        start: 'send a valid member'
                    }
                }
            ]
        })
    }
     public async exec(message: Message, { user }: { user: GuildMember }) {
        const data = await this.client.findOrCreateUser({ id: user.id })
        if(data.blacklisted === false) { 
            data.blacklisted = true;
            data.save();
        }
        else {
            data.blacklisted = false;
            data.save();
        }
        message.reply(`${data.blacklisted === true ? 'blacklisted' : 'Unblacklisted'} - ${user.user.tag}`)
    }
}