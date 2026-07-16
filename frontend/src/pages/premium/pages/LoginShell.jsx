import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { loginUser } from '../../../redux/slices/authSlice';

import PremiumPageShell from '../PremiumPageShell';
import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
      // App-level 401 handling + auth persistence will take over.
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
                placeholder="••••••••"
                required
              />
            </div>

            {error ? (
              <div className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3">
                {error}
              </div>
            ) : null}

            <Button disabled={loading} className="mt-2">
              {loading ? 'Signing in...' : 'Login'}
            </Button>

            <div className="text-xs text-white/60 leading-relaxed mt-2">
              Don’t have an account? Use <a className="text-[#FF7A00] font-extrabold" href="/register">Register</a>.
            </div>

            <div className="text-xs text-white/60 leading-relaxed">
              Forgot password?{' '}
              <a className="text-[#FF7A00] font-extrabold" href="/forgot-password">Reset it</a>.
            </div>
          </form>
        </PremiumCard>
      </div>
    </PremiumPageShell>
  );
}

