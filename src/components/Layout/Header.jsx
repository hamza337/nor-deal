import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const location = useLocation();

  // Listen for favorites updates
  useEffect(() => {
    const handleFavoritesUpdate = (event) => {
      setFavoritesCount(event.detail);
    };

    // Load initial favorites count from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavoritesCount(JSON.parse(savedFavorites).length);
    }

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

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
            <button onClick={() => openModal('login')} className="hover:underline px-4">Register or Sign In</button>
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
                <img src="/logo.png" alt="NorDeal Logo" className="w-10 h-10" />
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
              {/* Favourites */}
              <Link to="/favourites" className="relative flex flex-col items-center hover:bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">{favoritesCount}</span>
                <span className="text-xs text-gray-600 mt-1">Favourites</span>
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

      {/* Authentication Modals */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'brightness(0.5)'}}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
            {/* Left Side - Image */}
            <div className="hidden md:block md:w-1/2 relative">
              <img 
                src={`/${activeModal === 'login' ? 'login.png' : 
                       activeModal === 'signup' ? 'signup.png' : 
                       activeModal === 'forgot' ? 'forget.png' : 
                       activeModal === 'verify' ? 'verify.png' : 
                       activeModal === 'reset' ? 'reset.png' : 'login.png'}`} 
                alt="Authentication" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-8 relative" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Login Modal */}
              {activeModal === 'login' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In Now</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="Email" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <button 
                        onClick={() => openModal('forgot')}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors">
                      Log In
                    </button>
                    
                    <div className="text-center text-sm text-gray-600">
                      Or Connect with
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </button>
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      Don't have an Account? 
                      <button 
                        onClick={() => openModal('signup')}
                        className="text-orange-500 hover:text-orange-600 font-medium ml-1"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Signup Modal */}
              {activeModal === 'signup' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Up Now</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter your First Name" 
                            className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter your Last Name" 
                            className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="Enter your Email Address" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          placeholder="Enter" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => openModal('verify')}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Sign Up
                    </button>
                    
                    <div className="text-center text-sm text-gray-600">
                      Or Connect with
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </button>
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      Already have an Account? 
                      <button 
                        onClick={() => openModal('login')}
                        className="text-orange-500 hover:text-orange-600 font-medium ml-1"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Forgot Password Modal */}
              {activeModal === 'forgot' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="Email" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        A <span className="font-semibold text-orange-600">4 Digit OTP</span> has been sent to your email. Please use it for reset password
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => openModal('verify')}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Email Verification Modal */}
              {activeModal === 'verify' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verification</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      Kindly enter the <span className="font-semibold text-orange-600">OTP</span> sent to the email address you provided to proceed.
                    </p>
                    
                    <div className="flex justify-center space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <input 
                          key={i}
                          type="text" 
                          maxLength="1"
                          className="w-12 h-12 text-center text-xl font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => openModal('reset')}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Reset Password Modal */}
              {activeModal === 'reset' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Set the new password for your account so you can login access to your account again.
                    </p>
                    
                    <button 
                      onClick={closeModal}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;