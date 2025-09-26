import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Homepage from './components/Pages/Homepage';
import NewDeals from './components/Pages/NewDeals';
import ProductList from './components/Pages/ProductList';
import ProductDetail from './components/Pages/ProductDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/deals" element={<NewDeals />} />
          <Route path="/blankets" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
