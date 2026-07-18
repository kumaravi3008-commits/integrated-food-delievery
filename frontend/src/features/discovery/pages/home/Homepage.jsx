import MarketingLayout from "../../../../components/layout/purpose/MarketingLayout";
import PageLayout from "../../../../components/layout/PageLayout";

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
    <MarketingLayout showFooter={true}>
      <main className="bg-[#050505] text-white min-h-screen w-full overflow-x-hidden hide-scrollbar">
        <PageLayout.Home>
          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
            <Hero />

            {/* Preserve module internals; only enforce premium section rhythm */}
            <div className="pt-2 sm:pt-0">
              <Features />
            </div>
            <PopularRestaurants />
            <FoodCategories />
            <HowItWorks />
            <WhyChooseUs />
            <Testimonials />
            <MobileApp />
            <CTA />
          </div>
        </PageLayout.Home>
      </main>
    </MarketingLayout>
  );
}

