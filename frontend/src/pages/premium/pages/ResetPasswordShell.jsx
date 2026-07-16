import { useState } from 'react';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import * as authApi from '../../../services/authService';

export default function ResetPasswordShell() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await authApi.resetPassword({ email, newPassword });
      setSuccess('Password has been reset. You can now login.');
      setTimeout(() => {
        window.location.assign('/login');
      }, 1200);
    } catch (err) {
      setError(err?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumPageShell
      title="Reset Password"
      subtitle="Set your new password."
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

            <div>
              <div className="text-sm font-extrabold text-white/80">New Password</div>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="At least 6 characters"
                required
              />
            </div>

            {error ? (
              <div className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="text-sm text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3">
                {success}
              </div>
            ) : null}

            <Button disabled={loading} className="mt-2">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </PremiumCard>
      </div>
    </PremiumPageShell>
  );
}

