import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminLayout from './pages/Admin';
import About from './pages/About';
import Locate from './pages/Locate';
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './pages/FAQ';
import Care from './pages/Care';
import Terms from './pages/Terms';

// Simple placeholders for other footer links
const Shipping = () => <div className="py-20 text-center text-2xl font-serif">Shipping & Returns Page Coming Soon</div>;
const Careers = () => <div className="py-20 text-center text-2xl font-serif">Careers Page Coming Soon</div>;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - Isolated Layout */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Store Routes - Wrapped in Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/locate" element={<Locate />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/care" element={<Care />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/careers" element={<Careers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
