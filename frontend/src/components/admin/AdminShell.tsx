'use client'

import Sidebar from '@/components/admin/Sidebar'
import { useState } from 'react'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main
        className={
          `flex-1 min-w-0 overflow-auto transition-[margin] duration-300`
        }
        style={{ marginLeft: collapsed ? 80 : 256 }}
      >
        {children}
      </main>
    </div>
  )
}
