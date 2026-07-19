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
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-3 block text-sm font-bold text-white/80"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        className={cn(
          `
          w-full
          h-14
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          text-[15px]
          text-white
          placeholder:text-white/35

          transition-all
          duration-300

          outline-none

          hover:border-white/20

          focus:border-[#FF7A00]
          focus:ring-2
          focus:ring-[#FF7A00]/25
          focus:bg-white/[0.06]

          disabled:opacity-60
          disabled:cursor-not-allowed
          `,
          error && 'border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}