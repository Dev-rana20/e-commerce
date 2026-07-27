import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Global Layout Components
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import CartDrawer from './components/CartDrawer';
import NewsletterPopup from './components/NewsletterPopup';
import GlobalCursor from './components/GlobalCursor';

// Route Guards
import ProtectedRoute from './layouts/ProtectedRoute';
import AdminRoute from './layouts/AdminRoute';

// --- Customer Pages ---
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Story from './pages/Story';
import FoundersMessage from './pages/FoundersMessage';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import Policy from './pages/Policy';
import RawMaterials from './pages/RawMaterials';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

// --- Admin Pages ---
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

// Intro Splash Screen
const IntroScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center text-center bg-brand-softwhite"
    >
      <div className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(88, 24, 31, 0.2) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center">
        <motion.img
          src="/Kelys_Logo_Png.png"
          alt="KELÝS Logo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-48 sm:w-64 mb-4 object-contain"
        />
        <div className="h-[1px] bg-brand-burgundy/25 w-16 mb-4" />
        <span className="font-sans-inter text-[9px] tracking-[0.45em] uppercase text-brand-burgundy font-semibold">
          MAISON DE FRAGRANCE
        </span>
      </div>
    </motion.div>
  );
};

// Standard layout wrapper (header + main + footer)
const GlobalLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-brand-softwhite">
      <GlobalHeader />
      <main className="flex-grow">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
};

// Admin layout wrapper (no newsletter, no cursor, minimal chrome)
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {children}
    </div>
  );
};

// Smart gate: logged-in users go to /profile, guests see Login
const AccountGate = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]" />
    </div>
  );
  return isAuthenticated ? <Navigate to="/profile" replace /> : <Login />;
};

function AppContent() {
  const [showIntro, setShowIntro] = useState(() => {
    const played = sessionStorage.getItem('kelys_intro_played');
    return !played;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('kelys_intro_played', 'true');
    setShowIntro(false);
  };

  return (
    <>
      {/* Session-based Intro Splash */}
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Cinematic noise texture overlay */}
      <div className="noise-overlay" />

      {/* Custom Perfume Bottle Cursor */}
      <GlobalCursor />

      {/* Newsletter Popup modal on load */}
      <NewsletterPopup />

      {/* Global Shopping Cart Slide-out Drawer */}
      <CartDrawer />

      <Routes>
        {/* ===== Public Routes ===== */}
        <Route path="/" element={<GlobalLayout><Home /></GlobalLayout>} />
        <Route path="/shop" element={<GlobalLayout><Collection /></GlobalLayout>} />
        <Route path="/shop/:category" element={<GlobalLayout><Collection /></GlobalLayout>} />
        <Route path="/product/:productId" element={<GlobalLayout><ProductDetail /></GlobalLayout>} />

        {/* Brand Editorial Pages */}
        <Route path="/brand/story" element={<GlobalLayout><Story /></GlobalLayout>} />
        <Route path="/brand/founders-message" element={<GlobalLayout><FoundersMessage /></GlobalLayout>} />
        <Route path="/brand/archive" element={<GlobalLayout><Archive /></GlobalLayout>} />
        <Route path="/brand/materials" element={<GlobalLayout><RawMaterials /></GlobalLayout>} />

        {/* Support Pages */}
        <Route path="/contact" element={<GlobalLayout><Contact /></GlobalLayout>} />
        <Route path="/faq" element={<GlobalLayout><FAQ /></GlobalLayout>} />
        <Route path="/policies" element={<GlobalLayout><Policy /></GlobalLayout>} />
        <Route path="/search" element={<GlobalLayout><Search /></GlobalLayout>} />

        {/* Auth Pages — /account smartly routes: profile if logged in, login if guest */}
        <Route path="/account" element={<GlobalLayout><AccountGate /></GlobalLayout>} />
        <Route path="/register" element={<GlobalLayout><Register /></GlobalLayout>} />

        {/* Cart (public, so users can browse) */}
        <Route path="/cart" element={<GlobalLayout><Cart /></GlobalLayout>} />

        {/* ===== Protected Customer Routes ===== */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <GlobalLayout><Checkout /></GlobalLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <GlobalLayout><Profile /></GlobalLayout>
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <GlobalLayout><OrderHistory /></GlobalLayout>
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <GlobalLayout><Wishlist /></GlobalLayout>
          </ProtectedRoute>
        } />

        {/* ===== Admin Routes (Admin role only) ===== */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminLayout><AdminProducts /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminLayout><AdminOrders /></AdminLayout>
          </AdminRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
