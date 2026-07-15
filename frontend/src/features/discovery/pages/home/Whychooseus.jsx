import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Users, MapPinned, Package } from "lucide-react";
import { fadeLeft, fadeRight, staggerContainer, fadeUp } from "./animations";
import { STATS } from "./homeData";

const STAT_ICONS = [Building2, Users, MapPinned, Package];

function CountUpNumber({ target, suffix, isInView }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  const display =
    target >= 1000 ? `${Math.floor(value / 1000).toLocaleString()}K` : value.toLocaleString();

  return (
    <span className="font-display text-3xl sm:text-4xl font-bold text-white">
      {display}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT: illustration */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#2A2A2A]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80"
              alt="Chef plating a dish"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-gray-400">Avg. rating</p>
            <p className="text-lg font-bold text-white">4.8 / 5</p>
          </motion.div>
        </motion.div>

        {/* RIGHT: stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-3">
              Why choose us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Trusted by diners across the country
            </h2>
            <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
              From late-night cravings to weekend reservations, we've built
              the infrastructure so every order and every table shows up
              exactly as promised.
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {STATS.map((stat, idx) => {
              const Icon = STAT_ICONS[idx];
              return (
                <motion.div
                  key={stat.id}
                  variants={fadeUp}
                  className="flex flex-col gap-2 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-5"
                >
                  <Icon className="w-5 h-5 text-[#FF7A00] mb-1" />
                  <CountUpNumber target={stat.value} suffix={stat.suffix} isInView={isInView} />
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}