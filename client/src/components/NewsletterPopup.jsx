import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error

  useEffect(() => {
    // Show only once per browser session
    const hasSeen = sessionStorage.getItem('kelys_newsletter_popup');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Trigger after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('kelys_newsletter_popup', 'true');
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (!consent) {
      alert('Please agree to receive our updates.');
      return;
    }
    
    setStatus('success');
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-brand-softwhite border border-brand-burgundy/20 shadow-2xl p-8 sm:p-12 text-center z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-brand-charcoal/50 hover:text-brand-charcoal transition-colors duration-300 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <span className="text-brand-burgundy tracking-[0.45em] text-[10px] font-semibold uppercase block mb-3 font-sans-inter">
              MAISON KÉLYS
            </span>
            
            <h3 className="font-serif-cormorant text-3xl sm:text-4xl text-brand-charcoal tracking-wide mb-4">
              Enter the Maison
            </h3>
            
            <p className="text-brand-charcoal/60 font-sans-inter font-light text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Subscribe to receive exclusive access to private reserve perfume restocks, limited artisanal batches, and bespoke events.
            </p>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-6 text-brand-burgundy"
              >
                <div className="w-12 h-12 rounded-full border border-brand-burgundy flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-sans-inter text-xs tracking-widest uppercase font-semibold">Welcome to the inner circle.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Input Email */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-burgundy py-3 text-xs tracking-widest text-center text-brand-charcoal placeholder-brand-charcoal/30 outline-none transition-colors duration-300 uppercase font-sans-inter"
                  />
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center transition-all duration-300 ${
                    consent ? 'bg-brand-burgundy border-brand-burgundy' : 'border-brand-charcoal/20 group-hover:border-brand-burgundy'
                  }`}>
                    {consent && <Check className="w-3 h-3 text-brand-softwhite" />}
                  </div>
                  <span className="text-[10px] text-brand-charcoal/50 leading-relaxed font-sans-inter font-light select-none group-hover:text-brand-charcoal/80 transition-colors">
                    I consent to receive newsletter communications and marketing from KÉLYS. I can opt-out at any time.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-burgundy hover:bg-brand-charcoal text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-brand-morning-glory/25 cursor-none"
                >
                  Join KÉLYS
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
