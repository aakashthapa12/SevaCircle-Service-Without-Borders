'use client'

import { useState } from 'react'
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

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 9876543210', bookings: 12, spent: 8500, joinDate: '2025-08-15', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 9876543211', bookings: 8, spent: 5200, joinDate: '2025-09-22', status: 'Active' },
  { id: 3, name: 'Manoj Singh', email: 'manoj@email.com', phone: '+91 9876543212', bookings: 15, spent: 12800, joinDate: '2025-07-10', status: 'Premium' },
  { id: 4, name: 'Anita Gupta', email: 'anita@email.com', phone: '+91 9876543213', bookings: 6, spent: 3400, joinDate: '2025-10-05', status: 'Active' }
]

export default function UsersPage() {
  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <UserStats />
        <UsersTable users={mockUsers} />
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

function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Active Users"
        value="1,247"
        icon={Users}
        color="from-blue-500 to-purple-500"
        change="+12%"
      />
      <StatCard
        title="New This Month"
        value="156"
        icon={UserCheck}
        color="from-green-500 to-teal-500"
        change="+25%"
      />
      <StatCard
        title="Premium Users"
        value="89"
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change="+8%"
      />
      <StatCard
        title="User Satisfaction"
        value="4.8/5"
        icon={Award}
        color="from-purple-500 to-pink-500"
        change="+2%"
      />
    </div>
  )
}

function UsersTable({ users }: { users: any[] }) {
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
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total Bookings</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total Spent</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name.split(' ').map((n:string) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
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
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{user.bookings}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-green-600">₹{user.spent.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{user.joinDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                    user.status === 'Premium' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
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
        <div className="text-right">
          <div className="text-sm text-green-600 font-medium">{change}</div>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  )
}