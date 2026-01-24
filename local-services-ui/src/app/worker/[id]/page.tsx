"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { workers } from "@/data/workers";
import { services } from "@/data/services";
import {
  Star,
  MapPin,
  CheckCircle,
  Clock,
  Award,
  MessageSquare,
  ArrowLeft,
  Flame,
  Shield,
  Phone,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WorkerPageProps {
  params: {
    id: string;
  };
}

export default function WorkerPage({ params }: WorkerPageProps) {
  const router = useRouter();
  const worker = workers.find((w) => w.id === params.id);
  const service = services.find((s) => s.id === worker?.service);
  const [isBooking, setIsBooking] = useState(false);
  const { t } = useLanguage();

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Worker not found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    setIsBooking(true);
    // Store selected worker in sessionStorage for booking page
    sessionStorage.setItem("selectedWorker", JSON.stringify(worker));
    setTimeout(() => {
      router.push("/booking");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 via-purple-50 to-pink-50">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 font-bold py-6 transition-colors text-lg"
          >
            <ArrowLeft size={22} />
            Back to Results
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Hero Image with Premium Overlays */}
        <div className="relative h-[500px] md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={worker.image}
            alt={worker.name}
            className="w-full h-full object-cover"
          />
          
          {/* Premium Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Badges - Top Right */}
          <div className="absolute top-8 right-8 flex flex-col gap-4">
            {worker.verified && (
              <div className="bg-white/95 backdrop-blur-md text-gray-800 px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-base shadow-2xl border border-white/30">
                <CheckCircle size={20} className="text-green-600" />
                Verified Professional
              </div>
            )}
            {worker.reviews > 100 && (
              <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-base shadow-2xl">
                <Flame size={20} />
                Popular Choice
              </div>
            )}
          </div>

          {/* Rating Badge - Top Left */}
          <div className="absolute top-8 left-8">
            <div className="bg-white/95 backdrop-blur-md border-2 border-white/40 text-gray-800 px-8 py-5 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(worker.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    {worker.rating}
                  </div>
                  <div className="text-xs text-gray-600">
                    {worker.reviews} reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Profile & Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {worker.name}
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {service?.name}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {service?.description}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {worker.experience}+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t("years")} Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {worker.reviews}+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Completed Jobs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {worker.rating}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Avg Rating
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {worker.name.split(" ")[0]}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {worker.description}
              </p>
            </div>

            {/* Experience & Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Expertise
                    </h3>
                    <p className="text-sm text-gray-600">Specialized training</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  <strong>{worker.experience}+ years</strong> of professional
                  experience with expert-level skills in their field
                </p>
              </div>

              {/* Availability Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-green-600 rounded-xl">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Availability
                    </h3>
                    <p className="text-sm text-gray-600">Flexible scheduling</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Available <strong>{worker.availability}</strong> for your
                  convenience and quick service delivery
                </p>
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-3">
                {worker.languages.map((lang) => (
                  <div
                    key={lang}
                    className="px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-full font-semibold text-blue-700 text-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    🌐 {lang}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Shield size={32} className="text-green-600" />
                  <div>
                    <div className="font-bold text-gray-900">100% Safe</div>
                    <div className="text-sm text-gray-600">Verified Worker</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={32} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900">Quick Response</div>
                    <div className="text-sm text-gray-600">Usually &lt;1 hour</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ThumbsUp size={32} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900">Trusted by 1000s</div>
                    <div className="text-sm text-gray-600">In your area</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={56} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-800 font-bold text-lg">
                    {worker.distance} away
                  </p>
                  <p className="text-gray-600">Service area map</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 sticky top-24 overflow-hidden">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2"></div>

              {/* Pricing Section */}
              <div className="p-8">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  Starting from
                </p>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-blue-600">
                    ₹{worker.price}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">per service visit</p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 border border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Service charge</span>
                    <span className="font-bold text-gray-900">₹{worker.price}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
                    <span className="text-gray-700">Convenience fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600 text-lg">₹{worker.price}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 active:scale-95 transition-all font-bold text-lg mb-3 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    "Processing..."
                  ) : (
                    <>
                      <Zap size={20} />
                      {t("book_now")}
                    </>
                  )}
                </button>

                {/* Chat Button */}
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Chat Now
                </button>

                {/* Call Button */}
                <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all font-semibold flex items-center justify-center gap-2 mt-3">
                  <Phone size={18} />
                  Call
                </button>

                {/* Info Box */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex gap-3">
                    <Zap size={20} className="text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        Quick Response
                      </p>
                      <p className="text-xs text-gray-600">
                        Usually replies within 1 hour
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        100% Verified
                      </p>
                      <p className="text-xs text-gray-600">
                        Trusted and background-checked
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield size={20} className="text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        Safe & Secure
                      </p>
                      <p className="text-xs text-gray-600">
                        Your data is protected
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Text */}
                <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                  By booking, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
