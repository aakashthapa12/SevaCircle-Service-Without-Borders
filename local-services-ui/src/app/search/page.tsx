"use client";

import { useSearchParams } from "next/navigation";
import { WorkerCard } from "@/components/WorkerCard";
import { workers } from "@/data/workers";
import { services } from "@/data/services";
import { Filter, MapPin, Star, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SearchPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service") || "";
  
  const [sortBy, setSortBy] = useState("rating");

  // Get service name
  const service = services.find((s) => s.id === serviceId);
  const serviceName = service?.name || t("services");

  // Filter workers by service
  let filteredWorkers = serviceId
    ? workers.filter((w) => w.service === serviceId)
    : workers;

  // Sort workers
  if (sortBy === "rating") {
    filteredWorkers = [...filteredWorkers].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price") {
    filteredWorkers = [...filteredWorkers].sort((a, b) => a.price - b.price);
  } else if (sortBy === "distance") {
    filteredWorkers = [...filteredWorkers].sort(
      (a, b) =>
        parseFloat(a.distance) - parseFloat(b.distance)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 via-purple-50 to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Premium Header with stats */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            {serviceName}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                <MapPin size={22} className="text-purple-600" />
              </div>
              <p className="text-xl text-gray-700 font-medium">
                Near your location <span className="text-gray-500">(5 km radius)</span>
              </p>
            </div>
            <div className="hidden md:block h-2 w-2 bg-purple-400 rounded-full"></div>
            <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {filteredWorkers.length} {t("nearby_workers")}
            </p>
          </div>
        </div>

        {/* Premium Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-700 font-bold text-base">Filters:</span>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow">
                <MapPin size={18} className="text-blue-600" />
                <span className="text-base font-semibold text-gray-800">Near you</span>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow">
                <Star size={18} className="text-green-600" />
                <span className="text-base font-semibold text-gray-800">Top rated</span>
              </div>
            </div>

            {/* Sort Dropdown - Premium */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all shadow-md hover:shadow-lg">
              <Filter size={20} className="text-purple-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-bold text-gray-700 text-base"
              >
                <option value="rating">⭐ {t("rating")}</option>
                <option value="price">₹ {t("price")}</option>
                <option value="distance">📍 {t("distance")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workers Grid - Premium */}
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredWorkers.map((worker, index) => (
              <div
                key={worker.id}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <WorkerCard worker={worker} />
              </div>
            ))}
          </div>
        ) : (
          // Premium Empty State
          <div className="text-center py-28 px-6">
            <div className="inline-block bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-12 rounded-full mb-8 border-4 border-white shadow-2xl">
              <div className="text-8xl">🔍</div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("no_workers")}
            </h2>
            <p className="text-gray-600 mb-10 text-xl max-w-xl mx-auto leading-relaxed">
              Try searching for a different service or expand your location radius
            </p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl hover:shadow-2xl transition-all font-bold text-lg shadow-xl hover:scale-105 active:scale-95"
            >
              ← {t("view_all")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
