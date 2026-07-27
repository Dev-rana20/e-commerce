import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    rating: 5,
    quote: "An unforgettable fragrance experience. Nocturne is smoky, rich, and mysterious—a masterpiece of modern perfumery.",
    author: "Sophia V.",
    title: "Editorial Director, Haute Luxury Magazine"
  },
  {
    id: 2,
    rating: 5,
    quote: "The bottle alone feels like a sculpture. It has a beautiful heavy-base glass and a solid metallic brass cap that clicks with satisfying authority.",
    author: "Marcus A.",
    title: "Olfactory Art Collector"
  },
  {
    id: 3,
    rating: 5,
    quote: "Pure sophistication. Santal Noir strikes the perfect balance of creamy sandalwood and sweet resinous dry-down. Truly phenomenal sillage.",
    author: "Elena R.",
    title: "Fashion & Creative Consultant"
  },
  {
    id: 4,
    rating: 5,
    quote: "The longevity of Éclat is incredible. A crisp, clean, sparkling bergamot top that dries down to a rich, warm musk which lingers on clothes for days.",
    author: "David K.",
    title: "Senior Stylist"
  },
  {
    id: 5,
    rating: 5,
    quote: "Kelýs has redefined my fragrance wardrobe. They stand on par with the finest private lines of Dior and Maison Francis Kurkdjian.",
    author: "Charlotte L.",
    title: "Fragrance Journalist & Reviewer"
  }
];

const Reviews = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-brand-beige overflow-hidden border-t border-brand-gold/10">

      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-1/3 bottom-10 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse-slow opacity-30" style={{ background: 'radial-gradient(circle, rgba(158,202,214,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* Section Header */}
        <span className="text-brand-gold tracking-[0.45em] text-xs font-semibold uppercase block mb-4 font-sans-inter">
          THE VERDICT
        </span>
        <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-light text-brand-charcoal tracking-wide mb-16">
          Words of Distinction
        </h2>

        {/* Testimonial slider frame */}
        <div className="relative min-h-[300px] sm:min-h-[260px] flex items-center justify-center">

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full luxury-glass p-8 sm:p-12 border border-brand-gold/12 relative"
            >
              {/* Quote icon overlay */}
              <Quote className="w-12 h-12 text-brand-morning-glory/10 absolute left-6 top-6 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex justify-center space-x-1.5 mb-6 text-brand-gold">
                {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-serif-cormorant text-xl sm:text-2xl font-light leading-relaxed text-brand-charcoal mb-8 max-w-2xl mx-auto italic">
                "{reviews[activeIdx].quote}"
              </p>

              {/* Author name & details */}
              <div className="border-t border-brand-charcoal/10 pt-4 inline-block">
                <p className="text-brand-gold font-sans-inter text-xs font-medium tracking-[0.25em] uppercase">
                  {reviews[activeIdx].author}
                </p>
                <p className="text-brand-charcoal/40 text-[10px] tracking-wider uppercase mt-1 font-sans-inter">
                  {reviews[activeIdx].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 p-3 border border-brand-gold/30 text-brand-gold hover:border-brand-gold hover:bg-brand-gold/8 transition-all duration-300 rounded-full z-20 focus:outline-none"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 p-3 border border-brand-gold/30 text-brand-gold hover:border-brand-gold hover:bg-brand-gold/8 transition-all duration-300 rounded-full z-20 focus:outline-none"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Indicators / Progress bars */}
        <div className="flex justify-center space-x-3 mt-10">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIdx ? 1 : -1);
                setActiveIdx(idx);
              }}
              className={`h-0.5 transition-all duration-500 focus:outline-none ${
                idx === activeIdx ? 'w-8 bg-brand-gold' : 'w-3 bg-brand-charcoal/20 hover:bg-brand-morning-glory/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
