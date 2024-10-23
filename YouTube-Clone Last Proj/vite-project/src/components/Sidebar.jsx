import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        <li><a href='http://localhost:5174/'>Home</a></li>
        <li>Trending</li>
        <li>Subscriptions</li>
        <li>Library</li>
      </ul>
    </div>
  );
};

export default Sidebar;
