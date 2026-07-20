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
  className,
}) {
  return (
    <AppLayout showFooter={showFooter}>
      <div className={cn('min-h-screen bg-[#050505] text-white', className)}>
        {/* Top padding accounts for absolute navbar */}
<div className="pt-24 sm:pt-28">
          <div className="w-full max-w-full">
            {children}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

