import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartPanelOpen: false,
  },
  reducers: {
    toggleCartPanel: (state, action) => {
      state.cartPanelOpen = action.payload;
    },
  },
});

export const { toggleCartPanel } = uiSlice.actions;
export default uiSlice.reducer;
