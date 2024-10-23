import React, { useState } from 'react';
import './Header.css';
import Sidebar from './Sidebar';
import UserDetailsForm from './UserDetailsForm';
import VideoGrid from './VideoGrid';
import videoData from '../data/videoData'; // Import video data here

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredVideos, setFilteredVideos] = useState(videoData); // State for filtered videos
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDetailsFormOpen, setIsUserDetailsFormOpen] = useState(false); // State for user details form

  // Handle Search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter videos based on the search query
    const filtered = videoData.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredVideos(filtered); // Update the filtered videos state
  };

  const toggleUserDetailsForm = () => {
    setIsUserDetailsFormOpen((prev) => !prev);
  };

  // Redirect to Google on Sign In button click
  const handleSignIn = () => {
    window.location.href = 'https://www.gmail.com';
  };

  return (
    <>
      <header className="header">
        <div className="hamburger" onClick={onMenuClick}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <h1 className="logo">
          <i className="fab fa-youtube youtube-icon"></i> YouTube Clone
        </h1>

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search"
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className="header-right">
          <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
        </div>

        {isUserDetailsFormOpen && <UserDetailsForm onClose={toggleUserDetailsForm} />} {/* Show form conditionally */}

        <Sidebar isOpen={isSidebarOpen} />
      </header>

      {/* Render the filtered videos */}
      <VideoGrid videos={filteredVideos} />
    </>
  );
};

export default Header;
