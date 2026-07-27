import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getPasswordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { label: '', color: 'bg-transparent' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500 w-1/3' };
    if (password.length < 10) return { label: 'Good', color: 'bg-amber-500 w-2/3' };
    return { label: 'Strong', color: 'bg-green-500 w-full' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      navigate(ROUTES.PROFILE);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] flex items-center justify-center font-['Inter'] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-[#111111] border border-[#c9a96e]/20 rounded-lg shadow-2xl"
      >
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] text-center mb-8 tracking-wider uppercase">Create Account</h1>
        
        {error && <div className="mb-6 p-3 border border-red-500/50 bg-red-500/10 text-red-200 text-sm rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2 relative group">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                className="w-full bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] transition-colors peer" placeholder="First Name" />
            </div>
            <div className="w-1/2 relative group">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                className="w-full bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] transition-colors peer" placeholder="Last Name" />
            </div>
          </div>
          
          <div className="relative group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="Email Address" />
          </div>
          
          <div className="relative group">
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              className="w-full bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="Password" />
            <div className="mt-2 h-1 w-full bg-gray-800 rounded overflow-hidden">
              <div className={`h-full transition-all duration-300 ${getPasswordStrength().color}`}></div>
            </div>
            <span className="text-xs text-[#a89880] mt-1 block text-right">{getPasswordStrength().label}</span>
          </div>
          
          <div className="relative group">
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
              className="w-full bg-transparent border-b border-[#a89880]/50 py-2 text-[#f5f0e8] focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="Confirm Password" />
          </div>
          
          <button type="submit" 
            className="w-full bg-[#c9a96e] text-[#0a0a0a] py-3 uppercase tracking-widest font-semibold hover:bg-[#b8935a] transition-colors mt-8">
            Register
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-[#a89880]">
          Already have an account? <a href={ROUTES.LOGIN} className="text-[#c9a96e] hover:underline">Log in</a>
        </p>
      </motion.div>
    </div>
  );
};
export default Register;
