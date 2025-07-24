import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  


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
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => scrollToSection('home')}>
                Rays Innovations
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
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
                        className="fixed w-[90vw] max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
                        style={{ 
                          top: '64px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          maxHeight: '80vh',
                          overflowY: 'auto'
                        }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 md:p-6 text-white">
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Our Services</h3>
                          <p className="text-blue-100 text-sm md:text-base">Comprehensive IT solutions to transform your business</p>
                        </div>
                        
                        <div className="p-4 md:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {Object.entries(serviceCategories).map(([categoryId, category]) => (
                              <motion.div
                                key={categoryId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Object.keys(serviceCategories).indexOf(categoryId) * 0.1 }}
                                className="space-y-4"
                              >
                                <div className="flex items-center mb-4">
                                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
                                    <i className={`${category.icon} text-primary text-lg`} />
                                  </div>
                                  <h4 className="font-bold text-gray-900 text-lg">{category.title}</h4>
                                </div>
                                
                                <div className="space-y-2">
                                  {category.services.map((service) => (
                                    <motion.button
                                      key={service.id}
                                      className="w-full p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all text-left group/item border border-transparent hover:border-gray-200"
                                      onClick={() => scrollToSection('services')}
                                      whileHover={{ x: 3 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <div className="flex items-start">
                                        <i className={`${service.icon} ${getColorClasses(service.color)} mr-2 group-hover/item:scale-110 transition-transform text-sm`} />
                                        <div className="min-w-0 flex-1">
                                          <h5 className="font-semibold text-gray-900 text-xs mb-1 truncate">{service.title}</h5>
                                          <p className="text-xs text-gray-600 line-clamp-1">{service.shortDescription}</p>
                                        </div>
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
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
