"use client";

import { ServicePackage } from "@/data/services";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";

interface ServiceCardProps {
  service: ServicePackage;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link href={`/booking?service=${service.id}`} className="h-full block">
      <div className="group relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col">
        
        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wide">
              POPULAR
            </span>
          </div>
        )}
        
        {/* Card Content */}
        <div className="p-8 flex flex-col flex-1">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shrink-0">
            <span className="text-3xl">{service.icon || "🔧"}</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
            {service.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
            {service.description}
          </p>
          
          {/* Price & Rating */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gradient-primary">₹{service.price}</span>
              {service.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{service.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-bold text-sm text-gray-900">{service.rating}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{service.duration}</span>
          </div>

          {/* CTA Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-white py-3.5 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 group/btn mt-auto shadow-sm hover:shadow-md">
            <span>Book Now</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  );
};

