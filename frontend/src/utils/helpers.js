import clsx from 'clsx';

export const cn = (...inputs) => clsx(inputs);

export const formatPrice = (value) => {
  const n = Number(value) || 0;
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

export const getOrderStatus = (order) =>
  order?.status || order?.orderStatus || 'PLACED';

export const getErrorMessage = (err, fallback = 'Something went wrong') =>
  err?.response?.data?.message || err?.message || fallback;

export const socketBaseUrl = () => {
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return api.replace(/\/api\/?$/, '') || 'http://localhost:5000';
};
