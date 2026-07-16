import api from '../api/axios';

export const register = async ({ email, password, role = 'consumer' }) => {
  const { data } = await api.post('/auth/register', { email, password, role });
  return data.data;
};

export const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
};

export const getProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data.data;
};

export const resetPassword = async ({ email, newPassword }) => {
  const { data } = await api.post('/auth/reset-password', { email, newPassword });
  return data.data;
};
