import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from '../../services/cartService';
import { getErrorMessage } from '../../utils/helpers';

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.id || 'me';
      return await cartApi.getCart(userId);
    } catch (err) {
      if (err?.response?.status === 404) {
        return { items: [], restaurantId: null, _id: null };
      }
      return rejectWithValue(getErrorMessage(err, 'Failed to load cart'));
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/add',
  async ({ menuItemId, quantity = 1 }, { rejectWithValue }) => {
    try {
      return await cartApi.addToCart({ menuItemId, quantity });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Could not add to cart'));
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/update',
  async ({ menuItemId, quantity }, { rejectWithValue }) => {
    try {
      return await cartApi.updateCartItem(menuItemId, quantity);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Could not update cart'));
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async (menuItemId, { rejectWithValue }) => {
    try {
      return await cartApi.removeFromCart(menuItemId);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Could not remove item'));
    }
  }
);

const emptyCart = {
  _id: null,
  restaurantId: null,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: emptyCart,
    isOpen: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    clearCartError(state) {
      state.error = null;
    },
    resetCart(state) {
      state.cart = emptyCart;
    },
  },
  extraReducers: (builder) => {
    const applyCart = (state, action) => {
      state.status = 'succeeded';
      state.cart = action.payload || emptyCart;
      state.error = null;
    };
    const fail = (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Cart error';
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, applyCart)
      .addCase(fetchCart.rejected, fail)
      .addCase(addItemToCart.fulfilled, applyCart)
      .addCase(addItemToCart.rejected, fail)
      .addCase(updateCartQuantity.fulfilled, applyCart)
      .addCase(updateCartQuantity.rejected, fail)
      .addCase(removeCartItem.fulfilled, applyCart)
      .addCase(removeCartItem.rejected, fail);
  },
});

export const { openCart, closeCart, toggleCart, clearCartError, resetCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartOpen = (state) => state.cart.isOpen;
export const selectCartItemCount = (state) =>
  (state.cart.cart?.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0);
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
