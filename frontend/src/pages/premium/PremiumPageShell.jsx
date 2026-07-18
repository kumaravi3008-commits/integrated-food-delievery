import PageLayout from '../../components/layout/PageLayout';
import LayoutProvider from '../../components/layout/purpose/LayoutProvider';

export default function PremiumPageShell({
  title,
  subtitle,
  children,
  layout = 'default',
  noHeader = false,
}) {
  const hasHeader = !noHeader && (title || subtitle);

  // Map legacy PremiumPageShell layout values -> purpose wrappers.
  // Keep the same overall header rhythm/padding so completed styling remains stable.
  const purpose = (() => {
    switch (layout) {
      case 'auth':
        return 'auth';
      case 'dashboard':
        return 'dashboard';
      case 'checkout':
      case 'ecommerce':
        return 'checkout';
      case 'marketing':
        return 'marketing';
      case 'content':
      case 'detail':
      default:
        return 'marketing';
    }
  })();



  const header = hasHeader ? (
    <PageLayout.Header title={title} subtitle={subtitle} center />
  ) : null;

  return (
    <LayoutProvider purpose={purpose}>
      <div className="min-h-screen w-full bg-[#050505] text-white">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[#FF7A00]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-white/[0.05] blur-[90px] rounded-full pointer-events-none" />

        {hasHeader && (
          <div className="relative pt-28 sm:pt-32 pb-4">
            <PageLayout maxWidth="full">{header}</PageLayout>
          </div>
        )}

        {layout === 'auth' ? (
          <div className="relative w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-0 pb-10">
            <div className="w-full max-w-md">{children}</div>
          </div>
        ) : (
          <PageLayout maxWidth="full">{children}</PageLayout>
        )}
      </div>
    </LayoutProvider>
  );
}
