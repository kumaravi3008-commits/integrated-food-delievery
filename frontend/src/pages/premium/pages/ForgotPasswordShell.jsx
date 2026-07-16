import { useState } from 'react';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

// Backend read-only currently exposes only `POST /auth/reset-password` (no OTP/send-link endpoint).
// This screen will still collect email and use reset-password flow if a `newPassword` is provided.

export default function ForgotPasswordShell() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      setInfo('Use “Reset Password” to set a new password in this backend version.');
      setTimeout(() => {
        window.location.assign(`/reset-password?email=${encodeURIComponent(email || '')}`);
      }, 1000);
    } catch (err) {
      setError(err?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumPageShell
      title="Forgot Password"
      subtitle="Request a password reset link."
    >
      <div className="w-full max-w-md mx-auto">
        <PremiumCard className="p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <div className="text-sm font-extrabold text-white/80">Email</div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {error ? (
              <div className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3">
                {error}
              </div>
            ) : null}

            {info ? (
              <div className="text-sm text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3">
                {info}
              </div>
            ) : null}

            <Button disabled={loading} className="mt-2">
              {loading ? 'Redirecting...' : 'Continue'}
            </Button>
          </form>
        </PremiumCard>
      </div>
    </PremiumPageShell>
  );
}

