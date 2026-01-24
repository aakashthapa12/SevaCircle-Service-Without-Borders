"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: call backend auth API
      await new Promise((r) => setTimeout(r, 600));
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
              <Lock size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Access your account to book and manage local services.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-sm text-amber-600 hover:text-amber-700">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                Remember me
              </label>
              <Link href="#" className="text-sm font-medium text-amber-700 hover:text-amber-800">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="secondary" className="w-full">
                Google
              </Button>
              <Button type="button" variant="secondary" className="w-full">
                Apple
              </Button>
            </div>

            <p className="text-center text-sm text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-amber-700 hover:text-amber-800">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
