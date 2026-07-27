import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { motion } from 'framer-motion';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    getAllOrders(0, 100).then(data => {
      setOrders(data.content || data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-amber-500 bg-amber-500/10';
      case 'CONFIRMED': return 'text-blue-500 bg-blue-500/10';
      case 'SHIPPED': return 'text-indigo-500 bg-indigo-500/10';
      case 'DELIVERED': return 'text-green-500 bg-green-500/10';
      case 'CANCELLED': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-10 tracking-wider uppercase">Orders</h1>
        
        {loading ? (
          <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]"></div></div>
        ) : (
          <div className="overflow-x-auto bg-[#111] border border-[#333]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-[#a89880] border-b border-[#333] bg-[#0a0a0a]">
                <tr>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-[#333]/50 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 px-6 font-semibold">#{order.id}</td>
                    <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-[#c9a96e]">${order.totalAmount?.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs rounded uppercase tracking-wider font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-transparent border border-[#333] text-[#f5f0e8] text-xs py-1 px-2 focus:outline-none focus:border-[#c9a96e]"
                      >
                        <option value="PENDING" className="bg-[#111]">Pending</option>
                        <option value="CONFIRMED" className="bg-[#111]">Confirmed</option>
                        <option value="SHIPPED" className="bg-[#111]">Shipped</option>
                        <option value="DELIVERED" className="bg-[#111]">Delivered</option>
                        <option value="CANCELLED" className="bg-[#111]">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminOrders;
