export default function PremiumCard({
  children,
  className = '',
}) {
  return (
    <div
      className={
        `rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl ${className}`
      }
    >
      {children}
    </div>
  );
}

