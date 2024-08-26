import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('widgetData');
    if (serializedState === null) return { categories: []};
    return JSON.parse(serializedState);
  } catch (err) {
    return { categories: []};
  }
};

const initialState = loadState();

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, widget } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets.push(widget);
        localStorage.setItem('widgetData', JSON.stringify(state));
      }
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
        localStorage.setItem('widgetData', JSON.stringify(state));
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      localStorage.setItem('widgetData', JSON.stringify(state));
    },

  },
});

export const { addWidget, removeWidget, setCategories } = widgetSlice.actions;
export default widgetSlice.reducer;
