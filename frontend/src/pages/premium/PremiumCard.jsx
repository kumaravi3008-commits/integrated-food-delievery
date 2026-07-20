import { cn } from '../../utils/helpers';

export default function PremiumCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

