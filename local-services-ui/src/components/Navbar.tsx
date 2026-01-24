"use client";

import Link from "next/link";
import { Menu, X, Globe, User, ChevronDown, LogOut, Settings, Bell, Package, Heart, CreditCard, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const { language, setLanguage, t } = useLanguage();

  // Function to check login status
  const checkLoginStatus = () => {
    const userRole = localStorage.getItem("userRole");
    const profile = localStorage.getItem("customerProfile");
    
    if (userRole === "user" || profile) {
      setIsLoggedIn(true);
      if (profile) {
        try {
          const parsedProfile = JSON.parse(profile);
          setUserName(parsedProfile.name || "User");
        } catch (e) {
          setUserName("User");
        }
      } else {
        setUserName("User");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    // Check login status on mount
    checkLoginStatus();

    // Check on storage change (when localStorage is updated)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // Check on window focus (when user returns to the tab)
    const handleFocus = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    // Also set up an interval to check periodically (every 1 second)
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("customerProfile");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.href = "/";
  };

  const handleLanguageChange = (lang: "en" | "hi" | "mr") => {
    setLanguage(lang);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white text-xl font-bold">🏠</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:inline">
              LOCAL SERVICING
            </span>
          </Link>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>(555) 123-4567</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-purple-600">Available 24/7</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              Services
            </Link>
            <Link
              href="/customer-profile"
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold text-lg"
            >
              My Profile
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold text-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Finance
            </Link>
            <Link
              href="/maintenance"
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Maintenance
            </Link>
            <Link
              href="/admin"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-3 py-2 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              Admin
            </Link>

            {/* Contact Info */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div className="text-sm">
                <div className="text-gray-500">Call us</div>
                <div className="font-bold text-orange-600">(800)-236-8937</div>
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-1">
                <Globe size={16} className="text-gray-600" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as "en" | "hi" | "mr")}
                  className="bg-transparent outline-none cursor-pointer text-sm text-gray-700"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>

              {/* User Profile or CTA Button */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="group relative w-12 h-12 rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {/* Avatar with gradient border */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full p-0.5 shadow-xl group-hover:shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User size={22} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Online status indicator */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                    
                    {/* Notification badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-[10px] font-bold text-white">3</span>
                    </div>
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border-2 border-purple-100 overflow-hidden z-50 animate-fade-in">
                      {/* Profile Header with cover image */}
                      <div className="relative h-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 overflow-hidden">
                        {/* Animated pattern */}
                        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px'}}></div>
                        
                        {/* Avatar positioned at bottom */}
                        <div className="absolute -bottom-8 left-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-white to-purple-100 rounded-2xl p-1 shadow-xl">
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                              <User size={28} className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* User info section */}
                      <div className="pt-10 px-6 pb-4 border-b-2 border-gray-100">
                        <h3 className="font-bold text-gray-900 text-lg">{userName}</h3>
                        <p className="text-sm text-gray-600">customer@example.com</p>
                        
                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center border border-blue-100">
                            <p className="text-xl font-black text-blue-600">12</p>
                            <p className="text-xs text-gray-600 font-medium">Bookings</p>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center border border-green-100">
                            <p className="text-xl font-black text-green-600">₹2.4K</p>
                            <p className="text-xs text-gray-600 font-medium">Saved</p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center border border-purple-100">
                            <p className="text-xl font-black text-purple-600">VIP</p>
                            <p className="text-xs text-gray-600 font-medium">Status</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu items */}
                      <div className="py-2">
                        <Link
                          href="/customer-profile"
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User size={20} className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">My Profile</p>
                            <p className="text-xs text-gray-500">View and edit your details</p>
                          </div>
                        </Link>
                        
                        <Link
                          href="/bookings"
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Package size={20} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">My Bookings</p>
                            <p className="text-xs text-gray-500">Track your orders</p>
                          </div>
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        </Link>
                        
                        <Link
                          href="/favorites"
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Heart size={20} className="text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">Favorites</p>
                            <p className="text-xs text-gray-500">Saved services</p>
                          </div>
                        </Link>
                        
                        <Link
                          href="/payments"
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CreditCard size={20} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">Payments</p>
                            <p className="text-xs text-gray-500">Cards & transactions</p>
                          </div>
                        </Link>
                        
                        <Link
                          href="/settings"
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Settings size={20} className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">Settings</p>
                            <p className="text-xs text-gray-500">Privacy & preferences</p>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Logout section */}
                      <div className="border-t-2 border-gray-100 p-3">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-2xl transition-all duration-200 group border-2 border-red-200"
                        >
                          <LogOut size={20} className="text-red-600 group-hover:rotate-12 transition-transform" />
                          <span className="font-bold text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/search"
                className="block text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/customer-profile"
                className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/admin"
                className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2 px-3 bg-purple-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Call us</div>
                <div className="font-bold text-orange-600 mb-4">(800)-236-8937</div>
                
                {/* Mobile Language Selector */}
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-gray-600" />
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as "en" | "hi" | "mr")}
                    className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="mr">मराठी</option>
                  </select>
                </div>
                
                {/* Mobile Profile or Login */}
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <User size={18} />
                        <span className="font-bold">{userName}</span>
                      </div>
                      <p className="text-xs text-white/80">Customer Account</p>
                    </div>
                    <Link
                      href="/customer-profile"
                      className="block bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors text-center hover:bg-purple-200"
                      onClick={() => setIsOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-red-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
