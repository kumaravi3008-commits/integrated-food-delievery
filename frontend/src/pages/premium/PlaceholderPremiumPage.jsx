import PremiumPageShell from './PremiumPageShell';

export default function PlaceholderPremiumPage({
  title,
  subtitle,
  children,
}) {
  return (
    <PremiumPageShell title={title} subtitle={subtitle}>
      {children ? (
        children
      ) : (
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 text-white/70 text-sm leading-relaxed">
          This is a premium placeholder page for <span className="text-white font-bold">{title}</span>.
          <div className="mt-3">
            UI is created to match the established premium identity. Wire real data and interactions next.
          </div>
        </div>
      )}
    </PremiumPageShell>
  );
}

