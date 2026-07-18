import PremiumPageShell from '../PremiumPageShell';
import PageLayout from '../../../components/layout/PageLayout';
import PremiumCard from '../PremiumCard';

export default function OtpShell() {
  return (
    <PremiumPageShell
      title="OTP Verification"
      subtitle="Enter the OTP sent to your phone/email."
      layout="auth"
    >
      <PageLayout.Centered>
        <PremiumCard className="p-6 sm:p-8">
          <div className="text-white font-bold text-base mb-3">OTP Verification</div>
          <div className="mb-3 text-white/70 text-sm leading-relaxed">
            OTP verification screen is a UI placeholder for this backend version.
          </div>
          <div className="text-white/70 text-sm">
            Use Login/Register/Reset Password flows to access your account.
          </div>
        </PremiumCard>
      </PageLayout.Centered>
    </PremiumPageShell>
  );
}
