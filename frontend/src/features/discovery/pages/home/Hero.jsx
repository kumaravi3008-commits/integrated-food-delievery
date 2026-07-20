import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Search } from "lucide-react";

export default function Hero({ searchMode = "order", setSearchMode }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const blobX = useTransform(springX, [-1, 1], [-24, 24]);
  const blobY = useTransform(springY, [-1, 1], [-24, 24]);
  const blobX2 = useTransform(springX, [-1, 1], [20, -20]);
  const blobY2 = useTransform(springY, [-1, 1], [20, -20]);

  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("query", searchQuery.trim());
    if (location.trim()) params.set("location", location.trim());
    params.set("mode", searchMode);
    const qs = params.toString();
    navigate(`/restaurants?${qs}`);
  };

  useEffect(() => {
    const handleMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    };
    const node = sectionRef.current;
    node?.addEventListener("mousemove", handleMove);
    return () => node?.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
<section
      ref={sectionRef}
      id="home"
      className="w-full bg-black flex justify-center px-6 md:px-12 border-b border-neutral-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          style={{ x: blobX, y: blobY }}
          className="absolute -top-32 left-[8%] w-[420px] h-[420px] rounded-full bg-[#FF7A00]/20 blur-[120px]"
        />
        <motion.div
          style={{ x: blobX2, y: blobY2 }}
          className="absolute bottom-0 right-[5%] w-[380px] h-[380px] rounded-full bg-[#FFB800]/15 blur-[120px]"
        />
      </div>

<div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* LEFT COLUMN: Text & Search Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="inline-block text-orange-500 uppercase font-bold text-xs tracking-wider mb-4">
            Every Cuisine. Every Restaurant. Every Time.
          </span>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl mb-4">
            Dine Your Favorites. <br />
            <span className="text-orange-500">
              Express Your Cravings.
            </span>
          </h1>

          <p className="text-neutral-400 text-sm md:text-base max-w-lg leading-relaxed mb-8">
            Dine Express: Order, book, and collect—the future of dining in one tap.
          </p>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => setSearchMode("order")}
              className={`group relative overflow-hidden min-w-[180px] px-8 py-4 rounded-2xl font-medium text-xs uppercase tracking-[0.12em] transition-all duration-300 backdrop-blur-2xl border ${
                searchMode === "order"
                  ? "bg-gradient-to-r from-[#FF7A00]/35 via-[#FF8A00]/25 to-[#FF7A00]/20 border-[#FF8A00]/70 text-white shadow-[0_15px_45px_rgba(255,122,0,0.35)]"
                  : "bg-white/[0.05] border-white/10 text-gray-300 hover:bg-[#FF7A00]/10 hover:border-[#FF7A00]/40 hover:text-white"
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/40" />
              <span className="relative flex items-center justify-center gap-2">
                Order Food
              </span>
            </button>

            <button
              onClick={() => setSearchMode("explore")}
              className={`group relative overflow-hidden min-w-[180px] px-8 py-4 rounded-2xl font-medium text-xs uppercase tracking-[0.12em] transition-all duration-300 backdrop-blur-2xl border ${
                searchMode === "explore"
                  ? "bg-gradient-to-r from-[#FF7A00]/35 via-[#FF8A00]/25 to-[#FF7A00]/20 border-[#FF8A00]/70 text-white shadow-[0_15px_45px_rgba(255,122,0,0.35)]"
                  : "bg-white/[0.05] border-white/10 text-gray-300 hover:bg-[#FF7A00]/10 hover:border-[#FF7A00]/40 hover:text-white"
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/40" />
              <span className="relative flex items-center justify-center gap-2">
                Explore Restaurants
              </span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-xl bg-[#111111]/80 backdrop-blur-xl border border-[#2A2A2A] rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2 shadow-2xl">
            <div className="flex items-center gap-2.5 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#2A2A2A] sm:w-[34%]">
              <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
              />
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 flex-1">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder={searchMode === "order" ? "Search for your favorite flavors..." : "Find a table or order food..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
              />
            </div>
            <button type="submit" className="bg-[#FF7A00] text-white text-sm font-semibold px-6 py-3 rounded-xl shrink-0">
              Search
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Phone Graphic */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/40 font-medium tracking-[0.2em] uppercase text-[10px]">
              Live App Preview
            </p>

            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-[300px] h-[580px] rounded-[3.5rem] bg-[#0B0B0F] border-[8px] border-[#1A1A1A] shadow-2xl overflow-hidden relative"
            >
              <div className="p-6 h-full flex flex-col gap-5">
                <div className="flex justify-center pt-2">
                  <h1 className="text-[#FF7A00] font-black text-2xl italic tracking-tight uppercase">
                    DINE EXPRESS
                  </h1>
                </div>

                <div className="space-y-3">
                  <div className="w-full h-48 rounded-3xl bg-[#1A1A1A] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <div>
                      <h4 className="text-white font-bold text-sm">Gourmet Hawaiian</h4>
                      <p className="text-[#FF7A00] text-[10px] font-semibold">4.8 ★ • 25 mins</p>
                    </div>
                    <button className="bg-[#FF7A00] text-white text-[10px] font-bold px-4 py-2 rounded-xl">ORDER</button>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Trending Near You</h3>
                  {[
                    { name: "Domino's", time: "20 mins", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=100" },
                    { name: "Pizza Hut", time: "25 mins", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100" },
                    { name: "KFC", time: "15 mins", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100" },
                    { name: "Manthi House", time: "35 mins", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=100" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 bg-[#1A1A1A] p-2.5 rounded-2xl items-center border border-[#2A2A2A]">
                      <img src={item.img} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="text-white text-[11px] font-bold">{item.name}</p>
                        <p className="text-gray-500 text-[9px]">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
