import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS for animations
const styles = {
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
    .animate-fade-out {
      animation: fadeOut 300ms ease-out forwards;
    }
  `
};

const Favourites = () => {
  // Sample favourite products data with state management
  const [favouriteProducts, setFavouriteProducts] = useState([
    {
      id: 1,
      name: 'Orchard Sofa Sitting',
      brand: 'Rask OG Profesjonel EU - Kontroll',
      supplier: 'MECA Enje',
      rating: 4.8,
      ratedBy: '50+',
      price: 1699,
      originalPrice: 2899,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      discount: 41
    },
    {
      id: 2,
      name: 'Outdoor Chairs for Lawn',
      brand: 'Rask OG Profesjonel EU - Kontroll',
      supplier: 'MECA Enje',
      rating: 4.8,
      ratedBy: '50+',
      price: 1699,
      originalPrice: 2899,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      discount: null
    },
    {
      id: 3,
      name: 'Table Set ( 3 Piece )',
      brand: 'Rask OG Profesjonel EU - Kontroll',
      supplier: 'MECA Enje',
      rating: 4.8,
      ratedBy: '50+',
      price: 1699,
      originalPrice: 2899,
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      discount: null
    },
    {
      id: 4,
      name: 'Modern Desk Lamp',
      brand: 'Rask OG Profesjonel EU - Kontroll',
      supplier: 'MECA Enje',
      rating: 4.9,
      ratedBy: '30+',
      price: 899,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      discount: 30
    }
  ]);

  // Function to remove a product from favourites with animation
  const removeFromFavourites = (productId, event) => {
    // Prevent event bubbling
    event.stopPropagation();
    
    // Get the card element (parent of the button's parent)
    const card = event.currentTarget.closest('.product-card');
    
    // Add fade-out animation
    if (card) {
      card.classList.add('animate-fade-out');
      
      // Wait for animation to complete before removing from state
      setTimeout(() => {
        setFavouriteProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        );
      }, 300); // Match this with the CSS animation duration
    } else {
      // Fallback if card element not found
      setFavouriteProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
    }
  };

  // Add the animation styles to the document
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles.fadeOut;
    document.head.appendChild(styleElement);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Favourite Products</h1>
        <p className="text-center text-orange-500 mb-8">Result {favouriteProducts.length} Product{favouriteProducts.length !== 1 ? 's' : ''}</p>
        
        {/* Products Grid or Empty State */}
        {favouriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {favouriteProducts.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-40 w-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{product.discount}%
                  </div>
                )}
                <button 
                  onClick={(e) => removeFromFavourites(product.id, e)} 
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-transform hover:scale-110"
                  aria-label="Remove from favourites"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-base font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-2">
                    <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">Rated by {product.ratedBy}</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-xs text-gray-600">{product.supplier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-base font-bold text-gray-900">{product.price} Kr</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">{product.originalPrice} Kr</span>
                    )}
                  </div>
                  <Link 
                    to={`/product/${product.id}`}
                    className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-orange-600 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favourites yet</h3>
            <p className="text-gray-500 mb-6">Items you heart will appear here</p>
            <Link to="/" className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;