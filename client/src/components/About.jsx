import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-brand-softwhite overflow-hidden border-t border-brand-gold/10">
      {/* Soft ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-10 top-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(197,154,42,0.18) 0%, transparent 70%)' }} />
        <div className="absolute right-10 bottom-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, rgba(158,202,214,0.25) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Image Column */}
          <div className="col-span-1 lg:col-span-6 relative order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={imageVariants}
              className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-brand-gold/20 shadow-2xl shadow-brand-charcoal/8 group"
            >
              {/* Gold frame overlay */}
              <div className="absolute inset-4 border border-brand-gold/25 pointer-events-none z-10 transition-all duration-700 group-hover:inset-3 group-hover:border-brand-gold/55" />
              <img
                src="/about_perfume.png"
                alt="Kelýs Luxury Perfume Editorial"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle soft warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-beige/30 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
            </motion.div>
          </div>

          {/* Narrative Column */}
          <div className="col-span-1 lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.15 }}
              className="flex flex-col text-left"
            >
              {/* Section Header */}
              <motion.span variants={textRevealVariants} className="text-brand-gold tracking-[0.45em] text-xs font-semibold uppercase mb-4 font-sans-inter">
                THE ART OF OLFACTORY POETRY
              </motion.span>

              <motion.h2
                variants={textRevealVariants}
                className="font-serif-cormorant text-4xl sm:text-5xl font-light text-brand-charcoal tracking-wide leading-tight mb-8"
              >
                Every fragrance tells a{' '}
                <span className="italic font-serif-playfair text-brand-gold">
                  silent story
                </span>
                .
              </motion.h2>

              <motion.p
                variants={textRevealVariants}
                className="text-brand-charcoal/70 font-sans-inter font-light text-base leading-relaxed tracking-wide mb-6"
              >
                At Kelýs, we view fragrance formulation not as a science, but as artistic storytelling. We combine rare, raw ingredients collected from remote corners of the globe, blending them in high-concentration Extraits to create olfactory impressions that linger in memory long after you depart.
              </motion.p>

              <motion.p
                variants={textRevealVariants}
                className="text-brand-charcoal/50 font-sans-inter font-light text-sm leading-relaxed tracking-wide mb-10"
              >
                Inspired by the minimalism of nature and the complexity of emotions, our creations bypass the intellect and speak directly to the soul. Each perfume is hand-filled in limited batches inside our signature heavyweight glass bottles, crowned with a solid gold-finish brass cap.
              </motion.p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-charcoal/10">
                <motion.div variants={textRevealVariants} className="flex space-x-4">
                  <span className="font-serif-cormorant text-2xl text-brand-gold italic">I</span>
                  <div>
                    <h4 className="text-brand-charcoal font-sans-inter font-medium text-xs tracking-wider uppercase mb-1">Uncompromising Quality</h4>
                    <p className="text-brand-charcoal/45 text-xs leading-relaxed">Sourcing only the purest grade of Oud, Ambergris, and Rose Absolute.</p>
                  </div>
                </motion.div>

                <motion.div variants={textRevealVariants} className="flex space-x-4">
                  <span className="font-serif-cormorant text-2xl text-brand-gold italic">II</span>
                  <div>
                    <h4 className="text-brand-charcoal font-sans-inter font-medium text-xs tracking-wider uppercase mb-1">Artisanal Finishes</h4>
                    <p className="text-brand-charcoal/45 text-xs leading-relaxed">Each label is letterpressed and each bottle hand-polished in France.</p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
