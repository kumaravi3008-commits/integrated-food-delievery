import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setOrders(state, action) {
      state.list = action.payload;
      state.status = 'succeeded';
    },
    setSelectedOrder(state, action) {
      state.selected = action.payload;
    },
    setOrdersStatus(state, action) {
      state.status = action.payload;
    },
    setOrdersError(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setOrders, setSelectedOrder, setOrdersStatus, setOrdersError } = ordersSlice.actions;
export default ordersSlice.reducer;

