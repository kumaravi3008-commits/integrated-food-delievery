import Navbar from "../../../../components/layout/Navbar/Navbar";
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
  return (
    <main className="bg-[#050505] text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Navbar: Full Width, placed at the top */}
      <Navbar />

      {/* Hero: Full Width */}
      <div className="w-full">
        <Hero />
      </div>
      
      {/* Other Sections: Centered with max-width */}
      <div className="w-full max-w-7xl flex flex-col gap-12 sm:gap-16 lg:gap-20 py-12 sm:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        <Features />
        <PopularRestaurants />
        <FoodCategories />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <MobileApp />
        <CTA />
      </div>
      <div className="w-full">
       {/* Footer: Full Width, placed at the bottom */}
      <Footer />
      </div>
    </main>
    
  );
}