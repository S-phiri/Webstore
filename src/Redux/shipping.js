import { createSlice } from '@reduxjs/toolkit';

// tracks shipping method + toggle for showing help
const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    method: 'Standard',
    helpVisible: false,
  },
  // Update options for shipping and help
  reducers: {
    setShippingMethod: (state, action) => {
      state.method = action.payload;
    },
    toggleHelp: (state) => {
      state.helpVisible = !state.helpVisible;
    },
  },
});

export const { setShippingMethod, toggleHelp } = shippingSlice.actions;
export default shippingSlice.reducer;
