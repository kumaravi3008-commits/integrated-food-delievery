import PremiumPageShell from './PremiumPageShell';
import PageLayout from '../../components/layout/PageLayout';

export default function PlaceholderPremiumPage({
  title,
  subtitle,
  children,
  layout = 'default',
}) {
  const placeholder = (
    <PageLayout.ContentCard>
      <div className="text-white font-bold text-base mb-2">{title}</div>
      <div>This is a premium placeholder page. Wire real data and interactions next.</div>
    </PageLayout.ContentCard>
  );

  const fallbackContent = (() => {
    if (children) return children;
    if (layout === 'ecommerce') {
      return <PageLayout.Ecommerce>{placeholder}</PageLayout.Ecommerce>;
    }
    if (layout === 'dashboard') {
      return <PageLayout.DashboardCard>{placeholder}</PageLayout.DashboardCard>;
    }
    if (layout === 'content') {
      return (
        <div className="text-white/80 text-sm sm:text-base leading-relaxed">
          <div className="text-white font-bold text-base mb-2">{title}</div>
          <div>This is a premium placeholder page. Wire real data and interactions next.</div>
        </div>
      );
    }
    return <PageLayout.Centered maxWidth="lg">{placeholder}</PageLayout.Centered>;
  })();

  return (
    <PremiumPageShell title={title} subtitle={subtitle} layout={layout}>
      {fallbackContent}
    </PremiumPageShell>
  );
}
