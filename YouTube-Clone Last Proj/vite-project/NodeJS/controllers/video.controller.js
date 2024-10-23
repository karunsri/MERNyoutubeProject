import Video from '../models/video.model.js';

// Create a new video
export const createVideo = async (req, res) => {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    const video = await Video.create({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        user: req.user._id,
    });

    if (video) {
        res.status(201).json(video);
    } else {
        res.status(400).json({ message: 'Invalid video data' });
    }
};

// Get all videos
export const fetchVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      console.log('Fetched videos from MongoDB:', videos); // Log in the backend
      res.status(200).json(videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  };
  
  

// Update a video
export const updateVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        video.title = req.body.title || video.title;
        video.description = req.body.description || video.description;
        video.videoUrl = req.body.videoUrl || video.videoUrl;
        video.thumbnailUrl = req.body.thumbnailUrl || video.thumbnailUrl;

        const updatedVideo = await video.save();
        res.json(updatedVideo);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
};

// Delete a video
export const deleteVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        await video.remove();
        res.json({ message: 'Video removed' });
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
};


// Get video details by ID
export const getVideo = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Add new comment
  export const addComment = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      const newComment = { text: req.body.text };
      video.comments.push(newComment);
      await video.save();
  
      res.json(newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete comment
  export const deleteComment = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      video.comments = video.comments.filter(comment => comment._id.toString() !== req.params.commentId);
      await video.save();
  
      res.json({ message: 'Comment deleted' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update comment
  export const updateComment = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      const comment = video.comments.find(comment => comment._id.toString() === req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      comment.text = req.body.text;
      await video.save();
  
      res.json(comment);
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
