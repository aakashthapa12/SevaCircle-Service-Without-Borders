"use client";

import { ServicePackage } from "@/data/services";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Clock, Star } from "lucide-react";

interface ServiceCardProps {
  service: ServicePackage;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <Link href={`/booking?service=${service.id}`}>
      <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 cursor-pointer hover:-translate-y-3 border border-purple-100 hover:border-purple-300 overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-blue-50/30 to-cyan-50/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500"></div>
        
        {/* Multi-layer Shimmer Effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-800 delay-100"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Popular Badge */}
          {service.popular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full transform translate-x-2 -translate-y-2 animate-pulse shadow-lg">
              POPULAR
            </div>
          )}

          {/* Icon Container with Premium Effects */}
          <div className="relative group/icon mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border-4 border-white">
              <span className="text-3xl drop-shadow-lg text-white">{service.icon || "🔧"}</span>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-teal-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-500 group-hover:to-teal-500 transition-all duration-300 mb-2">
            {service.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Service Details */}
          <div className="space-y-3 mb-6">
            {/* Price & Discount */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">₹{service.price}</span>
              {service.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{service.originalPrice}</span>
              )}
              {service.discount && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                  {service.discount}% OFF
                </span>
              )}
            </div>

            {/* Duration & Rating */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span>{service.rating} ({service.bookings.toLocaleString()})</span>
              </div>
            </div>

            {/* Includes Preview */}
            <div className="text-xs text-gray-500">
              Includes: {service.includes.slice(0, 2).join(", ")}
              {service.includes.length > 2 && " + more"}
            </div>
          </div>

          {/* Premium CTA Button */}
          <div className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden w-full justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Book Now</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

