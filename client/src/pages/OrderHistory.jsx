import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMyOrders } from '../services/orderService';
import { ROUTES } from '../constants/routes';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(data => {
      setOrders(data.content || data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
      case 'CONFIRMED': return 'text-blue-500 border-blue-500/30 bg-blue-500/10';
      case 'SHIPPED': return 'text-indigo-500 border-indigo-500/30 bg-indigo-500/10';
      case 'DELIVERED': return 'text-green-500 border-green-500/30 bg-green-500/10';
      case 'CANCELLED': return 'text-red-500 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-10 tracking-wider uppercase text-center">Order History</h1>
        
        {loading ? (
          <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]"></div></div>
        ) : orders.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20 border border-[#333] bg-[#111]">
            <p className="text-xl text-[#a89880] mb-6">You have no past orders.</p>
            <a href={ROUTES.SHOP} className="inline-block bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 uppercase tracking-widest font-semibold hover:bg-[#b8935a] transition-colors">Start Shopping</a>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={order.id} 
                className="bg-[#111111] border border-[#c9a96e]/20 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <span className={`text-xs px-2 py-1 uppercase tracking-wider border ${getStatusColor(order.status)} rounded`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#a89880] mb-4">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  <div className="space-y-1">
                    {order.items?.map(item => (
                      <p key={item.id} className="text-sm text-[#d4d4d4]">{item.quantity}x {item.productName || 'Product'} - ${item.price?.toFixed(2) || '0.00'}</p>
                    ))}
                  </div>
                </div>
                
                <div className="md:text-right flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#a89880] uppercase tracking-wider mb-1">Total</p>
                    <p className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e]">${order.totalAmount?.toFixed(2)}</p>
                  </div>
                  <button className="mt-4 md:mt-0 text-sm text-[#c9a96e] hover:text-[#f5f0e8] transition-colors underline underline-offset-4 decoration-[#c9a96e]/50">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderHistory;
