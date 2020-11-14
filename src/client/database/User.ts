import mongoose from 'mongoose';

let User = new mongoose.Schema({
	id: { type: String },
	backgound: { type: Buffer, default: `` },
	colour: { type: String, default: '#ffffff' },
	premium: { type: Boolean, default: false },
	blacklisted: { type: Boolean, default: false },
	welcome: { type: Boolean, default: false },
	modlog: { type: String, default: '' },
});

export default mongoose.model('User', User);
