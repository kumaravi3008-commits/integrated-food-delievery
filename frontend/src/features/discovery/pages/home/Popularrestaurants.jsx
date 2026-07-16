import { motion } from "framer-motion";
import { Star, Clock, MapPin, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { RESTAURANTS } from "./homeData";

export default function PopularRestaurants() {
  const [liked, setLiked] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section id="restaurants" className="relative w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center max-w-xl"
          style={{
            paddingTop: "2rem",
            marginBottom: "8rem",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-4">
            Highly rated
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-4">
            Popular restaurants near you
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {RESTAURANTS.map((res) => (
            <motion.div
              key={res.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col transition-colors hover:border-[#FF7A00]/40"
            >
              <div className="relative h-40 overflow-hidden">
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

              <div className="p-4 flex flex-col gap-3 flex-1">
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

                <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-[#2A2A2A] pt-3">
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
                  className="mt-1 bg-[#FF7A00] hover:bg-[#FF8F1F] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
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
