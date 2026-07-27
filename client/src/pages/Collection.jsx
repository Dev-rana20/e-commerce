import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Collection = () => {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const fragrances = products.filter(p => p.id !== 'discovery-box');
  const discoveryBox = products.find(p => p.id === 'discovery-box');

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Banner / Title */}
        <div className="border-b border-brand-burgundy/15 pb-8 mb-12">
          <span className="text-brand-burgundy font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3 animate-pulse-slow">
            KÉLYS Curation
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wider">
            All Fragrances
          </h1>
          <p className="text-brand-charcoal/50 font-sans-inter text-xs sm:text-sm font-light mt-3 max-w-2xl leading-relaxed">
            Experience our complete library of liquid memories. Built from high concentration oils using traditional formulations and finished to high-art standards.
          </p>
        </div>

        {/* Featured Discovery Box */}
        {discoveryBox && (
          <div className="mb-20 border border-brand-burgundy/15 bg-brand-softwhite shadow-xl luxury-glass p-8 sm:p-12 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-square bg-brand-beige/40 p-6 border border-brand-burgundy/10 flex items-center justify-center">
              <img
                src={discoveryBox.image}
                alt={discoveryBox.name}
                className="max-h-[90%] max-w-[90%] object-contain"
              />
            </div>
            
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-brand-burgundy font-sans-inter text-[10px] tracking-[0.3em] font-semibold uppercase block mb-1">
                  FLAGSHIP LAUNCH PRODUCT
                </span>
                <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-brand-charcoal font-light tracking-wide">
                  {discoveryBox.name}
                </h2>
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
                  className="px-8 py-4 bg-brand-burgundy text-brand-softwhite text-xs tracking-widest text-center uppercase font-semibold hover:bg-brand-charcoal transition-colors duration-300 cursor-none"
                >
                  Explore Discovery Set
                </Link>
                <button
                  onClick={() => addToCart(discoveryBox, 1, discoveryBox.sizes[0])}
                  className="px-8 py-4 bg-transparent border border-brand-burgundy/40 text-brand-burgundy text-xs tracking-widest text-center uppercase font-semibold hover:bg-brand-burgundy hover:text-brand-softwhite transition-all duration-300 cursor-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid: 4 Fragrances */}
        <div>
          <h2 className="font-serif-cormorant text-3xl text-brand-charcoal tracking-wide mb-12 font-light border-b border-brand-burgundy/10 pb-4">
            Individual Eau de Parfums
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fragrances.map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="luxury-glass p-6 flex flex-col justify-between group relative hover:shadow-xl hover:shadow-brand-burgundy/10 transition-shadow duration-500 product-card"
                onMouseEnter={() => setHoveredProduct(prod.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div>
                  {/* Image Display */}
                  <div className="relative aspect-square overflow-hidden mb-6 border border-brand-burgundy/15 bg-brand-beige/60">
                    <div className="absolute inset-2 border border-brand-burgundy/10 pointer-events-none group-hover:border-brand-burgundy/30 transition-colors duration-500" />
                    
                    <Link to={`/product/${prod.id}`}>
                      <img
                        src={hoveredProduct === prod.id ? prod.secondaryImage : prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 bg-brand-beige/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Link
                        to={`/product/${prod.id}`}
                        className="p-3 bg-brand-softwhite border border-brand-burgundy/40 rounded-full hover:border-brand-burgundy transition-all duration-300 text-brand-burgundy hover:scale-110 shadow-sm"
                        aria-label="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => addToCart(prod, 1, prod.sizes[0])}
                        className="p-3 bg-brand-burgundy rounded-full text-brand-softwhite hover:bg-brand-charcoal transition-all duration-300 hover:scale-110 shadow-sm cursor-none"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Header Meta */}
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif-cormorant text-2xl tracking-wider text-brand-charcoal group-hover:text-brand-burgundy transition-colors duration-300">
                      <Link to={`/product/${prod.id}`}>{prod.name}</Link>
                    </h3>
                    <span className="text-brand-burgundy font-sans-inter text-sm font-semibold">
                      ${prod.price}
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] tracking-widest uppercase text-brand-charcoal/40 mb-4 font-sans-inter">
                    <span>{prod.concentration}</span>
                    <span>{prod.volume}</span>
                  </div>

                  <p className="text-brand-charcoal/55 font-sans-inter text-xs font-light leading-relaxed mb-6">
                    {prod.description}
                  </p>

                  {/* Notes */}
                  {prod.notes && (
                    <div className="border-t border-brand-burgundy/10 pt-4 space-y-2 text-left">
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Top</span>
                        <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{prod.notes.top}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Heart</span>
                        <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{prod.notes.heart}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span className="text-[9px] tracking-widest text-brand-burgundy uppercase font-sans-inter col-span-1">Base</span>
                        <span className="text-[11px] text-brand-charcoal/70 font-sans-inter font-light col-span-3 truncate">{prod.notes.base}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={`/product/${prod.id}`}
                  className="mt-8 w-full py-3 block text-center bg-transparent border border-brand-charcoal/15 text-brand-charcoal/70 group-hover:text-brand-burgundy group-hover:border-brand-burgundy/50 text-[10px] font-sans-inter tracking-[0.25em] uppercase hover:bg-brand-burgundy/5 transition-all duration-300"
                >
                  Discover Scent
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Collection;
