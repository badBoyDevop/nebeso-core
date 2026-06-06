// Copyright 2026 Harsha Krishne Gowda
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Mail, Lock, User } from 'lucide-react'
import { NeBesoLogo } from '@/components/ui/NeBesoLogo'
import { register } from '@/api/auth'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Name is required.'); return }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }

    setError('')
    setLoading(true)
    try {
      await register(email, password, name)
      navigate('/onboarding')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 70%), #0d1117' }}
    >
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
              <p className="text-xs text-[#64748b] mt-0.5">Track AI costs across your team</p>
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
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-[#e2e8f0]">Create Account</h2>
              <p className="text-sm text-[#64748b] mt-1">Get started in under 2 minutes</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  className="input pl-9"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError('') }}
                  autoFocus
                />
              </div>

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
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                  <Lock size={14} />
                </div>
                <input
                  type="password"
                  className="input pl-9"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                  <Lock size={14} />
                </div>
                <input
                  type="password"
                  className="input pl-9"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
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
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-[#475569] mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-[#60a5fa] hover:text-[#a5b4fc] font-medium transition-colors">
            Sign in &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
