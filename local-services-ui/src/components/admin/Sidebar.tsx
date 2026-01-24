'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  Users,
  UserCheck,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  PanelLeftClose,
  PanelRightOpen
} from 'lucide-react'

const sidebarNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
  { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
  { id: 'workers', label: 'Workers', icon: UserCheck, href: '/admin/workers' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
]

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <div
      className={
        `h-screen ${collapsed ? 'w-20' : 'w-64'} bg-white shadow-lg flex flex-col fixed transition-[width] duration-300`
      }
    >
      {/* Header / Logo + Toggle */}
      <div className="flex items-center justify-between h-16 px-3 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-lg font-bold">A</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900">Admin Panel</span>
          )}
        </Link>
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          {collapsed ? <PanelRightOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-6">
        {sidebarNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative group flex items-center ${collapsed ? 'justify-center' : ''} gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-300 hover:translate-x-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={`px-3 py-4 mt-6 border-t border-gray-200 ${collapsed ? 'text-center' : ''}`}>
        <button className={`flex ${collapsed ? 'justify-center' : ''} w-full items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300`}>
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}