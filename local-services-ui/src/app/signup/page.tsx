"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, User, Briefcase, Lock, UserPlus, Phone } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "service_provider",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const errors = useMemo(() => {
    const validationErrors = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: "",
    };

    if (touched.fullName && !formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        validationErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        validationErrors.email = "Please enter a valid email address";
      }
    }

    if (touched.phone && !formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    }

    if (touched.password) {
      if (!formData.password) {
        validationErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        validationErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        validationErrors.password = "Password must contain uppercase, lowercase, and number";
      }
    }

    if (touched.confirmPassword) {
      if (!formData.confirmPassword) {
        validationErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.agreeToTerms) {
      validationErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return validationErrors;
  }, [formData, touched]);

  const isFormValid = Object.values(errors).every(error => !error) && 
    formData.fullName && formData.email && formData.phone && formData.password && 
    formData.confirmPassword && formData.agreeToTerms;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    
    if (!isFormValid) return;
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set localStorage for client-side checks
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.fullName);
      
      // Set cookies for middleware authentication
      document.cookie = `isLoggedIn=true; path=/; max-age=${30 * 24 * 60 * 60}`;
      document.cookie = `userRole=${formData.role}; path=/; max-age=${30 * 24 * 60 * 60}`;
      document.cookie = `userEmail=${formData.email}; path=/; max-age=${30 * 24 * 60 * 60}`;
      
      window.dispatchEvent(new Event("storage"));
      
      if (formData.role === "service_provider") {
        router.push("/worker-profile");
      } else {
        router.push("/search");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roles = [
    {
      id: "user" as const,
      label: "Customer",
      description: "Find and book services",
      icon: User,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "service_provider" as const,
      label: "Service Provider",
      description: "Offer your services",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "2s"}} />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "4s"}} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our platform and get started today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Register as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {roles.map((roleOption) => {
                  const Icon = roleOption.icon;
                  const isSelected = formData.role === roleOption.id;
                  
                  return (
                    <button
                      key={roleOption.id}
                      type="button"
                      onClick={() => updateFormData("role", roleOption.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                            : "border-gray-200 bg-white/80 hover:border-gray-300 hover:shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${roleOption.color} 
                            flex items-center justify-center text-white shadow-sm
                          `}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${
                            isSelected ? "text-blue-700" : "text-gray-900"
                          }`}>
                            {roleOption.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {roleOption.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
                  placeholder="John Doe"
                  required
                  className={`w-full h-12 pl-10 pr-4 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm
                    text-gray-900 placeholder-gray-500 text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                    transition-all duration-300 hover:border-gray-400
                    ${errors.fullName ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
                  `}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  placeholder="john@example.com"
                  required
                  className={`w-full h-12 pl-10 pr-4 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm
                    text-gray-900 placeholder-gray-500 text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                    transition-all duration-300 hover:border-gray-400
                    ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
                  `}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone size={20} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                  placeholder="+1 (555) 000-0000"
                  required
                  className={`w-full h-12 pl-10 pr-4 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm
                    text-gray-900 placeholder-gray-500 text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                    transition-all duration-300 hover:border-gray-400
                    ${errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
                  `}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  placeholder="Create a strong password"
                  required
                  className={`w-full h-12 pl-10 pr-12 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm
                    text-gray-900 placeholder-gray-500 text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                    transition-all duration-300 hover:border-gray-400
                    ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                  placeholder="Confirm your password"
                  required
                  className={`w-full h-12 pl-10 pr-12 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm
                    text-gray-900 placeholder-gray-500 text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                    transition-all duration-300 hover:border-gray-400
                    ${errors.confirmPassword ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl
                hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <Link 
                href="/login" 
                className="block w-full py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl
                  hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.01]"
              >
                Sign In Instead
              </Link>
              <Link 
                href="/" 
                className="inline-block text-sm text-gray-500 hover:text-gray-700 font-medium hover:underline mt-4"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
