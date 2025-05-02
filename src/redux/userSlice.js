// redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  role: null,
  user: null, // 👈 Add this
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }, // 👈 Add this if needed
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setToken, setRole, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
