import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const { addToCart } = useCart();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rY = ((x - centerX) / centerX) * 8;
    const rX = -((y - centerY) / centerY) * 8;
    setRotX(rX);
    setRotY(rY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d'
      }}
      className="luxury-glass rounded-none p-6 flex flex-col justify-between group cursor-pointer relative hover:shadow-xl hover:shadow-brand-burgundy/10 transition-shadow duration-500 product-card"
    >
      <div>
        {/* Image Display */}
        <div className="relative aspect-square overflow-hidden mb-6 border border-brand-burgundy/15 bg-brand-beige/60">
          <div className="absolute inset-2 border border-brand-burgundy/10 pointer-events-none group-hover:border-brand-burgundy/30 transition-colors duration-500" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Action overlay */}
          <div className="absolute inset-0 bg-brand-beige/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Link
              to={`/product/${product.id}`}
              className="p-3 bg-brand-softwhite border border-brand-burgundy/40 rounded-full hover:border-brand-burgundy transition-all duration-300 text-brand-burgundy hover:scale-110 shadow-sm"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={() => addToCart(product, 1, product.sizes[0])}
              className="p-3 bg-brand-burgundy rounded-full text-brand-softwhite hover:bg-brand-charcoal transition-all duration-300 hover:scale-110 shadow-sm cursor-none"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-serif-cormorant text-2xl tracking-wider text-brand-charcoal group-hover:text-brand-burgundy transition-colors duration-300">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="text-brand-burgundy font-sans-inter text-sm tracking-wide font-bold">
            ${product.price}
          </span>
        </div>

        <div className="flex justify-between text-[10px] tracking-widest uppercase text-brand-charcoal/40 mb-4 font-sans-inter">
          <span>{product.concentration}</span>
          <span>{product.volume}</span>
        </div>

        <p className="text-brand-charcoal/55 font-sans-inter text-xs font-light leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Notes breakdown */}
        {product.notes && (
          <div className="border-t border-brand-burgundy/10 pt-4 space-y-2 text-left">
            <div className="grid grid-cols-4 gap-2">
              <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Top</span>
              <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{product.notes.top}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Heart</span>
              <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{product.notes.heart}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Base</span>
              <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{product.notes.base}</span>
            </div>
          </div>
        )}
      </div>

      <Link
        to={`/product/${product.id}`}
        className="mt-8 w-full py-3 block text-center bg-transparent border border-brand-charcoal/15 text-brand-charcoal/70 group-hover:text-brand-burgundy group-hover:border-brand-burgundy/50 text-[10px] font-sans-inter tracking-[0.25em] uppercase hover:bg-brand-burgundy/5 transition-all duration-300"
      >
        Discover Scent
      </Link>
    </motion.div>
  );
};

const CollectionSection = () => {
  const fragrances = products.filter((p) => p.id !== 'discovery-box');
  const discoveryBox = products.find((p) => p.id === 'discovery-box');

  return (
    <section id="collection" className="relative py-24 sm:py-32 bg-brand-beige overflow-hidden border-t border-brand-burgundy/10">
      {/* Soft ambient glow */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(88,24,31,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="text-brand-burgundy tracking-[0.45em] text-xs font-semibold uppercase block mb-4 font-sans-inter animate-pulse-slow">
            THE SIGNATURE COLLECTION
          </span>
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-light text-brand-charcoal tracking-wide mb-6">
            Olfactory Masterpieces
          </h2>
          <p className="text-brand-charcoal/55 font-sans-inter font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            A lineup of exceptional creations formulated with pure, highly concentrated oils for unparalleled longevity and character.
          </p>
        </div>

        {/* Featured Flagship: Discovery Box */}
        {discoveryBox && (
          <div className="mb-20 max-w-4xl mx-auto border border-brand-burgundy/15 luxury-glass p-8 sm:p-12 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-square bg-brand-beige/40 p-4 border border-brand-burgundy/10 flex items-center justify-center">
              <img
                src={discoveryBox.image}
                alt={discoveryBox.name}
                className="max-h-[90%] max-w-[90%] object-contain"
              />
            </div>
            
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-brand-burgundy font-sans-inter text-[10px] tracking-[0.3em] font-semibold uppercase block mb-1">
                  FLAGSHIP LAUNCH PREVIEW
                </span>
                <h3 className="font-serif-cormorant text-3xl sm:text-4xl text-brand-charcoal font-light tracking-wide">
                  {discoveryBox.name}
                </h3>
                <span className="text-brand-burgundy font-sans-inter text-lg font-bold block mt-1">
                  ${discoveryBox.price}
                </span>
              </div>
              
              <p className="text-brand-charcoal/60 font-sans-inter text-xs sm:text-sm font-light leading-relaxed">
                {discoveryBox.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to={`/product/${discoveryBox.id}`}
                  className="px-6 py-3.5 bg-brand-burgundy text-brand-softwhite text-xs tracking-widest text-center uppercase font-semibold hover:bg-brand-charcoal transition-colors duration-300 cursor-none"
                >
                  Explore Discovery Set
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid: 4 Fragrances */}
        <div>
          <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-charcoal tracking-wide mb-12 font-light">
            Individual Eau de Parfums
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {fragrances.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CollectionSection;
