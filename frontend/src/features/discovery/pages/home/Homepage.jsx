import AppLayout from "../../../../components/layout/AppLayout";
import Footer from "../../../../components/layout/Footer/Footer";

import Hero from "../../../components/layout/Hero/Hero";
import Features from "./Features";
import PopularRestaurants from "./PopularRestaurants";
import FoodCategories from "./FoodCategories";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import MobileApp from "./MobileApp";
import CTA from "./Cta";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-black flex flex-col items-stretch overflow-x-hidden">
        <main className="w-full flex flex-col items-stretch gap-20 md:gap-32 py-12 md:py-20 bg-black">
          <Hero />
          <Features />
          <PopularRestaurants filterType="delivery" />
          <FoodCategories />
          <HowItWorks />
          <WhyChooseUs />
          <Testimonials />
          <MobileApp />
          <CTA />
        </main>
        <Footer />
      </div>
    </AppLayout>
  );
}
