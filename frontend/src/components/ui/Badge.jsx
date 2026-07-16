import { cn } from '../../utils/helpers';

const tones = {
  orange: 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30',
  gold: 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30',
  muted: 'bg-white/5 text-gray-300 border-white/10',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  danger: 'bg-red-500/15 text-red-300 border-red-500/30',
};

export default function Badge({ children, tone = 'orange', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
