import { motion } from "framer-motion";
import { Store, ShoppingBag, PackageCheck } from "lucide-react";
import { staggerContainer, fadeUp, viewport } from "./animations";
import { STEPS } from "./homeData";

const STEP_ICONS = [Store, ShoppingBag, PackageCheck];

export default function HowItWorks() {
  return (
    <section className="relative w-full py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center max-w-xl mx-auto"
          style={{ paddingTop: "2rem", marginBottom: "8rem" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-4">
            Simple by design
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-4">
            How it works
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.2)}
          className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 w-full justify-items-center"
        >
          {/* Connecting dotted line, desktop only */}
          <div className="hidden sm:block absolute top-9 left-[16.5%] right-[16.5%] h-px border-t-2 border-dotted border-[#2A2A2A]" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ originX: 0 }}
            className="hidden sm:block absolute top-9 left-[16.5%] right-[16.5%] h-px border-t-2 border-dotted border-[#FF7A00]"
          />

          {STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx];
            return (
              <motion.div
                key={step.id}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center"
                >
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FF7A00] text-white text-[11px] font-bold flex items-center justify-center">
                    {step.id}
                  </div>
                  <Icon className="w-7 h-7 text-[#FF7A00]" />
                </motion.div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}