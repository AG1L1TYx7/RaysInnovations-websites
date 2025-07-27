import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES } from '@/lib/constants';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Images with Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide]})` }}
        />
      </AnimatePresence>
      
      {/* Ultra Premium Overlay with enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 z-10" />
      
      {/* Revolutionary Liquid Background Shapes */}
      <div className="absolute inset-0 z-5 opacity-40">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 hero-liquid-bg"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/25 to-pink-500/20 hero-liquid-bg" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-500/20 to-blue-500/15 hero-liquid-bg" style={{animationDelay: '6s'}}></div>
      </div>
      
      {/* Advanced Particle System */}
      <div className="hero-particle-system z-15">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `linear-gradient(45deg, ${
                ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)]
              }, transparent)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(59, 130, 246, 0.3)'
          }}
        >
          Transform Your Business with{' '}
          <motion.span
            className="hero-holographic block mt-2"
            animate={{ 
              scale: [1, 1.08, 1],
              rotateX: [0, 5, 0],
              rotateY: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Innovation
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 120 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto font-medium"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)'
          }}
        >
          Leading IT consulting company specializing in{' '}
          <motion.span 
            className="text-blue-300 font-bold"
            whileHover={{ scale: 1.05, color: "#60a5fa" }}
          >
            AWS cloud solutions
          </motion.span>
          ,{' '}
          <motion.span 
            className="text-purple-300 font-bold"
            whileHover={{ scale: 1.05, color: "#a78bfa" }}
          >
            AI development
          </motion.span>
          , and cutting-edge{' '}
          <motion.span 
            className="text-cyan-300 font-bold"
            whileHover={{ scale: 1.05, color: "#67e8f9" }}
          >
            web & mobile applications
          </motion.span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.9, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            className="hero-button-ultra text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => scrollToSection('services')}
          >
            <span className="relative z-10 flex items-center gap-3">
              <i className="fas fa-rocket"></i>
              Get Started Today
            </span>
          </motion.button>
          <motion.button
            className="border-3 border-white/60 text-white px-10 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 transition-all duration-400 backdrop-blur-sm"
            whileHover={{ scale: 1.08, y: -3, borderColor: "rgba(255,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => scrollToSection('about')}
          >
            <span className="flex items-center gap-3">
              <i className="fas fa-info-circle"></i>
              View Our Work
            </span>
          </motion.button>
        </motion.div>


      </div>
      
      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {HERO_IMAGES.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <i className="fas fa-chevron-down text-white text-xl opacity-75" />
      </motion.div>
    </section>
  );
}
