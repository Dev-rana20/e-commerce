import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import PerfumeBottle3D from './PerfumeBottle3D';
import { useCart } from '../context/CartContext';

// Butterfly SVG component with wing flapping and flight hover animations
const Butterfly = ({ width = 60, height = 60, direction = 'left' }) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: direction === 'left' ? -15 : 15 }}
      animate={{ 
        y: [0, -12, 0],
        rotate: direction === 'left' ? [-15, -8, -15] : [15, 8, 15]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      className="relative pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
      style={{ width, height }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Left Wing Group */}
        <motion.g
          animate={{ scaleX: [1, 0.15, 1] }}
          transition={{ duration: 0.22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          {/* Main Wing Shape */}
          <path
            d="M 50,50 C 30,15 10,20 15,45 C 18,60 35,62 50,55 C 38,68 25,72 20,60"
            fill="#E67E22"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />
          {/* Inner Wing details/lines */}
          <path d="M 45,48 C 30,35 25,38 20,42 M 43,51 C 32,48 28,52 24,56" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
          {/* White spots on border */}
          <circle cx="18" cy="30" r="1.5" fill="white" />
          <circle cx="14" cy="40" r="1.5" fill="white" />
          <circle cx="16" cy="48" r="1.5" fill="white" />
        </motion.g>

        {/* Right Wing Group */}
        <motion.g
          animate={{ scaleX: [1, 0.15, 1] }}
          transition={{ duration: 0.22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          {/* Main Wing Shape */}
          <path
            d="M 50,50 C 70,15 90,20 85,45 C 82,60 65,62 50,55 C 62,68 75,72 80,60"
            fill="#E67E22"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />
          {/* Inner Wing details/lines */}
          <path d="M 55,48 C 70,35 75,38 80,42 M 57,51 Q 68,47 76,56" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
          <circle cx="82" cy="30" r="1.5" fill="white" />
          <circle cx="86" cy="40" r="1.5" fill="white" />
          <circle cx="84" cy="48" r="1.5" fill="white" />
        </motion.g>

        {/* Body and head */}
        <ellipse cx="50" cy="50" rx="2.5" ry="14" fill="#2C3E50" />
        <circle cx="50" cy="34" r="3.2" fill="#1A1A1A" />
        
        {/* Antennae */}
        <path d="M 49,31 Q 45,22 40,24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M 51,31 Q 55,22 60,24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
};

const Hero = () => {
  const { setCartOpen, cartCount } = useCart();
  const [toggleState, setToggleState] = useState(false);

  // Mockup cards list as specified
  const mockupCards = [
    { name: 'Chanel NO 5', price: 15.00, volume: '500ml', image: '/eclat.png' },
    { name: 'Miss Dior Eau Di', price: 18.00, volume: '250ml', image: '/nocturne.png' },
    { name: 'Coco Mademoi', price: 15.00, volume: '500ml', image: '/santal_noir.png' }
  ];

  return (
    <section className="w-full bg-[#F0F0F0] py-16 px-4 md:px-8 flex items-center justify-center font-sans-inter">
      {/* 1200px Floating Hero Card */}
      <div 
        className="max-w-[1200px] w-full rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] relative overflow-hidden flex flex-col justify-between p-[30px] md:p-[50px] md:px-[60px] min-h-[750px] md:min-h-[820px] select-none"
        style={{ background: 'linear-gradient(135deg, #8B7A45 0%, #B8A96C 50%, #DED4A6 100%)' }}
      >
        
        {/* Ambient Glows & Concentric Rings in the Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-[60%] h-[60%] rounded-full blur-3xl opacity-[0.18]" style={{ background: 'radial-gradient(circle, #C8A34A 0%, transparent 70%)' }} />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-white/8 animate-[pulse-slow_6s_ease-in-out_infinite]" />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/6 animate-[pulse-slow_8s_ease-in-out_infinite_1s]" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/4 animate-[pulse-slow_10s_ease-in-out_infinite_2s]" />
        </div>

        {/* Absolute Butterflies */}
        {/* 1. Large butterfly bottom-left corner */}
        <div className="absolute bottom-20 left-10 z-20 pointer-events-none rotate-[-10deg]">
          <Butterfly width={95} height={95} direction="left" />
        </div>
        {/* 2. Smaller butterfly mid-right */}
        <div className="absolute top-[35%] right-[22%] z-20 pointer-events-none rotate-[15deg]">
          <Butterfly width={65} height={65} direction="right" />
        </div>


        {/* HERO HEADLINE SECTION */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center my-auto relative z-20 gap-4 md:gap-0 mt-8 md:mt-12 select-none">
          {/* Left half */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex justify-center md:justify-end md:pr-6"
          >
            <h1 className="font-poppins font-black text-white text-5xl sm:text-6xl md:text-[72px] leading-none tracking-tight text-center md:text-right">
              Discover Your
            </h1>
          </motion.div>
          
          {/* Center Product Image Wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-[280px] h-[300px] md:w-[320px] md:h-[350px] shrink-0 relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing md:-mx-4 z-30"
          >
            <PerfumeBottle3D />
            
            {/* Contact Shadow beneath the bottle */}
            <div className="absolute bottom-1 w-32 h-3.5 bg-black/20 rounded-full blur-md opacity-65 pointer-events-none animate-pulse-slow" />
          </motion.div>

          {/* Right half */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex justify-center md:justify-start md:pl-6"
          >
            <h1 className="font-poppins font-black text-white text-5xl sm:text-6xl md:text-[72px] leading-none tracking-tight text-center md:text-left">
              Perfect
            </h1>
          </motion.div>
        </div>

        {/* SIDE DESCRIPTIONS SECTION */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 py-8 relative z-20">
          {/* Left Subtext */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex-1 flex items-start gap-3 max-w-[320px] text-left md:pl-4"
          >
            <div className="w-[2px] h-[48px] bg-white shrink-0 mt-0.5" />
            <p className="text-white text-[18px] font-light leading-relaxed font-sans-inter">
              Discover the perfect fragrance for you with our wide selection of perfumes.
            </p>
          </motion.div>

          {/* Center Balancer Spacer */}
          <div className="w-[280px] md:w-[320px] shrink-0 pointer-events-none" />

          {/* Right Side Element */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex-grow flex-1 flex flex-col items-center md:items-end md:pr-4 text-center md:text-right"
          >
            {/* Toggle switch slider */}
            <div 
              onClick={() => setToggleState(!toggleState)}
              className="w-[50px] h-[28px] bg-black rounded-full p-[3px] flex items-center cursor-pointer transition-colors duration-300 select-none mb-3 shadow-md border border-white/10"
            >
              <motion.div 
                layout 
                className="w-[22px] h-[22px] bg-white rounded-full" 
                animate={{ x: toggleState ? 22 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
            
            <p className="text-white text-[16px] leading-relaxed max-w-[280px] font-sans-inter">
              A truly timeless Eau De Parfum became one of the most beloved.
            </p>
          </motion.div>
        </div>

        {/* BOTTOM SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 mt-auto pt-8 border-t border-white/10 relative z-20"
        >
          {/* Left Column: Title label */}
          <div className="text-center lg:text-left lg:max-w-[180px] shrink-0">
            <h2 className="font-serif-cormorant text-[32px] font-bold text-brand-charcoal leading-[1.1] tracking-normal uppercase">
              Best <br className="hidden lg:block"/>Selling <br className="hidden lg:block"/>Products
            </h2>
          </div>

          {/* Middle Column: Arch product cards */}
          <div className="flex items-center justify-center gap-[20px] flex-wrap my-4 lg:my-0">
            {mockupCards.map((card, idx) => (
              <Link
                to="/shop"
                key={idx}
                className="w-[150px] h-[220px] rounded-t-full bg-white backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-white/40 flex flex-col items-center justify-between p-3.5 pb-5.5 transition-all duration-500 hover:scale-105 hover:shadow-xl group"
              >
                {/* Arch image */}
                <div className="w-full aspect-[4/5] rounded-t-full overflow-hidden flex items-center justify-center pt-2 relative bg-brand-softwhite/40 border border-brand-burgundy/5">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="text-center mt-2.5 w-full px-0.5">
                  <h3 className="font-sans-inter text-[15px] font-bold text-[#1A1A1A] truncate">
                    {card.name}
                  </h3>
                  <p className="text-[13px] text-[#4A4A4A] font-sans-inter mt-1">
                    ${card.price.toFixed(2)} ({card.volume})
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column: Offer and CTA link */}
          <div className="text-center lg:text-right lg:max-w-[220px] shrink-0 flex flex-col items-center lg:items-end font-sans-inter">
            <span className="font-serif-cormorant text-[36px] font-bold text-[#1A1A1A] leading-tight block">
              25% Off
            </span>
            <span className="text-[16px] text-[#4A4A4A] font-normal block mt-1">
              Our all-new arrivals
            </span>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-1.5 font-bold text-[13px] text-[#1A1A1A] tracking-[0.18em] uppercase mt-5 border-b border-black/60 pb-1 hover:border-black transition-colors duration-300"
            >
              EXPLORE APP ↗
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
