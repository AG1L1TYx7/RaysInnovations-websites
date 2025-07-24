import { useState, useEffect } from 'react';
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide]})` }}
        />
      </AnimatePresence>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-shadow"
        >
          Transform Your Business with{' '}
          <motion.span
            className="bg-gradient-accent bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Innovation
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          Leading IT consulting company specializing in AWS cloud solutions, AI development,
          and cutting-edge web & mobile applications
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('services')}
          >
            Get Started Today
          </motion.button>
          <motion.button
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
          >
            View Our Work
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
