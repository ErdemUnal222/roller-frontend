// /src/api/axios.js
import axios from 'axios';

// -----------------------------------------------------------
// 1. CREATE CUSTOM AXIOS INSTANCE
// -----------------------------------------------------------
const api = axios.create({
  baseURL: 'http://ihsanerdemunal.ide.3wa.io:9500/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// -----------------------------------------------------------
// 2. ADD TOKEN TO EVERY REQUEST (AUTHENTICATION)
// -----------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    let token;

    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser?.token;
    } catch (err) {
      console.warn("⚠️ Could not parse user from localStorage:", err);
    }

    // ✅ DEBUG: Log token and final Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token attached to request:", config.headers.Authorization);
    } else {
      console.warn("❌ No token found, Authorization header not attached.");
    }

    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------
// 3. HANDLE RESPONSES AND ERRORS CENTRALLY
// -----------------------------------------------------------
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

      if (status === 401) {
        console.warn('🔒 Unauthorized. Redirecting to login...');
        localStorage.clear();
        window.location.href = '/login';
      } else if (status === 403) {
        console.warn('⛔ Forbidden. Redirecting to unauthorized page...');
        window.location.href = '/unauthorized';
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
