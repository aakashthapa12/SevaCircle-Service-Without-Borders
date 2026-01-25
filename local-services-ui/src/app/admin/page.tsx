'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Clock,
  Star,
  Award,
  Activity,
  PieChart,
  BarChart3,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  IndianRupee
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalBookings: 0,
    monthlyRevenue: 0
  });
  const [trendingServices, setTrendingServices] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [topWorkers, setTopWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const getCookie = (name: string) => {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? decodeURIComponent(match[2]) : null;
        };

        const token = getCookie('auth_token');

        // Fetch stats
        const statsRes = await fetch('http://localhost:3001/admin/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch trending services
        const servicesRes = await fetch('http://localhost:3001/admin/dashboard/services', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setTrendingServices(servicesData);
        }

        // Fetch recent bookings
        const bookingsRes = await fetch('http://localhost:3001/admin/dashboard/bookings/recent', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setRecentBookings(bookingsData);
        }

        // Fetch top workers
        const workersRes = await fetch('http://localhost:3001/admin/dashboard/workers/top', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (workersRes.ok) {
          const workersData = await workersRes.json();
          setTopWorkers(workersData);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 sm:p-8 flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <OverviewTab stats={stats} trendingServices={trendingServices} recentBookings={recentBookings} topWorkers={topWorkers} />
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>
      <p className="text-gray-600 mt-1">A high-level overview of your platform's performance.</p>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ stats, trendingServices, recentBookings, topWorkers }: { 
  stats: any; 
  trendingServices: any[]; 
  recentBookings: any[]; 
  topWorkers: any[] 
}) {
  const serviceColors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-indigo-500', 'bg-cyan-500'];
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="from-blue-500 to-purple-500"
          change=""
        />
        <StatCard
          title="Total Workers"
          value={stats.totalWorkers}
          icon={UserCheck}
          color="from-teal-500 to-cyan-500"
          change=""
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          icon={Calendar}
          color="from-purple-500 to-pink-500"
          change=""
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(stats.monthlyRevenue / 1000).toFixed(1)}K`}
          icon={IndianRupee}
          color="from-green-500 to-teal-500"
          change=""
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Services */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Trending Services</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="space-y-4">
            {trendingServices.length > 0 ? trendingServices.map((service: any, index: number) => (
              <div key={service.service} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${serviceColors[index % serviceColors.length]}`}></div>
                  <span className="font-medium text-gray-900">{service.service}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{service.count}</div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No services data available</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
            <Activity className="text-blue-500" size={24} />
          </div>
          <div className="space-y-4">
            {recentBookings.length > 0 ? recentBookings.slice(0, 4).map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{booking.user?.name || 'Unknown User'}</div>
                  <div className="text-sm text-gray-600">{booking.service} • {booking.worker?.name || 'Unknown Worker'}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₹{booking.totalAmount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No recent bookings</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Workers */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Top Performing Workers</h3>
          <Award className="text-yellow-500" size={24} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topWorkers.length > 0 ? topWorkers.map((worker: any) => (
            <div key={worker.id} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {worker.name ? worker.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'W'}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{worker.name || 'Unknown'}</h4>
                <p className="text-sm text-gray-600 mb-3">{worker.service || 'Service'}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="font-medium">{worker.rating.toFixed(1)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-gray-900">{worker.completedJobs}</div>
                    <div className="text-gray-600">Jobs Done</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-600">₹{(worker.totalEarnings / 1000).toFixed(0)}K</div>
                    <div className="text-gray-600">Earnings</div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4 col-span-3">No workers data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Users Tab Component
function UsersTab({ data }: { data: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="space-y-6">
      {/* User Stats Cards */}
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

      {/* User Management */}
      <div className="bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">User Management</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
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
              {[
                { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 9876543210', bookings: 12, spent: 8500, joinDate: '2025-08-15', status: 'Active' },
                { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 9876543211', bookings: 8, spent: 5200, joinDate: '2025-09-22', status: 'Active' },
                { id: 3, name: 'Manoj Singh', email: 'manoj@email.com', phone: '+91 9876543212', bookings: 15, spent: 12800, joinDate: '2025-07-10', status: 'Premium' },
                { id: 4, name: 'Anita Gupta', email: 'anita@email.com', phone: '+91 9876543213', bookings: 6, spent: 3400, joinDate: '2025-10-05', status: 'Active' }
              ].map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
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
    </div>
  )
}

// Workers Tab Component
function WorkersTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Worker Stats */}
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

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.topWorkers.concat([
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
        ]).map((worker: any) => (
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
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-gray-500" />
                  <span className="text-gray-600">Jobs Completed</span>
                </div>
                <span className="font-bold text-gray-900">{worker.completedJobs}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-gray-500" />
                  <span className="text-gray-600">Total Earnings</span>
                </div>
                <span className="font-bold text-green-600">₹{(worker.earnings / 1000).toFixed(0)}K</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-600">Experience</span>
                </div>
                <span className="font-bold text-gray-900">{worker.experience}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  <span className="text-gray-600">Contact</span>
                </div>
                <span className="font-medium text-gray-900">{worker.phone}</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Bookings Tab Component  
function BookingsTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Booking Stats */}
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

      {/* Detailed Bookings Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">All Bookings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Booking ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Worker</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.recentBookings.concat([
                {
                  id: 5,
                  user: 'Deepak Kumar',
                  service: 'AC Repair',
                  worker: 'Ramesh Singh',
                  time: '2026-01-24 03:30 PM',
                  status: 'Completed',
                  amount: 800
                },
                {
                  id: 6,
                  user: 'Neha Agarwal',
                  service: 'House Cleaning',
                  worker: 'Sunita Devi',
                  time: '2026-01-24 08:00 AM',
                  status: 'Completed',
                  amount: 450
                }
              ]).map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-purple-600">#BK{booking.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.user}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {booking.service}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.worker}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{booking.time}</div>
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
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Analytics Tab Component
function AnalyticsTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
            <div className="text-center">
              <BarChart3 size={48} className="text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600">Revenue Chart Visualization</p>
              <div className="mt-4 text-3xl font-bold text-purple-600">₹1,25,600</div>
              <p className="text-sm text-gray-500">Total Revenue This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Service Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
            <div className="text-center">
              <PieChart size={48} className="text-teal-500 mx-auto mb-4" />
              <p className="text-gray-600">Service Pie Chart</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-blue-600">35%</div>
                  <div className="text-gray-600">Plumbing</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">28%</div>
                  <div className="text-gray-600">Electrical</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-teal-600">22%</div>
                  <div className="text-gray-600">Cleaning</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-indigo-600">15%</div>
                  <div className="text-gray-600">Others</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">User Growth</h4>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">+23%</div>
          <p className="text-sm text-gray-600">Compared to last month</p>
          <div className="mt-4 h-20 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-end justify-between px-2 pb-2">
            {[65, 72, 58, 89, 95, 78, 85].map((height, index) => (
              <div
                key={index}
                className="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">Booking Rate</h4>
            <Activity className="text-blue-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">89.5%</div>
          <p className="text-sm text-gray-600">Success rate this week</p>
          <div className="mt-4 h-20 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-end justify-between px-2 pb-2">
            {[78, 85, 92, 88, 95, 89, 93].map((height, index) => (
              <div
                key={index}
                className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">Worker Rating</h4>
            <Star className="text-yellow-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">4.8/5</div>
          <p className="text-sm text-gray-600">Average worker rating</p>
          <div className="mt-4 h-20 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg flex items-end justify-between px-2 pb-2">
            {[88, 92, 85, 95, 89, 94, 91].map((height, index) => (
              <div
                key={index}
                className="w-4 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Average Booking Value', value: '₹625', change: '+12%', color: 'text-green-600' },
            { label: 'Worker Response Time', value: '18 min', change: '-8%', color: 'text-green-600' },
            { label: 'Customer Retention', value: '87%', change: '+5%', color: 'text-green-600' },
            { label: 'Peak Hours Usage', value: '2-6 PM', change: '15%', color: 'text-blue-600' }
          ].map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Reusable Stat Card Component
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