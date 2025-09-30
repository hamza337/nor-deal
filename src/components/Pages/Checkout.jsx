import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    postalCode: '',
    deliveryAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    
    // Redirect to homepage after form submission
    navigate('/');
  };

  // Sample cart items (in a real app, these would come from your cart state/context)
  const cartItems = [
    {
      id: 1,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    },
    {
      id: 2,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    },
    {
      id: 3,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    }
  ];

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 0; // Free shipping
  const taxes = 0; // No taxes
  const discount = 10.00; // Example discount
  const total = subtotal - discount;

  return (
    <div className="w-full mx-auto px-30 py-8 bg-gray-50">
      <h1 className="text-3xl text-gray-700 font-bold mb-6">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="flex items-center mb-8">
        <span className="text-orange-500 font-medium">Information</span>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-500">Shipping</span>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-500">Payment</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Information Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-teal-600 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-6">
                Please provide your contact details so we can confirm your order and ensure smooth delivery. Your information will only be used for processing this order.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email Address"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                    Country<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your Country"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your City"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                    Postal Code<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter your Postal Code"
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="deliveryAddress" className="block text-gray-700 font-medium mb-2">
                  Delivery Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter your Delivery Address"
                  className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl text-gray-700 font-bold mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-lg p-2 w-16 h-16 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full" />
                  </div>
                  <div className="flex-1 text-gray-700">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.size}</p>
                  </div>
                  <div className="font-semibold text-gray-700">{item.price} Kr</div>
                </div>
              ))}
            </div>
            
            {/* Summary Details */}
            <div className="space-y-3 border-t pt-4 text-gray-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>{subtotal} Kr</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? '00.00 Kr' : `${shipping} Kr`}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{taxes === 0 ? '00.00 Kr' : `${taxes} Kr`}</span>
              </div>
              
              <div className="flex justify-between text-red-500">
                <span>Coupon Discount</span>
                <span>-{discount} Kr</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{total} Kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;