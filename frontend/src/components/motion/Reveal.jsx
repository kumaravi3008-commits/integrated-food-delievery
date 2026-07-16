import { motion } from 'framer-motion';

// Lightweight, tasteful reveal wrapper.
// Usage:
// <Reveal><div>...</div></Reveal>
export default function Reveal({
  children,
  as: Component = motion.div,
  className,
  delay = 0,
  duration = 0.65,
  y = 18,
  x = 0,
  ...props
}) {
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

