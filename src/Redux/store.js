import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import uiReducer from './uiSlice';
import shippingReducer from './shipping';

// connects all slices into one global store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shipping: shippingReducer,
    ui: uiReducer,
  },
});
