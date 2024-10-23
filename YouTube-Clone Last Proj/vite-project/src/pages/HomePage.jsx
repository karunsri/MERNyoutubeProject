import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Error fetching videos. Please try again later.');
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div> // Display error message to user
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
};

export default HomePage;
