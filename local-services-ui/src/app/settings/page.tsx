"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  Eye,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check
} from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

export default function SettingsPage() {
  const router = useRouter();
  const { push } = useToast();

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
      newsletter: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      activityStatus: true
    },
    preferences: {
      language: "en",
      currency: "INR",
      theme: "light"
    }
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem("userSettings", JSON.stringify(newSettings));
    push({ title: "Settings saved successfully", tone: "success" });
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("customerProfile");
      push({ title: "Logged out successfully", tone: "success" });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-[4%] sm:px-[6%] lg:px-[8%] py-[clamp(2rem,4vw,3rem)]">
        {/* Header */}
        <div className="mb-8">
          <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            <span className="font-semibold">Back to Services</span>
          </Link>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
                <SettingsIcon className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900">Settings</h1>
                <p className="text-gray-600 text-lg">Manage your account preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">Manage how you receive updates</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
                  <div>
                    <p className="font-bold text-gray-900">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                    <p className="text-sm text-gray-600">Receive notifications via {key}</p>
                  </div>
                  <button
                    onClick={() => updateSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [key]: !value }
                    })}
                    className={`relative w-16 h-8 rounded-full transition-colors ${
                      value ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg ${
                      value ? 'translate-x-8' : ''
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
                <p className="text-sm text-gray-600">Control your privacy settings</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                  <div>
                    <p className="font-bold text-gray-900">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                    <p className="text-sm text-gray-600">Manage {key} visibility</p>
                  </div>
                  <button
                    onClick={() => updateSettings({
                      ...settings,
                      privacy: { ...settings.privacy, [key]: !value }
                    })}
                    className={`relative w-16 h-8 rounded-full transition-colors ${
                      value ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg ${
                      value ? 'translate-x-8' : ''
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <label className="block font-bold text-gray-900 mb-2">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => updateSettings({
                    ...settings,
                    preferences: { ...settings.preferences, language: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none font-medium bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <label className="block font-bold text-gray-900 mb-2">Currency</label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => updateSettings({
                    ...settings,
                    preferences: { ...settings.preferences, currency: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none font-medium bg-white"
                >
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                  <option value="EUR">€ EUR (Euro)</option>
                  <option value="GBP">£ GBP (British Pound)</option>
                </select>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <label className="block font-bold text-gray-900 mb-2">Theme</label>
                <div className="flex gap-3">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateSettings({
                        ...settings,
                        preferences: { ...settings.preferences, theme }
                      })}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        settings.preferences.theme === theme
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {theme === 'light' && <Eye size={18} className="inline mr-2" />}
                      {theme === 'dark' && <Moon size={18} className="inline mr-2" />}
                      {theme === 'auto' && <Globe size={18} className="inline mr-2" />}
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Actions</h2>
            <div className="space-y-3">
              <Link
                href="/customer-profile"
                className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Edit Profile</p>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={24} />
              </Link>

              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <Lock className="text-purple-600" size={24} />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-purple-600 transition-colors" size={24} />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-100 hover:border-amber-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-amber-600" size={24} />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Help & Support</p>
                    <p className="text-sm text-gray-600">Get help with your account</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-amber-600 transition-colors" size={24} />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-100 hover:border-red-300 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="text-red-600" size={24} />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Logout</p>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-red-600 transition-colors" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
