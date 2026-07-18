import { useNavigate } from 'react-router-dom';
import Hero from "../../../components/layout/Hero/Hero";
import Footer from "../../../components/layout/Footer/Footer";
import MarketingLayout from "../../../components/layout/purpose/MarketingLayout";

import { MessageSquareText } from 'lucide-react';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <MarketingLayout showFooter={false}>
      <main>
        <Hero />
      </main>

      <Footer />

      {/* Floating Support Button */}
      <button
        type="button"
        onClick={() => navigate('/help')}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#b23c00] text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-orange-900/40 hover:scale-110 transition-all z-[100]"
        aria-label="Help & support"
      >
        <MessageSquareText size={30} fill="currentColor" fillOpacity={0.2} />
      </button>
    </MarketingLayout>
  );
}

export default WelcomePage;

