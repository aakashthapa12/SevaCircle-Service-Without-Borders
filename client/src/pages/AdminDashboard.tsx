import { useEffect, useState } from 'react';
import { bookingsAPI } from '../services/api';
import { Calendar, Clock, User, Briefcase } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAllBookings();
      const data = response.data;
      setBookings(data);
      
      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter((b: any) => b.status === 'pending').length,
        confirmed: data.filter((b: any) => b.status === 'confirmed').length,
        completed: data.filter((b: any) => b.status === 'completed').length,
        cancelled: data.filter((b: any) => b.status === 'cancelled').length
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      await bookingsAPI.updateStatus(id.toString(), status);
      fetchBookings(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">All Bookings</h2>
        </div>
        <div className="divide-y">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No bookings yet</div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      {booking.service_icon} {booking.service_name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Customer: {booking.user_name} ({booking.user_email})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Worker: {booking.worker_name} ({booking.worker_phone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{booking.time_slot}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600 mb-2">
                      ₹{booking.total_amount}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
