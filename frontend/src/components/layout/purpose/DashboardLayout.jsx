import { cn } from '../../../utils/helpers';
import AppLayout from '../AppLayout';

/**
 * DashboardLayout
 * - For: profile/orders/wishlist/rewards/notifications/settings/policies/help
 * - Comfortable reading width and section rhythm
 */
export default function DashboardLayout({
  children,
  showFooter = true,
  className,
  containerMaxWidth = '4xl',
}) {
  return (
    <AppLayout showFooter={showFooter}>
      <div className={cn('min-h-screen bg-[#050505] text-white', className)}>
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[#FF7A00]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-white/[0.05] blur-[90px] rounded-full pointer-events-none" />

        <div className="pt-24 sm:pt-28 pb-16">
          <div
            className={cn(
              'w-full mx-auto px-4 sm:px-6 lg:px-8',
              containerMaxWidth === '4xl' && 'max-w-4xl',
              containerMaxWidth === 'lg' && 'max-w-lg',
              containerMaxWidth === '5xl' && 'max-w-5xl',
              containerMaxWidth === '6xl' && 'max-w-6xl'
            )}
          >
            {children}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

