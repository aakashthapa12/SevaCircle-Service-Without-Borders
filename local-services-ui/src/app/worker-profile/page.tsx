"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Calendar, 
  DollarSign, 
  Briefcase,
  Clock,
  CheckCircle,
  Settings,
  LogOut,
  Bell,
  Package,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export default function WorkerProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "earnings" | "orders">("orders");
  const [orders, setOrders] = useState<any[]>([]);

  // Load orders from localStorage
  useEffect(() => {
    const loadOrders = () => {
      const storedOrders = localStorage.getItem("workerOrders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    };
    loadOrders();
    
    // Poll for new orders every 5 seconds
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock worker data - replace with actual API call
  const workerData = {
    name: "John Doe",
    role: "Professional Plumber",
    rating: 4.8,
    completedJobs: 127,
    phone: "+1 234 567 8900",
    email: "john.doe@example.com",
    location: "New York, NY",
    joinedDate: "Jan 2024",
    hourlyRate: 45,
    availability: "Available",
  };

  const recentBookings = [
    { id: 1, service: "Pipe Repair", client: "Alice Smith", date: "Jan 24, 2026", status: "Completed", amount: 120 },
    { id: 2, service: "Drain Cleaning", client: "Bob Johnson", date: "Jan 23, 2026", status: "Completed", amount: 90 },
    { id: 3, service: "Faucet Installation", client: "Carol White", date: "Jan 25, 2026", status: "Upcoming", amount: 75 },
  ];

  const handleAcceptOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: "accepted" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("workerOrders", JSON.stringify(updatedOrders));
  };

  const handleRejectOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("workerOrders", JSON.stringify(updatedOrders));
  };

  const handleLogout = () => {
    // TODO: Clear auth tokens
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
              {orders.filter(o => o.status === "pending").length > 0 && (
                <div className="relative">
                  <Bell className="text-amber-500 animate-bounce" size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {orders.filter(o => o.status === "pending").length}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/settings")}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User size={64} className="text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{workerData.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{workerData.role}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {workerData.availability}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">{workerData.rating}</span>
                  <span className="text-sm text-gray-500">({workerData.completedJobs} jobs)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-sm">{workerData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={20} className="text-gray-400" />
                  <span className="text-sm">Joined {workerData.joinedDate}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-sm">{workerData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-sm">{workerData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign size={18} className="text-gray-400" />
                  <span className="text-sm font-semibold">${workerData.hourlyRate}/hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{workerData.completedJobs}</p>
              </div>
              <CheckCircle size={40} className="text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">$5,430</p>
              </div>
              <DollarSign size={40} className="text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">342</p>
              </div>
              <Clock size={40} className="text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition relative ${
                  activeTab === "orders"
                    ? "text-amber-600 border-b-2 border-amber-600 bg-amber-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                New Orders
                {orders.filter(o => o.status === "pending").length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {orders.filter(o => o.status === "pending").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                  activeTab === "overview"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                  activeTab === "bookings"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Recent Bookings
              </button>
              <button
                onClick={() => setActiveTab("earnings")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                  activeTab === "earnings"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Earnings
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Incoming Orders</h3>
                  <span className="text-sm text-gray-600">
                    {orders.filter(o => o.status === "pending").length} pending orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No orders yet</p>
                    <p className="text-gray-400 text-sm mt-2">New orders from customers will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gradient-to-br from-white to-amber-50/30 border-2 border-amber-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
                      >
                        {/* Order Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold text-gray-900 text-lg">Order {order.id}</h4>
                              {order.status === "pending" && (
                                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                              {order.status === "accepted" && (
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                  ACCEPTED
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-amber-600">₹{order.totalAmount}</p>
                          </div>
                        </div>

                        {/* Services List */}
                        <div className="bg-white/80 rounded-xl p-4 mb-4">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Package size={16} />
                            Services Requested:
                          </h5>
                          <div className="space-y-2">
                            {order.services.map((service: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-700">
                                  {service.name} x {service.quantity}
                                </span>
                                <span className="font-semibold text-gray-900">
                                  ₹{service.price * service.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Contact Details - Enhanced */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border-2 border-blue-200">
                          <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User size={18} className="text-blue-600" />
                            Customer Details
                          </h5>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <User size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Name</p>
                                <p className="font-semibold text-gray-900">{order.customer.name}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Phone</p>
                                <a href={`tel:${order.customer.phone}`} className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                                  {order.customer.phone}
                                </a>
                              </div>
                            </div>
                            {order.customer.email && (
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Mail size={16} className="text-white" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Email</p>
                                  <a href={`mailto:${order.customer.email}`} className="font-semibold text-blue-600 hover:text-blue-800 hover:underline break-all">
                                    {order.customer.email}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Schedule & Address Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-200">
                            <p className="text-xs text-gray-600 mb-3 font-semibold">Schedule</p>
                            <p className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                              <Calendar size={16} className="text-purple-600" />
                              {order.schedule.date}
                            </p>
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                              <Clock size={16} className="text-purple-600" />
                              {order.schedule.timeSlot}
                            </p>
                          </div>

                          <div className="bg-green-50/50 rounded-lg p-4 border border-green-200">
                            <p className="text-xs text-gray-600 mb-3 font-semibold flex items-center gap-1">
                              <MapPin size={14} className="text-green-600" />
                              Service Location
                            </p>
                            {order.customer.address ? (
                              <div className="text-sm text-gray-900 space-y-1">
                                <p className="font-medium">{order.customer.address.street}</p>
                                <p>{order.customer.address.city}, {order.customer.address.state}</p>
                                <p className="font-semibold">PIN: {order.customer.address.pincode}</p>
                                {order.customer.address.landmark && (
                                  <p className="text-gray-600 italic">Near: {order.customer.address.landmark}</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-900">{order.address}</p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {order.status === "pending" && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAcceptOrder(order.id)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <CheckCircle size={20} />
                              Accept Order
                            </button>
                            <button
                              onClick={() => handleRejectOrder(order.id)}
                              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <AlertCircle size={20} />
                              Reject
                            </button>
                          </div>
                        )}

                        {order.status === "accepted" && (
                          <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle size={24} className="text-green-600" />
                              <div>
                                <p className="font-bold text-green-900">Order Accepted!</p>
                                <p className="text-sm text-green-700">Customer has been notified</p>
                              </div>
                            </div>
                            <ArrowRight size={20} className="text-green-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Briefcase className="text-blue-600" size={24} />
                      <div>
                        <p className="font-semibold text-gray-900">Plumbing Services</p>
                        <p className="text-sm text-gray-600">Expert in all plumbing works</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-semibold text-gray-900">Verified Professional</p>
                        <p className="text-sm text-gray-600">Background check completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{booking.service}</p>
                        <p className="text-sm text-gray-600 mt-1">Client: {booking.client}</p>
                        <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${booking.amount}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "earnings" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">$1,245</p>
                      </div>
                      <DollarSign size={40} className="text-green-600" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Last Month</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">$1,890</p>
                      </div>
                      <DollarSign size={40} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
