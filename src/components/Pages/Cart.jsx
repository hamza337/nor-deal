import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      quantity: 1,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    },
    {
      id: 2,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      quantity: 2,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    },
    {
      id: 3,
      name: 'Electric Blue Blanket',
      size: 'King Size',
      price: 1699,
      quantity: 1,
      image: 'https://www.bigw.com.au/medias/sys_master/images/images/ha9/h89/48637351526430.jpg'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id, action) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Free shipping
  const taxes = 0; // No taxes
  const discount = 10.00; // Example discount
  const total = subtotal - discount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {/* Header */}
          <div className="bg-teal-600 text-white rounded-t-lg p-4 grid grid-cols-12 gap-4 hidden md:grid">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>
          
          {/* Cart Items */}
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 border-b border-gray-200 grid grid-cols-12 gap-4 items-center">
              {/* Remove Button (Mobile) */}
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="md:hidden absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
              
              {/* Product Image & Info */}
              <div className="col-span-12 md:col-span-6 flex items-center space-x-4">
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="hidden md:block text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
                <div className="bg-pink-100 rounded-lg p-2 w-20 h-20 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.size}</p>
                </div>
              </div>
              
              {/* Price */}
              <div className="col-span-4 md:col-span-2 text-center">
                <div className="md:hidden text-sm text-gray-500">Price:</div>
                <span className='text-gray-700'>{item.price} Kr</span>
              </div>
              
              {/* Quantity */}
              <div className="col-span-4 md:col-span-2">
                <div className="md:hidden text-sm text-gray-500">Quantity:</div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    className=" text-black w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="mx-2 w-8 text-center text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                    className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Subtotal */}
              <div className="col-span-4 md:col-span-2 text-center">
                <div className="md:hidden text-sm text-gray-500">Subtotal:</div>
                <span className="font-semibold text-gray-700">{item.price * item.quantity} Kr</span>
              </div>
            </div>
          ))}
          
          {/* Coupon & Clear Cart */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Apply Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button 
              className="bg-[#009CA8] text-white px-6 py-3 rounded-lg font-medium hover:cursor-pointer transition-colors"
            >
              Apply Coupon
            </button>
            <button 
              onClick={() => setCartItems([])} 
              className="text-red-500 hover:text-red-700 px-6 py-3 border border-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-700">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className='text-gray-700'>Items</span>
                <span className='text-gray-700'>{cartItems.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className='text-gray-700'>Sub Total</span>
                <span className='text-gray-700'>{subtotal} Kr</span>
              </div>
              
              <div className="flex justify-between">
                <span className='text-gray-700'>Shipping</span>
                <span className='text-gray-700'>{shipping === 0 ? 'Free' : `${shipping} Kr`}</span>
              </div>
              
              <div className="flex justify-between">
                <span className='text-gray-700'>Taxes</span>
                <span className='text-gray-700'>{taxes} Kr</span>
              </div>
              
              <div className="flex justify-between text-red-500">
                <span className='text-gray-700'>Coupon Discount</span>
                <span>-{discount} Kr</span>
              </div>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span className='text-gray-700'>Total</span>
                  <span className='text-gray-700'>{total} Kr</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')} 
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;