// /src/api/axios.js
// This file configures a custom Axios instance for all HTTP requests in the frontend.
// It handles automatic token attachment and centralized error handling.

import axios from 'axios'; // Import Axios for making HTTP requests

// -----------------------------------------------------------
// 1. CREATE CUSTOM AXIOS INSTANCE
// -----------------------------------------------------------

// Create a reusable Axios instance with predefined configuration
const api = axios.create({
  // Set the base URL for all requests (adjusted to match the backend server's public address)
  baseURL: 'http://ihsanerdemunal.ide.3wa.io:9500/api/v1',
  headers: {
    'Content-Type': 'application/json', // Always send JSON-formatted data
  },
});

// -----------------------------------------------------------
// 2. ADD TOKEN TO EVERY REQUEST (AUTHENTICATION)
// -----------------------------------------------------------

// Axios interceptor that runs before each request is sent
// Purpose: Attach the user’s token (if available) to the Authorization header
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user'); // Get user data (from login) stored in localStorage
    let token;

    try {
      const parsedUser = JSON.parse(storedUser); // Convert stored string to an object
      token = parsedUser?.token; // Safely access token
    } catch (err) {
      console.warn("Could not parse user from localStorage:", err); // Log error if parsing fails
    }

    if (token) {
      // If token exists, attach it to the request header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Return updated request configuration
  },
  (error) => {
    // If there’s an error preparing the request, log it and reject
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------
// 3. HANDLE RESPONSES AND ERRORS CENTRALLY
// -----------------------------------------------------------

// Axios interceptor that runs after a response is received or an error occurs
api.interceptors.response.use(
  (response) => response, // Pass through successful responses untouched

  (error) => {
    // If there is an error in the response, process it and format a user-friendly message
    let formattedMessage = "An unexpected error occurred."; // Default error message

    if (error.response) {
      // Server responded with an error (4xx or 5xx)
      const status = error.response.status;

      // Try to extract the message from the server’s response
      const message =
        typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data?.message;

      if (message) formattedMessage = message; // Use server message if available

      // Handle auth errors globally with separate handling for 401 and 403
      if (status === 401) {
        console.warn('Unauthorized. Redirecting to login...');
        localStorage.clear();
        window.location.href = '/login';
      } else if (status === 403) {
        console.warn('Forbidden. Redirecting to unauthorized page...');
        window.location.href = '/unauthorized';
      }
    } else if (error.request) {
      // Request was made but no response received (e.g. server is down)
      formattedMessage = "No response from the server.";
    } else {
      // Other unexpected errors
      formattedMessage = error.message;
    }

    // Attach the formatted message to the error object for use in UI
    error.formattedMessage = formattedMessage;
    return Promise.reject(error); // Forward the error so it can be handled later
  }
);

// Export the configured Axios instance for use in all API calls
export default api;
