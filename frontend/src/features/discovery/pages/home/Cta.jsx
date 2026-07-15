import { motion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import { fadeUp, viewport } from "./animations";

export default function CTA() {
  return (
    <section className="relative w-full py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[2rem] border border-[#2A2A2A] bg-[#111111]/80 backdrop-blur-xl px-8 py-16 sm:px-16 sm:py-20 flex flex-col items-center text-center gap-8"
        >
          {/* Animated gradient + floating blobs */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(255,122,0,0.18), transparent 60%)",
                "radial-gradient(circle at 80% 40%, rgba(255,184,0,0.18), transparent 60%)",
                "radial-gradient(circle at 40% 80%, rgba(255,122,0,0.18), transparent 60%)",
                "radial-gradient(circle at 20% 20%, rgba(255,122,0,0.18), transparent 60%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[#FF7A00]/20 blur-[90px] pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#FFB800]/15 blur-[90px] pointer-events-none"
          />

          <h2 className="relative font-display text-3xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
            Ready to experience better food delivery?
          </h2>
          <p className="relative text-gray-400 max-w-md">
            Join thousands of diners already ordering smarter and booking
            faster, every single day.
          </p>

          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 20px 50px -15px rgba(255,122,0,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-[#FF7A00] text-white font-semibold text-sm px-7 py-3.5 rounded-xl"
            >
              Order now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "#FF7A00" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-transparent border border-[#2A2A2A] text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" />
              Become a partner
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}