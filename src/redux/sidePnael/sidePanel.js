import { createSlice } from '@reduxjs/toolkit';

const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openSidePanel: (state) => {
      state.isOpen = true;
    },
    closeSidePanel: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSidePanel, closeSidePanel } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;
