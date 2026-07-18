import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { loginUser } from '../../../redux/slices/authSlice';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import PageLayout from '../../../components/layout/PageLayout';

export default function LoginShell() {
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
      const action = await dispatch(loginUser({ email, password }));
      unwrapResult(action);
      window.location.assign('/home');
    } catch (err) {
      setError(typeof err === 'string' ? err : err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumPageShell
      title="Login"
      subtitle="Sign in to continue using DineExpress."
      layout="auth"
    >
      <PageLayout.Centered>
        <PremiumCard className="p-6 sm:p-8 w-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-extrabold text-white/80 mb-2">Email</div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <div className="text-sm font-extrabold text-white/80 mb-2">Password</div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {error ? (
              <div className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3">
                {error}
              </div>
            ) : null}

            <Button disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Login'}
            </Button>

            <div className="text-xs text-white/60 leading-relaxed text-center">
              Don't have an account?{' '}
              <a className="text-[#FF7A00] font-extrabold" href="/register">
                Register
              </a>
            </div>

            <div className="text-xs text-white/60 leading-relaxed text-center">
              Forgot password?{' '}
              <a className="text-[#FF7A00] font-extrabold" href="/forgot-password">
                Reset it
              </a>
            </div>
          </form>
        </PremiumCard>
      </PageLayout.Centered>
    </PremiumPageShell>
  );
}

