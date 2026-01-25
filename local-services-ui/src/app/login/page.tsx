"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, User, Shield, Briefcase, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "service_provider" | "admin">("user");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const errors = useMemo(() => {
    const validationErrors = { email: "", password: "" };
    
    if (touched.email) {
      if (!email.trim()) {
        validationErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.email = "Please enter a valid email address";
      }
    }

    if (touched.password) {
      if (!password) {
        validationErrors.password = "Password is required";
      } else if (password.length < 6) {
        validationErrors.password = "Password must be at least 6 characters";
      }
    }

    return validationErrors;
  }, [email, password, touched]);

  const isFormValid = !errors.email && !errors.password && email && password;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });
    
    if (!isFormValid) return;
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set localStorage for client-side checks
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      
      // Set cookies for middleware authentication
      document.cookie = `isLoggedIn=true; path=/; max-age=${30 * 24 * 60 * 60}`;
      document.cookie = `userRole=${role}; path=/; max-age=${30 * 24 * 60 * 60}`;
      document.cookie = `userEmail=${email}; path=/; max-age=${30 * 24 * 60 * 60}`;
      
      if (rememberMe) {
        document.cookie = `rememberMe=true; max-age=${30 * 24 * 60 * 60}`;
      }
      
      window.dispatchEvent(new Event("storage"));
      
      // Handle redirect if user was trying to access a protected route
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirect');
      
      if (redirectTo && redirectTo !== '/login') {
        router.push(redirectTo);
      } else {
        switch (role) {
          case "admin":
            router.push("/admin");
            break;
          case "service_provider":
            router.push("/worker-profile");
            break;
          default:
            router.push("/search");
            break;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: "user" as const,
      label: "Customer",
      description: "Book services",
      icon: User,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "service_provider" as const,
      label: "Service Provider", 
      description: "Provide services",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
    },
    {
      id: "admin" as const,
      label: "Admin",
      description: "Manage platform",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "2s"}} />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "4s"}} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Login as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {roles.map((roleOption) => {
                  const Icon = roleOption.icon;
                  const isSelected = role === roleOption.id;
                  
                  return (
                    <button
                      key={roleOption.id}
                      type="button"
                      onClick={() => setRole(roleOption.id)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl
                hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">New here?</span>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <Link 
                href="/signup" 
                className="block w-full py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl
                  hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.01]"
              >
                Create Account
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
