'use client'

import { useEffect, useState } from 'react'
import { Settings, Bell, Lock, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1]
        const res = await fetch('http://localhost:3001/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setAdminData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || ''
          })
        }
      } catch (error) {
        console.error('Failed to fetch admin profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <Header />
        <div className="text-center py-12">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileSettings adminData={adminData} />
          <NotificationSettings />
        </div>
        <div className="space-y-8">
          <SecuritySettings />
          <BillingSettings />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Admin Settings
      </h1>
      <p className="text-gray-600 mt-1">Manage your account and platform settings.</p>
    </div>
  )
}

function ProfileSettings({ adminData }: { adminData: any }) {
  const [formData, setFormData] = useState({
    name: adminData.name,
    email: adminData.email
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setFormData({
      name: adminData.name,
      email: adminData.email
    })
  }, [adminData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1]
      const res = await fetch('http://localhost:3001/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setMessage('Profile updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to update profile')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      setMessage('Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
          />
        </div>
        {message && (
          <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h3>
      <div className="space-y-4">
        <Toggle setting="New user registrations" enabled={true} />
        <Toggle setting="New bookings" enabled={true} />
        <Toggle setting="Booking cancellations" enabled={true} />
        <Toggle setting="Weekly summary reports" enabled={false} />
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Billing</h3>
      <div className="space-y-4">
        <p className="text-gray-600">Your current plan is <span className="font-bold text-purple-600">Enterprise</span>.</p>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <CreditCard className="text-gray-600" size={24} />
          <div>
            <p className="font-medium text-gray-900">Visa ending in 1234</p>
            <p className="text-sm text-gray-500">Expires 12/2028</p>
          </div>
        </div>
        <button className="w-full text-center text-blue-600 font-medium hover:underline">
          Update Payment Method
        </button>
      </div>
    </div>
  )
}

function Toggle({ setting, enabled }: { setting: string, enabled: boolean }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
      <span className="font-medium text-gray-800">{setting}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={enabled} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
      </label>
    </div>
  )
}