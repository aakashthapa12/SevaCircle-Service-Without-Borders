"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail } from "lucide-react";

const GoogleBrandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8.1 6.3C12.6 13.1 17.8 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.1 24.5c0-1.6-.1-2.8-.4-4.2H24v8h12.5c-.3 2-1.8 5-5.2 7l8.1 6.3c4.8-4.4 7.7-10.9 7.7-17.1z"
    />
    <path
      fill="#FBBC05"
      d="M10.7 28.4c-.5-1.5-.8-3.1-.8-4.9s.3-3.4.8-4.9l-8.1-6.3C1 15.6 0 19.1 0 23.5c0 4.4 1 7.9 2.6 11.2l8.1-6.3z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-8.1-6.3c-2.2 1.5-5 2.5-7.6 2.5-6.2 0-11.4-3.6-13.3-8.9l-8.1 6.3C6.5 42.6 14.6 48 24 48z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.7 13.3c0 2.7 2.4 3.6 2.4 3.6s-1.9 5.5-4.6 5.5c-1.3 0-2.3-.8-3.6-.8s-2.4.8-3.6.8C4.6 22.4 3 17.4 3 14.8c0-3.6 2.4-5.5 4.7-5.5 1.2 0 2.4.8 3.2.8.8 0 2.1-.9 3.6-.9.6 0 2.7.1 4 2-3.5 1.9-2.8 5.9-2.8 6.1z" />
    <path d="M14.9 3.2c.9-1.1 1.6-2.6 1.4-4.2-1.3.1-2.9.9-3.8 2-.8.9-1.6 2.5-1.4 4 1.5.1 2.9-.7 3.8-1.8z" />
  </svg>
);

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  rightIcon,
  rightAction,
  inputId,
  onBlur,
  error,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rightIcon?: ReactNode;
  rightAction?: ReactNode;
  inputId: string;
  onBlur?: () => void;
  error?: string;
}) {
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <div className="relative">
      <label className="absolute -top-2.5 left-4 px-1 text-xs font-medium text-blue-600 bg-white z-10">
        {label}
      </label>
      <div
        className={
          "relative rounded-lg bg-white shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:shadow-lg " +
          (error
            ? "border-2 border-red-300 focus-within:border-red-500 focus-within:ring-red-500/20 shake"
            : "border border-gray-200 focus-within:border-blue-500 focus-within:ring-blue-500/30 focus-within:shadow-blue-200/50")
        }
      >
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className="w-full h-14 px-4 pr-12 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-200"
          placeholder={placeholder}
          required
        />
        {rightIcon && (
          <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
        {rightAction && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightAction}</span>
        )}
      </div>
      {error && (
        <p id={describedBy} className="mt-2 text-xs text-red-600 animate-slide-in flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"user" | "worker" | "admin">("user");
  const [rememberMe, setRememberMe] = useState(false);

  const [touched, setTouched] = useState({ email: false, password: false });

  const errors = useMemo(() => {
    const next = { email: "", password: "" };
    const emailValue = email.trim();
    if (!emailValue) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) next.email = "Enter a valid email";

    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";

    return next;
  }, [email, password]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;

    setLoading(true);
    try {
      // TODO: call backend auth API based on role
      await new Promise((r) => setTimeout(r, 600));
      
      // Store user role in localStorage
      localStorage.setItem("userRole", role);
      
      // Trigger storage event manually for same-tab detection
      window.dispatchEvent(new Event("storage"));
      
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "worker") {
        router.push("/worker-profile");
      } else {
        router.push("/search");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 font-medium">Please enter your details</p>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Sign In to InsideBox</h1>
        </div>

        {/* Glassmorphism card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-blue-200/50">
          {/* Role selector */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 p-1">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`rounded-md py-2.5 text-sm font-semibold transition-all duration-200 ${
                  role === "user"
                    ? "bg-white text-blue-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:scale-102"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("worker")}
                className={`rounded-md py-2.5 text-sm font-semibold transition-all duration-200 ${
                  role === "worker"
                    ? "bg-white text-blue-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:scale-102"
                }`}
              >
                Worker
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-md py-2.5 text-sm font-semibold transition-all duration-200 ${
                  role === "admin"
                    ? "bg-white text-blue-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:scale-102"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-6">
              <Field
                inputId="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="example@email.com"
                rightIcon={<Mail size={18} />}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={touched.email ? errors.email : ""}
              />

              <Field
                inputId="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                error={touched.password ? errors.password : ""}
                rightAction={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="p-2 text-gray-400 hover:text-gray-700 transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium transition hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {loading && (
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                )}
                {loading ? "Signing in..." : "Sign In"}
              </span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="h-12 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group shadow-sm"
                aria-label="Continue with Facebook"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <FacebookIcon />
                </span>
              </button>
              <button
                type="button"
                className="h-12 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-red-50 hover:border-red-300 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group shadow-sm"
                aria-label="Continue with Google"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <GoogleBrandIcon />
                </span>
              </button>
              <button
                type="button"
                className="h-12 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group shadow-sm"
                aria-label="Continue with Apple"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <AppleIcon />
                </span>
              </button>
            </div>
          </form>

          {/* Sign up link */}
          {role !== "admin" && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition hover:underline"
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
