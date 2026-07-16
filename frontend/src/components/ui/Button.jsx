

import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';



const variants = {
  primary:
    'bg-[#FF7A00] hover:bg-[#FF8F1F] text-white shadow-[0_12px_40px_-12px_rgba(255,122,0,0.55)]',
  secondary:
    'bg-white/10 hover:bg-white/15 border border-white/15 text-white',
  ghost: 'bg-transparent hover:bg-white/5 text-white border border-transparent',
  danger: 'bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300',
};

const sizes = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-5 text-[12px]',
  lg: 'h-12 px-6 text-[13px]',
};

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
