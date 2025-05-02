import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.latestOrder = action.payload;
    },
    clearOrder: (state) => {
      state.latestOrder = null;
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
