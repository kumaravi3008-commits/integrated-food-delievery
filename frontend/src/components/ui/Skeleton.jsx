import { cn } from '../../utils/helpers';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-white/[0.06] border border-white/[0.04]',
        className
      )}
      aria-hidden="true"
    />
  );
}
