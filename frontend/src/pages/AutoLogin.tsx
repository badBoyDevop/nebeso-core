// Copyright 2026 NeBeso
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react'
import { NeBesoLogo } from '@/components/ui/NeBesoLogo'

export function AutoLogin() {
  useEffect(() => {
    // Token is passed in the URL hash — never sent to the server
    const token = window.location.hash.slice(1)
    if (token) {
      localStorage.setItem('nb_token', token)
      localStorage.removeItem('nebeso_demo')
      window.location.replace('/dashboard')
    } else {
      window.location.replace('/login')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <NeBesoLogo size={28} />
        <div className="flex items-center gap-2 text-sm text-[#64748b]">
          <div className="w-4 h-4 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          Signing in…
        </div>
      </div>
    </div>
  )
}
