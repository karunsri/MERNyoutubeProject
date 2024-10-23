import Channel from '../models/channel.model.js';
import Video from '../models/video.model.js';

// Get a specific channel by ID and its videos
export const getChannel = async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new channel (Only for logged-in users)
export const createChannel = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id; // Assuming req.user contains logged-in user

  try {
    // Check if user already has a channel
    const existingChannel = await Channel.findOne({ owner: userId });
    if (existingChannel) return res.status(400).json({ message: 'You already have a channel' });

    const newChannel = new Channel({ name, description, owner: userId });
    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a video (Only the channel owner can delete their videos)
export const deleteCVideo = async (req, res) => {
  const userId = req.user._id;
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Check if the video belongs to the logged-in user's channel
    const channel = await Channel.findOne({ _id: video.channel, owner: userId });
    if (!channel) return res.status(403).json({ message: 'You are not authorized to delete this video' });

    await Video.findByIdAndDelete(req.params.videoId);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a video
export const editVideo = async (req, res) => {
  const userId = req.user._id;
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Check if the video belongs to the logged-in user's channel
    const channel = await Channel.findOne({ _id: video.channel, owner: userId });
    if (!channel) return res.status(403).json({ message: 'You are not authorized to edit this video' });

    const { title, description } = req.body;
    video.title = title || video.title;
    video.description = description || video.description;
    await video.save();

    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
