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
      
      {/* Ultra Premium Overlay with effects */}
      <div className="absolute inset-0 hero-ultra z-10" />
      
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
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight hero-text-glow"
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
          className="text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto font-medium"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)'
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
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
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

        {/* Revolutionary Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2, type: "spring", stiffness: 80 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: "fas fa-users", number: "500+", label: "Happy Clients", color: "from-blue-400 to-cyan-400" },
            { icon: "fas fa-project-diagram", number: "1000+", label: "Projects", color: "from-purple-400 to-pink-400" },
            { icon: "fas fa-award", number: "10+", label: "Years Experience", color: "from-green-400 to-emerald-400" },
            { icon: "fas fa-clock", number: "24/7", label: "Support", color: "from-orange-400 to-red-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="hero-stats-card rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30, rotateY: -20 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                rotateY: 5,
                rotateX: 5
              }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold mb-2 hero-holographic"
                whileHover={{ scale: 1.1 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </motion.div>
          ))}
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
