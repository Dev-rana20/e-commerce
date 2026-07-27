import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { uploadImage } from '../../services/adminService';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', price: '', stock: '', categoryId: '', imageUrl: '', featured: false, active: true });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    getProducts(0, 100).then(data => {
      setProducts(data.content || data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setFormData({ ...product, categoryId: product.category?.id || '' });
    } else {
      setFormData({ id: null, name: '', description: '', price: '', stock: '', categoryId: '', imageUrl: '', featured: false, active: true });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.imageUrl;
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);
        const res = await uploadImage(fileData);
        finalImageUrl = res.imageUrl;
      }
      
      const payload = { ...formData, imageUrl: finalImageUrl };
      if (formData.id) {
        await updateProduct(formData.id, payload);
      } else {
        await createProduct(payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] tracking-wider uppercase">Products</h1>
          <button onClick={() => handleOpenModal()} className="bg-[#c9a96e] text-[#0a0a0a] px-6 py-2 uppercase tracking-widest text-sm font-semibold hover:bg-[#b8935a] transition-colors">
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#c9a96e]"></div></div>
        ) : (
          <div className="overflow-x-auto bg-[#111] border border-[#333]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-[#a89880] border-b border-[#333] bg-[#0a0a0a]">
                <tr>
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod.id} className="border-b border-[#333]/50 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3 px-6">
                      {prod.imageUrl ? <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-[#333] rounded"></div>}
                    </td>
                    <td className="py-3 px-6 font-semibold">{prod.name}</td>
                    <td className="py-3 px-6 text-[#c9a96e]">${prod.price?.toFixed(2)}</td>
                    <td className="py-3 px-6">{prod.stock}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 text-xs rounded ${prod.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {prod.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right space-x-3">
                      <button onClick={() => handleOpenModal(prod)} className="text-[#a89880] hover:text-[#c9a96e]">Edit</button>
                      <button onClick={() => handleDelete(prod.id)} className="text-red-500/70 hover:text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="bg-[#111] border border-[#c9a96e]/30 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6">{formData.id ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Name</label>
                      <input type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} required className="w-full bg-transparent border-b border-[#333] py-2 text-[#f5f0e8] focus:border-[#c9a96e] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Category ID</label>
                      <input type="number" value={formData.categoryId} onChange={e=>setFormData({...formData, categoryId: e.target.value})} className="w-full bg-transparent border-b border-[#333] py-2 text-[#f5f0e8] focus:border-[#c9a96e] focus:outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Description</label>
                    <textarea value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border border-[#333] p-2 text-[#f5f0e8] focus:border-[#c9a96e] focus:outline-none h-24"></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Price</label>
                      <input type="number" step="0.01" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} required className="w-full bg-transparent border-b border-[#333] py-2 text-[#f5f0e8] focus:border-[#c9a96e] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Stock</label>
                      <input type="number" value={formData.stock} onChange={e=>setFormData({...formData, stock: e.target.value})} required className="w-full bg-transparent border-b border-[#333] py-2 text-[#f5f0e8] focus:border-[#c9a96e] focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Image Upload</label>
                    <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} className="w-full text-sm text-[#a89880] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#333] file:text-[#f5f0e8] hover:file:bg-[#444]" />
                  </div>

                  <div className="flex gap-6 mt-4">
                    <label className="flex items-center gap-2 text-sm text-[#a89880]">
                      <input type="checkbox" checked={formData.featured} onChange={e=>setFormData({...formData, featured: e.target.checked})} className="accent-[#c9a96e]" /> Featured
                    </label>
                    <label className="flex items-center gap-2 text-sm text-[#a89880]">
                      <input type="checkbox" checked={formData.active} onChange={e=>setFormData({...formData, active: e.target.checked})} className="accent-[#c9a96e]" /> Active
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#a89880] uppercase tracking-widest text-sm hover:text-[#f5f0e8]">Cancel</button>
                    <button type="submit" className="bg-[#c9a96e] text-[#0a0a0a] px-6 py-2 uppercase tracking-widest text-sm font-semibold hover:bg-[#b8935a]">Save</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default AdminProducts;
