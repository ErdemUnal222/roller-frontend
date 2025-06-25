import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Each item: { id, title, price, quantity, stock }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add to cart (respect stock limit)
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity < product.stock) {
          existing.quantity += 1;
        } else {
          console.warn("⚠️ Cannot add more than available stock");
        }
      } else {
        if (product.stock > 0) {
          state.items.push({ ...product, quantity: 1 });
        } else {
          console.warn("❌ Product out of stock");
        }
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

incrementItem: (state, action) => {
  const item = state.items.find((i) => i.id === action.payload.id);
  if (item && item.quantity < action.payload.stock) {
    item.quantity += 1;
      } else {
        console.warn("⚠️ Cannot exceed stock");
      }
    },

    decrementItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
