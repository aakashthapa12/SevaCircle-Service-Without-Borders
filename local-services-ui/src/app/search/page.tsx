"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { ServicePageHeader } from "@/components/ServicePageHeader";
import { services, serviceCategories, getServicesByCategory } from "@/data/services";
import { 
  Star, 
  Shield,
  Clock,
  ChevronDown,
  Search
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState("all");

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory && selectedCategory !== "all") {
      filtered = getServicesByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
      {/* Hero Section - Using Dedicated Component */}
      <ServicePageHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filter - Horizontal Scroll */}
        <div className="mb-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("")}
              className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === "" 
                ? "bg-gradient-primary text-white shadow-lg" 
                : "bg-white text-gray-700 hover:shadow-md"
              }`}
            >
              All
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id 
                  ? "bg-gradient-primary text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Sort - Minimal Design */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="appearance-none bg-white px-6 py-3 pr-10 rounded-full border-0 shadow-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget</option>
              <option value="mid">Mid-range</option>
              <option value="premium">Premium</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white px-6 py-3 pr-10 rounded-full border-0 shadow-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="text-gray-600">
            <span className="font-bold text-blue-600">{filteredServices.length}</span> services
          </div>
        </div>

        {/* Services Grid - Clean 3 Column */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No services found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setPriceRange("all");
              }}
              className="px-8 py-3 bg-gradient-primary text-white rounded-full font-semibold hover:opacity-90"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Trust Section - Minimal & Professional */}
        {filteredServices.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Experts</h3>
                <p className="text-gray-600 text-sm">Background checked professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">On-Time Service</h3>
                <p className="text-gray-600 text-sm">Guaranteed punctual delivery</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-sm">100% satisfaction guarantee</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
