import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewport } from "./animations";
import { TESTIMONIALS } from "./homeData";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center max-w-xl mb-16 sm:mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00] mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            What our diners say
          </h2>
        </motion.div>

        <div
          className="relative w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#161616]/70 backdrop-blur-xl border border-[#2A2A2A] rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center gap-5"
            >
              <Quote className="w-8 h-8 text-[#FF7A00]/50" />
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl">
                "{current.comment}"
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating
                        ? "fill-[#FFB800] text-[#FFB800]"
                        : "text-[#2A2A2A]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#2A2A2A]"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{current.name}</p>
                  <p className="text-xs text-gray-500">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF7A00] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-[#FF7A00]" : "w-1.5 bg-[#2A2A2A]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF7A00] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
