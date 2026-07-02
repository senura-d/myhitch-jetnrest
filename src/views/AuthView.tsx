import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthViewProps {
  onBackToHome: () => void;
  onNavigate: (view: string) => void;
  onLogin: () => void;
  defaultTab?: 'signin' | 'signup';
  notice?: string;
}

export default function AuthView({ onBackToHome, onLogin, defaultTab = 'signin', notice }: AuthViewProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);

  // Sign In state
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siShowPw, setSiShowPw] = useState(false);

  // Sign Up state
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [suShowPw, setSuShowPw] = useState(false);
  const [suShowConfirm, setSuShowConfirm] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (suPassword !== suConfirm) return;
    onLogin();
  };

  const inputCls =
    'w-full h-12 border border-gray-200 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors bg-white font-[Inter]';

  return (
    <div className="min-h-screen bg-white font-sans flex items-center justify-center px-4">
      {/* Back link */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 text-xs text-gray-400 hover:text-gray-700 transition-colors tracking-wide"
      >
        ← Back to home
      </button>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            MYHITCH<span className="text-blue-500">JET</span>NREST
          </h1>
          <p className="mt-2 text-sm text-gray-400">Your travel companion</p>
        </div>

        {notice && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 text-center">
            {notice}
          </div>
        )}

        {/* Tab toggle — twin equal buttons */}
        <div className="flex rounded-xl border border-gray-200 p-1 mb-8">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === 'signin'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === 'signup'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* ── SIGN IN FORM ── */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputCls}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-500 tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={siShowPw ? 'text' : 'password'}
                  value={siPassword}
                  onChange={(e) => setSiPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${inputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setSiShowPw(!siShowPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  {siShowPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        )}

        {/* ── SIGN UP FORM ── */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
                Full name
              </label>
              <input
                type="text"
                value={suName}
                onChange={(e) => setSuName(e.target.value)}
                placeholder="Alex Dubois"
                required
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={suEmail}
                onChange={(e) => setSuEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={suShowPw ? 'text' : 'password'}
                  value={suPassword}
                  onChange={(e) => setSuPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className={`${inputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setSuShowPw(!suShowPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  {suShowPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={suShowConfirm ? 'text' : 'password'}
                  value={suConfirm}
                  onChange={(e) => setSuConfirm(e.target.value)}
                  placeholder="Repeat password"
                  required
                  className={`${inputCls} pr-10 ${
                    suConfirm && suPassword !== suConfirm ? 'border-red-400' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setSuShowConfirm(!suShowConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  {suShowConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {suConfirm && suPassword !== suConfirm && (
                <p className="mt-1.5 text-xs text-red-400">Passwords don't match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!!(suConfirm && suPassword !== suConfirm)}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors mt-2"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Divider hint */}
        <p className="mt-6 text-center text-xs text-gray-300">
          {tab === 'signin' ? (
            <>No account? <button onClick={() => setTab('signup')} className="text-gray-500 hover:text-gray-800 font-medium">Sign up</button></>
          ) : (
            <>Already a member? <button onClick={() => setTab('signin')} className="text-gray-500 hover:text-gray-800 font-medium">Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}
