// Copyright 2026 Harsha Krishne Gowda
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Mail, Lock, KeyRound, ArrowLeft } from 'lucide-react'
import { login } from '@/api/auth'
import { NeBesoLogo } from '@/components/ui/NeBesoLogo'

type AuthView = 'login' | 'api-key'

export function Login() {
  const [view, setView] = useState<AuthView>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        'Invalid email or password.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleApiKey(e: React.FormEvent) {
    e.preventDefault()
    if (!apiKey.trim()) {
      setError('Please enter your API key.')
      return
    }
    if (!apiKey.trim().startsWith('nb_ak_')) {
      setError('API key must start with nb_ak_')
      return
    }
    localStorage.setItem('nb_api_key', apiKey.trim())
    navigate('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 70%), #0d1117' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Link to="/home" className="flex flex-col items-center gap-3">
            <NeBesoLogo size={24} />
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#e2e8f0] tracking-tight">NeBeso</h1>
              <p className="text-xs text-[#64748b] mt-0.5">Know exactly what your AI agents cost</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: 'linear-gradient(160deg, #141420 0%, #161d2f 100%)',
            border: '1px solid #1e2d45',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.03) inset',
          }}
        >
          {view === 'login' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-[#e2e8f0]">Sign in to NeBeso</h2>
                <p className="text-sm text-[#64748b] mt-1">Track your AI spend in real time</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    className="input pl-9"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    autoFocus
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                    <Lock size={14} />
                  </div>
                  <input
                    type="password"
                    className="input pl-9"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError('') }}
                  />
                </div>

                {error && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400"
                    style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* Links */}
              <div className="mt-5 pt-4 border-t border-[#1e2d45] flex flex-col gap-2 items-center">
                <Link
                  to="/register"
                  className="text-xs text-[#60a5fa] hover:text-[#a5b4fc] font-medium transition-colors"
                >
                  Create Account
                </Link>
                <button
                  onClick={() => { setView('api-key'); setError('') }}
                  className="text-xs text-[#64748b] hover:text-[#c4c4e0] transition-colors"
                >
                  Or sign in with an API key
                </button>
                <button
                  onClick={() => alert('Contact your admin to reset your password.')}
                  className="text-xs text-[#475569] hover:text-[#64748b] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          {view === 'api-key' && (
            <div className="animate-fade-in">
              <button
                onClick={() => { setView('login'); setError('') }}
                className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#e2e8f0] transition-colors mb-5"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <div className="mb-5">
                <h2 className="text-base font-semibold text-[#e2e8f0]">Enter your API key</h2>
                <p className="text-sm text-[#64748b] mt-1">Paste your nb_ak_ key to continue</p>
              </div>

              <form onSubmit={handleApiKey} className="flex flex-col gap-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                    <KeyRound size={14} />
                  </div>
                  <input
                    type="password"
                    className="input pl-9 font-mono"
                    placeholder="nb_ak_••••••••••••••••"
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setError('') }}
                    autoFocus
                  />
                </div>

                {error && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400"
                    style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}
                  >
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary flex items-center justify-center gap-2 text-sm">
                  Continue to Dashboard
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#475569] mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#60a5fa] hover:text-[#a5b4fc] font-medium transition-colors">
            Create one free &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
