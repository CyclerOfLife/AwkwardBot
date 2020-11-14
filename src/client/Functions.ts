import guildsData from './database/Guild';
import membersData from './database/Member';
import usersData from './database/User';
export function check_emojis(emoji){
    if(emoji === '1️⃣') return 1
    else if(emoji === '2️⃣') return 2
    else if(emoji === '3️⃣') return 3
    else if(emoji === '4️⃣') return 4
    else if(emoji === '5️⃣') return 5
    else if(emoji === '🔼') return 6
    else if(emoji === '🗑️') return 7
}

export async function findOrCreateUser ({ id: userID }, isLean?) {
	return new Promise(async function (resolve, reject) {
		let userData =
			isLean ? await usersData.findOne({ id: userID }).lean() :
			await usersData.findOne({ id: userID });
		if (userData) {
			resolve(userData);
		}
		else {
			userData = new usersData({ id: userID });
			await userData.save();
			resolve(

					isLean ? userData.toJSON() :
					userData,
			);
		}
	});
}

export async function findOrCreateGuild ({ id: guildID }, isLean?) {
	return new Promise(async function (resolve, reject) {
		let guildData =
			isLean ? await guildsData.findOne({ id: guildID }).populate('members').lean() :
			await guildsData.findOne({ id: guildID }).populate('members');
		if (guildData) {
			resolve(guildData);
		}
		else {
			guildData = new guildsData({ id: guildID });
			await guildData.save();
			resolve(guildData.toJSON());
		}
	});
}

export async function findOrCreateMember ({ id: memberID, guildId: id }, isLean?) {
	return new Promise(async function (resolve, reject) {
		let memberData =
			isLean ? await membersData.findOne({ id: memberID, guildId: id }).lean() :
			await membersData.findOne({ id: memberID, guildId: id });
		if (memberData) {
			resolve(memberData);
		}
		else {
			memberData = new membersData({ id: memberID, guildId: id });
			await memberData.save();
			resolve(

					isLean ? memberData.toJSON() :
					memberData,
			);
		}
	});
}

export async function getUsersData (client, users) {
	return new Promise(async function (resolve, reject) {
		let usersData: any[] = [];
		for (let u of users) {
			let result = await client.findOrCreateUser({ id: u.id });
			if (result[0]) {
				usersData.push(result[0]);
			}
			else {
				let user = new client.usersData({
					id: u.id,
				});
				await user.save();
				usersData.push(user);
			}
		}
		resolve(usersData);
	});
}
export function checkDays(date){
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
}

/*
    *   Calculate Network Level
    *   @param Number
    *   @returns Number
*/

export function networkLevel (networkExp) {
	const REVERSE_PQ_PREFIX = -3.5;
	const REVERSE_CONST = 12.25;
	const GROWTH_DIVIDES_2 = 0.0008;
	return
		networkExp < 0 ? 1 :
		Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp));
}

/*
    *   Regex for commas with numbers
    *   @param Number
    *   @returns string.
*/
export function numberWithCommas (number: number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*
    *   Calculate SkyWars Level
    *   @param xp string - Hypixel API - <stats>.<SkyWars>.skywars_experience
    *   @returns XP Number
*/
export function swlvl (xp) {
	let xps = [
		0,
		20,
		70,
		150,
		250,
		500,
		1000,
		2000,
		3500,
		6000,
		10000,
		15000,
	];
	if (xp >= 15000) {
		return (xp - 15000) / 10000 + 12;
	}
	else {
		for (let i = 0; i < xps.length; i++) {
			if (xp < xps[i]) {
				return (1 + i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1])).toFixed(0);
			}
		}
	}
}

/*
    *   Get Ranks
    *   @param Player Object
    *   @returns String.
*/

const ranks = {
	VIP: 'VIP',
	VIP_PLUS: 'VIP+',
	MVP: 'MVP',
	MVP_PLUS: 'MVP+',
	SUPERSTAR: 'MVP++',
	MVP_PLUS_PLUS: 'MVP++',
	YOUTUBER: 'Youtuber',
	HELPER: 'Helper',
	JR_HELPER: 'Jr Helper',
	MODERATOR: 'Mod',
	ADMIN: 'Administrator',
};

/**
 * Calculate the rank tag for the player object from the Hypixel API
 * @param player Player object from Hypixel API
 * @returns {*} Tag as an object like in {@link ranks}
 */
export function calcTag (player) {
	if (player && typeof player === 'object') {
		let rank = player.rank || player.packageRank || player.newPackageRank;
		let currentRank;
		if (rank in ranks) currentRank = ranks[rank];
		else currentRank = 'Unranked';
		return currentRank;
	}
}
