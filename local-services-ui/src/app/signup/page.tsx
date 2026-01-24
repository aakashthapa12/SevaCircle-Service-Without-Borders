"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password === confirm && password.length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accept || !passwordsMatch) return;
    setLoading(true);
    try {
      // TODO: call backend signup API
      await new Promise((r) => setTimeout(r, 800));
      router.push("/login");
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
              <User size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Join our platform to book trusted local services.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                placeholder="Jane Doe"
              />
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-800 mb-2">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                placeholder="Repeat your password"
              />
              {!passwordsMatch && confirm.length > 0 && (
                <p className="mt-2 text-sm text-red-600">Passwords do not match.</p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>

            <Button type="submit" size="lg" className="w-full" disabled={loading || !accept || !passwordsMatch}>
              {loading ? "Creating account…" : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-amber-700 hover:text-amber-800">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
