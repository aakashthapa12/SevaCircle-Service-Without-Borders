'use client'

import { useState, useEffect } from 'react'
import { 
  UserCheck, 
  Activity,
  Star,
  Briefcase,
  IndianRupee,
  Clock,
  Phone,
  Search,
  Filter
} from 'lucide-react'

interface Worker {
  id: number;
  name: string;
  service: string;
  rating: number;
  completedJobs: number;
  earnings: number;
  phone: string;
  experience: string;
}

interface WorkerStats {
  totalWorkers: number;
  activeWorkers: number;
  averageRating: number;
  totalEarnings: number;
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workerStats, setWorkerStats] = useState<WorkerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate database fetch for workers
  const fetchWorkersFromDatabase = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Check for cached data first
      const cachedWorkers = localStorage.getItem('adminWorkers');
      const cachedStats = localStorage.getItem('adminWorkerStats');
      
      if (cachedWorkers && cachedStats) {
        return {
          workers: JSON.parse(cachedWorkers),
          stats: JSON.parse(cachedStats)
        };
      }
      
      // Generate dynamic worker data
      const firstNames = ['Rajesh', 'Amit', 'Sunita', 'Vikash', 'Rekha', 'Suresh', 'Pooja', 'Ravi', 'Meera', 'Arjun', 'Kavita', 'Deepak', 'Nisha', 'Rohit', 'Priya'];
      const lastNames = ['Kumar', 'Sharma', 'Devi', 'Yadav', 'Gupta', 'Singh', 'Patel', 'Verma', 'Joshi', 'Shah', 'Agarwal', 'Reddy', 'Nair', 'Iyer', 'Mehta'];
      const services = ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Painting', 'Gardening', 'AC Repair', 'Home Repair', 'Appliance Repair', 'Pest Control'];
      
      const generatedWorkers: Worker[] = Array.from({ length: 20 }, (_, index) => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const completedJobs = Math.floor(Math.random() * 200) + 20;
        const rating = 4.2 + Math.random() * 0.8; // Between 4.2 and 5.0
        const experience = Math.floor(Math.random() * 15) + 2;
        const earnings = Math.floor((completedJobs * 300) + Math.random() * 20000);
        
        return {
          id: index + 1,
          name: `${firstName} ${lastName}`,
          service: service,
          rating: Math.round(rating * 10) / 10,
          completedJobs: completedJobs,
          earnings: earnings,
          phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
          experience: `${experience} years`
        };
      });
      
      const activeWorkers = generatedWorkers.filter(w => w.completedJobs > 0).length;
      const totalEarnings = generatedWorkers.reduce((sum, w) => sum + w.earnings, 0);
      const averageRating = generatedWorkers.reduce((sum, w) => sum + w.rating, 0) / generatedWorkers.length;
      
      const stats: WorkerStats = {
        totalWorkers: generatedWorkers.length,
        activeWorkers: activeWorkers,
        averageRating: Math.round(averageRating * 10) / 10,
        totalEarnings: totalEarnings
      };
      
      // Cache the data
      localStorage.setItem('adminWorkers', JSON.stringify(generatedWorkers));
      localStorage.setItem('adminWorkerStats', JSON.stringify(stats));
      
      return { workers: generatedWorkers, stats };
    } catch (error) {
      console.error('Failed to fetch workers:', error);
      throw new Error('Failed to load workers data');
    }
  };

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        const { workers, stats } = await fetchWorkersFromDatabase();
        setWorkers(workers);
        setWorkerStats(stats);
      } catch (error) {
        console.error('Error loading workers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkers();
  }, []);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.service.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-6">
        <WorkerStatsComponent stats={workerStats} />
        <WorkersGrid workers={filteredWorkers} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Worker Management
      </h1>
      <p className="text-gray-600 mt-1">Manage and monitor service professionals.</p>
    </div>
  )
}

function WorkerStatsComponent({ stats }: { stats: WorkerStats | null }) {
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
        title="Total Workers"
        value={stats.totalWorkers.toString()}
        icon={UserCheck}
        color="from-blue-500 to-purple-500"
        change="+8%"
      />
      <StatCard
        title="Active Workers"
        value={stats.activeWorkers.toString()}
        icon={Activity}
        color="from-green-500 to-teal-500"
        change="+15%"
      />
      <StatCard
        title="Average Rating"
        value={`${stats.averageRating}/5`}
        icon={Star}
        color="from-yellow-500 to-orange-500"
        change="+0.2"
      />
      <StatCard
        title="Total Earnings"
        value={`₹${(stats.totalEarnings / 100000).toFixed(1)}L`}
        icon={IndianRupee}
        color="from-purple-500 to-pink-500"
        change="+22%"
      />
    </div>
  )
}

function WorkersGrid({ workers, searchTerm, onSearchChange }: { 
  workers: Worker[]; 
  searchTerm: string; 
  onSearchChange: (term: string) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Workers ({workers.length})</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search workers..."
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workers.map((worker) => (
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
              <InfoRow icon={Briefcase} label="Jobs Completed" value={worker.completedJobs} />
              <InfoRow icon={IndianRupee} label="Total Earnings" value={`₹${(worker.earnings / 1000).toFixed(0)}K`} valueColor="text-green-600" />
              <InfoRow icon={Clock} label="Experience" value={worker.experience} />
              <InfoRow icon={Phone} label="Contact" value={worker.phone} />
            </div>

            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
      
      {workers.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No workers found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, valueColor = 'text-gray-900' }: {
  icon: any,
  label: string,
  value: string | number,
  valueColor?: string
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-gray-500" />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className={`font-bold ${valueColor}`}>{value}</span>
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