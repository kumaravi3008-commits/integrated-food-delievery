import { useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../layout/Banner";
import Section from "../ui/Section";
import Loading from "../ui/Loading";
import useAxios from "../hooks/useAxios";

const Restaurants = () => {
  const { runAxios: fetchRestaurants, data: restaurants, loading } = useAxios("/restaurants");

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <Banner
        title="restaurants"
        breadcrumbs={[{ text: "home", path: "/" }, { text: "restaurants" }]}
      />
      <Section classes="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants?.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant._id}`}
            key={restaurant._id}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{restaurant.cuisine}</p>
              <p className="text-gray-600 text-sm">{restaurant.description}</p>
              <div className="mt-2 text-primary font-medium">
                ★ {restaurant.rating}
              </div>
            </div>
          </Link>
        ))}
      </Section>
    </div>
  );
};

export default Restaurants;