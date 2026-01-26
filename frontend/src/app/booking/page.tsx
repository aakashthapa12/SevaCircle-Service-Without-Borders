"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServicePackage, getServiceById, services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Clock, 
  Star, 
  CheckCircle, 
  Calendar,
  MapPin,
  CreditCard,
  Shield,
  Users,
  Package,
  Sparkles,
  Phone
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  service: ServicePackage;
  quantity: number;
  selectedAddOns: string[];
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const { push: showToast } = useToast();
  
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1); // 1: Service Selection, 2: Cart, 3: Schedule, 4: Address, 5: Payment
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [customerProfile, setCustomerProfile] = useState<any>(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    landmark: ""
  });

  useEffect(() => {
    if (serviceId) {
      const service = getServiceById(serviceId);
      if (service) {
        setSelectedService(service);
        // Auto-add to cart if coming from service selection
        addToCart(service);
      }
    }
    
    // Load customer profile from localStorage
    const savedProfile = localStorage.getItem("customerProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setCustomerProfile(profile);
      // Pre-fill address from profile
      setAddress({
        street: profile.address.street,
        city: profile.address.city,
        pincode: profile.address.pincode,
        landmark: profile.address.landmark || ""
      });
    }
  }, [serviceId]);

  const addToCart = (service: ServicePackage, quantity: number = 1, addOns: string[] = []) => {
    const existingItem = cart.find(item => item.service.id === service.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.service.id === service.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { service, quantity, selectedAddOns: addOns }]);
    }
    showToast({title: "Service added to cart!", tone: "success"});
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.service.id !== serviceId));
    showToast({title: "Service removed from cart", tone: "info"});
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart(cart.map(item => 
      item.service.id === serviceId 
        ? { ...item, quantity }
        : item
    ));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const serviceTotal = item.service.price * item.quantity;
      const addOnsTotal = item.selectedAddOns.reduce((addOnTotal, addOnId) => {
        const addOn = item.service.addOns?.find(ao => ao.id === addOnId);
        return addOnTotal + (addOn ? addOn.price * item.quantity : 0);
      }, 0);
      return total + serviceTotal + addOnsTotal;
    }, 0);
  };

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM", 
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot || !address.street || !address.city || !address.pincode) {
      showToast({title: "Please fill all required details", tone: "error"});
      return;
    }

    if (!customerProfile) {
      showToast({title: "Please complete your profile first", tone: "error"});
      setTimeout(() => router.push("/customer-profile"), 1500);
      return;
    }

    // Create order object with complete customer details
    const order = {
      id: `ORD-${Date.now()}`,
      services: cart.map(item => ({
        name: item.service.name,
        quantity: item.quantity,
        price: item.service.price
      })),
      customer: {
        name: customerProfile.name,
        email: customerProfile.email,
        phone: customerProfile.phone,
        address: {
          street: address.street,
          city: address.city,
          state: customerProfile.address.state,
          pincode: address.pincode,
          landmark: address.landmark
        }
      },
      schedule: {
        date: selectedDate,
        timeSlot: selectedTimeSlot
      },
      address: `${address.street}, ${address.city} - ${address.pincode}`,
      totalAmount: getTotalAmount(),
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Store order in localStorage for worker to see
    const existingOrders = JSON.parse(localStorage.getItem("workerOrders") || "[]");
    existingOrders.unshift(order);
    localStorage.setItem("workerOrders", JSON.stringify(existingOrders));

    // Simulate booking process with beautiful animation
    showToast({title: "🎉 Booking confirmed! You'll receive a confirmation shortly.", tone: "success"});
    
    // Simulate auto-assignment of worker
    setTimeout(() => {
      showToast({title: "✅ Worker assigned! A professional will arrive at your scheduled time.", tone: "success"});
    }, 2000);

    // Reset and redirect
    setTimeout(() => {
      router.push("/");
    }, 3500);
  };

  if (step === 1 && selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
          {/* RootLayout provides the universal horizontal container */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <Link href="/search" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all hover:scale-105">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowLeft size={18} className="text-white" />
                </div>
                <span className="font-semibold text-lg">Back to Services</span>
              </Link>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl">
                <Package size={20} />
                <span className="font-bold">{cart.length} items in cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden animate-fade-in">
                <div className="relative h-72 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
                  {/* Animated pattern overlay */}
                  <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-end justify-between gap-6">
                      <div className="flex-1">
                        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-2xl">{selectedService.name}</h1>
                        <p className="text-white/95 text-lg font-medium drop-shadow-lg mb-4">{selectedService.description}</p>
                        
                        {/* Inline Stats */}
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                            <Clock size={18} className="text-white" />
                            <span className="font-bold text-white">{selectedService.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                            <Star size={18} className="text-amber-300 fill-amber-300" />
                            <span className="font-bold text-white">{selectedService.rating}</span>
                            <span className="text-sm text-white/90">({selectedService.bookings.toLocaleString()})</span>
                          </div>
                          {selectedService.discount && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full border-2 border-white/50 shadow-xl">
                              <span className="text-white font-black text-sm">{selectedService.discount}% OFF</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedService.popular && (
                    <div className="absolute top-6 right-6">
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-black shadow-2xl animate-pulse flex items-center gap-2">
                        <Sparkles size={18} />
                        POPULAR
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  {/* Price Section - Horizontal */}
                  <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl p-6 mb-8 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/90 text-sm font-semibold mb-1">Service Price</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-5xl font-black text-white drop-shadow-lg">₹{selectedService.price}</span>
                          {selectedService.originalPrice && (
                            <span className="text-xl text-white/70 line-through">₹{selectedService.originalPrice}</span>
                          )}
                        </div>
                        {selectedService.originalPrice && (
                          <p className="text-white/90 text-sm mt-2 font-semibold">
                            You save ₹{selectedService.originalPrice - selectedService.price}!
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30">
                          <p className="text-white/90 text-xs font-semibold mb-1">Duration</p>
                          <p className="text-white text-2xl font-black">{selectedService.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What's Included - Horizontal Scroll */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">What's Included</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedService.includes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 whitespace-nowrap flex-shrink-0">
                          <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-white" />
                          </div>
                          <span className="text-gray-800 font-medium text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons - Horizontal Cards */}
                  {selectedService.addOns && selectedService.addOns.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Plus className="text-white" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Add-ons Available</h3>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {selectedService.addOns.map((addOn) => (
                          <div key={addOn.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-base mb-1">{addOn.name}</h4>
                                <p className="text-gray-600 text-sm">{addOn.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                <div className="text-2xl font-black text-gray-900 whitespace-nowrap">₹{addOn.price}</div>
                                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200">
                                  <Plus size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Indicators - Horizontal */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-white/50 p-6">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">100% Safe</p>
                      <p className="text-xs text-gray-600">Verified professionals</p>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Quality Assured</p>
                      <p className="text-xs text-gray-600">Money-back guarantee</p>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Star className="text-white fill-white" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Top Rated</p>
                      <p className="text-xs text-gray-600">13,590+ bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Panel - Sticky */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-xl">
                    <Package className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Book This Service</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Service Price</span>
                      <span className="text-2xl font-black text-gray-900">₹{selectedService.price}</span>
                    </div>
                    {selectedService.originalPrice && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-gray-500 line-through text-sm">₹{selectedService.originalPrice}</span>
                        <span className="text-green-600 text-sm font-bold">Save ₹{selectedService.originalPrice - selectedService.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-gray-900 font-bold flex items-center gap-2">
                        <Clock size={16} />
                        {selectedService.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-2xl">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-4xl font-black">₹{selectedService.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (cart.length === 0) addToCart(selectedService);
                    setStep(2);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg py-5 rounded-xl shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mb-4 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Sparkles size={24} className="relative z-10 animate-pulse" />
                  <span className="relative z-10">Add to Cart & Continue</span>
                </button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    100% Safe & Secure Payment
                  </p>
                  <p className="text-xs text-gray-500">
                    Trusted by 50,000+ customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart & Checkout Steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
  <div className="py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  num <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

  <div className="py-8">
        {/* Step 2: Cart Review */}
        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="text-blue-500" />
                  Your Cart ({cart.length} {cart.length === 1 ? 'service' : 'services'})
                </h2>

                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{item.service.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {item.service.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={14} className="text-amber-500 fill-current" />
                            {item.service.rating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg">₹{item.service.price * item.quantity}</div>
                        <button 
                          onClick={() => removeFromCart(item.service.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <div className="text-center py-12">
                      <Package size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <Link href="/search">
                        <Button className="mt-4">Browse Services</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.service.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.service.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">₹{getTotalAmount()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  disabled={cart.length === 0}
                  onClick={() => setStep(3)}
                >
                  Schedule Booking
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calendar className="text-blue-500" />
                Schedule Your Service
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-3">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-3">Time Slot</label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`w-full p-3 rounded-xl border-2 transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-8"
                disabled={!selectedDate || !selectedTimeSlot}
                onClick={() => setStep(4)}
              >
                Continue to Address
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Address */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="text-blue-500" />
                Service Address
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-3">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    placeholder="Enter your street address"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-3">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      placeholder="City"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-3">PIN Code</label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({...address, pincode: e.target.value})}
                      placeholder="PIN Code"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-3">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => setAddress({...address, landmark: e.target.value})}
                    placeholder="Nearby landmark"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <Button 
                className="w-full mt-8"
                disabled={!address.street || !address.city || !address.pincode}
                onClick={() => setStep(5)}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Payment & Confirmation */}
        {step === 5 && (
          <div>
            {/* Animated Header with Gradient */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-2xl">
                <CreditCard className="text-white" size={40} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Review Your Order</h2>
              <p className="text-gray-600 text-lg">Please confirm the details before placing your order</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Order Details - Left Side */}
              <div className="lg:col-span-2 space-y-6">
                {/* Services Card */}
                <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl border-2 border-blue-100 p-8 animate-slide-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Package className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Selected Services</h3>
                      <p className="text-sm text-gray-600">{cart.length} service(s) selected</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="bg-white/80 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-1">{item.service.name}</h4>
                            <p className="text-gray-600 text-sm mb-3">{item.service.description}</p>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock size={14} />
                                {item.service.duration}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <Star size={14} className="text-amber-500 fill-amber-500" />
                                {item.service.rating}
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-gray-900">₹{item.service.price * item.quantity}</p>
                            <p className="text-sm text-gray-500">₹{item.service.price} each</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule Card */}
                <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-purple-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Schedule Details</h3>
                      <p className="text-sm text-gray-600">When we'll visit you</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/80 rounded-xl p-5 border border-purple-200">
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-purple-600" />
                        Service Date
                      </p>
                      <p className="text-lg font-bold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-5 border border-purple-200">
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <Clock size={16} className="text-purple-600" />
                        Time Slot
                      </p>
                      <p className="text-lg font-bold text-gray-900">{selectedTimeSlot}</p>
                    </div>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl border-2 border-green-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Service Location</h3>
                      <p className="text-sm text-gray-600">Where we'll serve you</p>
                    </div>
                  </div>

                  <div className="bg-white/80 rounded-xl p-5 border border-green-200">
                    <p className="text-gray-900 font-medium mb-1">{address.street}</p>
                    <p className="text-gray-700">{address.city} - {address.pincode}</p>
                    {address.landmark && (
                      <p className="text-gray-600 text-sm mt-2">Near: {address.landmark}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary - Right Side Sticky */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 text-white sticky top-24">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles size={24} />
                    Order Summary
                  </h3>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-white/30">
                      <span className="text-white/90">Services ({cart.length})</span>
                      <span className="font-bold text-lg">₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/30">
                      <span className="text-white/90">Platform Fee</span>
                      <span className="font-bold">₹0</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/30">
                      <span className="text-white/90 flex items-center gap-1">
                        <Shield size={16} />
                        Insurance
                      </span>
                      <span className="font-bold">Free</span>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Total Amount</span>
                      <span className="text-3xl font-extrabold">₹{getTotalAmount()}</span>
                    </div>
                    <p className="text-white/80 text-sm mt-2">All inclusive</p>
                  </div>

                  {/* Confirm Checkbox */}
                  {!isConfirmed && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6 animate-pulse">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isConfirmed}
                          onChange={(e) => setIsConfirmed(e.target.checked)}
                          className="w-5 h-5 mt-1 text-amber-600 border-2 border-white rounded focus:ring-2 focus:ring-white cursor-pointer"
                        />
                        <span className="text-sm leading-relaxed group-hover:text-white/90 transition">
                          I confirm that all details are correct and agree to the terms & conditions
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {!isConfirmed ? (
                    <button
                      onClick={() => setIsConfirmed(true)}
                      disabled={isConfirmed}
                      className="w-full bg-white text-orange-600 font-bold text-lg py-5 rounded-xl shadow-2xl hover:shadow-white/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mb-3"
                    >
                      <CheckCircle size={24} />
                      Confirm Order Details
                    </button>
                  ) : (
                    <button
                      onClick={handleBooking}
                      className="w-full bg-white text-orange-600 font-bold text-lg py-5 rounded-xl shadow-2xl hover:shadow-white/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mb-3 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Sparkles size={24} className="relative z-10 animate-pulse" />
                      <span className="relative z-10">Place Order Now</span>
                    </button>
                  )}

                  {/* Trust Indicators */}
                  <div className="space-y-3 pt-6 border-t border-white/30">
                    <div className="flex items-center gap-3 text-sm">
                      <Shield size={18} />
                      <span>100% Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users size={18} />
                      <span>Verified Professionals</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle size={18} />
                      <span>Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What Happens Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Professional Assigned</h4>
                  <p className="text-gray-600 text-sm">We'll assign the best available professional within 30 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Phone className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Confirmation Call</h4>
                  <p className="text-gray-600 text-sm">You'll receive a confirmation call with professional details</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Service Delivered</h4>
                  <p className="text-gray-600 text-sm">Professional arrives on time and delivers quality service</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
