// video.model.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }, // Reference to Channel
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
