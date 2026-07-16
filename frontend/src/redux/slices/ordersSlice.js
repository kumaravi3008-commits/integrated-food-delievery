import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersApi from '../../services/ordersService';
import { getErrorMessage } from '../../utils/helpers';

export const fetchOrders = createAsyncThunk(
  'orders/list',
  async (_, { rejectWithValue }) => {
    try {
      return await ordersApi.listOrders();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load orders'));
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/get',
  async (orderId, { rejectWithValue }) => {
    try {
      return await ordersApi.getOrder(orderId);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load order'));
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    current: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentOrder(state, action) {
      state.current = action.payload;
    },
    clearOrdersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { setCurrentOrder, clearOrdersError } = ordersSlice.actions;
export default ordersSlice.reducer;
