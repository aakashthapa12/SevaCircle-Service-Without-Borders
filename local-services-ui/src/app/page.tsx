"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { WorkerCard } from "@/components/WorkerCard";
import { services, serviceCategories, getServicesByCategory, getPopularServices } from "@/data/services";
import { workers } from "@/data/workers";
import { Search, Users, Award, Zap, CheckCircle, Clock, Shield, Star, Phone, MapPin, ArrowRight, Calendar, HeartHandshake, TrendingUp, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  const featuredWorkers = workers.slice(0, 3);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const [isLogged, setIsLogged] = useState(false);

  // Filtering state - same as search page
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFiltered, setShowFiltered] = useState(false);

  // Filter services - same logic as search page
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
  }, [searchQuery, selectedCategory, sortBy]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowFiltered(true);
  };

  // Generate particles on client side only
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 2
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  useEffect(() => {
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };
    const check = () => setIsLogged(!!getCookie('auth_token'));
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Premium Hero Section - Rich Dark Gradient */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-32 overflow-hidden">
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-600/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-600/15 to-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgb(147, 51, 234) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgb(20, 184, 166) 2px, transparent 0)",
            backgroundSize: "100px 100px"
          }}></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex justify-center">
            <div className="text-center text-white space-y-12 mb-20 max-w-4xl ml-12 py-8">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                  <Star size={18} className="text-gray-900" />
                  PREMIUM QUALITY GUARANTEED
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Transform Your Home with Expert Professionals
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Experience premium home services that exceed expectations. From planning to completion, we deliver excellence.
                </p>
              </div>
              
              {/* Get Instant Quote Button */}
              <div className="pt-8">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <Phone size={28} />
                  Get Instant Quote
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid - Clean Premium Cards */}
          <div className="flex justify-center mb-12 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield size={40} className="text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">100% Verified Professionals</h3>
                <p className="text-gray-300 leading-relaxed">
                  Background checked and certified experts
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock size={40} className="text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">24/7 Premium Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Round-the-clock assistance for your peace of mind
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award size={40} className="text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Satisfaction Guaranteed</h3>
                <p className="text-gray-300 leading-relaxed">
                  Your complete satisfaction or money back
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
            {/* Book Services Now - Primary CTA */}
            <Link
              href="/search"
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white px-16 py-6 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-purple-500/30 transform hover:scale-110 transition-all duration-500 overflow-hidden min-w-[300px]"
              onClick={(e) => {
                e.preventDefault();
                if (isLogged) {
                  router.push('/search');
                } else {
                  router.push('/login?redirect=/search');
                }
              }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Content */}
              <div className="relative flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Search size={24} className="text-white" />
                </div>
                <span className="relative">Book Services Now</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </div>

              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-purple-400 scale-105 opacity-0 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500"></div>
            </Link>

            {/* Join as Professional - Secondary CTA */}
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-white via-gray-50 to-white text-purple-700 px-16 py-6 rounded-3xl font-black text-2xl border-4 border-purple-500 shadow-2xl hover:shadow-purple-400/30 transform hover:scale-110 transition-all duration-500 overflow-hidden min-w-[300px]"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-teal-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Content */}
              <div className="relative flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Users size={24} className="text-white" />
                </div>
                <span className="relative group-hover:text-purple-800 transition-colors duration-300">Join as Professional</span>
                <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300 shadow-lg">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </div>

              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-purple-500 scale-105 opacity-0 group-hover:scale-110 group-hover:opacity-70 transition-all duration-500"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 bg-gradient-to-br from-white via-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex justify-center items-center min-h-[50vh] mb-24">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-12">
                <Zap size={16} />
                Our Premium Services
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-16 leading-tight">
                Excellence in Every Service
              </h2>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed px-4">
                From routine maintenance to complex installations, our certified professionals deliver outstanding results that exceed your expectations.
              </p>
            </div>
          </div>

          {/* Auto-Scrolling Service Cards Container */}
          <div className="relative overflow-hidden py-8 mb-20">
            <div className="flex space-x-8 animate-scroll-left hover:pause-animation">
              {/* First Set of Cards */}
              <div className="flex space-x-8 flex-shrink-0">
                {/* Plumbing Services */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">🔧</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Plumbing Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Expert plumbing solutions for all your residential and commercial needs.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $99</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Electrical Services */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-gray-900 text-3xl">⚡</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">Electrical Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Professional electrical installations, repairs, and maintenance services.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $129</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* HVAC Services */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">❄️</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">HVAC Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Heating, ventilation, and air conditioning services for optimal comfort.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $149</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Cleaning Services */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">✨</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">Cleaning Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Professional cleaning services for homes and commercial spaces.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $79</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Duplicate Set for Seamless Loop */}
              <div className="flex space-x-8 flex-shrink-0">
                {/* Plumbing Services - Duplicate */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">🔧</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Plumbing Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Expert plumbing solutions for all your residential and commercial needs.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $99</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Electrical Services - Duplicate */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-gray-900 text-3xl">⚡</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">Electrical Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Professional electrical installations, repairs, and maintenance services.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $129</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* HVAC Services - Duplicate */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">❄️</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">HVAC Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Heating, ventilation, and air conditioning services for optimal comfort.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $149</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Cleaning Services - Duplicate */}
                <div className="group relative bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 hover:scale-105 overflow-hidden min-w-[320px] mx-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                      <div className="text-white text-3xl">✨</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">Cleaning Services</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">Professional cleaning services for homes and commercial spaces.</p>
                    <div className="flex items-center justify-center text-yellow-500 font-bold text-lg">
                      <span>Starting from $79</span>
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/search"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section - Soft Light Gradient */}
      <section className="py-32 bg-gradient-to-br from-purple-50/80 via-white to-blue-50/60 relative overflow-hidden">
        {/* Subtle Background Decorative Elements */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-100/30 to-blue-100/25 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/25 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 text-purple-800 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-lg border border-purple-200/30">
              <Star size={18} className="animate-pulse" />
              Featured Services
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-8 leading-tight">
              Popular Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16">
              Discover our most popular professional services, trusted by thousands of customers
            </p>

            {/* Category Pills - Enhanced Design */}
            <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-6xl mx-auto">
              <button
                onClick={() => handleCategorySelect("")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 ${
                  selectedCategory === "" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles size={20} className={selectedCategory === "" ? "animate-pulse text-yellow-200" : "text-purple-500"} />
                  <span className="font-extrabold">All Categories</span>
                </span>
                {selectedCategory === "" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
              
              <button
                onClick={() => handleCategorySelect("cleaning")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 flex items-center gap-4 ${
                  selectedCategory === "cleaning" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="text-3xl group-hover:animate-bounce transition-transform">🏠</span>
                <span className="relative z-10 font-extrabold">Home Cleaning</span>
                {selectedCategory === "cleaning" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
              
              <button
                onClick={() => handleCategorySelect("beauty")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 flex items-center gap-4 ${
                  selectedCategory === "beauty" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="text-3xl group-hover:animate-bounce transition-transform">💄</span>
                <span className="relative z-10 font-extrabold">Beauty & Spa</span>
                {selectedCategory === "beauty" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
              
              <button
                onClick={() => handleCategorySelect("repairs")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 flex items-center gap-4 ${
                  selectedCategory === "repairs" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="text-3xl group-hover:animate-bounce transition-transform">🔧</span>
                <span className="relative z-10 font-extrabold">Repairs & Maintenance</span>
                {selectedCategory === "repairs" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
              
              <button
                onClick={() => handleCategorySelect("appliance")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 flex items-center gap-4 ${
                  selectedCategory === "appliance" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="text-3xl group-hover:animate-bounce transition-transform">🔌</span>
                <span className="relative z-10 font-extrabold">Appliance Repair</span>
                {selectedCategory === "appliance" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
              
              <button
                onClick={() => handleCategorySelect("pest")}
                className={`group relative px-10 py-5 rounded-3xl font-bold text-base transition-all duration-500 transform hover:scale-110 flex items-center gap-4 ${
                  selectedCategory === "pest" 
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white shadow-2xl ring-4 ring-purple-300/50 scale-105" 
                  : "bg-white/95 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:border-purple-300 hover:shadow-2xl shadow-lg"
                }`}
              >
                <span className="text-3xl group-hover:animate-bounce transition-transform">🐛</span>
                <span className="relative z-10 font-extrabold">Pest Control</span>
                {selectedCategory === "pest" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                )}
              </button>
            </div>
          </div>

          {/* Filtered Results Section - Enhanced Design */}
          {showFiltered && (
            <div className="mb-24">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                    {selectedCategory ? 
                      `${serviceCategories.find(cat => cat.id === selectedCategory)?.name || 'Category'} Services` : 
                      'All Services'
                    }
                  </h3>
                  <span className="bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 text-purple-800 px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-purple-200/30">
                    {filteredServices.length} services found
                  </span>
                </div>
                <button
                  onClick={() => setShowFiltered(false)}
                  className="text-gray-500 hover:text-gray-700 p-3 hover:bg-gray-100 rounded-xl transition-colors shadow-md border border-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Services Grid - Enhanced Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                {filteredServices.slice(0, 12).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {filteredServices.length > 12 && (
                <div className="text-center mt-16">
                  <Link
                    href={`/search${selectedCategory ? `?category=${selectedCategory}` : ''}`}
                    className="inline-flex items-center gap-3 text-purple-600 hover:text-purple-700 font-bold text-xl bg-white hover:bg-purple-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200 hover:border-purple-300"
                  >
                    View all {filteredServices.length} services
                    <ArrowRight size={20} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Popular Services Grid - Enhanced Design */}
          {!showFiltered && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10 mb-24">
                {services
                  .filter(service => service.popular)
                  .slice(0, 8)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>

          {/* Enhanced CTA Section */}
          <div className="text-center mt-16">
            <div className="inline-block">
              <Link
                href="/search"
                className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Explore All Services</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Link>
            </div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              Browse through our comprehensive service catalog and find the perfect solution for your needs
            </p>
          </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Clean White Background */}
      <section className="py-32 bg-white text-gray-800 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-50/60 to-blue-50/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-50/50 to-purple-50/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-50/40 to-teal-50/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-200/60 via-blue-200/60 to-teal-200/60 text-purple-800 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-lg border border-purple-300/30">
              <Shield size={18} className="animate-pulse" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-8 leading-tight">
              Why Choose LOCAL SERVICING?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We're not just another service platform. We're your trusted partner for all home improvement needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Verified Experts */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50 border border-purple-100/50 hover:border-purple-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Shield size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent mb-4 group-hover:from-purple-600 group-hover:to-teal-500 transition-all duration-300">
                  Verified Experts
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every professional is thoroughly vetted, licensed, and insured for your peace of mind.
                </p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50 border border-blue-100/50 hover:border-blue-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Clock size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-4 group-hover:from-blue-600 group-hover:to-purple-500 transition-all duration-300">
                  24/7 Support
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Round-the-clock customer support to assist you whenever you need help.
                </p>
              </div>
            </div>

            {/* Quality Guaranteed */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-teal-200/50 border border-teal-100/50 hover:border-teal-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Award size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-blue-600 bg-clip-text text-transparent mb-4 group-hover:from-teal-600 group-hover:to-blue-500 transition-all duration-300">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  100% satisfaction guarantee or your money back. We stand behind our work.
                </p>
              </div>
            </div>

            {/* Best Prices */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50 border border-purple-100/50 hover:border-purple-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-teal-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <TrendingUp size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent mb-4 group-hover:from-purple-600 group-hover:to-teal-500 transition-all duration-300">
                  Best Prices
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Competitive pricing with transparent quotes and no hidden fees ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section - Warm Gradient Background */}
      <section className="py-32 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-100/60 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-blue-200/25 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-200/25 to-teal-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-200/80 via-blue-200/80 to-purple-200/80 text-teal-800 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-lg border border-teal-300/40">
              <HeartHandshake size={18} className="animate-pulse" />
              Customer Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-700 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-8 leading-tight">
              What Our Clients Say
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-6xl mx-auto text-center leading-relaxed">
              Don't just take our word for it. Here's what our satisfied customers have to say about our premium services.
            </p>
          </div>

          {/* Centered 3 Cards in Row */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl">
              {/* Advanced Modern Testimonial Card 1 */}
              <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-100/60 p-12 hover:shadow-2xl hover:shadow-teal-200/30 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/40 via-white to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative text-center">
                  {/* Stars */}
                  <div className="flex justify-center items-center mb-8">
                    <div className="flex text-teal-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={28} fill="currentColor" className="mx-1" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-xl leading-relaxed mb-10 text-center font-medium">
                    "Absolutely exceptional service! The plumber arrived on time, diagnosed the issue quickly, and fixed everything perfectly. The pricing was transparent and fair."
                  </p>
                  
                  {/* Customer Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      SM
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Sarah Martinez</h4>
                    <p className="text-gray-600 text-lg">Homeowner, Downtown</p>
                  </div>
                </div>
              </div>

              {/* Advanced Modern Testimonial Card 2 */}
              <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100/60 p-12 hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative text-center">
                  {/* Stars */}
                  <div className="flex justify-center items-center mb-8">
                    <div className="flex text-blue-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={28} fill="currentColor" className="mx-1" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-xl leading-relaxed mb-10 text-center font-medium">
                    "The electrician was incredibly professional and knowledgeable. He upgraded our entire electrical panel and explained everything clearly. Highly recommend!"
                  </p>
                  
                  {/* Customer Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      DJ
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">David Johnson</h4>
                    <p className="text-gray-600 text-lg">Business Owner</p>
                  </div>
                </div>
              </div>

              {/* Advanced Modern Testimonial Card 3 */}
              <div className="group relative bg-white rounded-3xl shadow-2xl border border-yellow-100/50 p-12 hover:shadow-yellow-400/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-white to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative text-center">
                  {/* Stars */}
                  <div className="flex justify-center items-center mb-8">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={28} fill="currentColor" className="mx-1" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-xl leading-relaxed mb-10 text-center font-medium">
                    "Amazing carpentry work! They transformed our kitchen with custom cabinets that exceeded our expectations. The attention to detail was outstanding."
                  </p>
                  
                  {/* Customer Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      LW
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Lisa Wilson</h4>
                    <p className="text-gray-600 text-lg">Interior Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
              <Users size={16} />
              Meet Our Experts
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Top-Rated Professionals
            </h2>
            <p className="text-2xl text-gray-600 max-w-6xl mx-auto text-center">
              Connect with our highly-rated, verified professionals who are ready to tackle any project with expertise and care.
            </p>
          </div>

          {/* Centered Professional Cards */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
              
              {/* Professional Card 1 - Rajesh Kumar */}
              <div className="group relative bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 hover:shadow-blue-400/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header with Rating & Verification */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="text-blue-500 fill-current" />
                        <span className="text-xl font-bold text-gray-900">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle size={16} />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Professional Avatar */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      RK
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Rajesh Kumar</h3>
                    <p className="text-lg text-blue-600 font-semibold">Plumber</p>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-gray-600">Distance</span>
                      </div>
                      <span className="font-semibold text-gray-900">2.3 km away</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-gray-500" />
                        <span className="text-gray-600">Experience</span>
                      </div>
                      <span className="font-semibold text-gray-900">12+ years exp</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-600">Availability</span>
                      </div>
                      <span className="font-semibold text-green-600">Available today</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-blue-500">₹500</span>
                      <p className="text-sm text-gray-500">Starting price</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional Card 2 - Amit Sharma */}
              <div className="group relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-yellow-400/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/20 via-white to-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header with Rating & Verification */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="text-yellow-400 fill-current" />
                        <span className="text-xl font-bold text-gray-900">4.9</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle size={16} />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Professional Avatar */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      AS
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Amit Sharma</h3>
                    <p className="text-lg text-teal-600 font-semibold">Electrician</p>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-gray-600">Distance</span>
                      </div>
                      <span className="font-semibold text-gray-900">1.8 km away</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-gray-500" />
                        <span className="text-gray-600">Experience</span>
                      </div>
                      <span className="font-semibold text-gray-900">15+ years exp</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-600">Availability</span>
                      </div>
                      <span className="font-semibold text-blue-600">Available in 2 hours</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-teal-500">₹600</span>
                      <p className="text-sm text-gray-500">Starting price</p>
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional Card 3 - Priya Desai */}
              <div className="group relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-yellow-400/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/20 via-white to-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header with Rating & Verification */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="text-yellow-400 fill-current" />
                        <span className="text-xl font-bold text-gray-900">4.7</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle size={16} />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Professional Avatar */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      PD
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Priya Desai</h3>
                    <p className="text-lg text-purple-600 font-semibold">Carpenter</p>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-gray-600">Distance</span>
                      </div>
                      <span className="font-semibold text-gray-900">3.2 km away</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-gray-500" />
                        <span className="text-gray-600">Experience</span>
                      </div>
                      <span className="font-semibold text-gray-900">8+ years exp</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-600">Availability</span>
                      </div>
                      <span className="font-semibold text-orange-600">Available tomorrow</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-yellow-500">₹700</span>
                      <p className="text-sm text-gray-500">Starting price</p>
                    </div>
                    <button className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center">
            <Link
              href="/workers"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Professionals
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,158,11,0.15)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,158,11,0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(249,158,11,0.05)_60deg,transparent_120deg)] pointer-events-none" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto text-center px-6 sm:px-8">
          {/* Premium Header */}
          <div className="mb-16">
            {/* Floating Icon with Glow */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-2xl">
                <Calendar size={64} className="text-gray-900" />
              </div>
            </div>

            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 backdrop-blur-xl border border-yellow-400/30 px-6 py-3 rounded-full mb-8">
              <Star size={20} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">PREMIUM SERVICE GUARANTEED</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust{' '}
              <span className="text-yellow-400 font-bold">LOCAL SERVICING</span>{' '}
              for all their home service needs. Experience premium quality that exceeds expectations.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              {[
                { number: '10K+', label: 'Happy Customers', icon: '👥' },
                { number: '99.9%', label: 'Success Rate', icon: '✅' },
                { number: '24/7', label: 'Support Available', icon: '🕒' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            <Link
              href="/search"
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <Search size={28} />
                <span>Book Premium Service</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-xl" />
              <Link
                href="/login"
                className="relative inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl text-white px-12 py-6 rounded-3xl font-bold text-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500"
              >
                <Phone size={28} />
                <span>Call (555) 123-4567</span>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">5-Star Rated Service</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Same Day Service Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer Section */}
      <footer className="relative bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(249,158,11,0.1)_50%,transparent_51%)] bg-[length:20px_20px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-bold text-gray-900">LS</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">LOCAL SERVICING</h3>
                  <p className="text-yellow-400 font-semibold text-lg">Premium Home Services</p>
                </div>
              </div>
              <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-lg">
                Your trusted partner for premium home services. We deliver excellence in every project, 
                ensuring your complete satisfaction with professional, reliable service.
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: '📘' },
                  { name: 'Twitter', icon: '🐦' },
                  { name: 'Instagram', icon: '📷' },
                  { name: 'LinkedIn', icon: '💼' }
                ].map((social) => (
                  <div key={social.name} className="group w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-yellow-400/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-8">Quick Links</h4>
              <ul className="space-y-5">
                {[
                  { name: 'Our Services', icon: '🔧' },
                  { name: 'About Us', icon: 'ℹ️' },
                  { name: 'Contact', icon: '📞' },
                  { name: 'Book Now', icon: '📅' },
                  { name: 'Emergency Service', icon: '🚨' }
                ].map((link) => (
                  <li key={link.name}>
                    <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-lg hover:translate-x-2">
                      <span className="text-xl">{link.icon}</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Contact Info</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-xl flex items-center justify-center mt-0.5">
                    <Phone size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">(555) 123-4567</p>
                    <p className="text-gray-400 text-sm">24/7 Emergency Line</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-xl flex items-center justify-center mt-0.5">
                    <div className="w-5 h-5 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <span className="text-gray-900 text-xs font-bold">@</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">info@localservicing.com</p>
                    <p className="text-gray-400 text-sm">Get a quote via email</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-xl flex items-center justify-center mt-0.5">
                    <MapPin size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Your City, State</p>
                    <p className="text-gray-400 text-sm">Serving your area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700/50 pt-10 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">©</span>
                </div>
                <p className="text-gray-300 text-lg font-medium">
                  2024 Local Servicing. All rights reserved.
                </p>
              </div>
              <div className="flex gap-8 text-base">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-yellow-400/5 to-transparent blur-3xl pointer-events-none" />
      </footer>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-center flex-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl mb-4">
                    <Phone size={32} className="text-gray-900" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Instant Quote</h2>
                  <p className="text-gray-600">Free consultation & competitive pricing</p>
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Quote Form */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:bg-yellow-50 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:bg-yellow-50 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Service Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:bg-yellow-50 transition-all duration-200">
                    <option>Select a service</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Carpentry</option>
                    <option>Cleaning</option>
                    <option>Landscaping</option>
                    <option>Painting</option>
                  </select>
                </div>

                {/* Premium Quality Guaranteed Badge */}
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                    <Star size={16} />
                    PREMIUM QUALITY GUARANTEED
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
