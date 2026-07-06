import { ArrowRight, Utensils } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#050505] flex items-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-8 lg:px-20 grid lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Side: Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Utensils size={14} className="text-orange-600" />
            Premium Dining Experience
          </div>
          
          <h1 className="text-6xl lg:text-[85px] font-semibold text-white leading-[0.9] mb-4">
            Welcome to
          </h1>
          <h2 className="text-7xl lg:text-[100px] font-bold text-[#e65100] leading-[0.9] mb-10">
            CraveDash
          </h2>
          
          <p className="flex flex-wrap gap-4 text-[11px] lg:text-[13px] font-bold tracking-[0.3em] text-gray-500 mb-12 uppercase">
            Discover <span className="text-orange-900">•</span> Reserve <span className="text-orange-900">•</span> Dine <span className="text-orange-900">•</span> Deliver
          </p>
          
          <div className="flex flex-wrap gap-5 mb-16">
            <button className="flex items-center gap-3 bg-[#b23c00] hover:bg-[#d94e00] transition-all text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/20">
              Start Exploring <ArrowRight size={22} />
            </button>
            <button className="bg-[#1a1a1a] hover:bg-[#252525] transition-all text-white border border-white/5 px-10 py-5 rounded-2xl font-bold text-lg">
              View Menus
            </button>
          </div>
          
          <div className="flex gap-16 pt-8 border-t border-white/5">
            {[ {v:'500+', l:'Restaurants'}, {v:'20min', l:'Avg Delivery'}, {v:'4.9/5', l:'Rating'} ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-white mb-1">{s.v}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Overlapping Images */}
        <div className="relative h-[600px] hidden lg:block">
          {/* Main Phone View / Burger */}
          <div className="absolute top-0 left-0 w-72 h-[450px] rounded-[40px] overflow-hidden border-[6px] border-[#111] shadow-2xl z-20">
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800" alt="Burger" className="w-full h-full object-cover" />
          </div>
          
          {/* Ramen Card */}
          <div className="absolute top-12 -right-4 w-80 h-64 rounded-[32px] overflow-hidden border-[6px] border-[#111] shadow-2xl z-10 rotate-3">
            <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800" alt="Ramen" className="w-full h-full object-cover" />
          </div>
          
          {/* Sushi Card */}
          <div className="absolute bottom-10 left-16 w-80 h-64 rounded-[32px] overflow-hidden border-[6px] border-[#111] shadow-2xl z-30 -rotate-2">
            <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800" alt="Sushi" className="w-full h-full object-cover" />
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default Hero;