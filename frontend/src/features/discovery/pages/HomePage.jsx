import React from "react";
import {
  MapPin,
  Zap,
  Star,
  Clock,
  Utensils,
  ChefHat,
  Sandwich,
  Cake,
  Coffee,
  Wine,
  Leaf,
  CheckCircle,
  MousePointer2,
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col bg-[#0a0a0a] items-center w-full min-h-screen">
      {/* Premium Floating Animations */}
      <style>{`
        @keyframes customFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-hero-float {
          animation: customFloat 6s ease-in-out infinite;
        }
      `}</style>

      {/* HERO SECTION - PERFECTLY BALANCED & CENTERED */}
      <section className="w-full max-w-7xl px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center relative z-10">
          {/* LEFT HEADER CONTENT Block */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight text-white">
              DineExpresses <br /> delivered at <br />
              <span className="text-[#D33F0F] italic font-serif">
                warp speed.
              </span>
            </h2>

            {/* Glassmorphic Description */}

            <p className="text-center md:text-center text-neutral-400 font-serif italic tracking-normal text-base md:text-lg leading-loose max-w-lg mx-auto opacity-90">
              Experience the next generation of culinary logistics. From local
              favorites to Michelin-starred delights.
            </p>

            {/* Glassmorphic Search Entry Bar */}
            <div className="relative flex items-center w-full group bg-white/[0.02] backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
              <MapPin className="absolute left-5 text-[#D33F0F]" size={20} />
              <input
                type="text"
                placeholder="Enter delivery address"
                className="w-full pl-12 pr-36 py-3.5 rounded-full bg-transparent text-white placeholder-gray-500 font-medium focus:outline-none text-sm"
              />
              <button className="absolute right-2 bg-[#D33F0F] hover:bg-[#B32D06] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider transition-all shrink-0">
                Find Food <Zap size={14} fill="white" />
              </button>
            </div>
          </div>

          {/* RIGHT ANIMATED HERO IMAGE FRAME */}
          <div className="relative w-full max-w-md flex justify-center items-center">
            <div className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-neutral-900 transition-all duration-700 animate-hero-float shadow-orange-950/10">
              <img
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800"
                alt="Burger and fries food layout"
                className="w-full object-cover h-[380px] md:h-[420px] lg:h-[460px] hover:scale-105 transition-transform duration-700"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="w-full bg-[#0a0a0a] border-y border-white/5 py-12 px-6 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col items-center">
          <h3 className="text-lg font-bold mb-8 text-neutral-400 uppercase tracking-widest text-center w-full">
            Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 w-full">
            {[
              { name: "Italian", icon: <Utensils /> },
              { name: "Asian", icon: <ChefHat /> },
              { name: "Burgers", icon: <Sandwich /> },
              { name: "Desserts", icon: <Cake /> },
              { name: "Coffee", icon: <Coffee /> },
              { name: "Cocktails", icon: <Wine /> },
              { name: "Healthy", icon: <Leaf /> },
            ].map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#141414] border border-white/5 text-gray-400 flex items-center justify-center group-hover:bg-[#D33F0F] group-hover:text-white group-hover:border-[#D33F0F] group-hover:scale-110 transition-all duration-300">
                  {React.cloneElement(cat.icon, { size: 20 })}
                </div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTS SECTION */}
      <section className="w-full bg-white py-16 px-6 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 text-center sm:text-left">
            <div>
              <h3 className="text-3xl font-extrabold text-black tracking-tight">
                Best of the Week
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Top-rated selections from our curators.
              </p>
            </div>
            <a
              href="#"
              className="text-[#D33F0F] font-bold text-sm border-b-2 border-transparent hover:border-[#D33F0F] transition-all pb-1"
            >
              View all choices →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            <RestaurantCard
              name="Sushi Zen Master"
              rating="4.9"
              tags="$$ • Japanese"
              time="15-25 min"
              img="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600"
            />
            <RestaurantCard
              name="Verace Pizzeria"
              rating="4.8"
              tags="$$ • Italian"
              time="20-30 min"
              img="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
            />
            <RestaurantCard
              name="Green Theory"
              rating="4.7"
              tags="$$ • Healthy"
              time="10-20 min"
              img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-neutral-50 border-t border-gray-100 py-16 px-6 flex justify-center">
        <div className="w-full max-w-7xl grid md:grid-cols-3 gap-12 text-center">
          <Feature
            icon={<MousePointer2 />}
            title="One-Tap Order"
            desc="Our smart prediction engine remembers your favorites for a frictionless checkout experience."
            color="bg-orange-50"
            text="text-orange-600"
          />
          <Feature
            icon={<Zap />}
            title="Warp Speed Delivery"
            desc="Real-time logistics optimization ensures your meal travels the shortest route in record time."
            color="bg-orange-50"
            text="text-orange-600"
          />
          <Feature
            icon={<CheckCircle />}
            title="Guaranteed Fresh"
            desc="Exclusive heat-map packaging keeps every dish at its peak temperature until the moment you eat."
            color="bg-green-50"
            text="text-green-600"
          />
        </div>
      </section>
    </div>
  );
};

// Internal Sub-Components
const RestaurantCard = ({ name, rating, tags, time, img }) => (
  <div className="bg-white rounded-[2rem] overflow-hidden group cursor-pointer border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto">
    <div className="relative h-56 overflow-hidden">
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-black shadow-sm">
        <Star size={12} className="fill-orange-500 text-orange-500" /> {rating}
      </div>
    </div>
    <div className="p-6 text-left">
      <h4 className="text-lg font-bold mb-1.5 text-black group-hover:text-[#D33F0F] transition-colors">
        {name}
      </h4>
      <div className="flex items-center gap-2.5 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
        <span>{tags}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-1">
          <Clock size={12} /> {time}
        </span>
      </div>
    </div>
  </div>
);

const Feature = ({ icon, title, desc, color, text }) => (
  <div className="flex flex-col items-center max-w-xs mx-auto">
    <div
      className={`w-12 h-12 ${color} ${text} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <h4 className="font-bold text-lg mb-2 text-black">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;
