import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Clock, Leaf } from 'lucide-react';

const experiences = [
  {
    id: 'artisan',
    icon: Sparkles,
    title: 'Artisan Crafted',
    tagline: 'Hand-finished luxury fragrances',
    description: 'Every formulation is mixed by hand, filtered, aged, and poured into heavyweight glass decanters. This painstaking method guarantees batch uniqueness and peak molecular performance.'
  },
  {
    id: 'rare',
    icon: Globe,
    title: 'Rare Ingredients',
    tagline: 'Sourced globally, selected with intent',
    description: 'We search remote environments—from the high altitudes of India to the coastal shorelines of the Baltics—to secure the highest purity oils, resin extracts, and botanical concretes.'
  },
  {
    id: 'lasting',
    icon: Clock,
    title: 'Long Lasting',
    tagline: 'Premium Extrait concentrations',
    description: 'Formulated at an exceptional 25% to 30% concentration. Our perfumes undergo a months-long maceration phase, providing unparalleled skin longevity and a profound, expanding sillage.'
  },
  {
    id: 'sustainable',
    icon: Leaf,
    title: 'Sustainable Luxury',
    tagline: 'Eco-conscious design philosophy',
    description: 'True exclusivity shouldn\'t cost the earth. Our boxes are built from post-consumer fibers, our caps are cast from lead-free alloy, and all botanicals are harvested through fair-trade agreements.'
  }
];

const ExperienceCard = ({ exp, index }) => {
  const Icon = exp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="luxury-glass p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-brand-morning-glory/25 hover:shadow-xl hover:shadow-brand-morning-glory/8"
    >
      {/* Soft gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-morning-glory/[0.02] via-transparent to-brand-gold/[0.02] opacity-50 pointer-events-none" />

      {/* Floating back-number */}
      <div className="absolute -right-4 -bottom-6 text-brand-gold/[0.04] text-9xl font-serif-cormorant font-bold select-none pointer-events-none group-hover:text-brand-gold/[0.07] transition-colors duration-500">
        0{index + 1}
      </div>

      <div className="relative z-10">
        {/* Icon wrapper */}
        <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-6 group-hover:border-brand-morning-glory group-hover:bg-brand-morning-glory/8 transition-all duration-500">
          <Icon className="w-5 h-5 group-hover:text-brand-morning-glory group-hover:scale-110 transition-all duration-300" />
        </div>

        <h3 className="font-serif-cormorant text-2xl font-light text-brand-charcoal tracking-wide mb-2 group-hover:text-brand-gold transition-colors duration-300">
          {exp.title}
        </h3>

        <p className="text-brand-gold/70 text-[10px] font-sans-inter tracking-widest uppercase mb-4">
          {exp.tagline}
        </p>

        <p className="text-brand-charcoal/55 font-sans-inter font-light text-xs sm:text-sm leading-relaxed max-w-sm">
          {exp.description}
        </p>
      </div>

      <div className="w-full h-[1px] bg-brand-charcoal/10 mt-8 group-hover:bg-brand-morning-glory/35 transition-colors duration-500" />
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-brand-softwhite overflow-hidden border-t border-brand-gold/10">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(158,202,214,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-brand-gold tracking-[0.45em] text-xs font-semibold uppercase block mb-4 font-sans-inter">
            THE EXPERIENCE
          </span>
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-light text-brand-charcoal tracking-wide mb-6">
            Pillars of KÉLYS PERFUMERY
          </h2>
          <p className="text-brand-charcoal/55 font-sans-inter font-light text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            We reject mass production in favor of artistic integrity and uncompromising quality guidelines.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp.id} exp={exp} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
