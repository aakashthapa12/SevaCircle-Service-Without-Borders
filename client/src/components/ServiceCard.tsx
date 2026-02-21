import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  icon: string;
  base_price: number;
}

export default function ServiceCard({ id, name, description, icon, base_price }: ServiceCardProps) {
  return (
    <Link
      to={`/workers?service=${id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <p className="text-primary-600 font-semibold">Starting at ₹{base_price}</p>
    </Link>
  );
}
