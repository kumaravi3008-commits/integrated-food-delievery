import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { FEATURES } from "./homeData";

export default function Features() {
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
            WHY IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built for how you actually eat
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 60px -20px rgba(255,122,0,0.35)",
                  borderColor: "rgba(255,122,0,0.4)",
                }}
                className="group relative rounded-3xl border border-[#2A2A2A] bg-[#161616]/60 backdrop-blur-xl p-8 sm:p-10 overflow-hidden transition-colors flex flex-col items-center text-center h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FF7A00]/10 via-transparent to-transparent pointer-events-none" />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/25 flex items-center justify-center mb-5"
                >
                  <Icon className="w-5 h-5 text-[#FF7A00]" />
                </motion.div>

                <h3 className="relative text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-gray-400 leading-relaxed max-w-[280px]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
