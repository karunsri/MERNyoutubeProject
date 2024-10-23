// src/components/UserDetailsForm.jsx

import React, { useState } from 'react';
import './UserDetailsForm.css'; // Optional: Add your styles

const UserDetailsForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process user details (e.g., authentication)
    console.log('User details submitted:', { email, password });
    onClose(); // Close the form after submission
  };

  return (
    <div className="user-details-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserDetailsForm;
