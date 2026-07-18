import { cn } from '../../../utils/helpers';
import AppLayout from '../AppLayout';

/**
 * CheckoutLayout
 * - For: cart/checkout/payment/order tracking/confirmation
 * - Provides consistent wide container and spacing for two-column content
 */
export default function CheckoutLayout({
  children,
  showFooter = true,
  className,
  containerMaxWidth = '7xl',
}) {
  return (
    <AppLayout showFooter={showFooter}>
      <div className={cn('min-h-screen bg-[#050505] text-white', className)}>
        <div className="pt-24 sm:pt-28">
          <div
            className={cn(
              'w-full mx-auto px-4 sm:px-6 lg:px-8',
              'max-w-7xl',
              containerMaxWidth === '6xl' && 'max-w-6xl',
              containerMaxWidth === '7xl' && 'max-w-7xl'
            )}
          >
            {children}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

