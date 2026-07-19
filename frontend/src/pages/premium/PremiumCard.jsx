import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { loginUser } from '../../../redux/slices/authSlice';

import PremiumCard from '../PremiumCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function LoginShell() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const action = await dispatch(
        loginUser({
          email,
          password,
        })
      );

      unwrapResult(action);

      window.location.assign('/home');
    } catch (err) {
      setError(
        typeof err === 'string'
          ? err
          : err?.message || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505]">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[#FF7A00]/10 blur-[130px]" />

        <div className="absolute top-[120px] right-[-120px] w-[340px] h-[340px] rounded-full bg-[#FF9F1C]/10 blur-[120px]" />

        <div className="absolute bottom-[-120px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#FF7A00]/10 blur-[120px]" />

      </div>

      {/* Main */}

      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <PremiumCard
          className="
            w-full
            max-w-[560px]
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.05]
            backdrop-blur-3xl
            shadow-[0_30px_80px_rgba(255,122,0,0.18)]
            px-10
            py-12
          "
        >

          {/* Header */}

          <div className="flex flex-col items-center">

            <h1 className="text-5xl font-extrabold tracking-tight text-white">
              Login
            </h1>

            <p className="mt-5 max-w-sm text-center text-lg leading-relaxed text-white/70">
              Welcome back! Sign in to continue your DineExpress journey.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={onSubmit}
            className="mt-12 flex flex-col gap-8"
          >

                        {/* Email Field */}

            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white/80"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
                />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-[54px] rounded-2xl pl-14 pr-5 bg-white/[0.05]"
                />

              </div>
            </div>

            {/* Password Field */}

            <div className="space-y-3">

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white/80"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
                />

                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-[54px] rounded-2xl pl-14 pr-14 bg-white/[0.05]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#FF7A00] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Login Button */}

            <Button
              disabled={loading}
              className="
                mt-2
                h-[56px]
                w-full
                rounded-full
                bg-gradient-to-r
                from-[#FF7A00]
                to-[#FFA726]
                text-base
                font-bold
                tracking-wide
                text-white
                shadow-[0_15px_45px_rgba(255,122,0,0.30)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_60px_rgba(255,122,0,0.45)]
                hover:brightness-110
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing In...
                </span>
              ) : (
                'LOGIN'
              )}
            </Button>

            {/* Bottom Links */}

            <div className="border-t border-white/10 pt-8 text-center">

              <p className="text-sm text-white/70">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="font-semibold text-[#FF7A00] hover:text-[#FFA726] transition-colors"
                >
                  Register
                </a>
              </p>

              <p className="mt-5 text-sm text-white/60">
                Forgot your password?{' '}
                <a
                  href="/forgot-password"
                  className="font-semibold text-white hover:text-[#FF7A00] transition-colors"
                >
                  Reset it
                </a>
              </p>

            </div>
                      </form>

        </PremiumCard>

      </div>

    </div>
  );
}