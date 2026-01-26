"use client";

import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, Users, Mail, Phone, MapPin, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-blue-50 section-py-lg border-t border-gray-200">
      <div className="container-universal">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="spacing-stack-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">🏠</span>
              </div>
              <span className="text-heading-md font-bold text-gray-900">LOCAL SERVICING</span>
            </div>
            
            <p className="text-body-base text-gray-600 max-w-sm">
              Connect with verified professionals for all your home service needs. 
              Fast, reliable, and affordable solutions delivered with care.
            </p>
            
            <div className="inline-flex items-center btn btn-sm bg-teal-100 text-teal-800 hover:bg-teal-200">
              <Star size={16} className="text-teal-600" />
              <span>Trusted by 10,000+ Customers</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-heading-sm font-bold text-gray-900 mb-6">Services</h3>
            <ul className="spacing-stack-sm text-gray-600">
              <li>
                <Link href="/search" className="hover:text-teal-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                  <span>Find Services</span>
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-teal-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                  <span>Book Now</span>
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-teal-600 transition-colors flex items-center gap-2 group">
                  <Heart size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                  <span>Favorites</span>
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <Clock size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                  <span>My Bookings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-heading-sm font-bold text-gray-900 mb-6">Company</h3>
            <ul className="spacing-stack-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-teal-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-teal-600 transition-colors">
                  Become a Professional
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-600 transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-blue-600 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-heading-sm font-bold text-gray-900 mb-6">Contact</h3>
            <div className="spacing-stack-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="text-teal-500 flex-shrink-0" size={18} />
                <a href="mailto:contact@localservicing.com" className="hover:text-teal-600 transition-colors text-body-sm">
                  contact@localservicing.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-orange-500 flex-shrink-0" size={18} />
                <a href="tel:+18002368937" className="hover:text-orange-600 transition-colors font-semibold text-body-sm">
                  (800)-236-8937
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500 flex-shrink-0" size={18} />
                <span className="text-body-sm">
                  Local City, State 12345
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-green-500 flex-shrink-0" size={18} />
                <span className="text-body-sm">
                  <span className="text-green-600 font-semibold">24/7</span> Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card bg-white border border-gray-200 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-heading-sm font-bold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-body-base text-gray-600">Get the latest service updates and special offers.</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus-ring"
              />
              <Link href="/search" className="btn btn-primary group focus-ring">
                <span>Subscribe</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-body-sm">
              © 2026 LOCAL SERVICING. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-teal-600 transition-colors text-body-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-teal-600 transition-colors text-body-sm">
                Terms of Service
              </Link>
              <div className="flex items-center gap-2 text-body-sm text-gray-500">
                <Heart className="text-red-500" size={14} />
                <span>Made with care for your home</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
