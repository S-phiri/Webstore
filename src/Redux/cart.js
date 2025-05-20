import { createSlice } from '@reduxjs/toolkit';

// handles all cart actions and state
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // this is where cart items are stored
  },
  reducers: {
    // add new item to cart
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // remove item by index
    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    // clear everything in the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// export all the actions so I can use them in components
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
