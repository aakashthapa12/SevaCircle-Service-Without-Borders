"use client";

import { Search, Sparkles } from "lucide-react";

interface ServicePageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export const ServicePageHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit 
}: ServicePageHeaderProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <section className="relative bg-gradient-primary overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse animate-delay-1s"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse animate-delay-2s"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">50,000+ Services Booked</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Explore Our 
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-white to-blue-200 bg-clip-text text-transparent">
                Premium Services
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Professional home services delivered by verified experts at your doorstep
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20">
              <div className="flex items-stretch">
                {/* Search Input */}
                <div className="flex-1 flex items-center px-6 sm:px-8 py-5 sm:py-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for plumbing, cleaning, electrical..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="flex-1 text-base sm:text-lg text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                
                {/* Search Button */}
                <button 
                  type="submit"
                  className="px-8 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="hidden sm:inline">Search</span>
                  <Search className="w-5 h-5 sm:hidden group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-white/80 font-medium">Popular:</span>
              {["Plumbing", "Cleaning", "Electrical", "Carpentry"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onSearchChange(term)}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "4.8★", label: "Average Rating" },
              { value: "100+", label: "Services" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="rgb(239, 246, 255)" fillOpacity="0.3"/>
          <path d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,88C672,91,768,85,864,80C960,75,1056,69,1152,69.3C1248,69,1344,75,1392,77.3L1440,80L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="rgb(239, 246, 255)"/>
        </svg>
      </div>
    </section>
  );
};
