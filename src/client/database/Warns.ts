import mongoose from 'mongoose';

const Warns = new mongoose.Schema({
	warns: Array,
	user: String,
	guild: String,
});
export default mongoose.model('Warns', Warns);
