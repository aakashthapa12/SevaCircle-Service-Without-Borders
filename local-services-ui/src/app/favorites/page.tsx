"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Star,
  Clock,
  Trash2,
  ShoppingCart,
  Sparkles
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (serviceId: string) => {
    const updatedFavorites = favorites.filter(id => id !== serviceId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const favoriteServices = services.filter(service => favorites.includes(service.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
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
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="text-white fill-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">My Favorites</h1>
                  <p className="text-gray-600 text-lg">Services you love, all in one place</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="hidden lg:flex gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 text-center border-2 border-pink-200 min-w-[120px]">
                  <p className="text-3xl font-black text-pink-600">{favorites.length}</p>
                  <p className="text-xs text-gray-600 font-medium">Saved Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favoriteServices.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-16 text-center">
            <Heart size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">Start adding services to your favorites to see them here</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl"
            >
              <Heart size={20} />
              Discover Services
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-white/50 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-pink-600" size={24} />
                  <p className="text-gray-700 font-semibold">You have {favorites.length} favorite service{favorites.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear all favorites?")) {
                      setFavorites([]);
                      localStorage.setItem("favorites", JSON.stringify([]));
                    }
                  }}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteServices.map((service) => (
                <div key={service.id} className="relative group">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-300 animate-fade-in">
                    {/* Service Image */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
                      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px'}}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{service.icon}</span>
                      </div>
                      {service.popular && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Sparkles size={12} />
                          POPULAR
                        </div>
                      )}
                    </div>

                    {/* Service Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="text-amber-500 fill-amber-500" size={16} />
                          <span className="font-bold text-gray-900">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="text-blue-600" size={16} />
                          <span className="text-gray-700 text-sm">{service.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-3xl font-black text-purple-600">₹{service.price}</p>
                          {service.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">₹{service.originalPrice}</p>
                          )}
                        </div>
                        {service.discount && (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            {service.discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/booking?service=${service.id}`}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Book Now
                        </Link>
                        <button
                          onClick={() => removeFavorite(service.id)}
                          className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
