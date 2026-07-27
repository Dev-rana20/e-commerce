import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Instagram = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Twitter = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Facebook = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scent: 'nocturne',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', scent: 'nocturne', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-brand-softwhite overflow-hidden border-t border-brand-gold/10">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute right-10 top-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(197,154,42,0.2) 0%, transparent 70%)' }} />
        <div className="absolute left-10 bottom-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, rgba(158,202,214,0.25) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Information Column */}
          <div className="col-span-1 lg:col-span-5 text-left flex flex-col justify-between h-full">
            <div>
              <span className="text-brand-gold tracking-[0.45em] text-xs font-semibold uppercase block mb-4 font-sans-inter">
                CONTACT
              </span>
              <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-light text-brand-charcoal tracking-wide mb-6">
                Private Consultation
              </h2>
              <p className="text-brand-charcoal/55 font-sans-inter font-light text-sm sm:text-base leading-relaxed mb-12">
                We invite you to reach out for private commissions, bespoke batch bookings, or press/wholesale inquiries. A Kelýs fragrance curator will contact you shortly.
              </p>

              {/* Detail Blocks */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-brand-gold/30 text-brand-gold rounded-full mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-brand-charcoal font-sans-inter text-xs tracking-widest uppercase mb-1 font-semibold">Atelier</h4>
                    <p className="text-brand-charcoal/45 text-xs">Vadodara, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-brand-gold/30 text-brand-gold rounded-full mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-brand-charcoal font-sans-inter text-xs tracking-widest uppercase mb-1 font-semibold">Concierge Phone</h4>
                    <p className="text-brand-charcoal/45 text-xs">
                      <a href="tel:+917046639111" className="hover:text-brand-gold transition-colors duration-300">+91 70466 39111</a>
                      {" & "}
                      <a href="tel:+918511133098" className="hover:text-brand-gold transition-colors duration-300">+91 85111 33098</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-brand-gold/30 text-brand-gold rounded-full mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-brand-charcoal font-sans-inter text-xs tracking-widest uppercase mb-1 font-semibold">Electronic Mail</h4>
                    <p className="text-brand-charcoal/45 text-xs">
                      <a href="mailto:info@kelysperfumes.com" className="hover:text-brand-gold transition-colors duration-300">info@kelysperfumes.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-16 pt-8 border-t border-brand-charcoal/10 flex items-center space-x-6 text-brand-charcoal/35">
              <a href="#" className="hover:text-brand-morning-glory transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-morning-glory transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-morning-glory transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <span className="text-[10px] tracking-widest uppercase text-brand-charcoal/25">@kelysfragrance</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="col-span-1 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="luxury-glass p-8 sm:p-10 border border-brand-gold/12"
            >
              <h3 className="font-serif-cormorant text-2xl font-light text-brand-charcoal tracking-wider mb-8 text-left">
                Send Inquiry
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <p className="text-brand-gold font-serif-cormorant text-2xl mb-4">Message Received</p>
                  <p className="text-brand-charcoal/55 text-xs tracking-wider max-w-xs mx-auto font-sans-inter">
                    Your request has been added to our queue. An ambassador will reach out within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {/* Name field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-brand-charcoal/50 text-[10px] tracking-[0.2em] uppercase font-sans-inter">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jean Laurent"
                      className="w-full bg-brand-softwhite border border-brand-charcoal/15 focus:border-brand-morning-glory text-brand-charcoal py-3 px-4 outline-none text-sm transition-all duration-300 font-sans-inter tracking-wide focus:bg-white placeholder-brand-charcoal/30"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-brand-charcoal/50 text-[10px] tracking-[0.2em] uppercase font-sans-inter">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jean.laurent@domain.com"
                      className="w-full bg-brand-softwhite border border-brand-charcoal/15 focus:border-brand-morning-glory text-brand-charcoal py-3 px-4 outline-none text-sm transition-all duration-300 font-sans-inter tracking-wide focus:bg-white placeholder-brand-charcoal/30"
                    />
                  </div>

                  {/* Scent selector */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="scent" className="text-brand-charcoal/50 text-[10px] tracking-[0.2em] uppercase font-sans-inter">
                      Scent Interest
                    </label>
                    <select
                      id="scent"
                      name="scent"
                      value={formData.scent}
                      onChange={handleChange}
                      className="w-full bg-brand-softwhite border border-brand-charcoal/15 focus:border-brand-morning-glory text-brand-charcoal py-3 px-4 outline-none text-sm transition-all duration-300 font-sans-inter tracking-wide cursor-pointer focus:bg-white"
                    >
                      <option value="nocturne">Nocturne — Oud & Amber</option>
                      <option value="eclat">Éclat — Jasmine & Musk</option>
                      <option value="santal-noir">Santal Noir — Sandalwood & Vanilla</option>
                      <option value="bespoke">Bespoke — Personalized Commission</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="message" className="text-brand-charcoal/50 text-[10px] tracking-[0.2em] uppercase font-sans-inter">
                      Inquiry Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details regarding your request..."
                      className="w-full bg-brand-softwhite border border-brand-charcoal/15 focus:border-brand-morning-glory text-brand-charcoal py-3 px-4 outline-none text-sm transition-all duration-300 font-sans-inter tracking-wide resize-none focus:bg-white placeholder-brand-charcoal/30"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 mt-4 bg-brand-gold text-brand-softwhite font-sans-inter text-xs tracking-[0.25em] uppercase hover:bg-brand-charcoal transition-all duration-500 flex items-center justify-center space-x-2 font-medium"
                  >
                    <span>Submit Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
