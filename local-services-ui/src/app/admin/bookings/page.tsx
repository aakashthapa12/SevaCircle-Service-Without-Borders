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

interface Booking {
  id: number;
  user: string;
  service: string;
  worker: string;
  startTime: string;
  endTime: string | null;
  duration: string;
  status: string;
  amount: number;
  rating: number | null;
}

interface BookingStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalRevenue: number;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate database fetch for bookings
  const fetchBookingsFromDatabase = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Check for cached data first
      const cachedBookings = localStorage.getItem('adminBookings');
      const cachedStats = localStorage.getItem('adminBookingStats');
      
      if (cachedBookings && cachedStats) {
        return {
          bookings: JSON.parse(cachedBookings),
          stats: JSON.parse(cachedStats)
        };
      }
      
      // Generate dynamic booking data
      const users = ['Rahul Sharma', 'Priya Patel', 'Manoj Singh', 'Anita Gupta', 'Deepak Kumar', 'Neha Agarwal', 'Vikash Yadav', 'Sunita Devi', 'Amit Kumar', 'Pooja Verma'];
      const workers = ['Rajesh Kumar', 'Amit Sharma', 'Sunita Devi', 'Vikash Yadav', 'Ramesh Singh', 'Pooja Verma', 'Ravi Kumar', 'Meera Patel'];
      const services = ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'AC Repair', 'House Cleaning', 'Painting', 'Gardening'];
      const statuses = ['Completed', 'In Progress', 'Scheduled', 'Cancelled'];
      
      const currentDate = new Date();
      const generatedBookings: Booking[] = Array.from({ length: 25 }, (_, index) => {
        const user = users[Math.floor(Math.random() * users.length)];
        const worker = workers[Math.floor(Math.random() * workers.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = Math.floor(Math.random() * 1500) + 200;
        
        // Generate start time (within last 3 days to next 7 days)
        const dayOffset = Math.floor(Math.random() * 10) - 3;
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() + dayOffset);
        startDate.setHours(Math.floor(Math.random() * 12) + 8); // Between 8 AM and 8 PM
        startDate.setMinutes(Math.random() < 0.5 ? 0 : 30);
        
        // Generate duration and end time
        const durationHours = Math.floor(Math.random() * 3) + 1; // 1-3 hours
        const durationMinutes = Math.random() < 0.5 ? 0 : 30;
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + durationHours);
        endDate.setMinutes(startDate.getMinutes() + durationMinutes);
        
        const duration = `${durationHours}h ${durationMinutes > 0 ? durationMinutes + 'm' : '0m'}`;
        const rating = status === 'Completed' ? Math.floor(Math.random() * 2) + 4 : null; // 4 or 5 stars
        
        return {
          id: index + 1,
          user: user,
          service: service,
          worker: worker,
          startTime: startDate.toLocaleString('en-IN', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          endTime: status === 'Completed' || status === 'In Progress' ? 
            endDate.toLocaleString('en-IN', { 
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }) : null,
          duration: status === 'Scheduled' ? '-' : duration,
          status: status,
          amount: amount,
          rating: rating
        };
      });
      
      const completedBookings = generatedBookings.filter(b => b.status === 'Completed').length;
      const activeBookings = generatedBookings.filter(b => b.status === 'In Progress').length;
      const totalRevenue = generatedBookings
        .filter(b => b.status === 'Completed')
        .reduce((sum, b) => sum + b.amount, 0);
      
      const stats: BookingStats = {
        totalBookings: generatedBookings.length,
        activeBookings: activeBookings,
        completedBookings: completedBookings,
        totalRevenue: totalRevenue
      };
      
      // Cache the data
      localStorage.setItem('adminBookings', JSON.stringify(generatedBookings));
      localStorage.setItem('adminBookingStats', JSON.stringify(stats));
      
      return { bookings: generatedBookings, stats };
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      throw new Error('Failed to load bookings data');
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const { bookings, stats } = await fetchBookingsFromDatabase();
        setBookings(bookings);
        setBookingStats(stats);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(booking =>
    booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.worker.toLowerCase().includes(searchTerm.toLowerCase())
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
        <BookingStatsComponent stats={bookingStats} />
        <BookingsTable bookings={filteredBookings} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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

function BookingStatsComponent({ stats }: { stats: BookingStats | null }) {
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
        title="Total Bookings"
        value={stats.totalBookings.toLocaleString()}
        icon={Calendar}
        color="from-purple-500 to-pink-500"
        change="+15%"
      />
      <StatCard
        title="Active Bookings"
        value={stats.activeBookings.toString()}
        icon={Clock}
        color="from-blue-500 to-cyan-500"
        change="+5%"
      />
      <StatCard
        title="Completed"
        value={stats.completedBookings.toLocaleString()}
        icon={Activity}
        color="from-green-500 to-teal-500"
        change="+12%"
      />
      <StatCard
        title="Revenue"
        value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`}
        icon={IndianRupee}
        color="from-orange-500 to-red-500"
        change="+22%"
      />
    </div>
  )
}

function BookingsTable({ bookings, searchTerm, onSearchChange }: { 
  bookings: Booking[]; 
  searchTerm: string; 
  onSearchChange: (term: string) => void; 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Bookings ({bookings.length})</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bookings..."
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