import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://ihsanerdemunal.ide.3wa.io:9500/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically add the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error(`API error [${error.response.status}]:`, error.response.data);

      if (error.response.status === 401) {
        // Unauthorized — token invalid, expired or missing
        console.warn('⚠️ Unauthorized! Redirecting to login...');
        // Optionally redirect the user to login
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
