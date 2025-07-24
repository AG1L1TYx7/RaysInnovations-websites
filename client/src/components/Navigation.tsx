import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { SERVICES } from '@/lib/constants';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
                        className="absolute left-0 mt-2 w-[95vw] max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
                        style={{ 
                          maxHeight: '85vh',
                          overflowY: 'auto'
                        }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 md:p-6 text-white">
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Our Services</h3>
                          <p className="text-blue-100 text-sm md:text-base">Comprehensive IT solutions to transform your business</p>
                        </div>
                        
                        <div className="p-6">
                          {/* All Services Grid */}
                          <div className="mb-8">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">All Our Services</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                              {Object.values(SERVICES).map((service, index) => (
                                <motion.button
                                  key={service.id}
                                  className="group p-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-100 hover:border-blue-200 cursor-pointer transition-all text-center hover:shadow-lg"
                                  onClick={() => setLocation('/services')}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ y: -2, scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex flex-col items-center space-y-3">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                      <i className={`${service.icon} text-white text-lg`} />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{service.title}</h5>
                                      <p className="text-xs text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors">{service.shortDescription}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Service Categories */}
                          <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-md font-bold text-gray-900 mb-4 text-center">Browse by Category</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {Object.entries(serviceCategories).map(([categoryId, category]) => (
                                <motion.button
                                  key={categoryId}
                                  className="group p-3 rounded-lg hover:bg-blue-50 border border-gray-100 hover:border-blue-200 cursor-pointer transition-all text-center"
                                  onClick={() => setLocation('/services')}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: Object.keys(serviceCategories).indexOf(categoryId) * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <div className="flex flex-col items-center space-y-2">
                                    <div className="bg-primary bg-opacity-10 group-hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                                      <i className={`${category.icon} text-primary text-lg`} />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 text-xs group-hover:text-blue-700 transition-colors">{category.title}</h5>
                                      <p className="text-xs text-gray-500">{category.services.length} services</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Need Custom Solutions?</h4>
                                <p className="text-xs md:text-sm text-gray-600">Let's discuss your specific requirements</p>
                              </div>
                              <motion.button
                                className="bg-accent text-white px-4 md:px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm md:text-base shrink-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('contact')}
                              >
                                Get Started
                              </motion.button>
                            </div>
                          </div>
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
                <button
                  onClick={() => setLocation('/client-portal')}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Client Portal
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
                <button
                  onClick={() => setLocation('/client-portal')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  Client Portal
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
