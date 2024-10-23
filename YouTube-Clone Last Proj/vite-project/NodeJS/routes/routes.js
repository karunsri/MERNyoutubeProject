import express from 'express';
import {
  registerUser,
  loginUser
} from '../controllers/auth.controller.js';
import {
  getChannel,
  createChannel,
  deleteCVideo
} from '../controllers/channel.controller.js';
import {
  createVideo,
  fetchVideos,
  updateVideo,
  deleteVideo,
  getVideo,
  addComment,
  deleteComment,
  updateComment
} from '../controllers/video.controller.js';
import { protect, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Channel routes
router.get('/channel/:id', getChannel); // Get channel information
router.post('/channels', verifyToken, createChannel); // Create new channel
router.delete('/channel/:id', verifyToken, deleteCVideo); // Delete channel

// Video routes
router.post('/videos', protect, createVideo); // Create video
router.get('/videos', fetchVideos); // Fetch all videos
router.get('/videos/:id', getVideo); // Get specific video
router.put('/videos/:id', protect, updateVideo); // Update video
router.delete('/videos/:id', protect, deleteVideo); // Delete video

// Comment routes
router.post('/videos/:id/comments', addComment); // Add comment to a video
router.delete('/videos/:id/comments/:commentId', deleteComment); // Delete comment
router.put('/videos/:id/comments/:commentId', updateComment); // Update comment

export default router;
