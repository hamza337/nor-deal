import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Static product data
  const product = {
    id: 'blanket',
    category: 'Blankets',
    title: 'Electric Blue Blankets',
    rating: 4.0,
    reviews: 24,
    currentPrice: 1699,
    originalPrice: 2899,
    inStock: true,
    description: "Stay warm and cozy with this soft blue electric blanket, designed for ultimate comfort and efficient heating. Featuring adjustable heat settings and a gentle fabric touch, it's perfect for chilly nights or relaxing evenings. Lightweight, stylish, and safe to use — a perfect addition to your bedroom essentials.",
    colors: [
      { name: 'blue', color: 'bg-blue-600', selected: true },
      { name: 'pink', color: 'bg-pink-300', selected: false },
      { name: 'sage', color: 'bg-green-300', selected: false },
      { name: 'gray', color: 'bg-gray-500', selected: false }
    ],
    images: [
      'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/he4/h5b/32678438961182.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/hf9/hea/48580320231454.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/h2a/h7f/103919867297822.jpg'
    ],
    thumbnails: [
      'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/he4/h5b/32678438961182.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/hf9/hea/48580320231454.jpg',
      'https://www.bigw.com.au/medias/sys_master/images/images/h2a/h7f/103919867297822.jpg'
    ]
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? 'text-orange-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            {/* Image Dots - Overlaid on image */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full shadow-lg ${
                    index === currentImageIndex ? 'bg-orange-500' : 'bg-white bg-opacity-70'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product.thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                  index === currentImageIndex ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Category & Stock */}
          <div className="flex items-center gap-8">
            <span className="text-gray-600">{product.category}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900" style={{textAlign: 'left'}}>{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-teal-600">{product.currentPrice} Kr</span>
            <span className="text-xl text-gray-400 line-through">{product.originalPrice} Kr</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed" style={{textAlign: 'left'}}>{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{textAlign: 'left'}}>Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-lg border-2 ${
                    selectedColor === color.name ? 'border-gray-800' : 'border-gray-300'
                  } ${color.color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{textAlign: 'left'}}>Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="w-10 text-black h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                −
              </button>
              <span className="text-xl text-black font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600"
              >
                +
              </button>
              <button 
                onClick={() => navigate('/cart')} 
                className="ml-4 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Add to Cart
              </button>
              <button 
              onClick={() => navigate('/checkout')} 
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Buy Now
              </button>
              <button className="p-3 text-red-500 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">Category :</span>
            <span className="text-gray-600">Home Deals</span>
          </div>

          {/* Share */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-900">Share :</span>
            <div className="flex space-x-2">
              <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.311-.623-.311-1.544c0-1.445.839-2.524 1.883-2.524.888 0 1.317.666 1.317 1.466 0 .893-.568 2.228-.861 3.467-.245 1.038.52 1.884 1.544 1.884 1.854 0 3.279-1.954 3.279-4.776 0-2.499-1.798-4.248-4.364-4.248-2.973 0-4.717 2.23-4.717 4.535 0 .898.346 1.861.778 2.384.085.104.098.195.072.301-.079.329-.255 1.045-.289 1.193-.045.189-.147.229-.339.138-1.273-.593-2.068-2.456-2.068-3.956 0-3.292 2.391-6.317 6.895-6.317 3.619 0 6.433 2.578 6.433 6.019 0 3.59-2.26 6.477-5.399 6.477-1.055 0-2.048-.548-2.386-1.271 0 0-.522 1.988-.649 2.477-.235.897-.869 2.021-1.294 2.707.975.301 2.006.461 3.065.461 6.621 0 11.99-5.367 11.99-11.988C24.007 5.367 18.639.001 12.017.001z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3" style={{textAlign: 'left'}}>Payment Method</h3>
            <div className="flex flex-wrap gap-8">
              <img src="/shopping.png" alt="Mastercard" className="h-12" />
              <img src="/visa.png" alt="Visa" className="h-12" />
              <img src="/paypal.png" alt="PayPal" className="h-12" />
              <img src="/apple-pay.png" alt="Apple Pay" className="h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['description', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'features' ? 'Product Features' : tab}
                {tab === 'reviews' && ` ( ${product.reviews} )`}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
              </p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Adjustable heat settings for personalized comfort</li>
                <li>Soft and gentle fabric touch</li>
                <li>Lightweight and portable design</li>
                <li>Safe auto-shutoff feature</li>
                <li>Machine washable (controller detachable)</li>
                <li>Energy efficient heating technology</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Customer Reviews ({product.reviews})</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(5)}</div>
                    <span className="font-medium">John D.</span>
                    <span className="text-gray-500 text-sm">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700">Excellent blanket! Very warm and cozy. The heat settings work perfectly.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(4)}</div>
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-gray-500 text-sm">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700">Good quality blanket. Soft fabric and heats up quickly. Recommended!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fifth Section - Top Selling Electronic Appliances */}
      <div className="bg-white py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Related Products</h2>
          
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
                        
                        className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
               </div>
        </div>
      </div>

      {/* Service Features Section - Separate from First Section */}
      <div className="bg-white py-8 px-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Free Delivery */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Free Delivery</h3>
              <p className="text-sm text-gray-600">For all orders over $120</p>
            </div>
          </div>

          {/* Safe Payment */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Safe Payment</h3>
              <p className="text-sm text-gray-600">For all orders over $120</p>
            </div>
          </div>

          {/* Shop with Confidence */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Shop with Confidence</h3>
              <p className="text-sm text-gray-600">If Goods have problems</p>
            </div>
          </div>

          {/* 24/7 Help Center */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">24/7 Help Center</h3>
              <p className="text-sm text-gray-600">Dedicated 24/7 Support</p>
            </div>
          </div>

          {/* Friendly Services */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-500">Friendly Services</h3>
              <p className="text-sm text-gray-600">30 days Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;