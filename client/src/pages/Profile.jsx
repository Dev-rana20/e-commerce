import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAddresses } from '../services/addressService';
import { ROUTES } from '../constants/routes';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (activeTab === 'addresses') {
      getAddresses().then(setAddresses).catch(console.error);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-['Inter'] pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-8 tracking-wider uppercase">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <ul className="space-y-4 text-[#a89880]">
              <li>
                <button onClick={() => setActiveTab('profile')} 
                  className={`uppercase tracking-widest text-sm pb-1 border-b-2 transition-colors ${activeTab === 'profile' ? 'border-[#c9a96e] text-[#c9a96e]' : 'border-transparent hover:text-[#f5f0e8]'}`}>
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('addresses')}
                  className={`uppercase tracking-widest text-sm pb-1 border-b-2 transition-colors ${activeTab === 'addresses' ? 'border-[#c9a96e] text-[#c9a96e]' : 'border-transparent hover:text-[#f5f0e8]'}`}>
                  Addresses
                </button>
              </li>
              <li>
                <a href={ROUTES.ORDERS} className="uppercase tracking-widest text-sm pb-1 border-b-2 border-transparent hover:text-[#f5f0e8] transition-colors inline-block">
                  Order History
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-3/4 bg-[#111111] p-8 border border-[#c9a96e]/10">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e] mb-6">Personal Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">First Name</label>
                    <p className="text-lg">{user?.firstName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Last Name</label>
                    <p className="text-lg">{user?.lastName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Email</label>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#a89880] uppercase tracking-wider block mb-1">Role</label>
                    <p className="text-lg">{user?.role}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#c9a96e]">Saved Addresses</h2>
                  <button className="text-sm text-[#0a0a0a] bg-[#c9a96e] px-4 py-2 uppercase tracking-widest hover:bg-[#b8935a] transition-colors">Add New</button>
                </div>
                {addresses.length === 0 ? (
                  <p className="text-[#a89880]">No addresses saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border border-[#333] p-4 relative">
                        <p className="font-semibold">{addr.fullName}</p>
                        <p className="text-sm text-[#a89880]">{addr.street}</p>
                        <p className="text-sm text-[#a89880]">{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-sm text-[#a89880]">{addr.country}</p>
                        <button className="absolute top-4 right-4 text-xs text-[#c9a96e] hover:underline">Edit</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
