import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../layout/Banner";
import Section from "../ui/Section";
import Loading from "../ui/Loading";
import Meals from "../components/Meals/Meals";
import useAxios from "../hooks/useAxios";

const RestaurantMenu = () => {
  const { id } = useParams();
  const { runAxios: fetchRestaurant, data, loading } = useAxios(`/restaurants/${id}`);

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <Banner
        title={data?.restaurant?.name || "restaurant"}
        breadcrumbs={[
          { text: "home", path: "/" },
          { text: "restaurants", path: "/restaurants" },
          { text: data?.restaurant?.name || "" },
        ]}
      />
      <Section classes="flex flex-col gap-10">
        <p className="text-gray-600">{data?.restaurant?.description}</p>
        <Meals meals={data?.meals} />
      </Section>
    </div>
  );
};

export default RestaurantMenu;
