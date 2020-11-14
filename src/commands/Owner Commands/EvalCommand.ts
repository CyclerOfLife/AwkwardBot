import { Command } from 'discord-akairo';
import { Message, Util, MessageEmbed } from 'discord.js';
import * as util from 'util';
import { stripIndents } from 'common-tags';

const NL = '!!NL!!';
const NL_PATTERN = new RegExp(NL, 'g');

import { VultrexHaste } from 'vultrex.haste';
const haste = new VultrexHaste({ url: "https://hasteb.in"});
export default class EvalCommand extends Command {
	public hrStart: [number, number] | undefined;

	public lastResult: any = null;

	private readonly _sensitivePattern: any;

	public constructor () {
		super('eval', {
			aliases:
				[
					'eval',
					'evaluate',
				],
			description:
				{
					content: 'Evaluates JavaScript.',
					usage: '<code>',
				},
			category: 'Owner',
			ownerOnly: true,
			ratelimit: 2,
			args:
				[
					{
						id: 'code',
						match: 'rest',
						type: 'sring',
						prompt:
							{
								start:
									(message: Message): string => `${message.author}, what would you like to evaluate?`,
							},
					},
				],
		});
	}

	public async exec (
		message: Message,
		{ code }: { code: string; },
	): Promise<Message | Message[] | Promise<Message | Message[]>[]> {
		try {
			const start = process.hrtime();
			let output = eval(code);
			const difference = process.hrtime(start);
			if(typeof output !== "string") output = util
			.inspect(output, { depth: 2 })
			.replace(NL_PATTERN, '\n')
			.replace(this.sensitivePattern, '--snip--');
			const embed = new MessageEmbed()
			.addField('Input', `\`\`\`js\n${code}\`\`\``)
			.addField(`Output`, `\`\`\`js\n${output.length > 1950 ? await haste.post(output) : output}\`\`\``)
			.addField(`Time Taken:`, stripIndents` *Executed in **${difference[0] > 0 ? `${difference[0]}s` : ''}${difference[1] / 1e6}ms.***`)
			return message.channel.send(embed)
		} catch (err) {
			console.log(err)
			const error = new MessageEmbed()
			.setDescription(`\`\`\`js\n${err}\`\`\``)
			message.channel.send(error)
		}
	}
	private get sensitivePattern(): any {
        if (!this._sensitivePattern) {
            const token = this.client.token!.split('').join('[^]{0,2}');
            const revToken = this.client.token!.split('').reverse().join('[^]{0,2}');
            Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(`${token}|${revToken}`, 'g') });
        }

        return this._sensitivePattern;
    }
}
