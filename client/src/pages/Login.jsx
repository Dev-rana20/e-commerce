import React, { useState } from 'react';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-md mx-auto px-6">
        
        {loggedIn ? (
          <div className="bg-[#FCFAF7] border border-brand-gold/15 p-8 sm:p-12 text-center relative">
            <div className="absolute inset-4 border border-brand-gold/5 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.4em] font-semibold uppercase block">
                WELCOME BACK
              </span>
              <h2 className="font-serif-cormorant text-3xl text-brand-charcoal tracking-wide">
                {formData.name || formData.email.split('@')[0].toUpperCase()}
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
              
              <div className="space-y-3 font-sans-inter text-xs text-brand-charcoal/60 pt-4">
                <p>Status: Collector Private Access</p>
                <p>Private Reserve Orders: 0</p>
                <p>Email: {formData.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-softwhite transition-all duration-300 text-xs tracking-widest uppercase font-semibold cursor-none"
              >
                Logout Account
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FCFAF7] border border-brand-gold/15 p-8 sm:p-12 relative">
            <div className="absolute inset-4 border border-brand-gold/5 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="text-center">
                <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
                  MAISON KÉLYS
                </span>
                <h2 className="font-serif-cormorant text-3xl text-brand-charcoal font-light tracking-wide">
                  {isSignIn ? 'Sign In' : 'Create Account'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isSignIn && (
                  <div>
                    <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2 text-xs tracking-wider text-brand-charcoal outline-none transition-colors"
                    />
                  </div>
                )}
                
                <div>
                  <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2 text-xs tracking-wider text-brand-charcoal outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2 text-xs tracking-wider text-brand-charcoal outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-brand-morning-glory/25 cursor-none"
                >
                  {isSignIn ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-[11px] tracking-wider text-brand-gold hover:text-brand-charcoal transition-colors font-sans-inter uppercase"
                >
                  {isSignIn ? 'New to KÉLYS? Create account' : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
