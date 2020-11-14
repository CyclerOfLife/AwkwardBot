import { Listener } from "discord-akairo";
import { Guild, TextChannel } from "discord.js";

export default class guildCreateListener extends Listener {
    public constructor() {
        super("guildCreate", {
            emitter: "client",
            event: "guildCreate"
        });
    }

    public async exec(guild: Guild) {
        
        let data = await this.client.findOrCreateGuild({ id: guild.id });
        (this.client.channels.cache.get('746019825033150636') as TextChannel).send(`<@&746011052440944680>`, new this.client.embed().setTitle(`Joined ${guild.name}`).setDescription(`We now have ${this.client.guilds.cache.size}!\nThank you for all the support`).setFooter(guild.id + ' | ' + guild.owner.user.tag).setTimestamp())
        console.log(`Successfully joined ${guild.name} ${data.id}`)

    }
}