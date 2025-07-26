import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'wouter';
import { SERVICES } from '@/lib/constants';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    // If we're on the home page, scroll to section
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on a different page, navigate to home and then scroll
      if (sectionId === 'home') {
        setLocation('/');
      } else {
        setLocation('/#' + sectionId);
        // Use timeout to allow page navigation to complete
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
      cyan: 'text-cyan-500',
      indigo: 'text-indigo-500',
      emerald: 'text-emerald-500',
      red: 'text-red-500',
      slate: 'text-slate-500',
      amber: 'text-amber-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-blue-500';
  };

  const serviceCategories = {
    cloud: {
      title: 'Cloud Solutions',
      icon: 'fas fa-cloud',
      services: Object.values(SERVICES).filter(service => service.category === 'cloud')
    },
    ai: {
      title: 'AI & Analytics',
      icon: 'fas fa-brain',
      services: Object.values(SERVICES).filter(service => service.category === 'ai' || service.category === 'analytics')
    },
    development: {
      title: 'Development',
      icon: 'fas fa-code',
      services: Object.values(SERVICES).filter(service => service.category === 'development')
    },
    operations: {
      title: 'Operations & Security',
      icon: 'fas fa-shield-alt',
      services: Object.values(SERVICES).filter(service => service.category === 'operations' || service.category === 'security')
    }
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 mr-10">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">
                  Rays Innovations
                </h1>
              </Link>
            </div>
            
            {/* Desktop Navigation - All items on left */}
            <div className="hidden md:flex flex-1">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => navigateToSection('home')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </button>
                
                {/* Services Mega Menu */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium flex items-center transition-colors">
                    Services
                    <motion.i 
                      className="fas fa-chevron-down ml-1 text-xs"
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                  
                  {/* Absolute positioned mega menu */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute z-[9999] bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                        style={{ 
                          top: 'calc(100% + 8px)',
                          left: '-100px',
                          width: '800px',
                          maxWidth: '85vw',
                          maxHeight: '75vh',
                          overflowY: 'auto'
                        }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        {/* Hero Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-5 text-white relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          <div className="relative z-10 text-center">
                            <motion.h3 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-xl font-bold mb-1"
                            >
                              Premium IT Services
                            </motion.h3>
                            <motion.p 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-blue-100 text-sm"
                            >
                              Transform your business with our comprehensive technology solutions
                            </motion.p>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-lg"></div>
                        </div>
                        
                        {/* Main Content - Centered Services */}
                        <div className="p-5">
                          <motion.h4 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg font-bold text-gray-900 mb-4 text-center"
                          >
                            All Services
                          </motion.h4>
                          
                          <div 
                            className="grid grid-cols-3 gap-4"
                            onMouseLeave={() => setHoveredService(null)}
                          >
                                {Object.values(SERVICES).map((service, index) => (
                                  <motion.button
                                    key={service.id}
                                    className={`group relative w-full p-3 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                                      hoveredService === service.id 
                                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-md scale-105' 
                                        : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-gray-200 hover:border-blue-300'
                                    }`}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onClick={() => {
                                      setIsServicesOpen(false);
                                      navigateToSection('services');
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {/* Glow effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                    
                                    <div className="relative flex items-center space-x-3 text-left">
                                      {/* Enhanced Icon */}
                                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md relative overflow-hidden flex-shrink-0`}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                                        <i className={`${service.icon} text-white text-sm relative z-10`} />
                                      </div>
                                      
                                      {/* Service Info */}
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors leading-tight">
                                          {service.title}
                                        </h5>
                                        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors line-clamp-1">
                                          {service.shortDescription}
                                        </p>
                                      </div>
                                      
                                      {/* Hover indicator */}
                                      <i className="fas fa-chevron-right text-gray-400 group-hover:text-blue-600 text-xs transition-colors"></i>
                                    </div>
                                  </motion.button>
                                ))}
                          </div>

                          {/* Service Details Panel - Below Grid */}
                          <AnimatePresence mode="wait">
                            {hoveredService ? (
                              <motion.div
                                key={hoveredService}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200"
                                onMouseEnter={() => setHoveredService(hoveredService)}
                                onMouseLeave={() => setHoveredService(null)}
                              >
                                  {(() => {
                                    const service = SERVICES[hoveredService as keyof typeof SERVICES];
                                    if (!service) return null;
                                    return (
                                      <div className="space-y-5">
                                        {/* Service Header */}
                                        <div className="flex items-center space-x-4">
                                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center shadow-lg`}>
                                            <i className={`${service.icon} text-white text-xl`} />
                                          </div>
                                          <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{service.title}</h4>
                                            <p className="text-gray-600 text-sm">{service.shortDescription}</p>
                                          </div>
                                        </div>
                                        
                                        {/* Service Description */}
                                        <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
                                        
                                        {/* Key Features */}
                                        <div>
                                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h5>
                                          <div className="space-y-2">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                              <div key={idx} className="flex items-start space-x-2 p-2 bg-white/80 rounded-lg border border-gray-100">
                                                <i className={`${feature.icon} text-blue-600 mt-0.5 text-sm`} />
                                                <div>
                                                  <span className="font-medium text-gray-800 text-sm">{feature.title}</span>
                                                  <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{feature.description}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        
                                        {/* Call to Action */}
                                        <div className="pt-4 border-t border-gray-200">
                                          <div className="flex gap-3">
                                            <button 
                                              className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                                              onClick={() => {
                                                setIsServicesOpen(false);
                                                navigateToSection('contact');
                                              }}
                                            >
                                              Get Started
                                            </button>
                                            <button 
                                              className="px-4 py-3 border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                                              onClick={() => {
                                                setIsServicesOpen(false);
                                                navigateToSection('services');
                                              }}
                                            >
                                              Learn More
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 flex items-center justify-center text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-8"
                                    onMouseEnter={() => setHoveredService(null)}
                                  >
                                    <div className="space-y-3">
                                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                                        <i className="fas fa-hand-pointer text-blue-600 text-2xl" />
                                      </div>
                                      <h4 className="font-bold text-gray-900 text-base">Discover Our Services</h4>
                                      <p className="text-gray-600 text-sm">Hover over any service above to see details</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                        {/* Bottom CTA */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="px-8 pb-8 pt-6 border-t border-gray-200 text-center"
                        >
                          <p className="text-gray-600 mb-4">Ready to transform your business with premium IT solutions?</p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button
                              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setIsServicesOpen(false);
                                navigateToSection('contact');
                              }}
                            >
                              <i className="fas fa-rocket mr-2"></i>
                              Start Your Project
                            </motion.button>
                            <motion.button
                              className="border-2 border-blue-300 text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setIsServicesOpen(false);
                                navigateToSection('contact');
                              }}
                            >
                              <i className="fas fa-calendar-alt mr-2"></i>
                              Book Consultation
                            </motion.button>
                          </div>
                        </motion.div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={() => navigateToSection('about')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <Link href="/blog" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                  Blog
                </Link>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>

                <motion.button
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateToSection('contact')}
                >
                  Book Consultation
                </motion.button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-gray-700 hover:text-primary p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.i 
                  className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => navigateToSection('home')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection('services')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => navigateToSection('about')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  About
                </button>
                <Link href="/blog" className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  Blog
                </Link>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Contact
                </button>

                <div className="px-3 py-2">
                  <button
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => navigateToSection('contact')}
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
