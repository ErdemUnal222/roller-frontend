import { createSlice } from '@reduxjs/toolkit';

// Initial state: only tracks the most recent order
const initialState = {
  latestOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Stores the latest order details in the state
    placeOrder: (state, action) => {
      state.latestOrder = action.payload;
    },

    // Clears the latest order from the state (e.g., after confirmation or logout)
    clearOrder: (state) => {
      state.latestOrder = null;
    },
  },
});

// Export the action creators
export const { placeOrder, clearOrder } = orderSlice.actions;

// Export the reducer to be included in the store
export default orderSlice.reducer;
