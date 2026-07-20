import { cn } from '../../utils/helpers';

export default function Button({
  children,
  type = 'submit',
  disabled = false,
  className,
  variant = 'primary',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-bold transition-all duration-200 focus:outline-none';

  const variants = {
    primary:
      'bg-[#FF7A00] hover:bg-[#d96600] text-black disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-white/10 border border-white/20 hover:bg-white/15 text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent hover:bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

