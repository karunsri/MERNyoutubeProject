import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChannel } from '../api'; // Import the fetchChannel function
import './ChannelPage.css';

const ChannelPage = () => {
  const { channelId } = useParams(); // Get channel ID from URL
  const [channel, setChannel] = useState(null); // Channel data
  const [videos, setVideos] = useState([]); // List of videos
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [user, setUser] = useState(null); // Logged-in user data
  const navigate = useNavigate();

  const userToken = localStorage.getItem('userToken'); // Get the JWT token from localStorage

  // Fetch the channel and its videos when the component mounts
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const data = await fetchChannel(channelId, userToken);
        console.log("Fetched data:", data); // Debugging log
        setChannel(data.channel); 
        setVideos(data.videos); 
        setUser(data.user); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching channel data:', error); // Debugging log
        setError('Failed to load channel data');
        setLoading(false);
      }
    };
  
    fetchChannelData();
  }, [channelId, userToken]);

  // Handle video deletion
  const handleDeleteVideo = async (videoId) => {
    try {
      await fetch(`http://localhost:3000/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`, // Authorization for delete action
        },
      });
      setVideos(videos.filter((video) => video._id !== videoId)); // Remove video from state after deletion
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Handle video editing (redirect to edit page)
  const handleEditVideo = (videoId) => {
    navigate(`/edit-video/${videoId}`); // Redirect to video editing page
  };

  // Handle channel creation (redirect to create channel page)
  const handleCreateChannel = () => {
    navigate('/create-channel');
  };

  // Show loading message while data is being fetched
  if (loading) return <p>Loading channel...</p>;

  // Show error message if data fails to load
  if (error) return <p>{error}</p>;

  return (
    <div className="channel-page">
      <header>
        <h1>{channel ? channel.name : 'No Channel Found'}</h1>
        <p>{channel?.description}</p>

        {/* Display the "Create Channel" button only if the user doesn't own the current channel */}
        {user && !channel && <button onClick={handleCreateChannel}>Create Channel</button>}
      </header>

      <h2>Videos</h2>
      <div className="videos-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <video width="320" height="240" controls>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Show edit and delete buttons only if the logged-in user is the channel owner */}
              {user && user._id === channel.owner && (
                <div className="video-actions">
                  <button onClick={() => handleEditVideo(video._id)}>Edit</button>
                  <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No videos available for this channel.</p>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
