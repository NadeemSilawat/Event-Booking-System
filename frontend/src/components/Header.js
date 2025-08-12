import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">EventBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/bookings" 
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                >
                  My Bookings
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/bookings"
                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <div className="px-3 py-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700 font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 font-medium w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block btn btn-secondary w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block btn btn-primary w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
