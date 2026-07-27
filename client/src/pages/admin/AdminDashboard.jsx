import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboard } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0, totalRevenue: 0, totalProducts: 0, totalCustomers: 0, recentOrders: [], lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(data => {
      setStats(data || stats);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}` },
    { title: 'Total Orders', value: stats.totalOrders },
    { title: 'Total Products', value: stats.totalProducts },
    { title: 'Total Customers', value: stats.totalCustomers }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-10 tracking-wider uppercase">Admin Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]"></div></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((card, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-[#111111] border border-[#c9a96e]/20 p-6 flex flex-col justify-center items-center text-center"
                >
                  <p className="text-sm text-[#a89880] uppercase tracking-widest mb-2">{card.title}</p>
                  <p className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e]">{card.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-[#111] border border-[#333] p-6">
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6 border-b border-[#333] pb-2">Recent Orders</h2>
                {stats.recentOrders.length === 0 ? <p className="text-[#a89880]">No recent orders.</p> : (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-[#a89880] border-b border-[#333]">
                      <tr><th className="py-2">ID</th><th className="py-2">Amount</th><th className="py-2">Status</th></tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map(order => (
                        <tr key={order.id} className="border-b border-[#333]/50">
                          <td className="py-3">#{order.id}</td>
                          <td className="py-3">${order.totalAmount?.toFixed(2)}</td>
                          <td className="py-3 text-[#c9a96e]">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-[#111] border border-[#333] p-6">
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6 border-b border-[#333] pb-2">Low Stock Products</h2>
                {stats.lowStockProducts.length === 0 ? <p className="text-[#a89880]">Stock levels are good.</p> : (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-[#a89880] border-b border-[#333]">
                      <tr><th className="py-2">Name</th><th className="py-2">Stock</th></tr>
                    </thead>
                    <tbody>
                      {stats.lowStockProducts.map(prod => (
                        <tr key={prod.id} className="border-b border-[#333]/50">
                          <td className="py-3">{prod.name}</td>
                          <td className="py-3 text-red-500 font-semibold">{prod.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
