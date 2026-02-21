import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { workersAPI, servicesAPI } from '../services/api';
import WorkerCard from '../components/WorkerCard';

export default function Workers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceId = searchParams.get('service');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workersRes, servicesRes] = await Promise.all([
          workersAPI.getAll(serviceId || undefined),
          servicesAPI.getAll()
        ]);
        setWorkers(workersRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serviceId]);

  const handleServiceFilter = (id: string) => {
    if (id === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ service: id });
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Service Professionals</h1>
      
      {/* Filter by Service */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Service:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleServiceFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              !serviceId
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Services
          </button>
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceFilter(service.id.toString())}
              className={`px-4 py-2 rounded-lg ${
                serviceId === service.id.toString()
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {service.icon} {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <WorkerCard key={worker.id} {...worker} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No professionals found for this service
          </div>
        )}
      </div>
    </div>
  );
}
