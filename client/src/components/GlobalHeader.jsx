import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, ShoppingBag, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const GlobalHeader = () => {
  const { cartCount, setCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdown, setAccountDropdown] = useState(false);
  const accountRef = useRef(null);

  // Dropdown states for desktop
  const [shopDropdown, setShopDropdown] = useState(false);
  const [brandDropdown, setBrandDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdown(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopCategories = [
    { name: 'Shop All Fragrances', path: '/shop' },
    { name: 'Discovery Box', path: '/product/discovery-box' },
  ];

  const brandLinks = [
    { name: 'Our Story', path: '/brand/story' },
    { name: "Founder's Message", path: '/brand/founders-message' },
    { name: 'Raw Materials', path: '/brand/materials' },
    { name: 'Archive', path: '/brand/archive' },
  ];

  return (
    <>
      {/* Announcement Marquee Bar */}
      <div className="w-full bg-brand-charcoal py-2 overflow-hidden border-b border-brand-burgundy/20 relative z-[60]">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] tracking-[0.3em] font-sans-inter text-brand-beige font-semibold">
          <span className="mx-8">FREE SHIPPING OVER ₹2000</span>
          <span className="mx-8">EXPERIENCE BESPOKE LUXURY FRAGRANCES</span>
          <span className="mx-8">EAU DE PARFUMS DE FRANCE & DE L'INDE</span>
          <span className="mx-8">COMPLIMENTARY DISCOVERY VIAL WITH EVERY FULL BOTTLE</span>
          
          <span className="mx-8">FREE SHIPPING OVER ₹2000</span>
          <span className="mx-8">EXPERIENCE BESPOKE LUXURY FRAGRANCES</span>
          <span className="mx-8">EAU DE PARFUMS DE FRANCE & DE L'INDE</span>
          <span className="mx-8">COMPLIMENTARY DISCOVERY VIAL WITH EVERY FULL BOTTLE</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-0 py-3 bg-brand-softwhite/90 backdrop-blur-md border-b border-brand-burgundy/10 shadow-sm shadow-brand-charcoal/5'
            : 'top-8 py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Column: Hamburger on Mobile, Desktop links */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden hover:text-brand-burgundy transition-colors duration-300 focus:outline-none ${
                isScrolled ? 'text-brand-charcoal' : 'text-white'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              {/* HOME Link */}
              <Link
                to="/"
                className={`font-sans-inter text-xs tracking-[0.25em] uppercase hover:text-brand-burgundy transition-colors duration-300 relative py-2 ${
                  isScrolled ? 'text-brand-charcoal/80' : 'text-white'
                }`}
              >
                HOME
              </Link>

              {/* SHOP Link with Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopDropdown(true)}
                onMouseLeave={() => setShopDropdown(false)}
              >
                <button className={`flex items-center font-sans-inter text-xs tracking-[0.25em] uppercase hover:text-brand-burgundy transition-colors duration-300 py-2 ${
                  isScrolled ? 'text-brand-charcoal/80' : 'text-white'
                }`}>
                  <span>SHOP</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${shopDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {shopDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 mt-1 w-56 bg-brand-softwhite border border-brand-burgundy/10 shadow-xl py-3 flex flex-col z-50"
                    >
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => setShopDropdown(false)}
                          className="px-6 py-2.5 font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal/70 hover:bg-brand-beige/30 hover:text-brand-burgundy transition-all duration-300"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BRAND Link with Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setBrandDropdown(true)}
                onMouseLeave={() => setBrandDropdown(false)}
              >
                <button className={`flex items-center font-sans-inter text-xs tracking-[0.25em] uppercase hover:text-brand-burgundy transition-colors duration-300 py-2 ${
                  isScrolled ? 'text-brand-charcoal/80' : 'text-white'
                }`}>
                  <span>BRAND</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${brandDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {brandDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 mt-1 w-56 bg-brand-softwhite border border-brand-burgundy/10 shadow-xl py-3 flex flex-col z-50"
                    >
                      {brandLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setBrandDropdown(false)}
                          className="px-6 py-2.5 font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal/70 hover:bg-brand-beige/30 hover:text-brand-burgundy transition-all duration-300"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>

          {/* Center Column: Logo */}
          <div className="flex-1 md:flex-none text-center">
            <Link to="/" className="inline-block cursor-none">
              <img
                src="/Kelys_Logo_Png.png"
                alt="KELÝS Logo"
                className="h-10 sm:h-12 w-auto mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Column: Contact Link on Desktop, Utility Icons */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <Link
              to="/contact"
              className={`hidden md:block font-sans-inter text-xs tracking-[0.25em] uppercase hover:text-brand-burgundy transition-colors duration-300 py-2 ${
                isScrolled ? 'text-brand-charcoal/80' : 'text-white'
              }`}
            >
              CONTACT
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`hover:text-brand-burgundy transition-colors duration-300 p-1 ${
                  isScrolled ? 'text-brand-charcoal/75' : 'text-white'
                }`}
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Account Icon — auth-aware */}
              <div className="relative" ref={accountRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setAccountDropdown(!accountDropdown)}
                      className={`flex items-center gap-1.5 hover:text-brand-burgundy transition-colors duration-300 p-1 ${
                        isScrolled ? 'text-brand-charcoal/75' : 'text-white'
                      }`}
                      aria-label="Account Menu"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-[10px] font-bold font-sans-inter">
                        {user?.firstName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {accountDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-52 bg-brand-softwhite border border-brand-burgundy/10 shadow-xl py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-brand-burgundy/10">
                            <p className="text-xs font-sans-inter font-semibold text-brand-charcoal truncate">{user?.firstName} {user?.lastName}</p>
                            <p className="text-[10px] text-brand-charcoal/50 truncate">{user?.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setAccountDropdown(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase font-sans-inter text-brand-charcoal/70 hover:bg-brand-beige/30 hover:text-brand-burgundy transition-all"
                          >
                            <User className="w-3.5 h-3.5" /> My Profile
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setAccountDropdown(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase font-sans-inter text-brand-charcoal/70 hover:bg-brand-beige/30 hover:text-brand-burgundy transition-all"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> My Orders
                          </Link>
                          {user?.role === 'ADMIN' && (
                            <Link
                              to="/admin"
                              onClick={() => setAccountDropdown(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase font-sans-inter text-brand-burgundy hover:bg-brand-beige/30 transition-all font-semibold"
                            >
                              ★ Admin Panel
                            </Link>
                          )}
                          <div className="border-t border-brand-burgundy/10 mt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-xs tracking-widest uppercase font-sans-inter text-brand-charcoal/60 hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                              <LogOut className="w-3.5 h-3.5" /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to="/account"
                    className={`hover:text-brand-burgundy transition-colors duration-300 p-1 ${
                      isScrolled ? 'text-brand-charcoal/75' : 'text-white'
                    }`}
                    aria-label="Account"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                )}
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setCartOpen(true)}
                className={`hover:text-brand-burgundy transition-colors duration-300 p-1 relative ${
                  isScrolled ? 'text-brand-charcoal/75' : 'text-white'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-brand-burgundy text-brand-softwhite rounded-full flex items-center justify-center text-[9px] font-sans-inter font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Search Overlay Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-brand-softwhite border-b border-brand-burgundy/10 shadow-md overflow-hidden z-40"
            >
              <div className="max-w-3xl mx-auto px-6 py-6">
                <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-brand-charcoal/20 focus-within:border-brand-burgundy transition-colors duration-300">
                  <input
                    type="text"
                    placeholder="SEARCH FRAGRANCES, NOTES..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-3 text-xs tracking-widest text-brand-charcoal placeholder-brand-charcoal/30 outline-none uppercase font-sans-inter"
                    autoFocus
                  />
                  <button type="submit" className="p-2 text-brand-charcoal/60 hover:text-brand-burgundy transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Nav Hamburger Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[88px] z-40 bg-brand-softwhite/98 backdrop-blur-xl border-b border-brand-burgundy/10 md:hidden flex flex-col justify-between p-8"
          >
            <div className="flex flex-col space-y-6 pt-4 text-left overflow-y-auto">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal hover:text-brand-burgundy transition-colors font-bold"
              >
                HOME
              </Link>
              
              <div>
                <span className="text-[10px] tracking-widest text-brand-burgundy font-sans-inter font-semibold uppercase mb-3 block">
                  SHOP COLLECTION
                </span>
                <div className="flex flex-col space-y-3 pl-3">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif-cormorant text-xl tracking-wider text-brand-charcoal hover:text-brand-burgundy transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] tracking-widest text-brand-burgundy font-sans-inter font-semibold uppercase mb-3 block">
                  THE BRAND
                </span>
                <div className="flex flex-col space-y-3 pl-3">
                  {brandLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif-cormorant text-xl tracking-wider text-brand-charcoal hover:text-brand-burgundy transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-brand-burgundy/10 pt-4 flex flex-col space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal hover:text-brand-burgundy transition-colors"
                >
                  CONTACT
                </Link>
              </div>
            </div>

            <div className="pb-12 text-center">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 block bg-brand-burgundy text-brand-softwhite font-sans-inter text-xs tracking-[0.25em] uppercase hover:bg-brand-charcoal transition-all duration-300"
              >
                Explore Fragrances
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;
