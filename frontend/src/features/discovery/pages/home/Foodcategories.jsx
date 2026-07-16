import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { CATEGORIES } from "./homeData";

export default function FoodCategories() {
  return (
    <section className="relative w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center max-w-xl mb-14"
          style={{ paddingTop: "2rem", marginBottom: "8rem" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-3">
            Craving something?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
            Browse by category
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.06)}
          className="w-full overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-9 w-max mx-auto px-2">
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
                  className="flex flex-col items-center justify-center gap-3 w-32 h-32 shrink-0 rounded-2xl bg-[#161616] border border-[#2A2A2A] cursor-pointer transition-colors hover:border-[#FF7A00]/50"
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
