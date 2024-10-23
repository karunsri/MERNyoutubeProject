import axios from 'axios';

export const fetchVideos = async () => {
  try {
    const response = await axios.get('/api/videos');
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return []; // Ensure it returns an empty array if data is not an array
    }
  } catch (error) {
    console.error("Error fetching videos", error);
    return [];
  }
};

export const fetchChannel = async (channelId, token) => {
  try {
    const response = await fetch(`http://localhost:3000/api/channels/${channelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch channel data');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const fetchChannelDetails = async (channelId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/channel/${channelId}`);
    return response.data; // Return channel data
  } catch (error) {
    console.error('Error fetching channel details:', error);
    return null; // Return null in case of an error
  }
};

// Fetch videos by channel ID
export const fetchChannelVideos = async (channelId) => {
  try {
    const response = await axios.get(`/api/channel/${channelId}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching channel videos", error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    return null;
  }
};
