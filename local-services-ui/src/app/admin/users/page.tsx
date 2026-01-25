'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  UserCheck, 
  Star,
  Award,
  Search,
  Filter,
  Eye,
  Mail,
  Phone
} from 'lucide-react'

type AdminUser = { id: string; name: string | null; email: string; phone: string | null; createdAt: string }

function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/users')
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const data = await res.json()
        setUsers(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return { users, loading, error }
}

export default function UsersPage() {
  const { users, loading, error } = useAdminUsers()
  const [stats, setStats] = useState({
    activeUsers: 0,
    newThisMonth: 0,
    premiumUsers: 0,
    userSatisfaction: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/users/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <UserStats stats={stats} loading={statsLoading} />
        {error && <div className="text-red-600">{error}</div>}
        <UsersTable users={users} loading={loading} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        User Management
      </h1>
      <p className="text-gray-600 mt-1">View and manage all registered users.</p>
    </div>
  )
}

function UserStats({ stats, loading }: { stats: any, loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 h-32 animate-pulse"></div>
        <div className="bg-white rounded-2xl shadow-xl p-6 h-32 animate-pulse"></div>
        <div className="bg-white rounded-2xl shadow-xl p-6 h-32 animate-pulse"></div>
        <div className="bg-white rounded-2xl shadow-xl p-6 h-32 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Active Users"
        value={stats.activeUsers}
        icon={Users}
        color="from-blue-500 to-purple-500"
        change=""
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth}
        icon={UserCheck}
        color="from-green-500 to-teal-500"
        change=""
      />
      <StatCard
        title="Premium Users"
        value={stats.premiumUsers}
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change=""
      />
      <StatCard
        title="User Satisfaction"
        value={`${stats.userSatisfaction}/5`}
        icon={Award}
        color="from-purple-500 to-pink-500"
        change=""
      />
    </div>
  )
}

function UsersTable({ users, loading }: { users: any[]; loading: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Users</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td className="px-6 py-4" colSpan={5}>Loading...</td></tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {(user.name || user.email).split(' ').map((n:string) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name || '—'}</div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail size={14} className="text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span>{user.phone || '—'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <Eye size={16} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, change }: {
  title: string
  value: string | number
  icon: any
  color: string
  change: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && (
          <div className="text-right">
            <div className="text-sm text-green-600 font-medium">{change}</div>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  )
}