import { motion } from "framer-motion";
import { Star, Clock, MapPin, Heart, Eye } from "lucide-react";
import { useState, useMemo } from "react";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { RESTAURANTS } from "./homeData";

export default function PopularRestaurants({ filterType = "all" }) {
  const [liked, setLiked] = useState([]);

  const filteredRestaurants = useMemo(() => {
    if (filterType === "all") return RESTAURANTS;
    return RESTAURANTS.filter((r) => r.type === filterType);
  }, [filterType]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
<section id="restaurants" className="w-full bg-black py-16 md:py-20 flex justify-center px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center"
        >
          <span className="text-orange-500 uppercase font-bold text-xs tracking-wider block mb-2">
            Highly rated
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Popular restaurants near you
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {filteredRestaurants.map((res) => (
            <motion.div
              key={res.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col transition-colors hover:border-[#FF7A00]/40 h-full"
            >
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <motion.img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-2.5 left-2.5 bg-[#050505]/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-[#FFB800] border border-[#2A2A2A]">
                  {res.offer}
                </div>
                <button
                  onClick={() => toggleLike(res.id)}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-[#050505]/90 backdrop-blur-md rounded-lg border border-[#2A2A2A]"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      liked.includes(res.id)
                        ? "fill-[#FF7A00] text-[#FF7A00]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ scale: 1.03 }}
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-300 flex items-center gap-1.5 bg-white/95 text-black text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                >
                  <Eye className="w-3 h-3" />
                  Quick view
                </motion.button>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white leading-tight">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFB800] shrink-0">
                      <Star className="w-3 h-3 fill-[#FFB800]" />
                      {res.rating}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{res.cuisine}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-[#2A2A2A] pt-3 mt-auto">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FF7A00]" />
                    {res.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {res.distance}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => (window.location.href = `/restaurants/${res.id}`)}
                  className="bg-[#FF7A00] hover:bg-[#FF8F1F] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors w-full"
                >
                  Order now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
