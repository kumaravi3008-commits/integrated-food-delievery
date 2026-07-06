import Navbar from './components/layout/Navbar/Navbar';
import Hero from './components/layout/Hero/Hero';
import Footer from './components/layout/Footer/Footer';
import { MessageSquareText } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
      </main>
      
      <Footer />

      {/* Floating Support Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#b23c00] text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-orange-900/40 hover:scale-110 transition-all z-[100]">
        <MessageSquareText size={30} fill="currentColor" fillOpacity={0.2} />
      </button>
    </div>
  );
}

export default App;