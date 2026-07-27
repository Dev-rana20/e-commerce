import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Collection from '../components/Collection';
import Experience from '../components/Experience';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      {/* Main Content — Integrated inside GlobalLayout (Navbar & Footer provided globally) */}
      <div className="relative z-10">
        <Hero />
        <Collection />
        <About />
        <Experience />
        <Reviews />
        <Contact />
      </div>
    </>
  );
};

export default Home;
