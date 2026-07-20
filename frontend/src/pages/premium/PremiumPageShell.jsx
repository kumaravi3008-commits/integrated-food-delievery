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
      {layout === 'auth' ? (
        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-0 pb-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      ) : (
        <div className="relative w-full">
          {hasHeader ? (
            <div className="pb-4">{header}</div>
          ) : null}
          {children}
        </div>
      )}
    </LayoutProvider>
  );
}

