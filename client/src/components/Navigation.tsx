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
                        className="fixed left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] mx-auto max-w-7xl"
                        style={{ 
                          maxHeight: '85vh',
                          overflowY: 'auto',
                          top: '64px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 'min(95vw, 1400px)'
                        }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 md:p-6 text-white">
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Our Services</h3>
                          <p className="text-blue-100 text-sm md:text-base">Comprehensive IT solutions to transform your business</p>
                        </div>
                        
                        <div className="flex">
                          {/* Left Side - Services Grid */}
                          <div className="w-2/3 p-6 border-r border-gray-200">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">All Our Services</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                              {Object.values(SERVICES).map((service, index) => (
                                <motion.button
                                  key={service.id}
                                  className={`group p-3 md:p-4 rounded-xl border transition-all text-center hover:shadow-lg ${
                                    hoveredService === service.id 
                                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-md' 
                                      : 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-gray-100 hover:border-blue-200'
                                  }`}
                                  onMouseEnter={() => setHoveredService(service.id)}
                                  onMouseLeave={() => setHoveredService(null)}
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    scrollToSection('services');
                                  }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ y: -2, scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex flex-col items-center space-y-2 md:space-y-3">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                      <i className={`${service.icon} text-white text-sm md:text-lg`} />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 text-xs md:text-sm mb-1 group-hover:text-blue-700 transition-colors">{service.title}</h5>
                                      <p className="text-xs text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors hidden md:block">{service.shortDescription}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Right Side - Service Details */}
                          <div className="w-1/3 p-6">
                            <AnimatePresence mode="wait">
                              {hoveredService ? (
                                <motion.div
                                  key={hoveredService}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="h-full"
                                >
                                  {(() => {
                                    const service = SERVICES[hoveredService as keyof typeof SERVICES];
                                    if (!service) return null;
                                    return (
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-100 flex items-center justify-center shadow-lg`}>
                                            <i className={`${service.icon} text-white text-lg`} />
                                          </div>
                                          <div>
                                            <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(service.color).replace('text-', 'bg-').replace('-600', '-100')} ${getColorClasses(service.color)}`}>
                                              {service.category}
                                            </span>
                                          </div>
                                        </div>
                                        
                                        <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
                                        
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                                          <ul className="space-y-1">
                                            {service.features.slice(0, 4).map((feature, idx) => (
                                              <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                <i className={`fas fa-check text-blue-500 mr-2 mt-0.5 text-xs`} />
                                                <div>
                                                  <span className="font-medium text-gray-700">{feature.title}</span>
                                                  <p className="text-gray-600 mt-0.5 text-xs leading-relaxed">{feature.description}</p>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-gray-200">
                                          <button 
                                            className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${getColorClasses(service.color).replace('text-', 'from-')} to-blue-600 text-white font-medium text-sm hover:shadow-lg transition-all duration-300`}
                                            onClick={() => {
                                              setIsServicesOpen(false);
                                              scrollToSection('contact');
                                            }}
                                          >
                                            Get Started with {service.title}
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="h-full flex items-center justify-center"
                                >
                                  <div className="text-center text-gray-500">
                                    <i className="fas fa-mouse-pointer text-3xl mb-3 text-gray-400" />
                                    <p className="text-sm">Hover over a service to see details</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        
                        <div className="px-6 pb-6">
                          {/* Service Categories */}
                          <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-md font-bold text-gray-900 mb-4 text-center">Browse by Category</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {Object.entries(serviceCategories).map(([categoryId, category]) => (
                                <motion.button
                                  key={categoryId}
                                  className="group p-3 rounded-lg hover:bg-blue-50 border border-gray-100 hover:border-blue-200 cursor-pointer transition-all text-center"
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    scrollToSection('services');
                                  }}
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
