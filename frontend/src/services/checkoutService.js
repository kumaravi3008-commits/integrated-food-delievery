import api from '../api/axios';

export const createCheckout = async () => {
  const { data } = await api.post('/checkout');
  return data.data;
};

export const payOrder = async (orderId, { simulate = true } = {}) => {
  const { data } = await api.post(`/payments/${orderId}/pay`, { simulate });
  return data.data;
};
