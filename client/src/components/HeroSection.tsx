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
      
      {/* Ultra Premium Enhanced Overlay */}
      <div className="absolute inset-0 hero-enhanced-bg z-10" />
      
      {/* Revolutionary Liquid Background Shapes */}
      <div className="absolute inset-0 z-5 opacity-50">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/25 to-purple-500/15 hero-liquid-bg"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/15 hero-liquid-bg" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 hero-liquid-bg" style={{animationDelay: '6s'}}></div>
        
        {/* Additional floating geometric elements */}
        <div className="absolute top-32 right-32 w-16 h-16 bg-blue-400/20 rounded-lg hero-floating-elements" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-purple-400/25 rounded-full hero-floating-elements" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-cyan-400/30 hero-floating-elements" style={{animationDelay: '2s', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-pink-400/20 rounded-full hero-floating-elements" style={{animationDelay: '5s'}}></div>
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
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 80 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight hero-mega-title"
        >
          Transform Your Business with{' '}
          <motion.span
            className="hero-holographic block mt-4"
            animate={{ 
              scale: [1, 1.12, 1],
              rotateX: [0, 8, 0],
              rotateY: [0, -8, 0],
              rotateZ: [0, 2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.15,
              rotateY: 15,
              transition: { duration: 0.3 }
            }}
          >
            Innovation
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 100 }}
          className="text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto font-medium text-white/95"
          style={{
            textShadow: '0 6px 30px rgba(0,0,0,0.9), 0 3px 15px rgba(0,0,0,0.7), 0 0 20px rgba(59, 130, 246, 0.2)'
          }}
        >
          Leading IT consulting company specializing in{' '}
          <motion.span 
            className="text-blue-300 font-bold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.08, 
              rotateX: 5,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            AWS cloud solutions
          </motion.span>
          ,{' '}
          <motion.span 
            className="text-purple-300 font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.08, 
              rotateX: 5,
              textShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            AI development
          </motion.span>
          , and cutting-edge{' '}
          <motion.span 
            className="text-cyan-300 font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.08, 
              rotateX: 5,
              textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            web & mobile applications
          </motion.span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 1.2, type: "spring", stiffness: 80 }}
          className="flex flex-col sm:flex-row gap-8 justify-center"
        >
          <motion.button
            className="hero-button-ultra text-white px-12 py-7 rounded-3xl text-2xl font-bold shadow-2xl group"
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              rotateX: 5,
              boxShadow: "0 25px 80px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            onClick={() => scrollToSection('services')}
          >
            <span className="relative z-10 flex items-center gap-4">
              <motion.i 
                className="fas fa-rocket text-2xl"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              ></motion.i>
              Get Started Today
            </span>
          </motion.button>
          <motion.button
            className="border-4 border-white/70 text-white px-12 py-7 rounded-3xl text-2xl font-bold hover:bg-white/25 transition-all duration-500 backdrop-blur-lg group"
            whileHover={{ 
              scale: 1.1, 
              y: -5, 
              borderColor: "rgba(255,255,255,0.9)",
              backgroundColor: "rgba(255,255,255,0.15)",
              boxShadow: "0 25px 60px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            onClick={() => scrollToSection('about')}
          >
            <span className="flex items-center gap-4">
              <motion.i 
                className="fas fa-play text-2xl"
                whileHover={{ scale: 1.2, x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              ></motion.i>
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
