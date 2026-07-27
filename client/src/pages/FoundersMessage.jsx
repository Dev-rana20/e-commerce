import React from 'react';

const FoundersMessage = () => {
  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Paper Container */}
        <div className="bg-[#FCFAF7] border border-brand-gold/15 shadow-xl p-8 sm:p-16 max-w-2xl mx-auto relative overflow-hidden">
          {/* Subtle gold line trim */}
          <div className="absolute inset-4 border border-brand-gold/5 pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            {/* Header Stamp */}
            <div className="text-center border-b border-brand-gold/10 pb-6">
              <img
                src="/Kelys_Logo_Png.png"
                alt="KELYS Logo"
                className="h-10 w-auto mx-auto mb-2 object-contain"
              />
              <span className="text-brand-gold font-sans-inter text-[9px] tracking-[0.4em] uppercase font-semibold">
                MAISON DE PARFUM
              </span>
            </div>

            {/* Letter Body */}
            <div className="font-sans-inter text-brand-charcoal/80 text-xs sm:text-sm font-light leading-relaxed space-y-6 text-justify">
              <p className="font-serif-playfair text-brand-charcoal text-base italic">
                Dear Collector,
              </p>
              <p>
                Olfaction is the closest thing we have to time travel. A single breath can transport you to a summer monsoon in Vadodara, a crisp autumn morning along the Seine, or a forgotten childhood attic.
              </p>
              <p>
                When we founded KÉLYS, we set out with a singular, uncompromising mission: to return perfume to its rightful place as high art. In an era dominated by synthetic, factory-assembled scents, we wanted to champion the slow, Syncretic craft—where raw materials dictate their own timelines and formulations are finished by hand.
              </p>
              <p>
                We do not compromise on our ingredients. Our sandalwood is sustainably harvested from aged stands, our roses are picked at dawn before the morning dew evaporates, and our extraits are aged for six months in temperature-regulated dark cellars before bottling.
              </p>
              <p>
                Each bottle of KÉLYS you hold represents a conversation between Paris and Vadodara, a bridge between two worlds of art and craftsmanship. We hope it serves as a silent partner to your most treasured memories.
              </p>
              <p className="pt-4 font-serif-playfair text-brand-charcoal text-sm italic">
                Warmest regards,
              </p>
              <div className="pt-2">
                <p className="font-serif-cormorant text-xl text-brand-gold tracking-widest font-semibold uppercase">
                  The Founder
                </p>
                <p className="text-[10px] text-brand-charcoal/40 tracking-wider uppercase font-sans-inter font-bold">
                  Maison KÉLYS
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default FoundersMessage;
