"use client";

import { Service } from "@/data/services";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <Link href={`/search?service=${service.id}`}>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer hover:-translate-y-2 border border-yellow-100 hover:border-yellow-200 overflow-hidden relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <span className="text-3xl">{service.icon}</span>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-base group-hover:gap-3 transition-all">
            Learn More
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

