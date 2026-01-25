"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  ArrowLeft,
  ArrowRight,
  Home,
  Building2,
  Navigation,
  Camera,
  CheckCircle,
  AlertCircle,
  Award,
  Shield,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
}

export default function CustomerProfile() {
  const router = useRouter();
  const { push: showToast } = useToast();
  
  const [profile, setProfile] = useState<CustomerProfile>({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: ""
    }
  });

  const [profileMetadata, setProfileMetadata] = useState({
    membershipType: "Premium",
    joinedDate: new Date().toISOString(),
    stats: {
      bookings: 0,
      savedAmount: 0,
      rating: 0
    },
    profileImage: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState<string>("");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Simulate database fetch
  const fetchProfileFromDatabase = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const savedProfile = localStorage.getItem("customerProfile");
      const savedMetadata = localStorage.getItem("profileMetadata");
      
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setProfile(profileData);
        setProfileImage(profileData.profileImage || "");
      }
      
      if (savedMetadata) {
        const metadataData = JSON.parse(savedMetadata);
        setProfileMetadata(metadataData);
      } else {
        // Set default metadata if not exists
        const defaultMetadata = {
          membershipType: "Premium",
          joinedDate: new Date().toISOString(),
          stats: {
            bookings: Math.floor(Math.random() * 20) + 5,
            savedAmount: Math.floor(Math.random() * 5000) + 1000,
            rating: 4.5 + Math.random() * 0.5
          },
          profileImage: ""
        };
        setProfileMetadata(defaultMetadata);
        localStorage.setItem("profileMetadata", JSON.stringify(defaultMetadata));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  // Calculate profile completion percentage
  useEffect(() => {
    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.address.street,
      profile.address.city,
      profile.address.state,
      profile.address.pincode
    ];
    const filledFields = fields.filter(field => field && field.trim()).length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    setCompletionPercentage(percentage);
  }, [profile]);

  useEffect(() => {
    fetchProfileFromDatabase();
  }, []);

  useEffect(() => {
    // Update metadata when profile changes
    if (profileImage) {
      setProfileMetadata(prev => ({ ...prev, profileImage }));
      localStorage.setItem("profileMetadata", JSON.stringify({ ...profileMetadata, profileImage }));
    }
  }, [profileImage]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!profile.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(profile.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!profile.address.street.trim()) newErrors.street = "Street address is required";
    if (!profile.address.city.trim()) newErrors.city = "City is required";
    if (!profile.address.state.trim()) newErrors.state = "State is required";
    if (!profile.address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(profile.address.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem("customerProfile", JSON.stringify(profile));
      showToast({
        title: "Profile saved successfully!",
        tone: "success"
      });
      setTimeout(() => router.push("/search"), 1500);
    } else {
      showToast({
        title: "Please fix the errors",
        tone: "error"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes("address.")) {
      const addressField = field.split(".")[1];
      setProfile({
        ...profile,
        address: {
          ...profile.address,
          [addressField]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [field]: value
      });
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional clean background */}

      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            <span className="font-semibold">Back to Services</span>
          </Link>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Image with Glassy Effect */}
              <div className="relative group">
                <div className="w-32 h-32 bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl rounded-full flex items-center justify-center relative overflow-hidden"
                     style={{ backgroundColor: 'lab(66.9756% -58.27 19.5419)' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User className="text-white" size={56} />
                  )}
                  {/* Glass overlay with hover effect */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-full">
                    <Camera className="text-white" size={32} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileImage"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfileImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="profileImage"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/80 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/90 transition-colors"
                  style={{ backgroundColor: 'lab(66.9756% -58.27 19.5419)' }}
                >
                  <Camera className="text-white" size={14} />
                </label>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-600 mb-4">Manage your personal information and preferences</p>
                
                {/* Profile Completion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">Profile Completion</span>
                    <span className="font-bold text-purple-600">{completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${completionPercentage}%`,
                        backgroundColor: 'lab(66.9756% -58.27 19.5419)'
                      }}
                    ></div>
                  </div>
                  {completionPercentage === 100 && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold animate-fade-in">
                      <CheckCircle size={16} />
                      <span>Profile Complete!</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border-2 border-blue-200 min-w-[100px]">
                  <Award className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-black text-blue-600">VIP</p>
                  <p className="text-xs text-gray-600 font-medium">Member</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-2 border-green-200 min-w-[100px]">
                  <Shield className="text-green-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-black text-green-600">100%</p>
                  <p className="text-xs text-gray-600 font-medium">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information Card with Glassy Effect */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center">
                  <User style={{ color: 'lab(66.9756% -58.27 19.5419)' }} size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <p className="text-sm text-gray-600">Your basic details</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                    Full Name *
                  </label>
                    <div className="ml-auto bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Read-only
                    </div>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      value={profile.name}
                      disabled
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none transition-all cursor-not-allowed text-gray-600"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                      Email Address *
                    </label>
                    <div className="ml-auto bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Read-only
                    </div>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none transition-all cursor-not-allowed text-gray-600"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 ${errors.phone ? 'border-red-400 animate-shake' : 'border-gray-200 focus:border-purple-500'} rounded-2xl focus:outline-none transition-all group-hover:shadow-md`}
                      placeholder="9876543210"
                    />
                    {profile.phone && !errors.phone && (
                      <CheckCircle size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in">
                      <AlertCircle size={12} />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Card with Glassy Effect */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center">
                  <MapPin style={{ color: 'lab(66.9756% -58.27 19.5419)' }} size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Address Details</h2>
                  <p className="text-sm text-gray-600">Where we'll reach you</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Home size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                    Street Address *
                  </label>
                  <div className="relative group">
                    <textarea
                      value={profile.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      className={`w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 ${errors.street ? 'border-red-400 animate-shake' : 'border-gray-200 focus:border-purple-500'} rounded-2xl focus:outline-none transition-all resize-none group-hover:shadow-md`}
                      placeholder="House/Flat No., Building, Street"
                      rows={2}
                    />
                    {profile.address.street && !errors.street && (
                      <CheckCircle size={20} className="absolute right-4 top-4 text-green-500" />
                    )}
                  </div>
                  {errors.street && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in">
                      <AlertCircle size={12} />
                      <span>{errors.street}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Building2 size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                      City *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={profile.address.city}
                        onChange={(e) => handleInputChange("address.city", e.target.value)}
                        className={`w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 ${errors.city ? 'border-red-400 animate-shake' : 'border-gray-200 focus:border-purple-500'} rounded-2xl focus:outline-none transition-all group-hover:shadow-md`}
                        placeholder="Mumbai"
                      />
                      {profile.address.city && !errors.city && (
                        <CheckCircle size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                    {errors.city && (
                      <div className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in">
                        <AlertCircle size={12} />
                        <span>{errors.city}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                      State *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={profile.address.state}
                        onChange={(e) => handleInputChange("address.state", e.target.value)}
                        className={`w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 ${errors.state ? 'border-red-400 animate-shake' : 'border-gray-200 focus:border-purple-500'} rounded-2xl focus:outline-none transition-all group-hover:shadow-md`}
                        placeholder="Maharashtra"
                      />
                      {profile.address.state && !errors.state && (
                        <CheckCircle size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                    {errors.state && (
                      <div className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in">
                        <AlertCircle size={12} />
                        <span>{errors.state}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Navigation size={16} style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                    Pincode *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={profile.address.pincode}
                      onChange={(e) => handleInputChange("address.pincode", e.target.value)}
                      className={`w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 ${errors.pincode ? 'border-red-400 animate-shake' : 'border-gray-200 focus:border-purple-500'} rounded-2xl focus:outline-none transition-all group-hover:shadow-md`}
                      placeholder="400001"
                    />
                    {profile.address.pincode && !errors.pincode && (
                      <CheckCircle size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.pincode && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in">
                      <AlertCircle size={12} />
                      <span>{errors.pincode}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Navigation size={16} className="text-purple-600" />
                    Landmark <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={profile.address.landmark}
                      onChange={(e) => handleInputChange("address.landmark", e.target.value)}
                      className="w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 focus:border-purple-500 rounded-2xl focus:outline-none transition-all group-hover:shadow-md"
                      placeholder="Near City Mall"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-5 rounded-2xl text-lg font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>
              <Save size={24} className="group-hover:rotate-12 transition-transform" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link href="/bookings" className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group-hover:border-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600 text-2xl">📋</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    My Bookings
                  </h3>
                  <p className="text-gray-600 text-sm">
                    View and track your service bookings
                  </p>
                </div>
                <ArrowRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            </div>
          </Link>

          <Link href="/payments" className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group-hover:border-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600 text-2xl">💳</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    Payment Methods
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage your cards and payment options
                  </p>
                </div>
                <ArrowRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-md border-2 border-blue-200 rounded-3xl p-6 shadow-xl">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Why complete your profile?</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Faster checkout when booking services</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Workers can contact you easily</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Accurate service delivery to your location</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Personalized service recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
