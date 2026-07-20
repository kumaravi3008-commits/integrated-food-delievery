import api from '../api/axios';

export const getCart = async (userId) => {
  const { data } = await api.get(`/cart/${userId}`);
  return data.data ?? data;
};

export const addToCart = async ({ menuItemId, quantity }) => {
  const { data } = await api.post('/cart/add', { menuItemId, quantity });
  return data.data ?? data;
};

export const updateCartItem = async (menuItemId, quantity) => {
  const { data } = await api.put(`/cart/item/${menuItemId}`, { quantity });
  return data.data ?? data;
};

export const removeFromCart = async (menuItemId) => {
  const { data } = await api.delete(`/cart/item/${menuItemId}`);
  return data.data ?? data;
};

export const clearCart = async () => {
  const { data } = await api.delete('/cart');
  return data.data ?? data;
};

