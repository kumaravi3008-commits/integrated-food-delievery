import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [],
    selected: null,
    filters: { search: '', cuisine: 'All', rating: 0, distance: 10 },
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setRestaurantList(state, action) {
      state.list = action.payload;
      state.status = 'succeeded';
    },
    setSelectedRestaurant(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { setFilters, setRestaurantList, setSelectedRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
