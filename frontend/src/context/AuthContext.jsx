import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuth } from '../redux/slices/authSlice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const auth = useSelector(selectAuth);

  const value = {
    isAuthenticated,
    user: auth.user,
    token: auth.token,
    loading: auth.status === 'loading',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function () {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export default AuthContext;

