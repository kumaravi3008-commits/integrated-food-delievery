import api from '../api/axios';

export const listRestaurants = async (params = {}) => {
  const { data } = await api.get('/restaurants', { params });
  return data.data ?? data;
};

export const listNearbyRestaurants = async ({ lat, lng, radius, cuisine, rating } = {}) => {
  const { data } = await api.get('/restaurants/nearby', {
    params: { lat, lng, radius, cuisine, rating },
  });
  return data.data ?? data;
};

export const getRestaurant = async (restaurantId) => {
  const { data } = await api.get(`/restaurants/${restaurantId}`);
  return data.data ?? data;
};

export const listMenus = async (restaurantId) => {
  const { data } = await api.get(`/restaurants/${restaurantId}/menus`);
  return data.data ?? data;
};

export const listRestaurantReviews = async (restaurantId) => {
  const { data } = await api.get(`/restaurants/${restaurantId}/reviews`);
  return data.data ?? data;
};
