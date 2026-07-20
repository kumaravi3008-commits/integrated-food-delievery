import { useState } from "react";
import AppLayout from "../../../../components/layout/AppLayout";
import Footer from "../../../../components/layout/Footer/Footer";

import Hero from "./Hero";
import Features from "./Features";
import PopularRestaurants from "./PopularRestaurants";
import FoodCategories from "./FoodCategories";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import MobileApp from "./MobileApp";
import CTA from "./Cta";

export default function HomePage() {
  const [searchMode, setSearchMode] = useState("order");

  const restaurantFilter =
    searchMode === "order" ? "delivery" : "all";

return (
    <AppLayout>
      <div className="w-full bg-black flex flex-col items-center">
        <Hero searchMode={searchMode} setSearchMode={setSearchMode} />
        <Features />
        <PopularRestaurants filterType={restaurantFilter} />
        <FoodCategories />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <MobileApp />
        <CTA />
        <Footer />
      </div>
    </AppLayout>
  );
}