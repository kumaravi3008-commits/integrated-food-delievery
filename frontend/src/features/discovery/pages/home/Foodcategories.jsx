import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { CATEGORIES } from "./homeData";

export default function FoodCategories() {
  return (
<section className="w-full bg-black flex justify-center items-center py-16 md:py-24 border-b border-neutral-900/50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-10 md:mb-14 gap-3"
        >
          <span className="text-orange-500 font-bold uppercase text-xs tracking-widest px-3.5 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            CRAVING SOMETHING?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Browse by category
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.06)}
          className="w-full"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  variants={fadeUp}
                  whileHover={{
                    rotateX: 8,
                    rotateY: -8,
                    scale: 1.06,
                    boxShadow: "0 25px 50px -20px rgba(255,122,0,0.4)",
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                  onClick={() => (window.location.href = '/categories')}
                  className="flex flex-col items-center justify-center gap-3 w-full aspect-square rounded-2xl bg-[#161616] border border-[#2A2A2A] cursor-pointer transition-colors hover:border-[#FF7A00]/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-11 h-11 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/25 flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-[#FF7A00]" />
                  </motion.div>
                  <span className="text-xs font-medium text-gray-300 text-center px-2">
                    {cat.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
