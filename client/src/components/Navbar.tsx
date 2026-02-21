import { Link } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Calendar, User, LogOut, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">SevaCircle</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 flex items-center gap-1">
              <Home size={18} />
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link to="/workers" className="text-gray-700 hover:text-primary-600">
              Workers
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-primary-600 flex items-center gap-1">
              <MessageCircle size={18} />
              AI Chat
            </Link>
            
            {user ? (
              <>
                <Link to="/my-bookings" className="text-gray-700 hover:text-primary-600 flex items-center gap-1">
                  <Calendar size={18} />
                  My Bookings
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/services" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
              Services
            </Link>
            <Link to="/workers" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
              Workers
            </Link>
            {user ? (
              <>
                <Link to="/my-bookings" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
                  My Bookings
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
