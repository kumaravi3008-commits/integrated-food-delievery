import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { registerUser } from '../../../redux/slices/authSlice';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function RegisterShell() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const action = await dispatch(registerUser({ email, password }));
      unwrapResult(action);
      window.location.assign('/home');
    } catch (err) {
      setError(typeof err === 'string' ? err : err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumPageShell
      title="Register"
      subtitle="Create your account in minutes."
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
              <div className="text-sm font-extrabold text-white/80">Password</div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <Button disabled={loading} className="mt-2">
              {loading ? 'Creating...' : 'Create Account'}
            </Button>

            <div className="text-xs text-white/60 leading-relaxed mt-2">
              Already have an account?{' '}
              <a className="text-[#FF7A00] font-extrabold" href="/login">
                Login
              </a>
            </div>
          </form>
        </PremiumCard>
      </div>
    </PremiumPageShell>
  );
}

