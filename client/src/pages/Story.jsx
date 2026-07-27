import React from 'react';
import { motion } from 'framer-motion';

const Story = () => {
  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="text-brand-gold font-sans-inter text-xs tracking-[0.45em] font-semibold uppercase block mb-3">
            MAISON KÉLYS
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal tracking-wide mb-6 font-light">
            Our Story & Persona
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] w-full border border-brand-gold/15 bg-brand-beige/40 p-4 mb-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-4 border border-brand-gold/10 pointer-events-none" />
          <img
            src="/about_perfume.png"
            alt="Maison KÉLYS Atelier"
            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000"
          />
        </div>

        {/* Narrative Columns */}
        <div className="space-y-16 font-sans-inter text-brand-charcoal/80 leading-relaxed font-light text-sm sm:text-base">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <h2 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-gold font-light tracking-wide md:col-span-1 border-b border-brand-gold/15 pb-4 md:border-0 md:pb-0">
              The Genesis
            </h2>
            <div className="md:col-span-2 space-y-4 text-justify">
              <p>
                KÉLYS was founded as an rebellion against mass-market olfactory conformity. We believe that a perfume should not merely be a pleasant scent, but a liquid memory—a physical transcription of a place, an emotion, or a secret desire.
              </p>
              <p>
                Born from an encounter between a Parisian master perfumer and a designer from the ancient, art-soaked city of Vadodara, India, KÉLYS merges structural European precision with the deep, intoxicating soul of Indian raw elements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <h2 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-gold font-light tracking-wide md:col-span-1 border-b border-brand-gold/15 pb-4 md:border-0 md:pb-0">
              The Syncretic Craft
            </h2>
            <div className="md:col-span-2 space-y-4 text-justify">
              <p>
                Each creation begins its formulation cycle in Paris, where complex accords are engineered using traditional French extraction methodologies. We filter and refine notes to achieve molecular weight and structural equilibrium, ensuring unmatched skin-longevity.
              </p>
              <p>
                The formula then integrates rich, locally harvested elements of Vadodara, Gujarat—specifically hand-finished jasmine sambac, regional sandalwood extracts, and resinous amber. This synthesis yields a perfume of extreme concentration (Extrait de Parfum), displaying evolving, multi-tiered accords over a 24-hour cycle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <h2 className="font-serif-cormorant text-2xl sm:text-3xl text-brand-gold font-light tracking-wide md:col-span-1 border-b border-brand-gold/15 pb-4 md:border-0 md:pb-0">
              Our Persona
            </h2>
            <div className="md:col-span-2 space-y-4 text-justify font-sans-inter text-brand-charcoal/70">
              <p className="italic font-serif-playfair text-brand-charcoal text-lg mb-4">
                "We do not design for the crowd. We design for the individual who demands to stand out, who understands luxury as an aesthetic statement rather than a luxury badge."
              </p>
              <p>
                KÉLYS stands for modern luxury—understated yet profoundly present. We use minimal white porcelain-like vessels housing golden, sun-drenched juices, matching a structural purity with raw, chaotic inner emotional depth.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Story;
