import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import * as authApi from '../../services/authService';
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from '../../utils/storage';
import { getErrorMessage } from '../../utils/helpers';

const userFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
};

const initialToken = getToken();
const initialUser = getStoredUser() || (initialToken ? userFromToken(initialToken) : null);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.login({ email, password });
      const token = data.token;
      setToken(token);
      let user = data.user || userFromToken(token);
      try {
        const profile = await authApi.getProfile();
        user = { ...user, ...profile };
      } catch {
        /* profile optional after login */
      }
      return { token, user };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Login failed'));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.register({ email, password, role: 'consumer' });
      return { token: data.token, user: data.user };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Registration failed'));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getProfile();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to load profile'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user: initialUser,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      clearAuthStorage();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };
    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Auth error';
    };

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        setToken(action.payload.token);
        setStoredUser(action.payload.user);
      })
      .addCase(loginUser.rejected, rejected)
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        setToken(action.payload.token);
        setStoredUser(action.payload.user);
      })
      .addCase(registerUser.rejected, rejected)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        setStoredUser(state.user);
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export default authSlice.reducer;
