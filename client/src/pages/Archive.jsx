import React from 'react';

const Archive = () => {
  const archives = [
    {
      id: 1,
      title: 'Scenting The Void: The Oud Accords',
      date: 'April 2026',
      excerpt: 'Deep diving into our ethical sourcing of Agarwood from Eastern India and the meticulous aging process in French oak casks.',
      image: '/about_perfume.png',
      category: 'Olfactory Notes'
    },
    {
      id: 2,
      title: 'The White Porcelain Vessel: Structural Purity',
      date: 'February 2026',
      excerpt: 'Exploring the design ethos behind KÉLYS ceramic bottles, inspired by minimalism and the touch of cool river stone.',
      image: '/nocturne.png',
      category: 'Design Philosophy'
    },
    {
      id: 3,
      title: 'Vadodara Jasmine Chronicles: Harvest at Dawn',
      date: 'January 2026',
      excerpt: 'A photo journal tracking the early morning harvest of Jasmine Sambac in Gujarat, capturing the raw botanical oil seconds after picking.',
      image: '/eclat.png',
      category: 'Sourcing Journals'
    }
  ];

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="border-b border-brand-gold/15 pb-8 mb-16">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            KÉLYS CHRONICLES
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
            The Brand Archive
          </h1>
          <p className="text-brand-charcoal/50 font-sans-inter text-xs sm:text-sm font-light mt-3 max-w-xl leading-relaxed">
            A repository of artistic experiments, raw botanical reports, and olfactory journals detailing the conceptual life of our perfumes.
          </p>
        </div>

        {/* List of Journal Entries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {archives.map((entry) => (
            <article
              key={entry.id}
              className="luxury-glass p-6 flex flex-col justify-between group hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="aspect-[4/3] w-full border border-brand-gold/10 overflow-hidden mb-6 relative bg-brand-beige/20 flex items-center justify-center p-2">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-gold px-2.5 py-1 text-[9px] font-sans-inter tracking-widest text-brand-softwhite uppercase font-bold shadow-sm">
                    {entry.category}
                  </div>
                </div>

                <span className="text-[10px] font-sans-inter text-brand-charcoal/40 tracking-wider uppercase font-semibold">
                  {entry.date}
                </span>
                
                <h3 className="font-serif-cormorant text-2xl text-brand-charcoal hover:text-brand-gold transition-colors mt-2 mb-4 leading-snug">
                  {entry.title}
                </h3>
                
                <p className="text-brand-charcoal/60 font-sans-inter text-xs font-light leading-relaxed mb-6">
                  {entry.excerpt}
                </p>
              </div>

              <button className="w-full py-3 bg-transparent border border-brand-charcoal/15 text-brand-charcoal/70 group-hover:text-brand-morning-glory group-hover:border-brand-morning-glory/50 text-[9px] font-sans-inter tracking-[0.25em] uppercase hover:bg-brand-morning-glory/5 transition-all duration-300">
                Read Entry
              </button>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Archive;
