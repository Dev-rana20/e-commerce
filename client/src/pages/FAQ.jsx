import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      category: 'Product & Fragrance',
      questions: [
        {
          q: 'What makes KÉLYS extraits different from commercial perfumes?',
          a: 'KÉLYS extraits are formulated with an exceptionally high concentration of perfume oils (30-35%). They are engineered in Paris using rare botanical oils and regional Indian ingredients (such as dawn-harvested jasmine sambac from Vadodara) and aged for six months before release for maximum longevity.'
        },
        {
          q: 'How should I store my KÉLYS perfume bottle?',
          a: 'Perfume is sensitive to light and heat. Store your bottle in its original white box or a dark, cool drawer. Avoid exposing it to direct sunlight or humid bathrooms to preserve the delicate raw components.'
        }
      ]
    },
    {
      category: 'Shipping & Orders',
      questions: [
        {
          q: 'Do you offer international shipping?',
          a: 'Yes. KÉLYS ships worldwide from our offices in Paris and India. We provide complimentary carbon-neutral shipping on all orders over ₹2000 in India, and standard flat rates internationally.'
        },
        {
          q: 'Can I smell the perfumes before purchasing a full size?',
          a: 'Absolutely. We offer an Olfactory Discovery Box containing 3ml sample vials of our four signature fragrances. When you purchase a Discovery Box, we send you a store credit of the same value ($45) to use on your future full-sized bottle purchase.'
        }
      ]
    },
    {
      category: 'Returns & Policies',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'Due to the artisanal nature of our products, we only accept returns on unopened, sealed perfume boxes within 14 days of delivery. Every full-sized perfume bottle order includes a matching 2ml sample vial; please test the sample vial on your skin before opening the sealed full-sized box.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  let globalCounter = 0;

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-brand-gold/15 pb-8 mb-16">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            CONCIERGE DESK
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQs */}
        <div className="space-y-12">
          {faqs.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h2 className="font-serif-cormorant text-2xl text-brand-gold tracking-wide font-light border-b border-brand-gold/10 pb-2">
                {sec.category}
              </h2>
              
              <div className="space-y-2">
                {sec.questions.map((faq) => {
                  const currentIdx = globalCounter++;
                  const isOpen = activeFAQ === currentIdx;
                  return (
                    <div key={currentIdx} className="border-b border-brand-gold/5">
                      <button
                        onClick={() => toggleFAQ(currentIdx)}
                        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-sans-inter text-xs sm:text-sm tracking-wider text-brand-charcoal font-medium">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-brand-gold flex-shrink-0 ml-4 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pb-4"
                          >
                            <p className="font-sans-inter text-xs sm:text-sm font-light text-brand-charcoal/70 leading-relaxed text-justify">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
