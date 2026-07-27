import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, ArrowLeft, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0]);
      setMainImage(found.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [productId, navigate]);

  if (!product) return null;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const images = [product.image, product.secondaryImage];

  // Resolve included fragrances if rendering discovery box
  const includedProducts = product.includedFragrances
    ? products.filter((p) => product.includedFragrances.includes(p.id))
    : [];

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-xs tracking-widest text-brand-charcoal/50 hover:text-brand-burgundy transition-colors mb-8 uppercase font-sans-inter"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] w-full border border-brand-burgundy/15 bg-brand-beige/40 p-4 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-4 border border-brand-burgundy/10 pointer-events-none" />
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-24 p-2 bg-brand-beige/30 border flex items-center justify-center transition-all ${
                    mainImage === img
                      ? 'border-brand-burgundy shadow-md'
                      : 'border-brand-burgundy/10 hover:border-brand-burgundy/45'
                  }`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Buying Controls & Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-brand-burgundy font-sans-inter text-xs tracking-[0.4em] font-semibold uppercase block animate-pulse-slow">
                {product.concentration}
              </span>
              <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
                {product.name}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center space-x-2 pt-2">
                <div className="flex text-brand-burgundy">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-sans-inter tracking-wider text-brand-charcoal/50 uppercase">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-brand-burgundy/15 py-4 flex justify-between items-center">
              <span className="text-brand-charcoal font-sans-inter text-lg tracking-wider">
                Price
              </span>
              <span className="text-brand-burgundy font-sans-inter text-2xl font-bold">
                ${product.price}
              </span>
            </div>

            {/* Size/Volume selector */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-widest text-brand-charcoal/60 uppercase font-sans-inter font-bold">
                Select Size / Format:
              </span>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 font-sans-inter text-xs tracking-widest uppercase border transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-brand-burgundy bg-brand-burgundy text-brand-softwhite shadow-md'
                        : 'border-brand-burgundy/20 text-brand-charcoal/60 hover:border-brand-burgundy'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center justify-between border border-brand-burgundy/20 px-4 py-3 sm:w-36">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-brand-charcoal/50 hover:text-brand-burgundy transition-colors focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-sans-inter text-brand-charcoal font-semibold select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-brand-charcoal/50 hover:text-brand-burgundy transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-brand-burgundy hover:bg-brand-charcoal text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-brand-morning-glory/25 cursor-none"
              >
                Add to Cart
              </button>
            </div>

            <p className="text-brand-charcoal/70 font-sans-inter text-xs sm:text-sm font-light leading-relaxed">
              {product.description}
            </p>

            {/* Premium details trust badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-brand-burgundy/10 pt-6">
              <div className="flex items-center space-x-2 text-brand-charcoal/60">
                <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
                <span className="text-[10px] tracking-widest uppercase font-sans-inter">100% Authentic Scents</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-charcoal/60">
                <RefreshCw className="w-4 h-4 text-brand-burgundy" />
                <span className="text-[10px] tracking-widest uppercase font-sans-inter">Secure Checkout & Delivery</span>
              </div>
            </div>

            {/* Accordion List for Notes, Ingredients, Usage */}
            <div className="border-t border-brand-burgundy/15 space-y-2">
              {[
                product.notes && {
                  title: 'Fragrance Notes',
                  content: (
                    <div className="space-y-3 font-sans-inter text-xs font-light text-brand-charcoal/75">
                      <div className="grid grid-cols-3 border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-burgundy uppercase tracking-wider font-semibold text-[10px]">Top Notes</span>
                        <span className="col-span-2">{product.notes.top}</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-burgundy uppercase tracking-wider font-semibold text-[10px]">Heart Notes</span>
                        <span className="col-span-2">{product.notes.heart}</span>
                      </div>
                      <div className="grid grid-cols-3 pb-1">
                        <span className="text-brand-burgundy uppercase tracking-wider font-semibold text-[10px]">Base Notes</span>
                        <span className="col-span-2">{product.notes.base}</span>
                      </div>
                    </div>
                  )
                },
                {
                  title: 'Ingredients list',
                  content: (
                    <p className="font-sans-inter text-xs font-light text-brand-charcoal/75 leading-relaxed">
                      {product.ingredients}
                    </p>
                  )
                },
                {
                  title: 'How to use',
                  content: (
                    <p className="font-sans-inter text-xs font-light text-brand-charcoal/75 leading-relaxed text-justify">
                      {product.usage}
                    </p>
                  )
                }
              ].filter(Boolean).map((tab, idx) => (
                <div key={idx} className="border-b border-brand-burgundy/15">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal font-semibold">
                      {tab.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-burgundy transition-transform duration-300 ${
                        activeAccordion === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pb-4"
                      >
                        {tab.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* What's Inside Section (Discovery Box only) */}
        {includedProducts.length > 0 && (
          <div className="border-t border-brand-burgundy/15 pt-16 mb-20">
            <span className="text-brand-burgundy font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-4 text-center">
              OLFACTORY EXPERIENCES
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-brand-charcoal tracking-wide mb-12 text-center font-light">
              What's Inside the Discovery Box
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {includedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="border border-brand-burgundy/10 bg-brand-softwhite p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 product-card"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden mb-4 border border-brand-burgundy/5 bg-brand-beige/25 p-2 flex items-center justify-center">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-[90%] max-w-[90%] object-contain"
                      />
                    </div>
                    <h3 className="font-serif-cormorant text-xl text-brand-charcoal tracking-wide">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] tracking-widest text-brand-burgundy uppercase font-sans-inter mb-3">
                      {prod.concentration}
                    </p>
                    <p className="text-brand-charcoal/60 font-sans-inter text-xs font-light leading-relaxed mb-4">
                      {prod.description}
                    </p>
                  </div>
                  
                  <Link
                    to={`/product/${prod.id}`}
                    className="w-full py-2.5 block text-center border border-brand-burgundy/20 text-brand-burgundy text-[10px] font-sans-inter tracking-widest uppercase hover:bg-brand-burgundy hover:text-brand-softwhite transition-all duration-300"
                  >
                    Explore Fragrance &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-brand-burgundy/15 pt-16">
            <span className="text-brand-burgundy font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-4 text-center">
              OLFACTORY INSPIRATIONS
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-brand-charcoal tracking-wide mb-12 text-center font-light">
              You May Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/product/${prod.id}`}
                  className="luxury-glass p-5 flex flex-col justify-between group hover:shadow-md transition-shadow duration-300 product-card"
                >
                  <div className="relative aspect-square overflow-hidden mb-4 border border-brand-burgundy/10 bg-brand-beige/30 p-2 flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif-cormorant text-xl text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-brand-burgundy font-sans-inter text-xs font-semibold">
                      ${prod.price}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-widest text-brand-burgundy uppercase font-sans-inter">
                    {prod.concentration}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
