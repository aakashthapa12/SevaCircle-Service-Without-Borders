import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Award, Phone, Mail, Calendar } from 'lucide-react';
import { workersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await workersAPI.getById(id!);
        setWorker(response.data);
      } catch (error) {
        console.error('Error fetching worker:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!worker) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Worker not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{worker.name}</h1>
              <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                <span>{worker.service_icon}</span>
                <span>{worker.service_name}</span>
              </div>
              {worker.verified && (
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded">
                  <Award size={16} />
                  <span>Verified Professional</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span className="text-lg">
                  <strong>{worker.rating}</strong> ({worker.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-600" />
                <span>{worker.distance} km away</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-600" />
                <span>{worker.experience} years of experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-600" />
                <span>{worker.phone}</span>
              </div>
              {worker.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" />
                  <span>{worker.email}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              <p className="text-3xl font-bold text-primary-600 mb-4">
                Starting at ₹{worker.base_price}
              </p>
              <p className="text-gray-600 mb-6">
                Actual price may vary based on the scope of work
              </p>
              <button
                onClick={handleBookNow}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 text-lg font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Languages</h3>
            <p className="text-gray-600">{worker.languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
