import { configureStore } from '@reduxjs/toolkit';

// Import individual slice reducers
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

// Create the Redux store and combine reducers
const store = configureStore({
  reducer: {
    // Manages user authentication and profile information
    user: userReducer,

    // Manages shopping cart state (items, quantities, etc.)
    cart: cartReducer,

    // Manages order information (e.g., most recent order)
    order: orderReducer,
  },
});

// Export the configured store for use in the app
export default store;
