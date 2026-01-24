"use client";

import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: "en" | "hi" | "mr") => {
    setLanguage(lang);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-yellow-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-gray-900 text-xl font-bold">🏠</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:inline">
              LOCAL SERVICING
            </span>
          </Link>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>(555) 123-4567</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-yellow-600">Available 24/7</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-lg"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-lg"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Finance
            </Link>
            <Link
              href="/maintenance"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Maintenance
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

              {/* CTA Button */}
              <Link
                href="/login"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Get Started
              </Link>
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
                href="/about"
                className="block text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
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
                
                <Link
                  href="/login"
                  className="block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
