export default function PremiumCard({
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
