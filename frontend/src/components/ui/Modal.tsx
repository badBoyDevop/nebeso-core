// Copyright 2026 Harsha Krishne Gowda
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        className={clsx(
          'relative z-10 bg-[#161d2f] border border-[#1e2d45] rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[calc(100vh-2rem)] flex flex-col',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#1e2d45] flex-shrink-0">
          <h2 className="text-base font-semibold text-[#e2e8f0]">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1c2538] flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
