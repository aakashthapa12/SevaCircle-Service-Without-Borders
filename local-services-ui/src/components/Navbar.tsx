"use client";

import Link from "next/link";
import { Menu, X, Globe, User, LogOut, Calendar, Heart, Search, Phone } from "lucide-react";
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
    checkLoginStatus();
    const handleStorageChange = () => checkLoginStatus();
    const handleFocus = () => checkLoginStatus();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);
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
    // Remove cookies if set (for SSR/middleware)
    document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "customerProfile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.href = "/";
  };

  const handleLanguageChange = (lang: "en" | "hi" | "mr") => {
    setLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container-universal">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white text-xl font-bold">🏠</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-heading-md font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                LOCAL SERVICING
              </span>
              <p className="text-caption text-gray-500 font-medium">Home Services Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-body-base font-semibold text-gray-700 hover:text-purple-600 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/search" className="text-body-base font-semibold text-gray-700 hover:text-purple-600 transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/bookings" className="text-body-base font-semibold text-gray-700 hover:text-purple-600 transition-colors relative group">
              My Bookings
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-body-base font-semibold text-gray-700 hover:text-purple-600 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            
            {/* Phone Contact - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
              <Phone size={18} className="text-orange-500" />
              <div>
                <div className="text-caption text-orange-600 font-medium">Call Now</div>
                <div className="font-bold text-orange-700">(800) 236-8937</div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                <Globe size={16} className="text-gray-600 group-hover:text-purple-600" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as "en" | "hi" | "mr")}
                  className="bg-transparent outline-none cursor-pointer text-body-sm text-gray-700 group-hover:text-purple-700 pr-1"
                >
                  <option value="en">EN</option>
                  <option value="hi">हि</option>
                  <option value="mr">मर</option>
                </select>
              </div>
            </div>

            {/* User Profile or Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2.5 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-200 group-hover:ring-purple-300 transition-all">
                      <User size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                      {userName}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      View Profile
                    </div>
                  </div>
                  <svg className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                      {/* Profile Header with Gradient */}
                      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-4 ring-white/30">
                              <User size={28} className="text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-0.5">{userName}</h3>
                            <p className="text-sm text-white/90 font-medium">Premium Member</p>
                          </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                      </div>
                      
                      {/* Profile Stats */}
                      <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-xl flex items-center justify-center">
                              <Calendar size={20} className="text-purple-600" />
                            </div>
                            <div className="text-xl font-bold text-gray-900">12</div>
                            <div className="text-xs text-gray-600 font-medium">Bookings</div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-xl flex items-center justify-center">
                              <span className="text-lg">💰</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900">₹2.4K</div>
                            <div className="text-xs text-gray-600 font-medium">Saved</div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-xl flex items-center justify-center">
                              <span className="text-lg">⭐</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900">4.9</div>
                            <div className="text-xs text-gray-600 font-medium">Rating</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-3">
                        <Link 
                          href="/customer-profile" 
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <User size={18} className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">My Profile</div>
                            <div className="text-xs text-gray-500">View & edit your details</div>
                          </div>
                        </Link>
                      
                        <Link 
                          href="/bookings" 
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700 rounded-xl transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Calendar size={18} className="text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">My Bookings</div>
                            <div className="text-xs text-gray-500">Track your services</div>
                          </div>
                        </Link>
                      
                        <Link 
                          href="/favorites" 
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-700 rounded-xl transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                            <Heart size={18} className="text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Favorites</div>
                            <div className="text-xs text-gray-500">Saved services</div>
                          </div>
                        </Link>

                        <Link 
                          href="/settings" 
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:text-gray-800 rounded-xl transition-all duration-200 group"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-lg">⚙️</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Settings</div>
                            <div className="text-xs text-gray-500">Preferences & privacy</div>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Logout */}
                      <div className="border-t border-gray-200 p-3 bg-gray-50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-4 px-4 py-3.5 w-full text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <LogOut size={18} className="text-red-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-bold">Logout</div>
                            <div className="text-xs text-red-500">Sign out from account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-body-base font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} className="text-gray-700" /> : <Menu size={22} className="text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-purple-100 shadow-lg">
            <div className="p-4 space-y-4">
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="flex items-center px-4 py-3 text-body-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/search" 
                  className="flex items-center gap-3 px-4 py-3 text-body-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Search size={18} className="text-purple-500" />
                  <span>Find Services</span>
                </Link>
                <Link 
                  href="/bookings" 
                  className="flex items-center gap-3 px-4 py-3 text-body-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar size={18} className="text-indigo-500" />
                  <span>My Bookings</span>
                </Link>
                <Link 
                  href="/about" 
                  className="flex items-center px-4 py-3 text-body-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </div>

              {/* Mobile Contact */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <Phone size={18} className="text-orange-500" />
                <div>
                  <div className="text-caption text-orange-600 font-medium">Call Now</div>
                  <div className="font-bold text-orange-700">(800) 236-8937</div>
                </div>
              </div>

              {/* Mobile Language Selector */}
              <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg">
                <Globe size={18} className="text-purple-600" />
                <span className="text-body-sm text-purple-700 font-medium mr-2">Language:</span>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as "en" | "hi" | "mr")}
                  className="bg-white border border-purple-200 rounded-md px-3 py-1.5 text-body-sm text-purple-700 font-medium"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>

              {/* Mobile User Section */}
              {isLoggedIn ? (
                <div className="border-t border-purple-100 pt-4 space-y-3">
                  <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold">{userName}</h3>
                      <p className="text-caption text-purple-100">Customer Account</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/customer-profile" 
                    className="block px-4 py-3 text-body-base font-medium text-gray-700 hover:bg-purple-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    View Profile
                  </Link>
                  
                  <Link 
                    href="/favorites" 
                    className="block px-4 py-3 text-body-base font-medium text-gray-700 hover:bg-purple-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    My Favorites
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-body-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-purple-100 pt-4 space-y-3">
                  <Link 
                    href="/login" 
                    className="block px-4 py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 text-center font-semibold rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};