import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Banner */}
      <div className="bg-orange-500 text-white py-2 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span>End of SUMMER SALE Flat 30% off</span>
          <div className="flex items-center text-sm">
            <div className="flex items-center space-x-1 px-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Select Location</span>
            </div>
            <div className="w-px h-4 bg-white opacity-50"></div>
            <Link to="/account" className="hover:underline px-4">My Account</Link>
            <div className="w-px h-4 bg-white opacity-50"></div>
            <Link to="/auth" className="hover:underline px-4">Register or Sign In</Link>
            <div className="w-px h-4 bg-white opacity-50"></div>
            <Link to="/checkout" className="hover:underline px-4">Checkout</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-gray-800">NOR</span>
                  <span style={{color: '#009CA8'}}>DEAL</span>
                </span>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-orange-500 font-medium">Helpline</span>
                <span className="font-semibold text-gray-800">06-900-6389-00</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-600 p-1 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search on NorDeal"
                  className="w-full pl-16 pr-6 text-xs py-3 rounded-full focus:outline-none text-gray-700 text-base shadow-sm"
                  style={{backgroundColor: '#F2F3F5'}}
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              {/* Favorites */}
              <Link to="/favorites" className="relative flex flex-col items-center hover:bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">0</span>
                <span className="text-xs text-gray-600 mt-1">Favorites</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative flex flex-col items-center hover:bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-1 -right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">0</span>
                <span className="text-xs text-gray-600 mt-1">Your Cart</span>
              </Link>

              {/* Admin */}
              <Link to="/admin" className="relative flex flex-col items-center hover:bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-600 mt-1">Admin</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{backgroundColor: '#FFF0EA'}} className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-8">
                <Link to="/" className={`h-12 flex items-center text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-orange-500 border-b-2 border-orange-500 hover:text-orange-600' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}>
                  Home
                </Link>
                <Link to="/deals" className={`h-12 flex items-center text-sm font-medium transition-colors ${
                  location.pathname === '/deals' 
                    ? 'text-orange-500 border-b-2 border-orange-500 hover:text-orange-600' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}>
                  New Deals
                </Link>
                <div className="relative group h-12 flex items-center">
                  <button className="text-gray-700 hover:text-orange-500 text-sm font-medium flex items-center space-x-1 transition-colors">
                    <span>Local</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Local Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link to="/blankets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                        Blankets
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative group h-12 flex items-center">
                  <button className="text-gray-700 hover:text-orange-500 text-sm font-medium flex items-center space-x-1 transition-colors">
                    <span>Products</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="relative group h-12 flex items-center">
                  <button className="text-gray-700 hover:text-orange-500 text-sm font-medium flex items-center space-x-1 transition-colors">
                    <span>Travel & Hotels</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <Link to="/reviews" className="text-gray-700 hover:text-orange-500 h-12 flex items-center text-sm font-medium transition-colors">
                  Reviews
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700 font-medium hover:text-orange-500 transition-colors">
                  Advertise
                </div>
                {/* Norwegian Flag */}
                <div className="w-8 h-6 relative overflow-hidden rounded-sm border border-gray-200">
                  <div className="absolute inset-0 bg-red-600"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
                  <div className="absolute top-2 left-0 w-full h-1 bg-white"></div>
                  <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                  <div className="absolute top-0 left-2 w-1 h-full bg-white"></div>
                  <div className="absolute top-0.5 left-0 w-full h-0.5 bg-blue-800"></div>
                  <div className="absolute top-2.5 left-0 w-full h-0.5 bg-blue-800"></div>
                  <div className="absolute top-0 left-0.5 w-0.5 h-full bg-blue-800"></div>
                  <div className="absolute top-0 left-2.5 w-0.5 h-full bg-blue-800"></div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search on NorDeal"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <Link to="/" className={`block py-3 border-b border-gray-100 ${
                location.pathname === '/' ? 'text-orange-500 font-medium' : 'text-gray-700'
              }`}>Home</Link>
              <Link to="/deals" className={`block py-3 border-b border-gray-100 ${
                location.pathname === '/deals' ? 'text-orange-500 font-medium' : 'text-gray-700'
              }`}>New Deals</Link>
              <Link to="/products" className="block py-3 text-gray-700 border-b border-gray-100">Products</Link>
              <Link to="/local" className="block py-3 text-gray-700 border-b border-gray-100">Local</Link>
              <Link to="/travel" className="block py-3 text-gray-700 border-b border-gray-100">Travel & Hotels</Link>
              <Link to="/reviews" className="block py-3 text-gray-700">Reviews</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;