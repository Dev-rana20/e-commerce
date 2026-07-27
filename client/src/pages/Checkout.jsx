import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAddresses } from '../services/addressService';
import { validateCoupon } from '../services/couponService';
import { createOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const finalTotal = cartSubtotal - discount;

  useEffect(() => {
    getAddresses().then(setAddresses).catch(console.error);
  }, []);

  const handleApplyCoupon = async () => {
    try {
      const res = await validateCoupon(couponCode, cartSubtotal);
      setDiscount(res.discountAmount || 0);
    } catch (err) {
      alert("Invalid coupon");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const order = await createOrder({
        addressId: selectedAddress?.id,
        items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity, selectedSize: i.selectedSize })),
        couponCode: discount > 0 ? couponCode : null
      });
      clearCart();
      alert(`Order Placed Successfully! Order #${order.id || Math.floor(Math.random()*1000)}`);
      navigate('/orders');
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-10 tracking-wider uppercase text-center">Secure Checkout</h1>
        
        <div className="flex mb-8 border-b border-[#333]">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 text-center py-4 text-sm uppercase tracking-widest ${step === s ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]' : 'text-[#a89880]'}`}>
              Step {s}
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-[#c9a96e]/20 p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6">Select Shipping Address</h2>
                {addresses.length === 0 ? (
                  <p className="text-[#a89880] mb-4">No addresses found. (Mock mode: proceed anyway)</p>
                ) : (
                  <div className="space-y-4 mb-8">
                    {addresses.map(addr => (
                      <div key={addr.id} onClick={() => setSelectedAddress(addr)} 
                        className={`p-4 border cursor-pointer transition-colors ${selectedAddress?.id === addr.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#333] hover:border-[#666]'}`}>
                        <p>{addr.street}, {addr.city}, {addr.country}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => setStep(2)} className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 uppercase tracking-widest font-semibold hover:bg-[#b8935a] transition-colors float-right">Continue to Review</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6">Review Order</h2>
                <div className="space-y-4 border-b border-[#333] pb-6 mb-6">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.quantity}x {item.product.name} ({item.selectedSize})</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4 mb-6">
                  <input type="text" value={couponCode} onChange={e=>setCouponCode(e.target.value)} placeholder="Promo Code" className="bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] flex-1" />
                  <button onClick={handleApplyCoupon} className="border border-[#c9a96e] text-[#c9a96e] px-4 py-2 text-sm uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors">Apply</button>
                </div>

                <div className="space-y-2 mb-8 text-right">
                  <p className="text-[#a89880]">Subtotal: ${cartSubtotal.toFixed(2)}</p>
                  {discount > 0 && <p className="text-green-500">Discount: -${discount.toFixed(2)}</p>}
                  <p className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] pt-4 border-t border-[#333]">Total: ${finalTotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="text-[#a89880] hover:text-[#f5f0e8] transition-colors uppercase tracking-widest text-sm py-3">Back</button>
                  <button onClick={() => setStep(3)} className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 uppercase tracking-widest font-semibold hover:bg-[#b8935a] transition-colors">Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="text-center py-10">
                <h2 className="text-3xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-4">Payment</h2>
                <p className="text-[#a89880] mb-10 max-w-md mx-auto">This is a secure transaction. You will be placing a mock order for development purposes.</p>
                <div className="bg-[#1a1a1a] p-6 max-w-sm mx-auto mb-10 border border-[#333]">
                  <p className="text-sm text-[#a89880] uppercase tracking-widest mb-2">Amount to Pay</p>
                  <p className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e]">${finalTotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between max-w-md mx-auto">
                  <button onClick={() => setStep(2)} className="text-[#a89880] hover:text-[#f5f0e8] transition-colors uppercase tracking-widest text-sm py-3">Back</button>
                  <button onClick={handlePlaceOrder} disabled={loading} className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 uppercase tracking-widest font-semibold hover:bg-[#b8935a] transition-colors disabled:opacity-50">
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
