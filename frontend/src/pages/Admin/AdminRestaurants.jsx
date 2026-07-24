import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../ui/Loading";

const AdminRestaurants = () => {
  const { runAxios: fetchRestaurants, data: restaurants, loading } = useAxios("/restaurants");
  const { runAxios: deleteRestaurant } = useAxios("", "DELETE");

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => (
          <div key={restaurant._id} className="border rounded-lg p-4 shadow">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
            <p className="text-sm text-gray-600">{restaurant.description}</p>
            <div className="mt-2 text-primary">★ {restaurant.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRestaurants;