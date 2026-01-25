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
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "bookings" | "earnings" | "orders">("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [workerProfile, setWorkerProfile] = useState({
    name: "",
    email: "",
    role: "",
    rating: 0,
    completedJobs: 0,
    phone: "",
    location: "",
    joinedDate: "",
    hourlyRate: 0,
    availability: "",
    profileImage: "",
    totalEarnings: 0,
    activeHours: 0
  });

  // Simulate database fetch for worker profile
  const fetchWorkerProfileFromDatabase = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const savedProfile = localStorage.getItem("workerProfile");
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setWorkerProfile(profileData);
      } else {
        // Set default worker data from database simulation
        const defaultProfile = {
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Professional Plumber",
          rating: 4.8,
          completedJobs: 127,
          phone: "+1 234 567 8900",
          location: "New York, NY",
          joinedDate: "Jan 2024",
          hourlyRate: 45,
          availability: "Available",
          profileImage: "",
          totalEarnings: 5430,
          activeHours: 342
        };
        setWorkerProfile(defaultProfile);
        localStorage.setItem("workerProfile", JSON.stringify(defaultProfile));
      }
    } catch (error) {
      console.error("Failed to fetch worker profile:", error);
    }
  };

  // Load orders and profile data from localStorage/database
  useEffect(() => {
    fetchWorkerProfileFromDatabase();
    
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
    <div className="min-h-screen bg-gray-50">
      {/* Professional clean background */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
             }}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar with glassy effect */}
            <div className="flex-shrink-0">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-xl overflow-hidden"
                style={{
                  background: workerProfile.profileImage ? 'transparent' : 
                    'linear-gradient(135deg, lab(66.9756% -58.27 19.5419) 0%, lab(56% -48 15) 100%)'
                }}
              >
                {workerProfile.profileImage ? (
                  <img src={workerProfile.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{workerProfile.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{workerProfile.role}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {workerProfile.availability}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">{workerProfile.rating}</span>
                  <span className="text-sm text-gray-500">({workerProfile.completedJobs} jobs)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-sm">{workerProfile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={20} className="text-gray-400" />
                  <span className="text-sm">Joined {workerProfile.joinedDate}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-sm">{workerProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-sm">{workerProfile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign size={18} className="text-gray-400" />
                  <span className="text-sm font-semibold">${workerProfile.hourlyRate}/hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Jobs</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{workerProfile.completedJobs}</p>
              </div>
              <CheckCircle size={32} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">${workerProfile.totalEarnings}</p>
              </div>
              <DollarSign size={32} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Hours</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{workerProfile.activeHours}</p>
              </div>
              <Clock size={32} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition relative ${
                  activeTab === "profile"
                    ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                My Profile
              </button>
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

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="text-gray-600" size={20} />
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            Read-only
                          </span>
                        </div>
                        <input
                          type="text"
                          value={workerProfile.name}
                          disabled
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <label className="block text-sm font-medium text-gray-700">Email Address</label>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            Read-only
                          </span>
                        </div>
                        <input
                          type="email"
                          value={workerProfile.email}
                          disabled
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={workerProfile.phone}
                          onChange={(e) => setWorkerProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="text-gray-600" size={20} />
                      Professional Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role/Specialization</label>
                        <input
                          type="text"
                          value={workerProfile.role}
                          onChange={(e) => setWorkerProfile(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                        <input
                          type="number"
                          value={workerProfile.hourlyRate}
                          onChange={(e) => setWorkerProfile(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={workerProfile.location}
                          onChange={(e) => setWorkerProfile(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/bookings" className="group">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all duration-200 group-hover:border-gray-300">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <Calendar size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                            View All Bookings
                          </h4>
                          <p className="text-gray-600 text-sm">Manage your service history</p>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </div>
                  </Link>

                  <Link href="/payments" className="group">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all duration-200 group-hover:border-gray-300">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <span className="text-gray-600 text-xl">💳</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                            Payment Methods
                          </h4>
                          <p className="text-gray-600 text-sm">Manage payment options</p>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Save Changes
                  </button>
                </div>
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
