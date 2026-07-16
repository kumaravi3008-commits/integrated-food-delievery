import api from '../api/axios';

export const createReview = async ({ orderId, rating, review }) => {
  const { data } = await api.post('/reviews', { orderId, rating, review });
  return data.data;
};

export const getMyReviews = async () => {
  const { data } = await api.get('/reviews/my');
  return data.data ?? [];
};

export const getReviewSuggestions = async (orderId) => {
  const { data } = await api.get(`/reviews/suggestions/${orderId}`);
  return data.data;
};
