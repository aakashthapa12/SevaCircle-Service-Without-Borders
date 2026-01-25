"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { services, serviceCategories, getServicesByCategory, getPopularServices } from "@/data/services";
import { 
  Filter, 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Sparkles, 
  Users, 
  TrendingUp,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

function SearchContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter services
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = getServicesByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter(service => {
        const price = service.price;
        switch (priceRange) {
          case "budget": return price <= 500;
          case "mid": return price > 500 && price <= 1000;
          case "premium": return price > 1000;
          default: return true;
        }
      });
    }

    // Sort services
    switch (sortBy) {
      case "popular":
        return [...filtered].sort((a, b) => b.bookings - a.bookings);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const currentCategory = serviceCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 w-full">
      {/* Modern Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        
        <div className="relative w-full max-w-[90rem] mx-auto px-[4%] sm:px-[6%] lg:px-[8%] py-[clamp(3rem,5vw,5rem)]">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {currentCategory ? currentCategory.name : "All Services"}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book trusted professionals for all your service needs. Quality guaranteed, convenience delivered.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl shadow-xl focus:ring-4 focus:ring-white/30 focus:outline-none bg-white/95 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">50M+</div>
              <div className="text-white/80">Services Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/80">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">30+</div>
              <div className="text-white/80">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[90rem] mx-auto px-[4%] sm:px-[6%] lg:px-[8%] py-[clamp(2rem,4vw,3rem)]">
        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory("")}
              className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "" 
                ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl ring-4 ring-blue-200/50" 
                : "bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 hover:shadow-xl"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={18} className={selectedCategory === "" ? "animate-pulse" : ""} />
                All Categories
              </span>
              {selectedCategory === "" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              )}
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                  selectedCategory === category.id 
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl ring-4 ring-blue-200/50" 
                  : "bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 hover:shadow-xl"
                }`}
              >
                <span className="text-2xl group-hover:animate-bounce">{category.icon}</span>
                <span className="relative z-10">{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (Under ₹500)</option>
              <option value="mid">Mid-range (₹500-1000)</option>
              <option value="premium">Premium (Above ₹1000)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">{filteredServices.length}</span>
              <span>services found</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
        }`}>
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setPriceRange("all");
              }}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
