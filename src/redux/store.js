import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './widget/widgetSlice.js';
import sidePanelReducer from './sidePnael/sidePanel.js';

const store = configureStore({
  reducer: {
    widgets: widgetReducer,
    sidePanel: sidePanelReducer,
  }
});

export default store;
