import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
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
              <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => scrollToSection('home')}>
                Rays Innovations
              </h1>
            </div>
            
            {/* Desktop Navigation - All items on left */}
            <div className="hidden md:flex flex-1">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
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
                  
                  {/* Fixed positioned mega menu */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-0 top-16 z-[9999] mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                        style={{ 
                          width: 'min(96vw, 1600px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          maxHeight: '90vh',
                          overflowY: 'auto'
                        }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        {/* Hero Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          <div className="relative z-10 text-center">
                            <motion.h3 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-2xl font-bold mb-2"
                            >
                              Premium IT Services
                            </motion.h3>
                            <motion.p 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-blue-100 text-base"
                            >
                              Transform your business with our comprehensive technology solutions
                            </motion.p>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                          <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
                        </div>
                        
                        {/* Main Content */}
                        <div className="p-8">
                          {/* Services Grid - Perfectly Centered */}
                          <div className="mb-8">
                            <motion.h4 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-xl font-bold text-gray-900 mb-6 text-center"
                            >
                              All Services
                            </motion.h4>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center max-w-7xl mx-auto">
                              {Object.values(SERVICES).map((service, index) => (
                                <motion.button
                                  key={service.id}
                                  className={`group relative w-full max-w-[160px] p-4 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                                    hoveredService === service.id 
                                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-lg scale-105' 
                                      : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-gray-200 hover:border-blue-300'
                                  }`}
                                  onMouseEnter={() => setHoveredService(service.id)}
                                  onMouseLeave={() => setHoveredService(null)}
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    scrollToSection('services');
                                  }}
                                  initial={{ opacity: 0, y: 30 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.03, duration: 0.5 }}
                                  whileHover={{ y: -8 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {/* Glow effect */}
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                  
                                  <div className="relative flex flex-col items-center text-center space-y-3">
                                    {/* Enhanced Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                                      <i className={`${service.icon} text-white text-xl relative z-10`} />
                                    </div>
                                    
                                    {/* Service Info */}
                                    <div>
                                      <h5 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-700 transition-colors leading-tight">
                                        {service.title}
                                      </h5>
                                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-2">
                                        {service.shortDescription}
                                      </p>
                                    </div>
                                    
                                    {/* Hover indicator */}
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Service Details Panel */}
                          <AnimatePresence mode="wait">
                            {hoveredService ? (
                              <motion.div
                                key={hoveredService}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-6 border border-blue-100"
                              >
                                {(() => {
                                  const service = SERVICES[hoveredService as keyof typeof SERVICES];
                                  if (!service) return null;
                                  return (
                                    <div className="grid md:grid-cols-2 gap-6">
                                      {/* Left side - Service info */}
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center shadow-lg`}>
                                            <i className={`${service.icon} text-white text-2xl`} />
                                          </div>
                                          <div>
                                            <h4 className="font-bold text-gray-900 text-xl">{service.title}</h4>
                                            <p className="text-gray-600">{service.shortDescription}</p>
                                          </div>
                                        </div>
                                        
                                        <p className="text-gray-700 leading-relaxed">{service.description}</p>
                                      </div>
                                      
                                      {/* Right side - Features and CTA */}
                                      <div className="space-y-4">
                                        <div>
                                          <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
                                          <div className="grid grid-cols-1 gap-3">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                              <div key={idx} className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg">
                                                <i className={`${feature.icon} text-blue-600 mt-1`} />
                                                <div>
                                                  <span className="font-medium text-gray-800 text-sm">{feature.title}</span>
                                                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">{feature.description}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                          <button 
                                            className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                                            onClick={() => {
                                              setIsServicesOpen(false);
                                              scrollToSection('contact');
                                            }}
                                          >
                                            Get Started
                                          </button>
                                          <button 
                                            className="px-4 py-3 border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                                            onClick={() => {
                                              setIsServicesOpen(false);
                                              scrollToSection('services');
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
                                className="text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100"
                              >
                                <div className="space-y-3">
                                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                                    <i className="fas fa-hand-pointer text-blue-600 text-3xl" />
                                  </div>
                                  <h4 className="font-bold text-gray-900 text-lg">Explore Our Services</h4>
                                  <p className="text-gray-600">Hover over any service above to see detailed information and features</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Bottom CTA */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 pt-6 border-t border-gray-200 text-center"
                          >
                            <p className="text-gray-600 mb-4">Ready to transform your business with premium IT solutions?</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                              <motion.button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setIsServicesOpen(false);
                                  scrollToSection('contact');
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
                                  scrollToSection('contact');
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
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Blog
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>

                <motion.button
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
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
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Blog
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Contact
                </button>

                <div className="px-3 py-2">
                  <button
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => scrollToSection('contact')}
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
