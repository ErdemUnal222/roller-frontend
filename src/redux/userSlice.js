import { createSlice } from '@reduxjs/toolkit';

// Initial state of the user slice
const initialState = {
  token: null, // Auth token (e.g., from login)
  user: null,  // User details object (e.g., id, email, role)
};

// Create the user slice with reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the authentication token
    setToken: (state, action) => {
      state.token = action.payload;
    },

    // Set the user object (after login or profile fetch)
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Clear both token and user (on logout)
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Export actions for use in components or thunks
export const { setToken, setUser, logout } = userSlice.actions;

// Export the reducer to be added to the Redux store
export default userSlice.reducer;
