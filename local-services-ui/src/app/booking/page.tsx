"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Worker } from "@/data/workers";
import { CheckCircle, Calendar, Clock, ArrowLeft, Shield, MapPin } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";
import { Button } from "@/components/ui/Button";

export default function BookingPage() {
  const { t } = useLanguage();
  const toast = useToast();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [step, setStep] = useState(1);

  // Load worker from sessionStorage
  useEffect(() => {
    const savedWorker = sessionStorage.getItem("selectedWorker");
    if (savedWorker) {
      setWorker(JSON.parse(savedWorker));
    }
  }, []);

  // Generate booking ID
  const generateBookingId = () => {
    return "BK" + Date.now().toString().slice(-8);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && worker) {
      const newBookingId = generateBookingId();
      setBookingId(newBookingId);
      setIsConfirmed(true);
      // Store booking in sessionStorage for history
      const booking = {
        id: newBookingId,
        worker,
        date: selectedDate,
        time: selectedTime,
        timestamp: new Date().toISOString(),
      };
      const bookings = JSON.parse(sessionStorage.getItem("bookings") || "[]");
      bookings.push(booking);
      sessionStorage.setItem("bookings", JSON.stringify(bookings));
      // Show success toast
      try {
        toast.push({
          title: "Booking Confirmed",
          description: `${worker.name} will contact you shortly. Booking id ${newBookingId}`,
          tone: "success",
        });
      } catch (e) {
        // no-op if toast provider not available
      }    }
  };

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No worker selected
          </h1>
          <Link
            href="/search"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Search
          </Link>
        </div>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center px-4 py-8">
        {/* Success Animation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
              <div className="inline-block bg-white rounded-full p-4 mb-4 shadow-lg">
                <CheckCircle size={56} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                {t("booking_confirmed")}!
              </h1>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <p className="text-gray-600 text-center text-lg">
                Your booking is confirmed and the professional will contact you shortly
              </p>

              {/* Booking Details Card */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 space-y-5 border border-gray-200">
                {/* Booking ID */}
                <div className="border-b border-gray-300 pb-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">
                    Booking ID
                  </p>
                  <p className="text-2xl font-mono font-bold text-blue-600 bg-white px-4 py-3 rounded-lg border-2 border-blue-300">
                    {bookingId}
                  </p>
                </div>

                {/* Worker Details */}
                <div className="border-b border-gray-300 pb-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-3">
                    Professional Details
                  </p>
                  <div className="flex gap-4 items-center">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {worker.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-yellow-600 font-semibold">
                        <span>⭐ {worker.rating}</span>
                        <span className="text-gray-600">({worker.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="border-b border-gray-300 pb-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-3">
                    Scheduled For
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-800 font-semibold">
                      <Calendar size={20} className="text-blue-600" />
                      <span>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-800 font-semibold">
                      <Clock size={20} className="text-blue-600" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">
                    Total Amount
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{worker.price}
                    <span className="text-sm text-gray-600 ml-2">(Pay at service)</span>
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                <p className="font-bold text-gray-900 text-sm">Next Steps:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    Professional will contact you within 1 hour
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    Confirm the service details and requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    Payment collected after service completion
                  </li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <Shield size={24} className="text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">Safe & Secure</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <CheckCircle size={24} className="text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">Verified Pro</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Link href="/">
                  <Button className="w-full">Back to Home</Button>
                </Link>
                <Link href="/search">
                  <Button variant="secondary" className="w-full">Book Another Service</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Time slots
  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const progressSteps = [
    { number: 1, label: "Date & Time", icon: Calendar },
    { number: 2, label: "Confirmation", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href={`/worker/${worker.id}`}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Professional Profile
        </Link>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {progressSteps.map((stepItem, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= stepItem.number
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > stepItem.number ? (
                    <CheckCircle size={24} />
                  ) : (
                    stepItem.number
                  )}
                </div>
                <div className={`flex-1 h-1 mx-4 transition-all ${
                  step > stepItem.number ? "bg-green-500" : "bg-gray-300"
                }`}></div>
                <p className={`text-sm font-semibold whitespace-nowrap ${
                  step >= stepItem.number ? "text-blue-600" : "text-gray-600"
                }`}>
                  {stepItem.label}
                </p>
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all ${
                    step > stepItem.number ? "bg-green-500" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Schedule Your Appointment
                </h1>
                <p className="text-blue-100">Complete the form below to book {worker.name}</p>
              </div>

              <form onSubmit={handleConfirmBooking} className="p-8 space-y-8">
                {/* Date Selection */}
                <div>
                  <label className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
                    <Calendar size={28} className="text-blue-600" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:bg-blue-50 outline-none transition text-lg font-semibold"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Select a date that works best for you
                  </p>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
                    <Clock size={28} className="text-green-600" />
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Info */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-gray-900">Service Location</p>
                      <p className="text-gray-700 mt-1">The professional will visit your registered address</p>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <Button
                  type="submit"
                  variant="success"
                  className="w-full py-5 text-lg"
                  disabled={!selectedDate || !selectedTime}
                >
                  {t("confirm_booking")} →
                </Button>
              </form>
            </div>
          </div>

          {/* Sticky Booking Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-24">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Booking Summary</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Worker Card */}
                <div className="pb-6 border-b border-gray-200">
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-full h-40 rounded-xl object-cover mb-4 shadow-md"
                  />
                  <h3 className="font-bold text-lg text-gray-900">{worker.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{worker.service}</p>
                  <div className="flex items-center gap-2 text-yellow-600 font-bold mt-2">
                    <span>⭐ {worker.rating}</span>
                    <span className="text-gray-600 font-normal">({worker.reviews} jobs)</span>
                  </div>
                </div>

                {/* Selected Date & Time */}
                <div className="pb-6 border-b border-gray-200">
                  {selectedDate && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">Date</p>
                      <p className="text-gray-900 font-bold">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                  {selectedTime && (
                    <div>
                      <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">Time</p>
                      <p className="text-gray-900 font-bold">{selectedTime}</p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Service charge</span>
                    <span className="font-bold">₹{worker.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Convenience fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">Total Amount</p>
                  <p className="text-4xl font-bold text-green-600 mb-2">₹{worker.price}</p>
                  <p className="text-xs text-gray-600">Pay after service completion</p>
                </div>

                {/* Trust Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm space-y-2">
                  <div className="flex items-center gap-2 text-gray-800">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="font-semibold">Verified Professional</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="font-semibold">Payment is secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
