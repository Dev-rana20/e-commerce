import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-brand-gold/15 pb-8 mb-16">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            MAISON & CONCIERGE
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
            Contact Maison KÉLYS
          </h1>
          <p className="text-brand-charcoal/50 font-sans-inter text-xs sm:text-sm font-light mt-3 max-w-xl leading-relaxed">
            Reach out regarding bespoke creations, private olfactory consultations, press inquiries, or order consultations. Our team responds within 24 business hours.
          </p>
        </div>

        {/* Contact info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-start">
          
          {/* Info Block (5 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            
            <div className="space-y-6">
              <h2 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-charcoal tracking-wide font-light">
                Direct Inquiries
              </h2>
              
              <ul className="space-y-6 font-sans-inter text-xs sm:text-sm font-light text-brand-charcoal/70">
                <li className="flex items-start space-x-4 border-b border-brand-gold/10 pb-4">
                  <Mail className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-1 font-sans-inter">Email Us</h4>
                    <a href="mailto:info@kelysperfumes.com" className="hover:text-brand-gold transition-colors text-brand-charcoal font-medium">
                      info@kelysperfumes.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start space-x-4 border-b border-brand-gold/10 pb-4">
                  <Phone className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-1 font-sans-inter">Call Our Concierge</h4>
                    <div className="flex flex-col space-y-1 text-brand-charcoal font-medium">
                      <a href="tel:+917046639111" className="hover:text-brand-gold transition-colors">
                        +91 70466 39111
                      </a>
                      <a href="tel:+918511133098" className="hover:text-brand-gold transition-colors">
                        +91 85111 33098
                      </a>
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start space-x-4 pb-4">
                  <MapPin className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-1 font-sans-inter">Atelier Address</h4>
                    <span className="text-brand-charcoal font-medium leading-relaxed">
                      Vadodara, Gujarat, India
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Form Block (7 Columns) */}
          <div className="lg:col-span-7 bg-brand-beige/10 border border-brand-gold/15 p-8 sm:p-12 relative">
            <div className="absolute inset-4 border border-brand-gold/5 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-charcoal tracking-wide font-light">
                Send a Message
              </h2>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-brand-gold text-center">
                  <div className="w-12 h-12 rounded-full border border-brand-gold flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="font-sans-inter text-xs tracking-widest uppercase font-semibold">MESSAGE SENT SUCCESSFULLY</p>
                  <p className="font-sans-inter text-[11px] text-brand-charcoal/50 tracking-wider mt-2">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2.5 text-xs tracking-wider text-brand-charcoal outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2.5 text-xs tracking-wider text-brand-charcoal outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-widest text-brand-charcoal/50 uppercase font-sans-inter mb-2 block font-semibold">Message</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-brand-charcoal/20 focus:border-brand-gold py-2.5 text-xs tracking-wider text-brand-charcoal outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-brand-softwhite text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-brand-morning-glory/25 cursor-none"
                  >
                    Submit inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Google Map Embed */}
        <div className="border border-brand-gold/15 p-2 bg-brand-softwhite relative">
          <div className="aspect-[21/9] w-full relative">
            <iframe
              title="KÉLYS Vadodara Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118143.76632483849!2d73.10271790930777!3d22.308197775503027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3b311572190!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1) invert(0.05)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
