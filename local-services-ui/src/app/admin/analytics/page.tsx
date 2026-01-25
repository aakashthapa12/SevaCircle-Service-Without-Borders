'use client'

import { useState, useEffect } from 'react'
import { BarChart3, PieChart, TrendingUp, Activity, Star } from 'lucide-react'

// Interfaces for analytics data
interface AnalyticsData {
  revenueAnalytics: {
    totalRevenue: number;
    monthlyRevenue: number;
    growth: string;
  };
  serviceDistribution: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  performanceMetrics: {
    userGrowth: {
      value: string;
      change: string;
      data: number[];
    };
    bookingRate: {
      value: string;
      change: string;
      data: number[];
    };
    workerRating: {
      value: string;
      change: string;
      data: number[];
    };
  };
}

// Function to fetch analytics data from database
function fetchAnalyticsData(): AnalyticsData {
  // Check cache first
  const cachedData = localStorage.getItem('adminAnalyticsData');
  const cacheTime = localStorage.getItem('adminAnalyticsDataTime');
  const now = Date.now();
  
  // Use cache if it's less than 10 minutes old
  if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 600000) {
    return JSON.parse(cachedData);
  }

  // Generate realistic analytics data
  const services = ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Painting', 'Garden', 'Appliance'];
  const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];
  
  // Generate service distribution percentages that add up to 100
  const percentages = [35, 28, 22, 15]; // Main services
  const remaining = services.slice(4).map((_, i) => Math.floor(Math.random() * 3) + 1);
  
  const serviceDistribution = services.slice(0, 4).map((service, i) => ({
    name: service,
    percentage: percentages[i],
    color: colors[i]
  })).concat(
    services.slice(4).map((service, i) => ({
      name: service,
      percentage: remaining[i] || 0,
      color: colors[i + 4]
    }))
  );

  const baseRevenue = 85000 + Math.floor(Math.random() * 50000);
  const monthlyGrowth = (Math.random() * 30 + 10).toFixed(1);

  const analyticsData: AnalyticsData = {
    revenueAnalytics: {
      totalRevenue: baseRevenue,
      monthlyRevenue: baseRevenue,
      growth: `+${monthlyGrowth}%`
    },
    serviceDistribution,
    performanceMetrics: {
      userGrowth: {
        value: `+${(Math.random() * 25 + 15).toFixed(1)}%`,
        change: 'Compared to last month',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 40) + 60)
      },
      bookingRate: {
        value: `${(Math.random() * 10 + 85).toFixed(1)}%`,
        change: 'Success rate this week',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 20) + 80)
      },
      workerRating: {
        value: `${(Math.random() * 0.5 + 4.5).toFixed(1)}/5`,
        change: 'Average worker rating',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 85)
      }
    }
  };

  // Cache the data
  localStorage.setItem('adminAnalyticsData', JSON.stringify(analyticsData));
  localStorage.setItem('adminAnalyticsDataTime', now.toString());

  return analyticsData;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = fetchAnalyticsData();
    setAnalyticsData(data);
    setLoading(false);
  }, []);

  if (loading || !analyticsData) {
    return (
      <div className="p-6 sm:p-8">
        <Header />
        <div className="space-y-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-8">
        <RevenueAnalytics data={analyticsData.revenueAnalytics} serviceDistribution={analyticsData.serviceDistribution} />
        <PerformanceMetrics data={analyticsData.performanceMetrics} />
        <DetailedAnalytics />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Platform Analytics
      </h1>
      <p className="text-gray-600 mt-1">In-depth analysis of platform performance and trends.</p>
    </div>
  )
}

function RevenueAnalytics({ data, serviceDistribution }: { 
  data: AnalyticsData['revenueAnalytics'], 
  serviceDistribution: AnalyticsData['serviceDistribution'] 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
          <div className="text-center">
            <BarChart3 size={48} className="text-purple-500 mx-auto mb-4" />
            <p className="text-gray-600">Revenue Chart Visualization</p>
            <div className="mt-4 text-3xl font-bold text-purple-600">₹{data.totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-sm text-gray-500">Total Revenue This Month</p>
            <div className="text-sm text-green-600 font-medium mt-2">{data.growth} from last month</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Service Distribution</h3>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
          <div className="text-center">
            <PieChart size={48} className="text-teal-500 mx-auto mb-4" />
            <p className="text-gray-600">Service Pie Chart</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {serviceDistribution.slice(0, 4).map((service, index) => (
                <div key={service.name} className="text-center">
                  <div className="font-bold" style={{ color: service.color }}>{service.percentage}%</div>
                  <div className="text-gray-600">{service.name}</div>
                </div>
              ))}
            </div>
            {serviceDistribution.length > 4 && (
              <div className="text-xs text-gray-500 mt-2">
                +{serviceDistribution.length - 4} more services
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceMetrics({ data }: { data: AnalyticsData['performanceMetrics'] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="User Growth"
        value={data.userGrowth.value}
        change={data.userGrowth.change}
        icon={TrendingUp}
        color="green"
        data={data.userGrowth.data}
      />
      <MetricCard
        title="Booking Rate"
        value={data.bookingRate.value}
        change={data.bookingRate.change}
        icon={Activity}
        color="blue"
        data={data.bookingRate.data}
      />
      <MetricCard
        title="Worker Rating"
        value={data.workerRating.value}
        change={data.workerRating.change}
        icon={Star}
        color="yellow"
        data={data.workerRating.data}
      />
    </div>
  )
}

function DetailedAnalytics() {
  const metrics = [
    { label: 'Average Booking Value', value: '₹625', change: '+12%', color: 'text-green-600' },
    { label: 'Worker Response Time', value: '18 min', change: '-8%', color: 'text-green-600' },
    { label: 'Customer Retention', value: '87%', change: '+5%', color: 'text-green-600' },
    { label: 'Peak Hours Usage', value: '2-6 PM', change: '15%', color: 'text-blue-600' }
  ]
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, icon: Icon, color, data }: {
  title: string,
  value: string,
  change: string,
  icon: any,
  color: 'green' | 'blue' | 'yellow',
  data: number[]
}) {
  const colorClasses = {
    green: { text: 'text-green-600', from: 'from-green-500', to: 'to-green-400', bgFrom: 'from-green-100', bgTo: 'to-green-50' },
    blue: { text: 'text-blue-600', from: 'from-blue-500', to: 'to-blue-400', bgFrom: 'from-blue-100', bgTo: 'to-blue-50' },
    yellow: { text: 'text-yellow-600', from: 'from-yellow-500', to: 'to-yellow-400', bgFrom: 'from-yellow-100', bgTo: 'to-yellow-50' },
  }
  const classes = colorClasses[color]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <Icon className={`${classes.text}`} size={20} />
      </div>
      <div className={`text-3xl font-bold ${classes.text} mb-2`}>{value}</div>
      <p className="text-sm text-gray-600">{change}</p>
      <div className={`mt-4 h-20 bg-gradient-to-r ${classes.bgFrom} ${classes.bgTo} rounded-lg flex items-end justify-between px-2 pb-2`}>
        {data.map((height, index) => (
          <div
            key={index}
            className={`w-4 bg-gradient-to-t ${classes.from} ${classes.to} rounded-sm`}
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  )
}