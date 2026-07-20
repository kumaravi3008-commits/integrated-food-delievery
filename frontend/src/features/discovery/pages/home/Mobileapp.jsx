import { motion } from "framer-motion";
import { Apple, PlayCircle, QrCode, CheckCircle2 } from "lucide-react";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  fadeUp,
  floatLoop,
} from "./animations";

const APP_FEATURES = [
  "Order in three taps with saved addresses",
  "Live map tracking from kitchen to door",
  "Book tables and manage reservations",
  "Wallet, cashback, and loyalty rewards",
];

export default function MobileApp() {
  return (
<section className="relative w-full bg-black flex justify-center items-center py-16 md:py-24 border-b border-neutral-900/50 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF7A00]/10 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        {/* LEFT: phone with floating screenshots */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="relative h-[420px] flex items-center justify-center order-2 lg:order-1"
        >
          <motion.div
            animate={floatLoop(14, 5)}
            className="relative w-[220px] h-[400px] rounded-[2.5rem] bg-[#111111] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden z-10"
          >
            {/* The Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a1a] rounded-b-2xl z-20" />

            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=80"
              alt="App order screen"
              className="w-full h-40 object-cover mt-2"
            />

            <div className="p-4 space-y-4">
              <div className="h-3 w-2/3 bg-[#2A2A2A] rounded-full" />
              <div className="h-9 w-full rounded-xl bg-[#FF7A00]" />

              {/* MOCK LIST */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A2A2A]" />
                  <div className="h-2 w-20 bg-[#2A2A2A] rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A2A2A]" />
                  <div className="h-2 w-24 bg-[#2A2A2A] rounded-full" />
                </div>
              </div>

              {/* NEW: App Store / Play Store Mock Section */}
              <div className="mt-6 pt-6 border-t border-[#2A2A2A] flex flex-col items-center gap-2">
                <div className="h-2 w-16 bg-[#2A2A2A] rounded-full mb-1" />{" "}
                {/* "Available on" text */}
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-[#2A2A2A] rounded-md" />{" "}
                  {/* App Store Button */}
                  <div className="h-7 w-20 bg-[#2A2A2A] rounded-md" />{" "}
                  {/* Play Store Button */}
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-3 h-3 bg-[#FF7A00] rounded-sm" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={floatLoop(12, 4.8, 0.7)}
            className="absolute right-0 bottom-4 w-24 h-40 rounded-2xl bg-[#161616] border border-[#2A2A2A] shadow-xl overflow-hidden hidden sm:block"
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&auto=format&fit=crop&q=80"
              alt="App screenshot"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
          className="flex flex-col gap-6 order-1 lg:order-2"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-3">
              Get the app
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Your next meal is one tap away
            </h2>
          </div>

          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-3"
          >
            {APP_FEATURES.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-white text-black font-semibold text-sm px-5 py-3 rounded-xl"
            >
              <Apple className="w-4 h-4" />
              App Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-[#161616] border border-[#2A2A2A] text-white font-semibold text-sm px-5 py-3 rounded-xl"
            >
              <PlayCircle className="w-4 h-4 text-[#FF7A00]" />
              Google Play
            </motion.button>

            <div className="flex items-center gap-2.5 bg-[#161616] border border-[#2A2A2A] px-3 py-2 rounded-xl">
              <QrCode className="w-8 h-8 text-gray-300" />
              <span className="text-[11px] text-gray-500 max-w-[80px] leading-tight">
                Scan to download
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
