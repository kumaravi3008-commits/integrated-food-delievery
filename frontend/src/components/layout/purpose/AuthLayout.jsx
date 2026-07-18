import { cn } from '../../../utils/helpers';
import AppLayout from '../AppLayout';

/**
 * AuthLayout
 * - For: Login/Register/Forgot/Reset/Otp
 * - Compact centered card with fixed max width
 */
export default function AuthLayout({
  children,
  showFooter = false,
  className,
  cardMaxWidth = '28rem',
}) {
  return (
    <AppLayout showFooter={showFooter}>
      <div className={cn('min-h-screen w-full bg-[#050505] text-white', className)}>
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[#FF7A00]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-white/[0.05] blur-[90px] rounded-full pointer-events-none" />

        {/* Account for absolute navbar */}
        <div className="pt-24 sm:pt-28 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div style={{ maxWidth: cardMaxWidth }} className="w-full">
            {children}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

