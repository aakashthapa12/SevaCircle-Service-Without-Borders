"use client";

import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-gray-900 text-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="text-3xl">🏠</span>
                <span>LocalHelp</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-slate-100 mt-16 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-3xl">🏠</span>
              <span>LocalHelp</span>
            </div>
            <p className="text-slate-300 text-sm">
              Skilled workers and local services at your fingertips
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@localservices.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 1234-567-890</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
