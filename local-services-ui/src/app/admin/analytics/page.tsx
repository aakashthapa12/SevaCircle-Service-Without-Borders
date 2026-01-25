'use client'

import { useEffect, useState } from 'react'
import { BarChart3, PieChart, TrendingUp, Activity, Star } from 'lucide-react'

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState<any>(null)
  const [serviceDistribution, setServiceDistribution] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, servicesRes, metricsRes] = await Promise.all([
          fetch('http://localhost:3001/admin/analytics/revenue'),
          fetch('http://localhost:3001/admin/analytics/services'),
          fetch('http://localhost:3001/admin/analytics/metrics')
        ])

        if (revenueRes.ok && servicesRes.ok && metricsRes.ok) {
          setRevenueData(await revenueRes.json())
          setServiceDistribution(await servicesRes.json())
          setMetrics(await metricsRes.json())
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <Header />
        <div className="text-center py-12">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="space-y-8">
        <RevenueAnalytics revenueData={revenueData} serviceDistribution={serviceDistribution} />
        <PerformanceMetrics metrics={metrics} />
        <DetailedAnalytics metrics={metrics} />
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

function RevenueAnalytics({ revenueData, serviceDistribution }: { revenueData: any, serviceDistribution: any[] }) {
  const serviceColors = [
    { bg: 'bg-blue-600', text: 'text-blue-600' },
    { bg: 'bg-purple-600', text: 'text-purple-600' },
    { bg: 'bg-teal-600', text: 'text-teal-600' },
    { bg: 'bg-indigo-600', text: 'text-indigo-600' },
    { bg: 'bg-pink-600', text: 'text-pink-600' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
          <div className="text-center">
            <BarChart3 size={48} className="text-purple-500 mx-auto mb-4" />
            <p className="text-gray-600">Revenue Chart Visualization</p>
            <div className="mt-4 text-3xl font-bold text-purple-600">₹{revenueData?.totalRevenue.toLocaleString() || 0}</div>
            <p className="text-sm text-gray-500">Total Revenue This Month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Service Distribution</h3>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
          <div className="text-center w-full px-4">
            <PieChart size={48} className="text-teal-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Service Distribution</p>
            {serviceDistribution.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {serviceDistribution.slice(0, 4).map((service, index) => (
                  <div key={index} className="text-center">
                    <div className={`font-bold ${serviceColors[index % serviceColors.length].text}`}>
                      {service.percentage}%
                    </div>
                    <div className="text-gray-600">{service.service}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No service data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceMetrics({ metrics }: { metrics: any }) {
  if (!metrics) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="User Growth"
        value={`+${metrics.userGrowth}%`}
        change="Compared to last month"
        icon={TrendingUp}
        color="green"
        data={[65, 72, 58, 89, 95, 78, 85]}
      />
      <MetricCard
        title="Booking Rate"
        value={`${metrics.bookingRate}%`}
        change="Success rate this week"
        icon={Activity}
        color="blue"
        data={[78, 85, 92, 88, 95, 89, 93]}
      />
      <MetricCard
        title="Worker Rating"
        value={`${metrics.avgWorkerRating}/5`}
        change="Average worker rating"
        icon={Star}
        color="yellow"
        data={[88, 92, 85, 95, 89, 94, 91]}
      />
    </div>
  )
}

function DetailedAnalytics({ metrics }: { metrics: any }) {
  if (!metrics) return null

  const detailedMetrics = [
    { label: 'Average Booking Value', value: `₹${metrics.avgBookingValue}`, change: '', color: 'text-green-600' },
    { label: 'Worker Response Time', value: `${metrics.avgResponseTime} min`, change: '', color: 'text-green-600' },
    { label: 'Customer Retention', value: `${metrics.retentionRate}%`, change: '', color: 'text-green-600' },
    { label: 'Peak Hours Usage', value: metrics.peakHours, change: `${metrics.peakUsage}%`, color: 'text-blue-600' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {detailedMetrics.map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            {metric.change && <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>}
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