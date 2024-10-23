import React from 'react';
import './VideoThumbnail.css'; // Import CSS for styling

const VideoThumbnail = ({
  title = "No title available",
  thumbnailUrl = "path/to/default-thumbnail.jpg", // Placeholder image
  views = "0",
  uploadDate = "Unknown date",
  likes = "0",
  dislikes = "0",
  description = "No description available"
}) => {
  return (
    <div className="video-thumbnail-container">
      <div className="video-thumbnail">
        <img src={thumbnailUrl} alt={title} className="thumbnail-img" />
        <p className="video-title">{title}</p>
        <p className="video-description">{description}</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;

