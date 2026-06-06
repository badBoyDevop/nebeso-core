// Copyright 2026 Harsha Krishne Gowda
// SPDX-License-Identifier: Apache-2.0

import { clsx } from 'clsx'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary' | 'default' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  warning: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  danger: 'bg-red-400/10 text-red-400 border-red-400/20',
  info: 'bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20',
  neutral: 'bg-[#1c2538] text-[#64748b] border-[#1e2d45]',
  primary: 'bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/20',
  default: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
  muted: 'bg-[#1c2538] text-[#94a3b8] border-[#1e2d45]',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
