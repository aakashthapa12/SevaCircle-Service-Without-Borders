'use client'

import { useEffect, useState } from 'react'
import { 
  UserCheck, 
  Activity,
  Star,
  Briefcase,
  IndianRupee,
  Clock,
  Phone,
  Search,
  Filter
} from 'lucide-react'

type AdminWorker = { id: string; name: string | null; email: string; phone: string | null; service: string | null; createdAt: string }

function useAdminWorkers() {
  const [workers, setWorkers] = useState<AdminWorker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/workers')
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const data = await res.json()
        setWorkers(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return { workers, loading, error }
}

export default function WorkersPage() {
  const { workers, loading, error } = useAdminWorkers()
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeWorkers: 0,
    avgRating: 0,
    monthlyJobs: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/workers/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch worker stats:', error)
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
        <WorkerStats stats={stats} loading={statsLoading} />
        {error && <div className="text-red-600">{error}</div>}
        <WorkersGrid workers={workers} loading={loading} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Worker Management
      </h1>
      <p className="text-gray-600 mt-1">Manage and monitor service professionals.</p>
    </div>
  )
}

function WorkerStats({ stats, loading }: { stats: any, loading: boolean }) {
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
        title="Total Workers"
        value={stats.totalWorkers}
        icon={UserCheck}
        color="from-teal-500 to-cyan-500"
        change=""
      />
      <StatCard
        title="Active Workers"
        value={stats.activeWorkers}
        icon={Activity}
        color="from-green-500 to-teal-500"
        change=""
      />
      <StatCard
        title="Avg Rating"
        value={`${stats.avgRating}/5`}
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change=""
      />
      <StatCard
        title="Monthly Jobs"
        value={stats.monthlyJobs}
        icon={Briefcase}
        color="from-purple-500 to-pink-500"
        change=""
      />
    </div>
  )
}

function WorkersGrid({ workers, loading }: { workers: any[]; loading: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {loading ? (
        <div className="p-6">Loading...</div>
      ) : workers.map((worker) => (
        <div key={worker.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              {(worker.name || worker.email).split(' ').map((n: string) => n[0]).join('')}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
            <p className="text-teal-600 font-medium mb-2">{worker.service || '—'}</p>
          </div>

          <div className="space-y-4 mb-6">
            <InfoRow icon={Clock} label="Joined" value={new Date(worker.createdAt).toLocaleDateString()} />
            <InfoRow icon={Phone} label="Contact" value={worker.phone || '—'} />
          </div>

          <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
            View Full Profile
          </button>
        </div>
      ))}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, valueColor = 'text-gray-900' }: {
  icon: any,
  label: string,
  value: string | number,
  valueColor?: string
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-gray-500" />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className={`font-bold ${valueColor}`}>{value}</span>
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