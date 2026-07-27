import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { ROUTES } from '../constants/routes';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    getWishlist().then(data => {
      setWishlist(data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item.product?.id !== productId && item.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-10 tracking-wider uppercase text-center">My Wishlist</h1>
        
        {loading ? (
          <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]"></div></div>
        ) : wishlist.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20">
            <p className="text-xl text-[#a89880] mb-6 font-['Cormorant_Garamond'] italic">Your wishlist is empty.</p>
            <a href={ROUTES.SHOP} className="inline-block border border-[#c9a96e] text-[#c9a96e] px-8 py-3 uppercase tracking-widest text-sm hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300">Discover Fragrances</a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((item, i) => {
              const product = item.product || item;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={product.id} 
                  className="group relative"
                >
                  <div className="aspect-[3/4] bg-[#1a1a1a] mb-4 overflow-hidden relative">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#a89880] font-['Cormorant_Garamond'] italic">No Image</div>
                    )}
                    <button 
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-3 right-3 text-[#c9a96e] hover:text-red-500 transition-colors z-10"
                      title="Remove from wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-lg font-['Cormorant_Garamond'] tracking-wide">{product.name}</h3>
                  <p className="text-[#c9a96e] mb-4">${product.price?.toFixed(2)}</p>
                  <button className="w-full border border-[#333] py-2 text-sm uppercase tracking-widest text-[#a89880] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                    Add to Cart
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Wishlist;
