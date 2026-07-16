import api from '../api/axios';

export const getCart = async (customerId = 'me') => {
  const { data } = await api.get(`/cart/${customerId}`);
  return data.data;
};

export const addToCart = async ({ menuItemId, quantity = 1 }) => {
  const { data } = await api.post('/cart/add', { menuItemId, quantity });
  return data.data;
};

export const updateCartItem = async (menuItemId, quantity) => {
  const { data } = await api.put(`/cart/update/${menuItemId}`, { quantity });
  return data.data;
};

export const removeFromCart = async (menuItemId) => {
  const { data } = await api.delete(`/cart/remove/${menuItemId}`);
  return data.data;
};
