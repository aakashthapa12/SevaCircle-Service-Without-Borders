import { Link } from 'react-router-dom';
import { Star, MapPin, Award } from 'lucide-react';

interface WorkerCardProps {
  id: number;
  name: string;
  service_name: string;
  rating: number;
  reviews: number;
  experience: number;
  distance: number;
  verified: number;
}

export default function WorkerCard({ id, name, service_name, rating, reviews, experience, distance, verified }: WorkerCardProps) {
  return (
    <Link
      to={`/workers/${id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-600">{service_name}</p>
        </div>
        {verified === 1 && (
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1">
            <Award size={12} />
            Verified
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{rating}</span>
          <span>({reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>{distance} km</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm">{experience} years experience</p>
      
      <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
        View Profile & Book
      </button>
    </Link>
  );
}
