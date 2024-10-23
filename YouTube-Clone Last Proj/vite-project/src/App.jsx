import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import videoData from './data/videoData';
import Footer from './components/Footer'; 
import ChannelPage from './components/ChannelPage';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(videoData); // Initialize with all videos

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle search and filter videos based on search query
  const handleSearch = (query) => {
    const filteredVideos = videoData.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredVideos);
  };

  return (
    <Router>
      {/* Header with onMenuClick and onSearch props */}
      <Header onMenuClick={toggleSidebar} onSearch={handleSearch} />
      
      <div className="main-container">
        {/* Sidebar opens/closes based on isSidebarOpen */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Routing for the homepage, login, and register pages */}
        <Routes>
          {/* Pass searchResults as prop to HomePage */}
          <Route path="/" element={<HomePage videos={searchResults} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/channel/:channelId" element={<ChannelPage />} />
        </Routes>
      </div>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
};

export default App;
