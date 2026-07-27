import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Droplet, Wind, Sparkles, BookOpen, Layers, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ingredientsData } from '../data/ingredientsData';

const RawMaterials = () => {
  const [selectedId, setSelectedId] = useState(ingredientsData[0].id);
  const activeIngredient = ingredientsData.find((item) => item.id === selectedId) || ingredientsData[0];
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'extraction'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute SVG Radar Chart points dynamically
  const getRadarPoints = (matrix) => {
    const size = 180;
    const center = size / 2;
    const maxVal = 100;
    const radius = 70;
    
    return matrix.map((item, idx) => {
      const angle = (idx * 2 * Math.PI) / matrix.length - Math.PI / 2;
      const valueRatio = item.value / maxVal;
      const r = radius * valueRatio;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, label: item.label, value: item.value };
    });
  };

  const radarPoints = getRadarPoints(activeIngredient.olfactoryMatrix);
  const polygonPointsStr = radarPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Get fixed background grid lines for radar
  const radarGridLines = [0.25, 0.5, 0.75, 1.0].map((ratio) => {
    const size = 180;
    const center = size / 2;
    const radius = 70 * ratio;
    
    return ingredientsData[0].olfactoryMatrix.map((_, idx) => {
      const angle = (idx * 2 * Math.PI) / ingredientsData[0].olfactoryMatrix.length - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  });

  return (
    <div className="relative min-h-screen bg-brand-softwhite pt-28 pb-20 text-brand-charcoal overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200, 163, 74, 0.3) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(88, 24, 31, 0.15) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Link & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-gold/15 pb-8 gap-6">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-[10px] tracking-[0.2em] text-brand-burgundy hover:text-brand-gold transition-colors duration-300 uppercase font-semibold mb-6 group cursor-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Link>
            
            <span className="text-brand-gold tracking-[0.45em] text-[10px] font-semibold uppercase block mb-3 font-sans-inter">
              Nature's Secret Library
            </span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal tracking-wide">
              The Raw Materials
            </h1>
          </div>
          
          <p className="max-w-md text-brand-charcoal/60 font-sans-inter font-light text-xs sm:text-sm leading-relaxed text-left">
            An archive of rare, ethically sourced botanical and resin absolute essences. Explore their origins, extraction methods, and molecular notes.
          </p>
        </div>

        {/* Desktop Split View / Mobile Column View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: ARCHIVE DRAWER INDEX (4 Columns on Desktop) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <h3 className="font-sans-inter text-[10px] tracking-[0.3em] uppercase text-brand-burgundy font-bold mb-4 border-b border-brand-burgundy/10 pb-2 text-left">
              BOTANICAL CATALOGUE
            </h3>
            
            <div className="flex flex-col space-y-2.5 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {ingredientsData.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setActiveTab('profile');
                    }}
                    className={`w-full text-left p-4 rounded-none transition-all duration-500 border cursor-none flex items-center justify-between ${
                      isActive
                        ? 'bg-brand-burgundy border-brand-burgundy shadow-lg text-brand-softwhite shadow-brand-burgundy/10'
                        : 'bg-brand-beige/40 border-brand-gold/10 hover:border-brand-gold/30 hover:bg-brand-beige/70 text-brand-charcoal'
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-sans-inter text-[9px] font-bold tracking-widest ${isActive ? 'text-brand-gold' : 'text-brand-burgundy'}`}>
                          {item.number}
                        </span>
                        <span className="font-serif-cormorant text-lg font-normal tracking-wide">
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-[9px] font-sans-inter tracking-wider ${isActive ? 'text-brand-softwhite/60' : 'text-brand-charcoal/50'}`}>
                        {item.scientificName}
                      </span>
                    </div>

                    <div className="flex flex-col items-end space-y-1">
                      <span className={`text-[8px] font-sans-inter tracking-widest uppercase px-2 py-0.5 rounded-sm font-semibold ${
                        isActive 
                          ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30' 
                          : 'bg-brand-charcoal/5 text-brand-charcoal/60 border border-brand-charcoal/10'
                      }`}>
                        {item.noteType.split(' ')[0]}
                      </span>
                      <span className={`text-[9px] font-sans-inter ${isActive ? 'text-brand-softwhite/50' : 'text-brand-charcoal/40'}`}>
                        {item.origin.split(',').pop().trim()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: BOTANICAL ACTIVE FOLIO (8 Columns on Desktop) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="luxury-glass p-6 sm:p-10 flex flex-col space-y-8 rounded-none text-left"
              >
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-brand-gold/15 pb-6">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2">
                      <span className="text-[10px] font-sans-inter tracking-[0.2em] text-brand-gold font-bold uppercase">
                        {activeIngredient.noteType}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span className="text-[10px] font-sans-inter tracking-[0.2em] text-brand-charcoal/50 uppercase font-semibold">
                        ID: {activeIngredient.number}
                      </span>
                    </div>

                    <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-light text-brand-charcoal mb-1">
                      {activeIngredient.name}
                    </h2>
                    <p className="font-sans-inter text-xs italic text-brand-charcoal/60">
                      {activeIngredient.scientificName}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="text-[10px] font-sans-inter tracking-widest text-brand-burgundy font-bold uppercase mb-1">
                      Sourcing Location
                    </span>
                    <span className="font-serif-cormorant text-lg text-brand-charcoal italic">
                      {activeIngredient.origin}
                    </span>
                  </div>
                </div>

                {/* Main Content Split: Image & Olfactory description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Photo Frame Container */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative p-2.5 bg-brand-beige border border-brand-gold/30 shadow-md group overflow-hidden w-full max-w-[240px] aspect-[4/5]">
                      <div className="absolute inset-0 border border-brand-gold/10 m-1.5 pointer-events-none z-10" />
                      
                      <motion.div 
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="w-full h-full bg-brand-softwhite relative overflow-hidden flex items-center justify-center"
                      >
                        <img
                          src={activeIngredient.image}
                          alt={activeIngredient.name}
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/10 to-transparent pointer-events-none" />
                      </motion.div>
                    </div>
                    
                    <span className="text-[9px] font-sans-inter tracking-wider text-brand-charcoal/40 mt-3 text-center uppercase">
                      Botanical Plate No. {activeIngredient.number}
                    </span>
                  </div>

                  {/* Profile & Description details */}
                  <div className="md:col-span-7 flex flex-col space-y-4">
                    <span className="text-brand-charcoal/50 text-[10px] font-sans-inter tracking-[0.25em] uppercase italic">
                      “ {activeIngredient.vibe} ”
                    </span>
                    
                    <p className="text-brand-charcoal/70 font-sans-inter font-light text-xs sm:text-sm leading-relaxed">
                      {activeIngredient.description}
                    </p>

                    {/* Scent Pairings */}
                    <div className="pt-4 border-t border-brand-gold/10">
                      <h4 className="text-[10px] font-sans-inter tracking-widest text-brand-burgundy font-bold uppercase mb-2">
                        COMPLEMENTARY SCENT PAIRINGS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeIngredient.pairings.map((pair, index) => (
                          <span 
                            key={index}
                            className="bg-brand-beige border border-brand-gold/20 text-brand-charcoal/80 text-[10px] font-sans-inter tracking-wider px-2.5 py-1"
                          >
                            {pair}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Featured In Fragrance */}
                    <div className="pt-3">
                      <span className="text-[10px] font-sans-inter tracking-widest text-brand-charcoal/50 uppercase font-semibold mr-2">
                        CORE ESSENCE OF:
                      </span>
                      <Link 
                        to="/shop" 
                        className="inline-flex items-center space-x-1.5 text-brand-burgundy hover:text-brand-gold font-serif-cormorant text-base font-semibold group cursor-none"
                      >
                        <span>{activeIngredient.featuredIn}</span>
                        <span className="text-xs group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Interactive Segmented Tabs: Profile & Properties vs. Extraction process */}
                <div className="pt-6 border-t border-brand-gold/15">
                  <div className="flex border-b border-brand-gold/10 mb-6">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`pb-3 pr-6 text-[10px] tracking-[0.2em] font-sans-inter font-bold uppercase transition-colors duration-300 relative cursor-none ${
                        activeTab === 'profile' ? 'text-brand-burgundy' : 'text-brand-charcoal/40 hover:text-brand-charcoal'
                      }`}
                    >
                      OLFACTORY SPECTRUM
                      {activeTab === 'profile' && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-6 h-[2px] bg-brand-burgundy" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('extraction')}
                      className={`pb-3 px-6 text-[10px] tracking-[0.2em] font-sans-inter font-bold uppercase transition-colors duration-300 relative cursor-none ${
                        activeTab === 'extraction' ? 'text-brand-burgundy' : 'text-brand-charcoal/40 hover:text-brand-charcoal'
                      }`}
                    >
                      HARVEST & EXTRACTION
                      {activeTab === 'extraction' && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-6 right-6 h-[2px] bg-brand-burgundy" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'profile' ? (
                      <motion.div
                        key="tab-profile"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        {/* Radar Chart Visualizer */}
                        <div className="md:col-span-5 flex justify-center">
                          <div className="relative w-[180px] h-[180px] bg-brand-beige/40 rounded-full border border-brand-gold/10 p-2">
                            <svg width="100%" height="100%" viewBox="0 0 180 180" className="overflow-visible">
                              {/* Background polygons for grid lines */}
                              {radarGridLines.map((points, idx) => (
                                <polygon
                                  key={idx}
                                  points={points}
                                  fill="none"
                                  stroke="rgba(200, 163, 74, 0.15)"
                                  strokeWidth="1"
                                />
                              ))}

                              {/* Outer label connectors */}
                              {radarPoints.map((p, idx) => {
                                const angle = (idx * 2 * Math.PI) / radarPoints.length - Math.PI / 2;
                                const size = 180;
                                const center = size / 2;
                                const xOuter = center + 70 * Math.cos(angle);
                                const yOuter = center + 70 * Math.sin(angle);
                                return (
                                  <line
                                    key={idx}
                                    x1={center}
                                    y1={center}
                                    x2={xOuter}
                                    y2={yOuter}
                                    stroke="rgba(200, 163, 74, 0.12)"
                                    strokeWidth="1"
                                  />
                                );
                              })}

                              {/* Active filled polygon points */}
                              <motion.polygon
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                points={polygonPointsStr}
                                fill="rgba(88, 24, 31, 0.08)"
                                stroke="#58181F"
                                strokeWidth="1.5"
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />

                              {/* Active points handles */}
                              {radarPoints.map((p, idx) => (
                                <circle
                                  key={idx}
                                  cx={p.x}
                                  cy={p.y}
                                  r="3"
                                  fill="#C8A34A"
                                  stroke="#FAF6F0"
                                  strokeWidth="1"
                                />
                              ))}
                            </svg>
                          </div>
                        </div>

                        {/* Sliders Profile Detail */}
                        <div className="md:col-span-7 grid grid-cols-2 gap-4">
                          {activeIngredient.olfactoryMatrix.map((item, idx) => (
                            <div key={idx} className="flex flex-col space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-sans-inter">
                                <span className="font-semibold text-brand-charcoal/70 uppercase tracking-wider">{item.label}</span>
                                <span className="text-brand-burgundy font-bold">{item.value}%</span>
                              </div>
                              <div className="h-[3px] w-full bg-brand-charcoal/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.value}%` }}
                                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                                  className="h-full bg-brand-gold"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tab-extraction"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row gap-8 items-start"
                      >
                        <div className="w-full luxury-glass-light p-6 border border-brand-gold/15">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-brand-burgundy/10 p-2 border border-brand-burgundy/25 rounded-none text-brand-burgundy">
                              <Droplet className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-sans-inter tracking-widest text-brand-burgundy font-bold uppercase">
                                ARTISAN PROCESS
                              </h4>
                              <p className="text-[10px] font-sans-inter text-brand-charcoal/50 uppercase">
                                Traditional Curing & Extraction Method
                              </p>
                            </div>
                          </div>
                          <p className="text-brand-charcoal/70 font-sans-inter font-light text-xs sm:text-sm leading-relaxed mb-4">
                            {activeIngredient.extraction}
                          </p>
                          <div className="flex flex-wrap gap-4 text-[10px] font-sans-inter text-brand-charcoal/60">
                            <span className="flex items-center space-x-1.5 bg-brand-beige px-2.5 py-1">
                              <Compass className="w-3.5 h-3.5 text-brand-gold" />
                              <span>ETHICALLY HARVESTED</span>
                            </span>
                            <span className="flex items-center space-x-1.5 bg-brand-beige px-2.5 py-1">
                              <Wind className="w-3.5 h-3.5 text-brand-gold" />
                              <span>100% PURE ESSENCE</span>
                            </span>
                            <span className="flex items-center space-x-1.5 bg-brand-beige px-2.5 py-1">
                              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                              <span>ZERO SYNTHETICS</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RawMaterials;
