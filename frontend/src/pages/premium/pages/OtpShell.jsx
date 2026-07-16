import PremiumPageShell from '../PremiumPageShell';

export default function OtpShell() {
  // Backend read-only inspected does not expose OTP verification routes in the files provided.
  // Keep UI route available; users will proceed via login/reset endpoints.
  return (
    <PremiumPageShell
      title="OTP Verification"
      subtitle="Enter the OTP sent to your phone/email."
    >
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 text-white/70 text-sm leading-relaxed">
        OTP verification screen is a UI placeholder for this backend version.
        <div className="mt-3">
          Use Login/Register/Reset Password flows to access your account.
        </div>
      </div>
    </PremiumPageShell>
  );
}

