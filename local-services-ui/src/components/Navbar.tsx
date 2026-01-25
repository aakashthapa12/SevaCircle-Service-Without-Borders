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

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profileImage: "",
    membershipType: "Premium",
    stats: {
      bookings: 0,
      savedAmount: 0,
      rating: 0
    }
  });

  // Function to check login status and load profile data
  const checkLoginStatus = () => {
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const profile = localStorage.getItem("customerProfile");
    
    console.log('[Navbar] Checking login status:', { userRole, isLoggedIn, hasProfile: !!profile });
    
    if (userRole && isLoggedIn === "true") {
      setIsLoggedIn(true);
      if (profile) {
        try {
          const parsedProfile = JSON.parse(profile);
          setUserProfile({
            name: parsedProfile.name || "User",
            email: parsedProfile.email || "",
            profileImage: parsedProfile.profileImage || "",
            membershipType: parsedProfile.membershipType || "Premium",
            stats: {
              bookings: parsedProfile.stats?.bookings || 12,
              savedAmount: parsedProfile.stats?.savedAmount || 2400,
              rating: parsedProfile.stats?.rating || 4.9
            }
          });
          setUserName(parsedProfile.name || "User");
        } catch (e) {
          setUserProfile(prev => ({ ...prev, name: "User" }));
          setUserName("User");
        }
      } else {
        setUserProfile(prev => ({ ...prev, name: "User" }));
        setUserName("User");
      }
    } else {
      console.log('[Navbar] Not logged in, setting state to false');
      setIsLoggedIn(false);
      setUserName("");
      setUserProfile({
        name: "",
        email: "",
        profileImage: "",
        membershipType: "Premium",
        stats: { bookings: 0, savedAmount: 0, rating: 0 }
      });
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
    // Clear localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("customerProfile");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    
    // Clear cookies for middleware
    document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
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
                  className="relative flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  style={{
                    background: showProfileMenu ? 
                      'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)' :
                      'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)'
                  }}
                >
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 overflow-hidden"
                      style={{
                        background: userProfile.profileImage ? 
                          'transparent' : 
                          'linear-gradient(135deg, lab(66.9756% -58.27 19.5419) 0%, lab(56% -48 15) 100%)'
                      }}
                    >
                      {userProfile.profileImage ? (
                        <img 
                          src={userProfile.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User size={20} className="text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {userProfile.name || userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {userProfile.membershipType} Member
                    </div>
                  </div>
                  <svg className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    
                    <div className="absolute right-0 mt-3 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
                         style={{
                           background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
                         }}>
                      {/* Profile Header */}
                      <div 
                        className="px-6 py-4 border-b border-white/30 backdrop-blur-sm"
                        style={{
                          background: 'linear-gradient(135deg, lab(66.9756% -58.27 19.5419) 0%, lab(56% -48 15) 100%)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 overflow-hidden"
                            style={{
                              background: userProfile.profileImage ? 'transparent' : 'rgba(255,255,255,0.2)'
                            }}
                          >
                            {userProfile.profileImage ? (
                              <img 
                                src={userProfile.profileImage} 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <User size={24} className="text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{userProfile.name}</h3>
                            <p className="text-sm text-white/90">{userProfile.membershipType} Member</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Profile Stats */}
                      <div className="px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-white/20">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-2 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                              <Calendar size={18} 
                                style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                            </div>
                            <div className="text-lg font-semibold text-gray-900">{userProfile.stats.bookings}</div>
                            <div className="text-xs text-gray-500">Bookings</div>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-2 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                              <span className="text-lg">💰</span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">₹{(userProfile.stats.savedAmount / 1000).toFixed(1)}K</div>
                            <div className="text-xs text-gray-500">Saved</div>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-2 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                              <span className="text-lg">⭐</span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">{userProfile.stats.rating}</div>
                            <div className="text-xs text-gray-500">Rating</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-3 bg-white/30 backdrop-blur-sm">
                        <Link 
                          href="/customer-profile" 
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-white/50 hover:text-gray-900 rounded-lg transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-8 h-8 bg-white/40 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                            <User size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">My Profile</div>
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
                          href="/payments" 
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">💳</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Payment Methods</div>
                            <div className="text-xs text-gray-500">Manage cards & UPI</div>
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
                          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <LogOut size={16} className="text-red-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">Logout</div>
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