import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayerPage.css';

const VideoPlayerPage = () => {
  const { id } = useParams(); // Get video ID from URL
  const [video, setVideo] = useState(null); // State to hold video data
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(''); // State for the new comment
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch video details when component mounts
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/videos/${id}`);
        if (!response.ok) throw new Error('Failed to fetch video');
        const data = await response.json();
        setVideo(data);
        setComments(data.comments || []); // Assuming video API includes comments
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load video');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Handle new comment submission
  const handleAddComment = async () => {
    if (newComment.trim() === '') return; // Ignore empty comments

    try {
      const response = await fetch(`http://localhost:3000/api/videos/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment })
      });
      const addedComment = await response.json();
      setComments([...comments, addedComment]); // Add new comment to the list
      setNewComment(''); // Clear the input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await fetch(`http://localhost:3000/api/videos/${id}/comments/${commentId}`, {
        method: 'DELETE',
      });
      setComments(comments.filter(comment => comment._id !== commentId)); // Remove from state
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Handle editing a comment
  const handleEditComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(`http://localhost:3000/api/videos/${id}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: updatedText })
      });
      const updatedComment = await response.json();
      setComments(comments.map(comment => comment._id === commentId ? updatedComment : comment));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="video-player-page">
      {/* Video Player */}
      <video width="100%" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Details */}
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <p>Channel: {video.channelName}</p>

      {/* Like and Dislike Buttons */}
      <div className="like-dislike">
        <button>👍 {video.likes}</button>
        <button>👎 {video.dislikes}</button>
      </div>

      {/* Comment Section */}
      <div className="comments-section">
        <h3>Comments</h3>

        {/* Add Comment */}
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>

        {/* Display Comments */}
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <button onClick={() => handleEditComment(comment._id, prompt('Edit your comment:', comment.text))}>
                Edit
              </button>
              <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
