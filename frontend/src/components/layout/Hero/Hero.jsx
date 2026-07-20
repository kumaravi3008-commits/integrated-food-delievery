import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Flame, Star, Quote, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#050505] flex items-center justify-center overflow-hidden py-12 lg:py-20 w-full">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] bg-orange-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* FULL-WIDTH RESPONSIVE CONTAINER - aligned with page-container system */}
      <div className="w-full max-w-layout-full mx-auto px-6 sm:px-8 lg:px-20 grid lg:grid-cols-12 items-center gap-10 lg:gap-16 relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-[0.2em] text-gray-300">
            <Utensils size={14} className="text-orange-500" />
            <span>Premium Dining Experience</span>
          </div>

          {/* Heading */}
          <div className="mt-8">
            <h1 className="text-4xl sm:text-6xl xl:text-[76px] font-extrabold text-white leading-[1.05] tracking-tight">
              Welcome to
            </h1>
            <h2 className="mt-2 text-5xl sm:text-7xl xl:text-[88px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 leading-[1.05] tracking-tight">
              DineExpress
            </h2>
          </div>

          {/* TAGLINE & BUTTONS */}
          <div className="flex flex-col gap-8 mt-8">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              <span>Discover</span>
              <span className="text-orange-500">•</span>
              <span>Dine</span>
              <span className="text-orange-500">•</span>
              <span>Deliver</span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/home"
                className="min-w-[190px] h-14 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 px-8 shadow-lg shadow-orange-600/30 hover:scale-105"
              >
                <span>Start Exploring</span>
                <ArrowRight size={18} className="shrink-0" />
              </Link>

              <Link
                to="/home"
                className="min-w-[150px] h-14 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center px-8 hover:scale-105 backdrop-blur-sm"
              >
                <span>View Menus</span>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { value: "500+", label: "Restaurants" },
              { value: "20min", label: "Avg Delivery" },
              { value: "4.9/5", label: "Rating" },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{item.value}</h3>
                <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400 font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT - COLLAGE */}
        <div className="lg:col-span-6 relative w-full flex items-center justify-center">

          {/* Expanded Collage Wrapper */}
          <div className="w-full max-w-[620px] flex gap-5 items-stretch relative z-10 mx-auto">
            
            {/* BURGER + QUOTE - Left Column */}
            <div className="w-1/2 flex flex-col gap-3 relative rounded-[32px] overflow-hidden border-2 border-white/10 bg-[#0d0d0d] shadow-2xl transition-all duration-500 -rotate-1 hover:rotate-0 hover:z-20 group p-2.5">
              
              {/* Photo Area */}
              <div className="w-full h-[280px] relative rounded-[24px] overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800"
                  alt="Burger"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-white text-[11px] font-semibold">
                  <Flame size={13} className="text-orange-500" />
                  <span>Trending</span>
                </div>
              </div>

              {/* Quote Box */}
              <div className="p-4 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#161616] to-[#0a0a0a] rounded-[22px] border border-white/5 relative overflow-hidden">
                <Quote size={36} className="absolute -right-2 -bottom-2 text-orange-500/10 pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles size={12} />
                    <span>Our Promise</span>
                  </div>
                  <p className="text-gray-300 text-[11px] italic leading-relaxed font-medium">
                    "Bringing top-tier dining right to your door with fresh ingredients and lightning-fast delivery."
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/10">
                  <span className="text-orange-500 font-extrabold text-[10px] uppercase tracking-wider">
                    DineExpress Signature
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                    <Star size={12} className="fill-yellow-400" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - Stacked Cards */}
            <div className="w-1/2 flex flex-col gap-4">
              
              {/* RAMEN - Top Right Card */}
              <div className="w-full h-[220px] relative rounded-[28px] overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 rotate-2 hover:rotate-0 hover:z-20 group">
                <img
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800"
                  alt="Ramen"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* SUSHI - Bottom Right Card */}
              <div className="w-full h-[220px] relative rounded-[28px] overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 -rotate-1 hover:rotate-0 hover:z-20 group">
                <img
                  src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800"
                  alt="Sushi"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-white text-xs font-semibold z-10">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>4.9 Rated</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;