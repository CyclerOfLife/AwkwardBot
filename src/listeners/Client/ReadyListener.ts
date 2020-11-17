import { Listener } from 'discord-akairo';
const dblkey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OTY4NDc5MDM4Mjg4NzA3MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4ODI5MzA4fQ.VAuVTiOdnnJz0gkZz0ox2IfqjSvKdkSoQGNLt6Ddhpw';
import DBL from 'dblapi.js';
import mongoose from 'mongoose';
import { db } from '../../Config';
import { Channel, Guild, MessageEmbed } from "discord.js";
import { Manager, Payload, Player } from "erela.js";
import { nodes } from "../../Config"
import Spotify from "erela.js-spotify";


import { Collection } from "discord.js";
import { TextChannel } from 'discord.js';
import { Track } from 'lavalink';
export default class ReadyListener extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client',
		});
	}
	public exec() {
		//@ts-ignore
		this.client.on("raw", d => this.client.manager.updateVoiceState(d));
		mongoose
			.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
			.then(() => {
				console.log(`Connected to the Mongodb database!`);
			})
			.catch((err) => {
				console.error('Unable to connect to the Mongodb database. Error:' + err);
			});
		const dbl = new DBL(dblkey, this.client);
		dbl.postStats(this.client.guilds.cache.size);
		setInterval(() => {
			dbl.postStats(this.client.guilds.cache.size);
		}, 500000);
		console.log('online');

		this.client.ssu = new Collection();
		this.client.priority = new Collection();
		this.client.rp = new Collection();
		this.client.snipes = new Map();
		this.client.version = `『 ${this.client.user.username} v0.0.3 』`;
		setTimeout(() => {
			this.client.user.setPresence({
				activity:
				{
					type: 'WATCHING',
					name:
						`awk!help | https://awkwardbot.codes`,
				},
			});
		}, 10000);




		this.client.manager = new Manager({
			nodes,
			autoPlay: true,
			plugins: [new Spotify({
				clientID: '0c3580066c8e469dbcfa93524740d022',
				clientSecret: '58696d62452a42baa4f044ab3e537540'
			})],
			clientId: this.client.user.id,
			send: (id, payload) => {
				const guild = this.client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			}
		})

		this.client.manager
			.on("nodeConnect", () => console.log("New Node Created"))
			.on("nodeCreate", () => console.log(
				`Created a node`
			))
			.on("nodeDisconnect", () => {
				console.log(`Node disconnected`)
			})
			.on("nodeError", (err) => console.log(`Node error! ${err}`))

			.on("playerMove", (player: Player, oldChannel: string, newChannel: string) => {
				if (!newChannel) player.destroy();
			})
			.on("trackError", async (player: Player, track) => {
				const channel: Channel = this.client.channels.cache.get(player.textChannel);
				// @ts-ignore
				return channel.send(new MessageEmbed()
					.setColor("#ff0000")
					.setTitle("An error occurred")
					.setDescription("❌ Error when loading song! Please try again"));
			})


			.on("trackStuck", (player: Player) => {
				player.play();
				const channel: Channel = this.client.channels.cache.get(player.textChannel);
				// @ts-ignore
				return channel.send(new MessageEmbed()
					.setColor("#ff0000")
					.setTitle("An error occurred")
					.setDescription("❌ Error when loading song! Track is stuck"));
			})
			.on("trackStart", async (player: Player, track: Track) => {
				let track1 = await this.client.findOrCreateGuild({ id: player.guild })
				if (track1.notifications) {
					const channel: Channel = this.client.channels.cache.get(player.textChannel);
					// @ts-ignore 
					return channel.send(new MessageEmbed()
						.setTitle(`Now playing`)
						.setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) ` + `[${player.queue.current.author}]`)
						.setThumbnail(player.queue.current.displayThumbnail())
						.setColor("RANDOM"))
				}
			}
			)
			.on("queueEnd", async (player) => {
				const channel: Channel = this.client.channels.cache.get(player.textChannel);
				// @ts-ignore
				return channel.send(new this.client.Embed()
					.setTitle(`Queue ended!`)
					.setColor("RANDOM"))
			});
		this.client.manager.init(this.client.user.id);
	}
}
