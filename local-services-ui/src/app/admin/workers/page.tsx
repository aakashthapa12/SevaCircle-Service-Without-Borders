'use client'

import { useState } from 'react'
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

const mockWorkers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    service: 'Plumbing',
    rating: 4.8,
    completedJobs: 156,
    earnings: 45600,
    phone: '+91 9876543210',
    experience: '12 years'
  },
  {
    id: 2,
    name: 'Amit Sharma',
    service: 'Electrical',
    rating: 4.9,
    completedJobs: 142,
    earnings: 52800,
    phone: '+91 9876543211',
    experience: '15 years'
  },
  {
    id: 3,
    name: 'Sunita Devi',
    service: 'Cleaning',
    rating: 4.7,
    completedJobs: 89,
    earnings: 28900,
    phone: '+91 9876543212',
    experience: '8 years'
  },
  {
    id: 4,
    name: 'Vikash Yadav',
    service: 'Carpentry',
    rating: 4.6,
    completedJobs: 67,
    earnings: 34500,
    phone: '+91 9876543214',
    experience: '6 years'
  },
  {
    id: 5,
    name: 'Rekha Sharma',
    service: 'Painting',
    rating: 4.8,
    completedJobs: 78,
    earnings: 38900,
    phone: '+91 9876543215',
    experience: '9 years'
  },
  {
    id: 6,
    name: 'Suresh Gupta',
    service: 'Gardening',
    rating: 4.5,
    completedJobs: 45,
    earnings: 22300,
    phone: '+91 9876543216',
    experience: '4 years'
  }
]

export default function WorkersPage() {
  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <WorkerStats />
        <WorkersGrid workers={mockWorkers} />
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

function WorkerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Workers"
        value="89"
        icon={UserCheck}
        color="from-teal-500 to-cyan-500"
        change="+8%"
      />
      <StatCard
        title="Active Workers"
        value="76"
        icon={Activity}
        color="from-green-500 to-teal-500"
        change="+12%"
      />
      <StatCard
        title="Avg Rating"
        value="4.7/5"
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change="+0.2"
      />
      <StatCard
        title="Monthly Jobs"
        value="542"
        icon={Briefcase}
        color="from-purple-500 to-pink-500"
        change="+18%"
      />
    </div>
  )
}

function WorkersGrid({ workers }: { workers: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {workers.map((worker) => (
        <div key={worker.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              {worker.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
            <p className="text-teal-600 font-medium mb-2">{worker.service}</p>
            <div className="flex items-center justify-center gap-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="font-medium">{worker.rating}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <InfoRow icon={Briefcase} label="Jobs Completed" value={worker.completedJobs} />
            <InfoRow icon={IndianRupee} label="Total Earnings" value={`₹${(worker.earnings / 1000).toFixed(0)}K`} valueColor="text-green-600" />
            <InfoRow icon={Clock} label="Experience" value={worker.experience} />
            <InfoRow icon={Phone} label="Contact" value={worker.phone} />
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
        <div className="text-right">
          <div className="text-sm text-green-600 font-medium">{change}</div>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  )
}