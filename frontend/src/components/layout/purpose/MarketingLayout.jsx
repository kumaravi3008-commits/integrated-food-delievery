import { cn } from '../../../utils/helpers';
import AppLayout from '../AppLayout';

/**
 * MarketingLayout
 * - For: Welcome/Home/Discovery landing-style pages
 * - Ensures generous vertical rhythm + consistent container
 */
export default function MarketingLayout({
  showFooter = true,
  children,
  containerMaxWidth = '7xl',
  className,
}) {
  return (
    <AppLayout showFooter={showFooter}>
      <div className={cn('min-h-screen bg-[#050505] text-white', className)}>
        {/* Top padding accounts for absolute navbar */}
        <div className="pt-24 sm:pt-28">
          <div
            className={cn(
              'w-full mx-auto px-4 sm:px-6 lg:px-8',
              'max-w-7xl',
              containerMaxWidth === '6xl' && 'max-w-6xl',
              containerMaxWidth === '7xl' && 'max-w-7xl',
              containerMaxWidth === 'full' && 'max-w-full'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

