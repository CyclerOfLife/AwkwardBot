/** @format */

import {Listener} from 'discord-akairo';
import {Message, MessageAttachment} from 'discord.js';
import {Canvas} from 'canvas-constructor';
import fetch from 'node-fetch';
const {createCanvas, loadImage} = require('canvas');
export default class Messagee extends Listener {
	public constructor() {
		super('message', {
			emitter: 'client',
			event: 'message',
			category: 'Client',
		});
	}

	public async exec(message: Message) {
		if (message.channel.type === 'dm')
			return console.log(`${message.author.tag}: ${message.content}`);
		if (
			!message.channel.guild.me.permissions.has('SEND_MESSAGES') ||
			!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') ||
			!message.guild.me.permissions.has('SEND_MESSAGES')
		)
			return;
		if (message.guild.id === '718738603370479617') return;
		let member = await this.client.findOrCreateMember({
			id: message.author.id,
			guildId: message.guild!.id,
		});
		let useGuld = await this.client.findOrCreateGuild({id: message.guild!.id});
		if (message.content.startsWith(useGuld.prefix)) return;
		let member1 = await this.client.findOrCreateUser({id: message.author.id});
		if (member1.blacklisted === true) return;
		member.characters += message.content.length;

		const amount = randomXP();
		const updatelevel = member.level * 250;

		member.xp += amount;

		if (member.xp + amount > updatelevel) {
			member.xp = 0;
			member.level += 1;
			if (member.level_updates === true && member.xp + amount > updatelevel) {
				if (
					!message.channel.guild.me.permissions.has('SEND_MESSAGES') ||
					!message.channel
						.permissionsFor(message.guild.me)
						.has('SEND_MESSAGES') ||
					!message.guild.me.permissions.has('SEND_MESSAGES')
				)
					return;
				message.channel.send(
					`You have leveled up to ${member.level}. Good job!`
				);
			}
		}
		member.save();
	}
}

function randomXP() {
	return (
		Math.floor(Math.random() * (Math.floor(12) - Math.ceil(7))) + Math.ceil(7)
	);
}
function toBuffer(ab) {
	var buf = Buffer.alloc(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		buf[i] = view[i];
	}
	return buf;
}

function size(amount: number) {
	if (amount > 1000000) {
		return (amount / 1000000).toFixed(2) + 'M';
	} else if (amount > 1000) {
		return (amount / 1000).toFixed(2) + 'K';
	} else {
		return amount;
	}
}
