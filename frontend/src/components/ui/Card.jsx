import { cn } from '../../utils/helpers';

import { motion } from 'framer-motion';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        'rounded-3xl border border-[#2A2A2A] bg-[#161616]/60 backdrop-blur-xl',
        hover &&
          'transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-[0_20px_60px_-20px_rgba(255,122,0,0.35)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>


  );
}
