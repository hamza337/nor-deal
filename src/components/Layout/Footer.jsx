import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is Nordeal?",
      answer: "Nordeal is a complete online marketplace designed to make your life easier. Instead of visiting multiple platforms, you can find everything you need in one place — from shopping for everyday products and discovering the best restaurant deals, to booking spa & salon appointments and even renting services or spaces. Whether you're looking for great discounts, convenience, or a seamless booking experience, Nordeal brings it all together on a single platform."
    },
    {
      question: "How do I make a purchase or booking on Nordeal?",
      answer: "Making a purchase or booking on Nordeal is simple and straightforward. Browse through our categories, select the product or service you want, add it to your cart, and proceed to checkout with our secure payment system."
    },
    {
      question: "Can I book services like restaurants or spa appointments in advance?",
      answer: "Yes, you can book services like restaurants or spa appointments in advance through our platform. Simply select your preferred date and time, and we'll handle the rest."
    },
    {
      question: "What payment methods does Nordeal accept?",
      answer: "Nordeal accepts various payment methods including credit cards, debit cards, PayPal, Apple Pay, and other secure payment options to ensure a convenient shopping experience."
    },
    {
      question: "How do I track my orders or bookings?",
      answer: "You can easily track your orders and bookings through your Nordeal account dashboard. We'll also send you email updates with tracking information and booking confirmations."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <footer className="text-white">
      {/* FAQ Section */}
      <div className="bg-gray-50 pt-16 pb-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Valuable assistance to the community and particularly to the clients we serve, community and particularly to the clients we serve.
            </p>
          </div>
          
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Subscription Section - Overlapping Design */}
      <div className="relative -mt-32 -mb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">Ready to Get Our New Stuff?</h3>
                <p className="text-gray-300">Be aware of all discounts and bargains. Don't miss your benefit!</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-orange-500 w-full sm:w-80"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto">
                  Subscribe
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center md:text-right">
              By subscribing you agree to our{' '}
              <Link to="/privacy" className="text-orange-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="pt-38 pb-12" style={{backgroundColor: '#2D2D2D'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="NorDeal Logo" className="w-8 h-8" />
                <span className="text-xl font-bold">
                  <span className="text-white">NOR</span>
                  <span className="text-blue-500">DEAL</span>
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Nordeal is a complete online marketplace where you can shop products, grab restaurant deals, book spa and salon services, and even access rental options — all in one platform.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">𝕏</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">📷</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">📘</span>
                  </a>
                </div>
              </div>
              <div>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm block mb-2">
                  About Us
                </Link>
                <Link to="/faqs" className="text-gray-300 hover:text-white text-sm block">
                  FAQs
                </Link>
              </div>
            </div>

            {/* Deals */}
            <div>
              <h4 className="font-semibold mb-4">Deals</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/spa-deals" className="text-gray-300 hover:text-white transition-colors">SPA Deal</Link></li>
                <li><Link to="/restaurants" className="text-gray-300 hover:text-white transition-colors">Restaurants</Link></li>
                <li><Link to="/shopping" className="text-gray-300 hover:text-white transition-colors">Shopping</Link></li>
                <li><Link to="/beauty" className="text-gray-300 hover:text-white transition-colors">Beauty</Link></li>
                <li><Link to="/fitness" className="text-gray-300 hover:text-white transition-colors">Fitness</Link></li>
                <li><Link to="/watches" className="text-gray-300 hover:text-white transition-colors">Watches</Link></li>
                <li><Link to="/jewellery" className="text-gray-300 hover:text-white transition-colors">Jewellery</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Need Help?</Link></li>
                <li><Link to="/order-tracking" className="text-gray-300 hover:text-white transition-colors">Order Tracking</Link></li>
                <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</Link></li>
                <li><Link to="/shipping-info" className="text-gray-300 hover:text-white transition-colors">Shipping Information</Link></li>
                <li><Link to="/complaints" className="text-gray-300 hover:text-white transition-colors">Complaints</Link></li>
                <li><Link to="/product-recalls" className="text-gray-300 hover:text-white transition-colors">Product Recalls</Link></li>
                <li><Link to="/shipping-info" className="text-gray-300 hover:text-white transition-colors">Shipping Information</Link></li>
              </ul>
            </div>

            {/* Head Office Info */}
            <div>
              <h4 className="font-semibold mb-4">Head Office Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">📍</span>
                  <span className="text-gray-300">123 Oak Street, NorDeal, WH 45678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">📞</span>
                  <span className="text-gray-300">(123) 456 - 7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">✉️</span>
                  <span className="text-gray-300">nordeal@gmail.com</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Payment Method</h4>
                <div className="flex flex-wrap gap-2">
                  <img src="/shopping.png" alt="Mastercard" className="h-8" />
                  <img src="/visa.png" alt="Visa" className="h-8" />
                  <img src="/paypal.png" alt="PayPal" className="h-8" />
                  <img src="/apple-pay.png" alt="Apple Pay" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4" style={{backgroundColor: '#2D2D2D'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center md:text-left flex-1 md:text-center">
              Copyright © 2025 nordeal.no | All Rights Reserved
            </p>
            <button className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 transition-colors" style={{padding: '8px 15px', borderRadius: '20px'}}>
              <span className="text-white">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;