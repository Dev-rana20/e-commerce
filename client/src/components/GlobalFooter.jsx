import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

const GlobalFooter = () => {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSignedUp(true);
      setEmail('');
      setTimeout(() => setSignedUp(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-softwhite border-t border-brand-burgundy/20 text-brand-charcoal pt-20 pb-8 relative overflow-hidden text-left">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(88, 24, 31, 0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block cursor-none">
              <img
                src="/Kelys_Logo_Png.png"
                alt="KELYS Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-brand-charcoal/60 font-sans-inter font-light text-xs leading-relaxed max-w-sm">
              Creating liquid memories. Formulated in Paris, blending exquisite regional Indian and global raw ingredients, hand-finished for the discerning aesthetic collector.
            </p>
            
            {/* Newsletter block */}
            <div className="space-y-3 pt-2">
              <h4 className="text-brand-burgundy font-sans-inter text-xs tracking-widest uppercase font-semibold">
                Subscribe to the newsletter
              </h4>
              {signedUp ? (
                <p className="text-brand-burgundy font-sans-inter text-xs tracking-wider">
                  THANK YOU FOR JOINING KÉLYS.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm border-b border-brand-charcoal/20 focus-within:border-brand-burgundy transition-colors duration-300">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-2 text-xs tracking-widest text-brand-charcoal placeholder-brand-charcoal/30 outline-none uppercase font-sans-inter"
                  />
                  <button type="submit" className="px-4 text-[10px] tracking-widest uppercase text-brand-burgundy hover:text-brand-gold transition-colors font-semibold">
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-brand-burgundy font-sans-inter text-xs tracking-widest uppercase mb-6 font-semibold">Shop</h4>
            <ul className="space-y-3 text-xs font-sans-inter font-light text-brand-charcoal/70">
              <li><Link to="/shop" className="hover:text-brand-burgundy transition-colors duration-300">All Fragrances</Link></li>
              <li><Link to="/product/discovery-box" className="hover:text-brand-burgundy transition-colors duration-300">Discovery Box</Link></li>
            </ul>
          </div>

          {/* Column 2: Information */}
          <div>
            <h4 className="text-brand-burgundy font-sans-inter text-xs tracking-widest uppercase mb-6 font-semibold">Information</h4>
            <ul className="space-y-3 text-xs font-sans-inter font-light text-brand-charcoal/70">
              <li><Link to="/" className="hover:text-brand-burgundy transition-colors duration-300">Home</Link></li>
              <li><Link to="/brand/story" className="hover:text-brand-burgundy transition-colors duration-300">Our Story</Link></li>
              <li><Link to="/brand/founders-message" className="hover:text-brand-burgundy transition-colors duration-300">Founder's Message</Link></li>
              <li><Link to="/brand/materials" className="hover:text-brand-burgundy transition-colors duration-300">Raw Materials</Link></li>
              <li><Link to="/brand/archive" className="hover:text-brand-burgundy transition-colors duration-300">Archive</Link></li>
              <li><Link to="/faq" className="hover:text-brand-burgundy transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/policies" className="hover:text-brand-burgundy transition-colors duration-300">Policy & Terms</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="space-y-6">
            <div>
              <h4 className="text-brand-burgundy font-sans-inter text-xs tracking-widest uppercase mb-6 font-semibold">Concierge</h4>
              <ul className="space-y-3 text-xs font-sans-inter font-light text-brand-charcoal/70">
                <li className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-brand-burgundy" />
                  <a href="mailto:info@kelysperfumes.com" className="hover:text-brand-burgundy transition-colors duration-300 font-medium">
                    info@kelysperfumes.com
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone className="w-3.5 h-3.5 text-brand-burgundy mt-0.5" />
                  <div className="flex flex-col space-y-1 font-medium">
                    <a href="tel:+917046639111" className="hover:text-brand-burgundy transition-colors duration-300">
                      +91 7046639111
                    </a>
                    <a href="tel:+918511133098" className="hover:text-brand-burgundy transition-colors duration-300">
                      +91 8511133098
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-burgundy mt-0.5" />
                  <span className="leading-relaxed">
                    Vadodara, Gujarat, India
                  </span>
                </li>
              </ul>
            </div>

            {/* Social icons */}
            <div className="pt-2">
              <h5 className="text-[10px] tracking-widest uppercase text-brand-burgundy font-sans-inter font-bold mb-3">FOLLOW US</h5>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-brand-charcoal/60 hover:text-brand-burgundy transition-colors p-1" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="mailto:info@kelysperfumes.com" className="text-brand-charcoal/60 hover:text-brand-burgundy transition-colors p-1" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and Scroll up */}
        <div className="border-t border-brand-burgundy/15 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans-inter font-light text-brand-charcoal/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} KÉLYS. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <Link to="/policies" className="hover:text-brand-charcoal/85 transition-colors">Privacy Policy</Link>
            <Link to="/policies" className="hover:text-brand-charcoal/85 transition-colors">Terms of Service</Link>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 border border-brand-burgundy/30 text-brand-burgundy px-4 py-2 hover:border-brand-burgundy hover:bg-brand-burgundy/5 transition-all duration-300 focus:outline-none text-[10px] tracking-wider uppercase font-semibold cursor-none"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
