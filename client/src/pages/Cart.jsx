import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-brand-gold/15 pb-8 mb-16">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            YOUR COLLECTION
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 border border-brand-gold/15 bg-brand-beige/5 space-y-6">
            <p className="text-brand-charcoal/45 font-sans-inter text-sm font-light">
              Your luxury cart is currently empty.
            </p>
            <Link
              to="/shop/perfume"
              className="inline-block px-8 py-4 bg-brand-charcoal hover:bg-brand-gold text-brand-softwhite text-xs tracking-widest uppercase transition-all duration-300 shadow-sm"
            >
              Explore Fragrances
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Cart Items List (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 luxury-glass border border-brand-gold/10 gap-6"
                >
                  {/* Product Thumbnail and details */}
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-28 bg-brand-beige/30 border border-brand-gold/10 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif-cormorant text-2xl text-brand-charcoal tracking-wide">
                        {item.product.name}
                      </h3>
                      <p className="text-[10px] tracking-widest text-brand-gold uppercase font-sans-inter">
                        {item.product.concentration} · {item.selectedSize}
                      </p>
                      <p className="text-xs text-brand-charcoal/40 font-sans-inter font-light">
                        Price: ${item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t border-brand-gold/5 pt-4 sm:pt-0 sm:border-0">
                    <div className="flex items-center border border-brand-charcoal/20">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                        }
                        className="p-1.5 px-3 text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors focus:outline-none"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-sans-inter text-brand-charcoal font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                        }
                        className="p-1.5 px-3 text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors focus:outline-none"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-brand-charcoal font-sans-inter text-base font-semibold w-20 text-right">
                      ${item.product.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-brand-charcoal/30 hover:text-brand-gold transition-colors duration-300 p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={clearCart}
                  className="text-[10px] tracking-widest text-brand-charcoal/55 hover:text-brand-gold transition-colors uppercase font-semibold font-sans-inter"
                >
                  Clear Shopping Cart
                </button>
                <Link
                  to="/shop/perfume"
                  className="text-[10px] tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors uppercase font-semibold font-sans-inter"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Checkout Summary (4 Cols) */}
            <div className="lg:col-span-4 bg-brand-beige/10 border border-brand-gold/15 p-8 relative">
              <div className="absolute inset-4 border border-brand-gold/5 pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <h3 className="font-serif-cormorant text-2xl text-brand-charcoal tracking-wide font-light">
                  Order Summary
                </h3>

                <div className="space-y-3 font-sans-inter text-xs border-b border-brand-gold/10 pb-6">
                  <div className="flex justify-between text-brand-charcoal/60">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold text-brand-charcoal">${cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-charcoal/60">
                    <span>Estimated Shipping</span>
                    <span className="text-brand-gold font-bold">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-brand-charcoal/60">
                    <span>Estimated Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-brand-charcoal font-sans-inter text-sm font-semibold pt-2">
                  <span>Grand Total</span>
                  <span className="text-lg font-bold">${cartSubtotal}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-brand-morning-glory/25 flex items-center justify-center space-x-2 cursor-none"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PROCEED TO PAYMENT</span>
                </button>

                <div className="flex items-center space-x-2 text-[10px] text-brand-charcoal/40 tracking-wider uppercase font-semibold justify-center pt-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>Secure 256-bit SSL checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
