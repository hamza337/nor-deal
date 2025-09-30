import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

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
  
  // Category data structure with subcategories
  const categories = [
    {
      name: 'Home',
      images: ['/banner1.jpg', '/banner2.png', '/banner3.png', '/banner4.png'],
      subcategories: [
        { 
          name: 'Furniture', 
          image: 'https://img.freepik.com/free-photo/armchair-green-living-room-with-copy-space_43614-910.jpg',
          subItems: ['Sofas & Couches', 'Chairs & Recliners', 'Tables & Desks', 'Beds & Mattresses', 'Storage & Organization', 'Outdoor Furniture']
        },
        { 
          name: 'Decor', 
          image: 'https://img.freepik.com/free-photo/living-room-with-blue-sofa-gold-pouf_123827-22242.jpg',
          subItems: ['Wall Art & Mirrors', 'Lighting & Lamps', 'Rugs & Carpets', 'Curtains & Blinds', 'Vases & Planters', 'Candles & Fragrances']
        },
        { 
          name: 'Bedding', 
          image: 'https://img.freepik.com/free-photo/home-bedroom-sleep-peace-morning-word_53876-124471.jpg',
          subItems: ['Bed Sheets & Sets', 'Comforters & Duvets', 'Pillows & Cases', 'Blankets & Throws', 'Mattress Protectors', 'Bedroom Accessories']
        },
        { 
          name: 'Kitchen', 
          image: 'https://img.freepik.com/free-photo/kitchen-interior_1048-4553.jpg',
          subItems: ['Cookware & Bakeware', 'Kitchen Appliances', 'Dinnerware & Glassware', 'Kitchen Tools & Gadgets', 'Storage & Organization', 'Kitchen Textiles']
        }
      ]
    },
    {
      name: 'SPA Days',
      subcategories: [
        { name: 'Massage', image: 'https://img.freepik.com/free-photo/woman-having-massage-spa_23-2149080245.jpg' },
        { name: 'Facial', image: 'https://img.freepik.com/free-photo/beautiful-woman-getting-facial-treatment-spa_23-2148857897.jpg' },
        { name: 'Body Treatments', image: 'https://img.freepik.com/free-photo/woman-relaxing-spa_144627-16252.jpg' },
        { name: 'Wellness Packages', image: 'https://img.freepik.com/free-photo/woman-relaxing-spa-salon_1098-559.jpg' }
      ]
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Smartphones', image: 'https://img.freepik.com/free-photo/smartphone-balancing-with-blue-background_23-2150271746.jpg' },
        { name: 'Laptops', image: 'https://img.freepik.com/free-photo/laptop-wooden-table_144627-39224.jpg' },
        { name: 'Audio', image: 'https://img.freepik.com/free-photo/wireless-earphones-with-charging-case_1268-17650.jpg' },
        { name: 'Accessories', image: 'https://img.freepik.com/free-photo/electronic-devices-balancing-concept_23-2150422322.jpg' }
      ]
    },
    {
      name: 'Beauty Products',
      subcategories: [
        { name: 'Skincare', image: 'https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg' },
        { name: 'Makeup', image: 'https://img.freepik.com/free-photo/makeup-brushes-eyeshadow-palette-blush-powder-white-background_23-2148114513.jpg' },
        { name: 'Haircare', image: 'https://img.freepik.com/free-photo/hair-care-products-arrangement-flat-lay_23-2149096051.jpg' },
        { name: 'Fragrances', image: 'https://img.freepik.com/free-photo/perfume-bottles-with-flowers-white-background_23-2150461805.jpg' }
      ]
    },
    {
      name: 'Fitness & Outdoors',
      subcategories: [
        { name: 'Exercise Equipment', image: 'https://img.freepik.com/free-photo/weights-exercise-weightlifting-workout-concept_53876-138789.jpg' },
        { name: 'Sportswear', image: 'https://img.freepik.com/free-photo/sport-clothes-sport-shoes_1203-7549.jpg' },
        { name: 'Outdoor Gear', image: 'https://img.freepik.com/free-photo/camping-equipment-sunset-background_53876-138016.jpg' },
        { name: 'Supplements', image: 'https://img.freepik.com/free-photo/sport-supplements-composition-with-diet-concept_23-2147915398.jpg' }
      ]
    },
    {
      name: 'Restaurants',
      subcategories: [
        { name: 'Fine Dining', image: 'https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg' },
        { name: 'Casual Dining', image: 'https://img.freepik.com/free-photo/restaurant-hall-with-tables-decorated-modern-style_1262-3034.jpg' },
        { name: 'Cafes', image: 'https://img.freepik.com/free-photo/cafe-shop-exterior-nobody-empty_1268-19736.jpg' },
        { name: 'Fast Food', image: 'https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg' }
      ]
    },
    {
      name: 'Watches',
      subcategories: [
        { name: 'Luxury', image: 'https://img.freepik.com/free-photo/luxury-watch-isolated-white-background-with-clipping-path_93675-130455.jpg' },
        { name: 'Smart Watches', image: 'https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-96809.jpg' },
        { name: 'Sports', image: 'https://img.freepik.com/free-photo/modern-smartwatch-with-fitness-tracker-dark-background_169016-15558.jpg' },
        { name: 'Classic', image: 'https://img.freepik.com/free-photo/watch-gold-number-luxury-graphic_1203-5384.jpg' }
      ]
    },
    {
      name: 'Jewellery',
      subcategories: [
        { name: 'Necklaces', image: 'https://img.freepik.com/free-photo/beautiful-gold-necklace-white-background_93675-130311.jpg' },
        { name: 'Rings', image: 'https://img.freepik.com/free-photo/beautiful-gold-ring-isolated-white-background_93675-130311.jpg' },
        { name: 'Earrings', image: 'https://img.freepik.com/free-photo/beautiful-gold-earrings-isolated-white-background_93675-130311.jpg' },
        { name: 'Bracelets', image: 'https://img.freepik.com/free-photo/beautiful-gold-bracelet-isolated-white-background_93675-130311.jpg' }
      ]
    },
    {
      name: 'Mens Wear',
      subcategories: [
        { name: 'Suits', image: 'https://img.freepik.com/free-photo/handsome-man-wearing-suit_23-2149400097.jpg' },
        { name: 'Casual', image: 'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4909.jpg' },
        { name: 'Activewear', image: 'https://img.freepik.com/free-photo/muscular-man-doing-exercises-with-dumbbells-gym_1303-20718.jpg' },
        { name: 'Accessories', image: 'https://img.freepik.com/free-photo/men-accessories-set_1303-9129.jpg' }
      ]
    },
    {
      name: 'Fashion',
      subcategories: [
        { name: 'Women', image: 'https://img.freepik.com/free-photo/portrait-young-stylish-girl-model-casual-summer-clothes-with-natural-makeup-sunglasses_158538-8585.jpg' },
        { name: 'Men', image: 'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-jeans-clothes-fashion-man_158538-5025.jpg' },
        { name: 'Kids', image: 'https://img.freepik.com/free-photo/full-shot-kids-posing-together_23-2149853383.jpg' },
        { name: 'Accessories', image: 'https://img.freepik.com/free-photo/women-s-accessories-pink-background-flat-lay-copyspace_169016-3789.jpg' }
      ]
    },
    { name: 'Mystery Deals', subcategories: [] }
  ];
  
  // Add a small delay to prevent menu from closing immediately when moving from category to mega menu
  let hoverTimeout = null;
  
  const handleCategoryHover = (index) => {
    clearTimeout(hoverTimeout);
    // Only show hover menu if no category is selected (not in breadcrumb mode)
    if (!selectedCategory) {
      setActiveCategory(index);
      setActiveSubcategory(null); // Reset subcategory when hovering a new category
      setIsMenuOpen(true);
    }
  };
  
  const handleCategoryClick = (index) => {
    clearTimeout(hoverTimeout);
    const clickedCategory = categories[index];
    
    // Set the selected category and update breadcrumb
    setSelectedCategory(clickedCategory);
    const categoryDisplayName = clickedCategory.name === 'Home' ? 'Home Deals' : clickedCategory.name;
    setBreadcrumb([{ name: 'Home', path: '/' }, { name: categoryDisplayName, path: null }]);
    
    // Reset other states
    setActiveCategory(null);
    setActiveSubcategory(null);
    setIsMenuOpen(true);
  };
  
  const handleSubcategoryHover = (index) => {
    setActiveSubcategory(index);
  };
  
  const handleSubcategoryMouseLeave = () => {
    // Don't reset immediately to allow smooth transitions - let the third layer handle its own mouse leave
  };
  
  const handleMouseLeave = () => {
    // Small delay before closing to allow smooth transition between elements
    // Don't close menu if a category is selected (breadcrumb mode)
    if (!selectedCategory) {
      hoverTimeout = setTimeout(() => {
        setIsMenuOpen(false);
        setActiveSubcategory(null);
      }, 100);
    } else {
      // In breadcrumb mode, only reset subcategory
      hoverTimeout = setTimeout(() => {
        setActiveSubcategory(null);
      }, 100);
    }
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
    setBreadcrumb([]);
    setActiveCategory(null);
    setActiveSubcategory(null);
  };
  
  // Handle clicking outside to close the menu
  const handleClickOutside = (e) => {
    if (isMenuOpen && !e.target.closest('.mega-menu-container') && !e.target.closest('.category-item')) {
      if (selectedCategory) {
        // In breadcrumb mode, go back to main menu
        handleBackToMain();
      } else {
        // Normal mode, just close menu
        setIsMenuOpen(false);
        setActiveSubcategory(null);
      }
    }
  };
  
  // Add event listener for clicks outside
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* First Section - Hero Section with Sidebar */}
      <div className="mx-8 mb-8 pt-8">
        <div className="flex h-125 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Sidebar Navigation with Mega Menu */}
          <div className="relative w-64 bg-white border-r border-gray-200 h-full">
            <div className="p-4">
              {/* Conditional rendering based on selectedCategory */}
              {!selectedCategory ? (
                /* Default state - Show Sort by Department */
                <>
                  <div className="flex items-center space-x-2 text-teal-600 font-medium mb-6">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span>Sort by Department</span>
                  </div>
                  <nav className="space-y-1" onMouseLeave={handleMouseLeave}>
                    {categories.map((category, index) => (
                      <div 
                        key={index} 
                        className={`category-item flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 cursor-pointer group transition-all duration-200 ${activeCategory === index && isMenuOpen ? 'bg-gray-50 text-teal-600 border-l-4 border-teal-500 pl-2' : 'border-l-4 border-transparent'}`}
                        onMouseEnter={() => handleCategoryHover(index)}
                        onClick={() => handleCategoryClick(index)}
                      >
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-200 ${activeCategory === index && isMenuOpen ? 'bg-teal-500' : 'bg-gray-300'}`}></span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${activeCategory === index && isMenuOpen ? 'text-teal-500 transform rotate-90' : 'text-gray-400'} group-hover:text-teal-500`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </nav>
                </>
              ) : (
                /* Selected category state - Show breadcrumb and subcategories */
                <>
                  {/* Breadcrumb Navigation */}
                  {breadcrumb.length > 0 && (
                    <div className="mb-6">
                      <nav className="flex items-center space-x-2 text-sm">
                        {breadcrumb.map((crumb, index) => (
                          <div key={index} className="flex items-center">
                            {index > 0 && (
                              <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                            <button 
                              onClick={index === 0 ? handleBackToMain : undefined}
                              className={`${index === breadcrumb.length - 1 ? 'text-gray-900 font-medium' : 'text-teal-600 hover:text-teal-800'} transition-colors duration-200`}
                            >
                              {crumb.name}
                            </button>
                          </div>
                        ))}
                      </nav>
                    </div>
                  )}
                  
                  {/* Selected Category Subcategories */}
                  <nav className="space-y-1" onMouseLeave={handleMouseLeave}>
                    {selectedCategory.subcategories.map((subcategory, idx) => (
                      <div 
                        key={idx} 
                        className={`subcategory-item flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 cursor-pointer group transition-all duration-200 ${activeSubcategory === idx ? 'bg-gray-50 text-teal-600 border-l-4 border-teal-500 pl-2' : 'border-l-4 border-transparent'}`}
                        onMouseEnter={() => handleSubcategoryHover(idx)}
                        onClick={() => navigate('/deals')}
                      >
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-200 ${activeSubcategory === idx ? 'bg-teal-500' : 'bg-gray-300'}`}></span>
                          <span className="text-sm font-medium">{subcategory.name}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${activeSubcategory === idx ? 'text-teal-500 transform rotate-90' : 'text-gray-400'} group-hover:text-teal-500`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        
                        {/* Show sub-items drawer when hovered */}
                        {activeSubcategory === idx && subcategory.subItems && (
                          <div 
                            className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 w-[800px] min-h-[400px] overflow-y-auto"
                            onMouseEnter={() => handleSubcategoryHover(idx)}
                            onMouseLeave={handleSubcategoryMouseLeave}
                          >
                            <div className="flex h-full">
                              {/* Left side - Subcategory items */}
                              <div className="w-1/2 py-4">
                                {subcategory.subItems.map((item, itemIdx) => (
                                  <Link 
                                    key={itemIdx}
                                    to="/deals" 
                                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                  >
                                    <span className="font-medium">{item}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {Math.floor(Math.random() * 100) + 10}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              
                              {/* Right side - Featured images in 2x2 grid */}
                               <div className="w-1/2 p-4">
                                 <div className="grid grid-cols-2 gap-3">
                                   <div className="relative group cursor-pointer">
                                     <img 
                                       src={subcategory.image} 
                                       alt={subcategory.name}
                                       className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-200"
                                     />
                                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all duration-200"></div>
                                  </div>
                                  <div className="relative group cursor-pointer">
                                     <img 
                                       src="/banner2.png" 
                                       alt="Featured"
                                       className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-200"
                                     />
                                     <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all duration-200"></div>
                                   </div>
                                   <div className="relative group cursor-pointer">
                                     <img 
                                       src="/banner3.png" 
                                       alt="Featured"
                                       className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-200"
                                     />
                                     <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all duration-200"></div>
                                   </div>
                                   <div className="relative group cursor-pointer">
                                     <img 
                                       src="/banner4.png" 
                                       alt="Featured"
                                       className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-200"
                                     />
                                     <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all duration-200"></div>
                                   </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </>
              )}
            </div>
          </div>



          {/* Mega Menu Content */}
          <div 
            className={`mega-menu-container absolute z-10 bg-white shadow-lg rounded-r-lg overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ 
              width: 'calc(100vw - 280px)', 
              height: '500px',
              top: '180px',
              left: '290px'
            }}
            onMouseEnter={() => clearTimeout(hoverTimeout)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Content Area */}
            {selectedCategory ? (
              /* Show only featured images when category is selected */
              <div className="p-6 h-full overflow-y-auto">
                <div className="grid grid-cols-2 gap-6 h-full">
                  {selectedCategory.images?.slice(0, 4).map((image, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        <img 
                          src={image} 
                          alt={`${selectedCategory.name} ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
                              Explore Collection
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
              /* Show main categories when no category is selected */
              activeCategory !== null && categories[activeCategory].subcategories.length > 0 && (
                <div className="flex h-full">
                {/* Subcategories Column */}
                <div className={`bg-gray-50 p-4 h-full overflow-y-auto transition-all duration-300 ${activeSubcategory !== null ? 'w-1/5' : 'w-1/4'}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{categories[activeCategory].name} Categories</h3>
                  <ul className="space-y-1">
                    {categories[activeCategory].subcategories.map((subcategory, idx) => (
                      <li 
                        key={idx} 
                        className={`subcategory-item py-2 px-3 rounded-md cursor-pointer transition-colors duration-200 ${activeSubcategory === idx ? 'bg-teal-50 text-teal-600' : 'hover:bg-teal-50'}`}
                        onMouseEnter={() => handleSubcategoryHover(idx)}
                        onMouseLeave={handleSubcategoryMouseLeave}
                      >
                        <Link to="/deals" className="flex items-center justify-between text-gray-700 hover:text-teal-600 transition-colors duration-200">
                          <span className="font-medium">{subcategory.name}</span>
                          <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${activeSubcategory === idx ? 'transform rotate-90 text-teal-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Third Layer - Subcategory Details - Only show when subcategory is hovered */}
                {activeSubcategory !== null && (
                  <div 
                    className="w-1/4 p-4 h-full overflow-y-auto border-l border-gray-100 transition-all duration-300"
                    onMouseEnter={() => clearTimeout(hoverTimeout)}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        setActiveSubcategory(null);
                      }, 100);
                    }}
                  >
                    <h3 className="text-lg font-semibold text-teal-600 mb-3">{categories[activeCategory].subcategories[activeSubcategory].name}</h3>
                    <ul className="space-y-1">
                      {/* Assuming each subcategory has a subItems array */}
                      {categories[activeCategory].subcategories[activeSubcategory].subItems?.map((item, i) => (
                        <li key={i} className="py-1 px-2 hover:bg-gray-50 rounded">
                          <Link to="/deals" className="text-gray-600 hover:text-teal-600 text-sm flex items-center">
                            <span className="mr-1">•</span> {item}
                          </Link>
                        </li>
                      )) || (
                        <li className="text-gray-500 text-sm italic">No additional categories</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {/* Featured Images Grid - Shrinks when subcategory is active */}
                <div className={`p-4 h-full overflow-y-auto transition-all duration-300 ${activeSubcategory !== null ? 'w-1/2' : 'w-2/3'}`}>
                  <div className="grid grid-cols-2 gap-3">
                    {categories[activeCategory].subcategories.map((subcategory, idx) => (
                      <div key={idx} className={`group relative overflow-hidden rounded-lg transition-opacity duration-300 ${activeSubcategory !== null && activeSubcategory !== idx ? 'opacity-50' : 'opacity-100'}`}>
                        <img 
                          src={subcategory.image} 
                          alt={subcategory.name} 
                          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${activeSubcategory !== null ? 'h-24' : 'h-36'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="w-full p-3">
                            <span className={`text-white font-medium block ${activeSubcategory !== null ? 'text-sm' : 'text-base'}`}>{subcategory.name}</span>
                            <span className="text-teal-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 block">View Products →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )
            )}
          </div>

          {/* Small Gap */}
          <div className="w-3 bg-gray-100"></div>

          {/* Hero Image Section */}
          <div className="flex-1 relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('https://img.freepik.com/free-photo/home-bedroom-sleep-peace-morning-word_53876-124471.jpg?semt=ais_hybrid&w=740&q=80')`
            }}>
            </div>
            
            
          </div>
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