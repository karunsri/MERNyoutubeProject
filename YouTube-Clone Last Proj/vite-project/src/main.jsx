import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this line
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Update this line
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);