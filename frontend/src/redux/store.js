import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {

    appPlaceholder: (state = {}) => state
  },
});

export default store;