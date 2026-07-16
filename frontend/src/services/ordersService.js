import api from '../api/axios';

export const createOrderFromCart = async (cartId) => {
  const { data } = await api.post('/orders/create', { cartId });
  return data.data;
};

export const listOrders = async () => {
  const { data } = await api.get('/orders');
  return data.data ?? [];
};

export const getOrder = async (orderId) => {
  const { data } = await api.get(`/orders/${orderId}`);
  return data.data;
};
