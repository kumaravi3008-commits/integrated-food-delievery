import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { FEATURES } from "./homeData";

export default function Features() {
  return (
    <section className="relative w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center max-w-xl mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-3">
            Why it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Built for how you actually eat
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
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
                className="group relative rounded-2xl border border-[#2A2A2A] bg-[#161616]/60 backdrop-blur-xl p-6 overflow-hidden transition-colors"
              >
                {/* Gradient border glow on hover */}
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
                <p className="relative text-sm text-gray-400 leading-relaxed">
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