// Reusable Framer Motion variants shared across all homepage sections.
// Import only what a component needs to keep bundles lean.

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const textReveal = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Continuous floating animation — spread via `animate`, not scroll-triggered.
export const floatLoop = (distance = 14, duration = 4, delay = 0) => ({
  y: [0, -distance, 0],
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});

export const floatLoopRotate = (distance = 10, rotation = 6, duration = 5, delay = 0) => ({
  y: [0, -distance, 0],
  rotate: [0, rotation, 0],
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});

export const pulseLoop = {
  scale: [1, 1.06, 1],
  opacity: [0.7, 1, 0.7],
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
};

export const hoverLift = {
  y: -8,
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const hoverGlowShadow = "0 20px 60px -15px rgba(255,122,0,0.35)";

export const viewport = { once: true, amount: 0.2 };