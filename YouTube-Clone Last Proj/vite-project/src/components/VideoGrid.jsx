import React from 'react';
import VideoThumbnail from './VideoThumbnail';
import './VideoGrid.css'; // Ensure you are using this for styling

const VideoGrid = ({ videos }) => {
  return (
    <section className="video-grid">
      {videos.map((video, index) => (
        <div key={video._id || index} className="video-card">
          <VideoThumbnail
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            description={video.description}
          />
          <div className="video-details">
            <h3 className="video-title">{video.title}</h3>
            <p className="video-stats">
              {video.views.toLocaleString()} views • {new Date(video.uploadDate).toLocaleDateString()}
            </p>
            <div className="video-likes-dislikes">
              <span className="video-likes">
                <i className="fas fa-thumbs-up"></i> {video.likes.toLocaleString()}
              </span>
              <span className="video-dislikes">
                <i className="fas fa-thumbs-down"></i> {video.dislikes.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VideoGrid;

