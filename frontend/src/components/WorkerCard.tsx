"use client";

import { Worker } from "@/data/workers";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard = ({ worker }: WorkerCardProps) => {
  return (
    <Link href={`/worker/${worker.id}`}>
      <Card className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-yellow-100 hover:border-yellow-200">
        <div className="relative h-56 bg-gradient-to-br from-yellow-50 to-amber-50 overflow-hidden">
          <img
            src={worker.image}
            alt={worker.name}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-worker.svg'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Rating */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-base">{worker.rating}</span>
          </div>

          {/* Verified Badge */}
          {worker.verified && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <span>✓</span> Verified
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
              {worker.name}
            </h3>
            <p className="text-base text-gray-600 font-semibold">
              {worker.service.charAt(0).toUpperCase() + worker.service.slice(1)}
            </p>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={14} className="text-orange-500" />
              <span className="text-sm font-medium">{worker.distance} km</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">₹{worker.price}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-600">{worker.experience}+ years exp</div>
            <div className="text-green-600 font-bold">{worker.availability}</div>
          </div>

          <Button className="w-full text-sm py-2">View Profile</Button>
        </div>
      </Card>
    </Link>
  );
};

