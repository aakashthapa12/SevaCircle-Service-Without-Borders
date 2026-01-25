'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock,
  Activity,
  Award,
  Search,
  Filter,
  Eye,
  IndianRupee
} from 'lucide-react'

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedToday: 0,
    successRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch('http://localhost:3001/admin/bookings/stats'),
          fetch('http://localhost:3001/admin/bookings/all')
        ])

        if (statsRes.ok && bookingsRes.ok) {
          const statsData = await statsRes.json()
          const bookingsData = await bookingsRes.json()
          setStats(statsData)
          setBookings(bookingsData)
        }
      } catch (error) {
        console.error('Failed to fetch bookings data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <Header />
        <div className="text-center py-12">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <BookingStats stats={stats} />
        <BookingsTable bookings={bookings} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Bookings Management
      </h1>
      <p className="text-gray-600 mt-1">Track and manage all service bookings.</p>
    </div>
  )
}

function BookingStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Bookings"
        value={stats.totalBookings}
        icon={Calendar}
        color="from-purple-500 to-pink-500"
        change=""
      />
      <StatCard
        title="Active Bookings"
        value={stats.activeBookings}
        icon={Clock}
        color="from-blue-500 to-cyan-500"
        change=""
      />
      <StatCard
        title="Completed Today"
        value={stats.completedToday}
        icon={Activity}
        color="from-green-500 to-teal-500"
        change=""
      />
      <StatCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        icon={Award}
        color="from-yellow-500 to-orange-500"
        change=""
      />
    </div>
  )
}

function BookingsTable({ bookings, searchTerm, setSearchTerm }: { bookings: any[], searchTerm: string, setSearchTerm: (term: string) => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const filteredBookings = bookings.filter(booking => 
    booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.worker?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Bookings</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Booking ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Customer / Worker</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Service</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Timing</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cost</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-purple-600">#{booking.id.substring(0, 8)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{booking.user?.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-500">{booking.worker?.name || 'Unknown'}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {booking.service}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                  <div className="text-xs text-gray-500">Time: {booking.timeSlot}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-green-600">₹{booking.totalAmount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <Eye size={16} />
                    Details
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
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