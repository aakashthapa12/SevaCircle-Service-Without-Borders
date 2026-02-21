import { useEffect, useState } from 'react';
import { bookingsAPI } from '../services/api';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getMyBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No bookings yet</p>
          <a href="/services" className="text-primary-600 hover:underline mt-2 inline-block">
            Browse services to make a booking
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {booking.service_icon} {booking.service_name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} />
                    <span>{booking.worker_name}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{booking.time_slot}</span>
                </div>
                <div className="flex items-start gap-2 md:col-span-2">
                  <MapPin size={18} className="mt-1" />
                  <span>{booking.address}</span>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary-600">₹{booking.total_amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
