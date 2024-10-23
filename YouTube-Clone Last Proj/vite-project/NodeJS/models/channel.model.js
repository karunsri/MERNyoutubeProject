// channel.model.js
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;


