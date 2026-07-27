import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-brand-charcoal"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-brand-softwhite border-l border-brand-burgundy/15 shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-burgundy/15 flex items-center justify-between">
              <div className="flex items-baseline space-x-2">
                <h3 className="font-serif-cormorant text-2xl tracking-wider text-brand-charcoal">
                  Your Cart
                </h3>
                <span className="text-brand-burgundy font-sans-inter text-xs">
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-brand-charcoal/50 hover:text-brand-burgundy transition-colors duration-300 focus:outline-none"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-brand-charcoal/40 font-sans-inter text-sm font-light">
                    Your luxury cart is empty.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/shop/perfume');
                    }}
                    className="px-6 py-3 border border-brand-burgundy/40 text-brand-burgundy text-xs tracking-widest uppercase hover:bg-brand-burgundy hover:text-brand-softwhite transition-all duration-300"
                  >
                    Shop perfumes
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex space-x-4 border-b border-brand-burgundy/10 pb-6 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 bg-brand-beige/40 border border-brand-burgundy/10 flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-cormorant text-lg text-brand-charcoal tracking-wide">
                            {item.product.name}
                          </h4>
                          <span className="text-brand-charcoal text-sm font-sans-inter">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                        <p className="text-[10px] tracking-wider text-brand-burgundy uppercase font-sans-inter mt-0.5">
                          {item.product.concentration} · {item.selectedSize}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-brand-charcoal/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                            }
                            className="p-1 px-2.5 text-brand-charcoal/60 hover:text-brand-burgundy hover:bg-brand-charcoal/5 transition-colors focus:outline-none"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-sans-inter text-brand-charcoal select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                            }
                            className="p-1 px-2.5 text-brand-charcoal/60 hover:text-brand-burgundy hover:bg-brand-charcoal/5 transition-colors focus:outline-none"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-brand-charcoal/40 hover:text-brand-burgundy transition-colors duration-300 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-burgundy/15 bg-brand-beige/10 space-y-4">
                <div className="flex justify-between items-center text-sm font-sans-inter">
                  <span className="text-brand-charcoal/60">Subtotal</span>
                  <span className="text-brand-charcoal font-semibold text-base">
                    ${cartSubtotal}
                  </span>
                </div>
                <p className="text-[10px] text-brand-charcoal/40 font-sans-inter leading-relaxed">
                  Shipping, duties, and taxes calculated at checkout.
                </p>

                <div className="space-y-2 mt-4">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 bg-brand-burgundy hover:bg-brand-charcoal text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 flex items-center justify-center space-x-2 cursor-none"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-3 bg-transparent text-brand-charcoal hover:text-brand-burgundy text-xs tracking-widest uppercase transition-all duration-300 text-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
