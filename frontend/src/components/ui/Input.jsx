import { cn } from '../../utils/helpers';

export default function Input({
  label,
  id,
  error,
  className,
  type = 'text',
  ...props
}) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          'w-full h-12 rounded-xl bg-white/[0.04] border border-[#2A2A2A] px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF7A00]/60 focus:ring-1 focus:ring-[#FF7A00]/30 transition-colors',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
