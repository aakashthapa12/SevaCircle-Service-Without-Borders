'use client'

import { useState, useEffect } from 'react'
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

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  spent: number;
  joinDate: string;
  status: string;
}

interface UserStats {
  activeUsers: number;
  newThisMonth: number;
  premiumUsers: number;
  userSatisfaction: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate database fetch for users
  const fetchUsersFromDatabase = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Check for cached data first
      const cachedUsers = localStorage.getItem('adminUsers');
      const cachedStats = localStorage.getItem('adminUserStats');
      
      if (cachedUsers && cachedStats) {
        return {
          users: JSON.parse(cachedUsers),
          stats: JSON.parse(cachedStats)
        };
      }
      
      // Generate dynamic user data
      const firstNames = ['Rahul', 'Priya', 'Manoj', 'Anita', 'Vikash', 'Sunita', 'Amit', 'Pooja', 'Raj', 'Kavita', 'Suresh', 'Meera', 'Ravi', 'Deepika', 'Arjun'];
      const lastNames = ['Sharma', 'Patel', 'Singh', 'Gupta', 'Kumar', 'Devi', 'Yadav', 'Agarwal', 'Verma', 'Joshi', 'Mehta', 'Shah', 'Reddy', 'Nair', 'Iyer'];
      const statuses = ['Active', 'Premium', 'Inactive'];
      
      const generatedUsers: User[] = Array.from({ length: 15 }, (_, index) => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const bookingsCount = Math.floor(Math.random() * 25) + 1;
        const spentAmount = Math.floor(Math.random() * 15000) + 1000;
        const joinMonth = Math.floor(Math.random() * 12) + 1;
        const joinDay = Math.floor(Math.random() * 28) + 1;
        
        return {
          id: index + 1,
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
          phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
          bookings: bookingsCount,
          spent: spentAmount,
          joinDate: `2025-${String(joinMonth).padStart(2, '0')}-${String(joinDay).padStart(2, '0')}`,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
      });
      
      const activeUsers = generatedUsers.filter(u => u.status === 'Active').length;
      const premiumUsers = generatedUsers.filter(u => u.status === 'Premium').length;
      const thisMonth = new Date().getMonth() + 1;
      const newThisMonth = generatedUsers.filter(u => {
        const userMonth = new Date(u.joinDate).getMonth() + 1;
        return userMonth === thisMonth;
      }).length;
      
      const stats: UserStats = {
        activeUsers: activeUsers + premiumUsers,
        newThisMonth: newThisMonth,
        premiumUsers: premiumUsers,
        userSatisfaction: 4.8
      };
      
      // Cache the data
      localStorage.setItem('adminUsers', JSON.stringify(generatedUsers));
      localStorage.setItem('adminUserStats', JSON.stringify(stats));
      
      return { users: generatedUsers, stats };
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Failed to load users data');
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const { users, stats } = await fetchUsersFromDatabase();
        setUsers(users);
        setUserStats(stats);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <UserStatsComponent stats={userStats} />
        <UsersTable users={filteredUsers} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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

function UserStatsComponent({ stats }: { stats: UserStats | null }) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse h-24 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        icon={Users}
        color="from-blue-500 to-purple-500"
        change="+12%"
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth.toString()}
        icon={UserCheck}
        color="from-green-500 to-teal-500"
        change="+25%"
      />
      <StatCard
        title="Premium Users"
        value={stats.premiumUsers.toString()}
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change="+8%"
      />
      <StatCard
        title="User Satisfaction"
        value={`${stats.userSatisfaction}/5`}
        icon={Award}
        color="from-purple-500 to-pink-500"
        change="+2%"
      />
    </div>
  )
}

function UsersTable({ users, searchTerm, onSearchChange }: { 
  users: User[]; 
  searchTerm: string; 
  onSearchChange: (term: string) => void; 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Users ({users.length})</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
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
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center gap-1">
                    <Mail size={14} className="text-gray-400" />
                    {user.email}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone size={14} className="text-gray-400" />
                    {user.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.bookings} bookings</div>
                  <div className="text-sm text-gray-500">₹{user.spent.toLocaleString()} spent</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-purple-600 hover:text-purple-900 flex items-center gap-1">
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}
      
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