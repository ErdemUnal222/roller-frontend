// /src/api/axios.js
import axios from 'axios';

// Create a customized Axios instance
const api = axios.create({
baseURL: 'http://ihsanerdemunal.ide.3wa.io:9500/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token to each request if available
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    let token;

    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser?.token;
    } catch (err) {
      console.warn("Could not parse user from localStorage:", err);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// Centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let formattedMessage = "An unexpected error occurred.";

    if (error.response) {
      const status = error.response.status;
      const message =
        typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data?.message;

      if (message) formattedMessage = message;

      if (status === 401 || status === 403) {
        console.warn('Unauthorized or forbidden. Redirecting to login...');
        localStorage.clear();
        window.location.href = '/login';
      }
    } else if (error.request) {
      formattedMessage = "No response from the server.";
    } else {
      formattedMessage = error.message;
    }

    error.formattedMessage = formattedMessage;
    return Promise.reject(error);
  }
);

export default api;
