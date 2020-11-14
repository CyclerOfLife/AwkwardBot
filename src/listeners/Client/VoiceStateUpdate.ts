import { Listener } from 'discord-akairo';

import { GuildMember, VoiceState } from "discord.js";
import { Player } from "erela.js";
import ms from "ms";
export default class ReadyListener extends Listener {
    public constructor() {
        super('listeners-voiceStateUpdate', {
            emitter: 'client',
            event: 'voiceStateUpdate',
        });
    }

    public exec(oldState: VoiceState, newState: VoiceState): void {
        const oldChannel: string = oldState.channel ? oldState.channel.id : null;
        if (!oldChannel) return;
        if (newState !== undefined) {
            if (!newState.member.user.bot) return;
        }
        if (oldState.guild.members.cache.get(oldState.id).user.bot) return;
        else {
            const selfUser: GuildMember = oldState.guild.member(this.client.user.id);
            if (!selfUser.voice.channel) return;
            const player: Player = this.client.manager.players.get(selfUser.guild.id);
            if (!player) return;
            setTimeout(() => {
                const membersInVoice: number = selfUser.voice.channel.members.filter((member: GuildMember) => !member.user.bot).size;
                if (membersInVoice === 0) return player.destroy();
                return;
            }, ms("30s"));
        }
    }
}
