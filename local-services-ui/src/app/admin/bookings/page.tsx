'use client'

import { useState } from 'react'
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

const mockBookings = [
  {
    id: 1,
    user: 'Rahul Sharma',
    service: 'Plumbing',
    worker: 'Rajesh Kumar',
    startTime: '2026-01-25 10:30 AM',
    endTime: '2026-01-25 11:45 AM',
    duration: '1h 15m',
    status: 'Completed',
    amount: 500,
    rating: 5
  },
  {
    id: 2,
    user: 'Priya Patel',
    service: 'Electrical',
    worker: 'Amit Sharma',
    startTime: '2026-01-25 02:15 PM',
    endTime: '2026-01-25 04:00 PM',
    duration: '1h 45m',
    status: 'In Progress',
    amount: 750,
    rating: null
  },
  {
    id: 3,
    user: 'Manoj Singh',
    service: 'Cleaning',
    worker: 'Sunita Devi',
    startTime: '2026-01-25 09:00 AM',
    endTime: '2026-01-25 11:00 AM',
    duration: '2h 0m',
    status: 'Completed',
    amount: 300,
    rating: 4
  },
  {
    id: 4,
    user: 'Anita Gupta',
    service: 'Carpentry',
    worker: 'Vikash Yadav',
    startTime: '2026-01-25 11:45 AM',
    endTime: null,
    duration: '-',
    status: 'Scheduled',
    amount: 1200,
    rating: null
  },
  {
    id: 5,
    user: 'Deepak Kumar',
    service: 'AC Repair',
    worker: 'Ramesh Singh',
    startTime: '2026-01-24 03:30 PM',
    endTime: '2026-01-24 05:00 PM',
    duration: '1h 30m',
    status: 'Completed',
    amount: 800,
    rating: 5
  },
  {
    id: 6,
    user: 'Neha Agarwal',
    service: 'House Cleaning',
    worker: 'Sunita Devi',
    startTime: '2026-01-24 08:00 AM',
    endTime: '2026-01-24 10:30 AM',
    duration: '2h 30m',
    status: 'Completed',
    amount: 450,
    rating: 4
  }
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <BookingStats />
        <BookingsTable bookings={mockBookings} />
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

function BookingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Bookings"
        value="3,456"
        icon={Calendar}
        color="from-purple-500 to-pink-500"
        change="+15%"
      />
      <StatCard
        title="Active Bookings"
        value="23"
        icon={Clock}
        color="from-blue-500 to-cyan-500"
        change="+5%"
      />
      <StatCard
        title="Completed Today"
        value="12"
        icon={Activity}
        color="from-green-500 to-teal-500"
        change="+8%"
      />
      <StatCard
        title="Success Rate"
        value="98.5%"
        icon={Award}
        color="from-yellow-500 to-orange-500"
        change="+1.2%"
      />
    </div>
  )
}

function BookingsTable({ bookings }: { bookings: any[] }) {
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
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-purple-600">#BK{booking.id.toString().padStart(4, '0')}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{booking.user}</div>
                  <div className="text-sm text-gray-500">{booking.worker}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {booking.service}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{booking.startTime}</div>
                  <div className="text-xs text-gray-500">Duration: {booking.duration}</div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-bold text-green-600">₹{booking.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
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
        <div className="text-right">
          <div className="text-sm text-green-600 font-medium">{change}</div>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  )
}