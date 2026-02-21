import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workersAPI, bookingsAPI } from '../services/api';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Booking() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: '',
    time_slot: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await workersAPI.getById(workerId!);
        setWorker(response.data);
      } catch (error) {
        console.error('Error fetching worker:', error);
      }
    };
    fetchWorker();
  }, [workerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookingsAPI.create({
        worker_id: Number(workerId),
        service_id: worker.service_id,
        ...formData,
        total_amount: worker.base_price
      });
      
      alert('Booking confirmed!');
      navigate('/my-bookings');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!worker) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Book Service</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">{worker.name}</h2>
        <p className="text-gray-600">{worker.service_icon} {worker.service_name}</p>
        <p className="text-2xl font-bold text-primary-600 mt-4">₹{worker.base_price}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline mr-2" size={18} />
            Select Date
          </label>
          <input
            type="date"
            required
            min={minDate}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline mr-2" size={18} />
            Select Time Slot
          </label>
          <select
            required
            value={formData.time_slot}
            onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Choose a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline mr-2" size={18} />
            Service Address
          </label>
          <textarea
            required
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your complete address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any special instructions or requirements"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600">₹{worker.base_price}</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 text-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
