"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  MapPin, 
  User,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Loader,
  Star,
  Download,
  MessageCircle
} from "lucide-react";

interface Booking {
  id: string;
  services: Array<{ name: string; quantity: number; price: number }>;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  schedule: {
    date: string;
    timeSlot: string;
  };
  address: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "accepted" | "completed" | "cancelled">("all");

  useEffect(() => {
    // Load bookings from localStorage
    const savedOrders = localStorage.getItem("workerOrders");
    if (savedOrders) {
      setBookings(JSON.parse(savedOrders));
    }
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === "all") return true;
    return booking.status === activeFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "accepted":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "accepted":
        return <CheckCircle size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return <Loader size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-[4%] sm:px-[6%] lg:px-[8%] py-[clamp(2rem,4vw,3rem)]">
        {/* Header */}
        <div className="mb-8">
          <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            <span className="font-semibold">Back to Services</span>
          </Link>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Package className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">My Bookings</h1>
                  <p className="text-gray-600 text-lg">Track and manage your service orders</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="hidden lg:flex gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border-2 border-blue-200 min-w-[120px]">
                  <p className="text-3xl font-black text-blue-600">{bookings.length}</p>
                  <p className="text-xs text-gray-600 font-medium">Total Bookings</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-2 border-green-200 min-w-[120px]">
                  <p className="text-3xl font-black text-green-600">{bookings.filter(b => b.status === "completed").length}</p>
                  <p className="text-xs text-gray-600 font-medium">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-white/50 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {["all", "pending", "accepted", "completed", "cancelled"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter === "all" && ` (${bookings.length})`}
                {filter !== "all" && ` (${bookings.filter(b => b.status === filter).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-16 text-center">
            <Package size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">Start booking services to see them here</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6 hover:shadow-3xl transition-all duration-300 animate-fade-in"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">Order {booking.id}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-black text-purple-600">₹{booking.totalAmount}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Services */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Package size={18} className="text-purple-600" />
                      Services
                    </h4>
                    <div className="space-y-2">
                      {booking.services.map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-white/60 rounded-lg p-2">
                          <span className="text-gray-700 font-medium">{service.name} x{service.quantity}</span>
                          <span className="font-bold text-gray-900">₹{service.price * service.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock size={18} className="text-blue-600" />
                      Schedule
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-blue-600" />
                        <span className="text-gray-700 font-medium">{booking.schedule.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-blue-600" />
                        <span className="text-gray-700 font-medium">{booking.schedule.timeSlot}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">{booking.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-6 border-t-2 border-gray-100">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Contact Worker
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Invoice
                  </button>
                  {booking.status === "completed" && (
                    <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                      <Star size={18} />
                      Rate Service
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
