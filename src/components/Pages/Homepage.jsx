import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider images
  const sliderImages = [
    '/banner1.jpg',
    '/banner2.png', 
    '/banner3.png'
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    // Dispatch custom event to update header count
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: favorites.size }));
  }, [favorites]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  // Toggle favorite status for a product
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleViewProduct = () => {
    navigate('/product/blanket');
  };
  

  


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Image Slider */}
      <div className="relative w-full h-96 overflow-hidden mb-8">
        {/* Slider Images */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img 
                src={image} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-20"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Service Features Section - Separate from First Section */}
      <div className="bg-white py-4 px-10 border-t border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Free Delivery */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <img src="/84.png" alt="Free Delivery" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">Free Delivery</h3>
                <p className="text-sm text-gray-500">For all orders over $120</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-12 bg-gray-200 mx-6"></div>

            {/* Safe Payment */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <img src="/86.png" alt="Safe Payment" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">Safe Payment</h3>
                <p className="text-sm text-gray-500">Secure transactions</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-12 bg-gray-200 mx-6"></div>

            {/* Shop with Confidence */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <img src="/88.png" alt="Shop with Confidence" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">Shop with Confidence</h3>
                <p className="text-sm text-gray-500">Quality guaranteed</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-12 bg-gray-200 mx-6"></div>

            {/* 24/7 Help Center */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <img src="/90.png" alt="24/7 Help Center" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">24/7 Help Center</h3>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-12 bg-gray-200 mx-6"></div>

            {/* Friendly Services */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <img src="/92.png" alt="Friendly Services" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base">Friendly Services</h3>
                <p className="text-sm text-gray-500">30 days guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining Sections - Full Width */}
      <div className="w-full">
        {/* Popular Home Deals Section */}
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Popular Home Deals</h2>
               
               {/* Products Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-1')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-1') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-1') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-2')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-2') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-2') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Lodge_1160x_crop_center.jpg?v=1757596672" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-3')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-3') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-3') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/bedroom-sofa-chair-omni-wing-in-black-color_1160x_crop_center.jpg?v=1758693520" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-4')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-4') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-4') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/AntoninSofa-01_6874164b-6bcc-405a-bb8c-c40e33d2d3ef_1160x_crop_center.jpg?v=1758517708" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-5')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-5') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-5') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-6')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-6') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-6') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-7')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-7') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-7') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-8')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-8') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-8') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
               </div>

               {/* See All Button */}
               <div className="text-center">
                 <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                   See All Home Deals
                 </button>
               </div>
             </div>
           </div>

           {/* Bedding Promotional Banner */}
           <div className="bg-gray-50 py-8 px-8">
             <div className="max-w-7xl mx-auto">
               <div className="relative rounded-2xl overflow-hidden h-64">
                 {/* Background Image */}
                 <img 
                   src="/banner1.jpg" 
                   alt="Bedding Collection" 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 {/* Dark Overlay */}
                 <div className="absolute inset-0 bg-opacity-40" style={{backdropFilter: 'brightness(0.5)'}}></div>
                 {/* Text Content */}
                 <div className="relative z-10 flex items-center h-full p-8">
                   <div className="text-left">
                     <h2 className="text-4xl font-bold text-white mb-2">FLAT 27% OFF</h2>
                     <h3 className="text-2xl font-bold text-orange-500 mb-4">ON ENTIRE BEDDINGS</h3>
                     <div className="text-white">
                       <span className="text-lg">STARTING FROM</span>
                       <div className="text-3xl font-bold text-orange-500">100 Kr</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Featured SPA Deals Section */}
           <div className="bg-white py-12 px-8">
             <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured SPA Deals</h2>
               
               {/* SPA Products Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-9')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-9') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-9') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-10')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-10') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-10') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Lodge_1160x_crop_center.jpg?v=1757596672" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-11')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-11') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-11') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/bedroom-sofa-chair-omni-wing-in-black-color_1160x_crop_center.jpg?v=1758693520" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-12')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-12') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-12') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/AntoninSofa-01_6874164b-6bcc-405a-bb8c-c40e33d2d3ef_1160x_crop_center.jpg?v=1758517708" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-13')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-13') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-13') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-14')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-14') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-14') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-15')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-15') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-15') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-16')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-16') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-16') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
               </div>

               {/* See All SPA Deals Button */}
               <div className="text-center">
                 <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                   See All SPA Deals
                 </button>
               </div>
             </div>
           </div>

           {/* Fourth Section - Promotional Cards */}
           <div className="bg-gray-50 py-12 px-8">
             <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Electronic Appliances Card */}
                 <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl overflow-hidden relative h-80">
                   <div className="flex items-center h-full">
                     <div className="flex-1 p-8 text-white">
                       <h2 className="text-3xl font-bold mb-6 leading-tight">
                         EXPLORE<br/>
                         OUR ELECTRONIC<br/>
                         APPLIANCES
                       </h2>
                       <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                         Explore
                       </button>
                     </div>
                     <div className="flex-1 relative h-full">
                       <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pink-400/20"></div>
                       <div className="h-full flex items-center justify-center">
                         <div className="w-48 h-64 bg-gradient-to-br from-purple-300 to-teal-300 rounded-lg opacity-90 flex items-center justify-center">
                           <div className="w-32 h-32 bg-teal-400 rounded-full opacity-80"></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Right Column with Two Cards */}
                 <div className="space-y-6">
                   {/* Laptop Card */}
                   <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl overflow-hidden relative h-36">
                     <div className="flex items-center h-full p-6">
                       <div className="flex-1">
                         <div className="flex items-center mb-2">
                           <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                             <span className="text-white text-sm font-bold">✓</span>
                           </div>
                           <span className="text-white text-sm font-medium">A remarkable</span>
                         </div>
                         <div className="text-white text-sm mb-1">variety of</div>
                         <h3 className="text-white text-2xl font-bold">LAPTOP</h3>
                       </div>
                       <div className="flex-1 relative h-full">
                         <div className="h-full flex items-center justify-end pr-4">
                           <div className="w-32 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg opacity-90 flex items-center justify-center">
                             <div className="w-24 h-16 bg-gray-800 rounded opacity-80"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Black Friday Card */}
                   <div className="bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl overflow-hidden relative h-36">
                     <div className="flex items-center h-full p-6">
                       <div className="flex-1">
                         <div className="text-white text-xs mb-1 uppercase tracking-wide">BLACK FRIDAY EARLY ACCESS</div>
                         <div className="text-white text-xs mb-2">SAVE UPTO</div>
                         <h3 className="text-white text-3xl font-bold">25%</h3>
                       </div>
                       <div className="flex-1 relative h-full">
                         <div className="h-full flex items-center justify-end pr-4">
                           <div className="flex space-x-2">
                             <div className="w-12 h-16 bg-gray-600 rounded opacity-80"></div>
                             <div className="w-16 h-20 bg-gray-700 rounded opacity-80"></div>
                             <div className="w-12 h-14 bg-gray-600 rounded opacity-80"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Fifth Section - Top Selling Electronic Appliances */}
           <div className="bg-white py-12 px-8">
             <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Top Selling Electronic Appliances</h2>
               
               {/* Electronic Products Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-17')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-17') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-17') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-18')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-18') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-18') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Lodge_1160x_crop_center.jpg?v=1757596672" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button 
                      onClick={() => toggleFavorite('product-19')}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-colors ${favorites.has('product-19') ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill={favorites.has('product-19') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/bedroom-sofa-chair-omni-wing-in-black-color_1160x_crop_center.jpg?v=1758693520" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/AntoninSofa-01_6874164b-6bcc-405a-bb8c-c40e33d2d3ef_1160x_crop_center.jpg?v=1758517708" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
               </div>

               {/* See All Electronic Appliances Button */}
               <div className="text-center">
                 <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                   See All Electronic Appliances
                 </button>
               </div>
             </div>
           </div>

           {/* Sixth Section - Beauty & Skincare Promotional Cards */}
           <div className="bg-gray-50 py-12 px-8">
             <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Right Column with Two Cards */}
                 <div className="space-y-6">
                   {/* Laptop Card */}
                   <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl overflow-hidden relative h-36">
                     <div className="flex items-center h-full p-6">
                       <div className="flex-1">
                         <div className="flex items-center mb-2">
                           <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                             <span className="text-white text-sm font-bold">✓</span>
                           </div>
                           <span className="text-white text-sm font-medium">A remarkable</span>
                         </div>
                         <div className="text-white text-sm mb-1">variety of</div>
                         <h3 className="text-white text-2xl font-bold">LAPTOP</h3>
                       </div>
                       <div className="flex-1 relative h-full">
                         <div className="h-full flex items-center justify-end pr-4">
                           <div className="w-32 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg opacity-90 flex items-center justify-center">
                             <div className="w-24 h-16 bg-gray-800 rounded opacity-80"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Black Friday Card */}
                   <div className="bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl overflow-hidden relative h-36">
                     <div className="flex items-center h-full p-6">
                       <div className="flex-1">
                         <div className="text-white text-xs mb-1 uppercase tracking-wide">BLACK FRIDAY EARLY ACCESS</div>
                         <div className="text-white text-xs mb-2">SAVE UPTO</div>
                         <h3 className="text-white text-3xl font-bold">25%</h3>
                       </div>
                       <div className="flex-1 relative h-full">
                         <div className="h-full flex items-center justify-end pr-4">
                           <div className="flex space-x-2">
                             <div className="w-12 h-16 bg-gray-600 rounded opacity-80"></div>
                             <div className="w-16 h-20 bg-gray-700 rounded opacity-80"></div>
                             <div className="w-12 h-14 bg-gray-600 rounded opacity-80"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* Electronic Appliances Card */}
                 <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl overflow-hidden relative h-80">
                   <div className="flex items-center h-full">
                     <div className="flex-1 p-8 text-white">
                       <h2 className="text-3xl font-bold mb-6 leading-tight">
                         EXPLORE<br/>
                         OUR ELECTRONIC<br/>
                         APPLIANCES
                       </h2>
                       <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                         Explore
                       </button>
                     </div>
                     <div className="flex-1 relative h-full">
                       <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pink-400/20"></div>
                       <div className="h-full flex items-center justify-center">
                         <div className="w-48 h-64 bg-gradient-to-br from-purple-300 to-teal-300 rounded-lg opacity-90 flex items-center justify-center">
                           <div className="w-32 h-32 bg-teal-400 rounded-full opacity-80"></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Seventh Section - Top Selling Beauty Products */}
           <div className="bg-white py-12 px-8">
             <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Top Selling Beauty Products</h2>
               
               {/* Beauty Products Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Lodge_1160x_crop_center.jpg?v=1757596672" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/bedroom-sofa-chair-omni-wing-in-black-color_1160x_crop_center.jpg?v=1758693520" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/AntoninSofa-01_6874164b-6bcc-405a-bb8c-c40e33d2d3ef_1160x_crop_center.jpg?v=1758517708" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Hester_07564591-20db-4578-845f-83f194a03fe8_1160x_crop_center.jpg?v=1757596432" 
                      alt="Product Image" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://interwood.pk/cdn/shop/files/Anniston_6c5deb66-bd7a-4352-9083-cbcd3ef14f16_1160x_crop_center.jpg?v=1757596620" 
                      alt="Orchard Sofa Sitting" 
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">-27%</div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Orchard Sofa Sitting</h3>
                    <p className="text-sm text-gray-600 mb-2">Home Things</p>
                    <div className="flex items-center mb-2">
                      <span className="text-orange-500 text-sm">◆ MECA Ensje</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.8</span>
                        <span className="text-sm text-gray-500 ml-1">Rated by 50+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-teal-600">1699 Kr</span>
                        <span className="text-sm text-gray-500 line-through ml-2">2899 Kr</span>
                      </div>
                      <button 
                        onClick={handleViewProduct}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
               </div>

               {/* See All Beauty Products Button */}
               <div className="text-center">
                 <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                   See All Beauty Products
                 </button>
               </div>
             </div>
           </div>

           {/* Eighth Section - Skincare Banner */}
           <div className="bg-gray-50 py-8 px-8">
             <div className="max-w-7xl mx-auto">
               <div className="relative rounded-2xl overflow-hidden h-64">
                 {/* Background Image */}
                 <img 
                   src="/banner8.jpg" 
                   alt="Bedding Collection" 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 {/* Dark Overlay */}
                 <div className="absolute inset-0 bg-opacity-40" style={{backdropFilter: 'brightness(0.5)'}}></div>
                 {/* Text Content */}
                 <div className="relative z-10 flex items-center h-full p-8">
                   <div className="text-left">
                     <h2 className="text-4xl font-bold text-white mb-2">FLAT 27% OFF</h2>
                     <h3 className="text-2xl font-bold text-orange-500 mb-4">ON ENTIRE BEDDINGS</h3>
                     <div className="text-white">
                       <span className="text-lg">STARTING FROM</span>
                       <div className="text-3xl font-bold text-orange-500">100 Kr</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    //  </div>
   );
 };

export default Homepage;