import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { SERVICES } from '@/lib/constants';
import ServiceModal from '@/components/ServiceModal';

const getColorClasses = (color: string) => {
  const colorMap = {
    orange: { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', border: 'border-orange-200', accent: 'bg-orange-100' },
    purple: { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600', border: 'border-purple-200', accent: 'bg-purple-100' },
    blue: { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', border: 'border-blue-200', accent: 'bg-blue-100' },
    green: { bg: 'from-green-500 to-green-600', text: 'text-green-600', border: 'border-green-200', accent: 'bg-green-100' },
    cyan: { bg: 'from-cyan-500 to-cyan-600', text: 'text-cyan-600', border: 'border-cyan-200', accent: 'bg-cyan-100' },
    indigo: { bg: 'from-indigo-500 to-indigo-600', text: 'text-indigo-600', border: 'border-indigo-200', accent: 'bg-indigo-100' },
    emerald: { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', accent: 'bg-emerald-100' },
    red: { bg: 'from-red-500 to-red-600', text: 'text-red-600', border: 'border-red-200', accent: 'bg-red-100' },
    slate: { bg: 'from-slate-500 to-slate-600', text: 'text-slate-600', border: 'border-slate-200', accent: 'bg-slate-100' },
    amber: { bg: 'from-amber-500 to-amber-600', text: 'text-amber-600', border: 'border-amber-200', accent: 'bg-amber-100' }
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

const ServiceCategories = () => {
  const categories = {
    cloud: {
      title: 'Cloud Solutions',
      icon: 'fas fa-cloud',
      description: 'Scalable cloud infrastructure and migration services',
      gradient: 'from-blue-500 to-cyan-500',
      services: Object.values(SERVICES).filter(service => service.category === 'cloud')
    },
    ai: {
      title: 'AI & Analytics',
      icon: 'fas fa-brain',
      description: 'Advanced AI solutions and data analytics',
      gradient: 'from-purple-500 to-pink-500',
      services: Object.values(SERVICES).filter(service => service.category === 'ai' || service.category === 'analytics')
    },
    development: {
      title: 'Development Services',
      icon: 'fas fa-code',
      description: 'Custom software and application development',
      gradient: 'from-green-500 to-emerald-500',
      services: Object.values(SERVICES).filter(service => service.category === 'development')
    },
    operations: {
      title: 'Operations & Security',
      icon: 'fas fa-shield-alt',
      description: 'DevOps, infrastructure and security solutions',
      gradient: 'from-red-500 to-orange-500',
      services: Object.values(SERVICES).filter(service => service.category === 'operations' || service.category === 'security')
    }
  };

  return categories;
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [, setLocation] = useLocation();
  const categories = ServiceCategories();

  const filteredServices = activeCategory === 'all' 
    ? Object.values(SERVICES)
    : categories[activeCategory as keyof typeof categories]?.services || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.button
                onClick={() => setLocation('/')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mr-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 border border-blue-200 hover:border-blue-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-arrow-left" />
                <span>Back to Home</span>
              </motion.button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg"
              >
                ⚡ Complete IT Services Portfolio
              </motion.div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
              Our Premium Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Comprehensive technology solutions designed to transform your business and drive exceptional growth
            </p>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <motion.button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => setActiveCategory('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Services ({Object.values(SERVICES).length})
              </motion.button>
              {Object.entries(categories).map(([key, category]) => (
                <motion.button
                  key={key}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${category.icon} mr-2`} />
                  {category.title} ({category.services.length})
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service) => {
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -8 }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.bg} opacity-5 rounded-bl-full`}></div>
                    
                    {/* Service icon */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <i className={`${service.icon} text-3xl text-white`} />
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                    </motion.div>
                    
                    {/* Service content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {service.shortDescription}
                      </p>
                      
                      {/* Features preview */}
                      <div className="space-y-2">
                        {service.features?.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <i className={`${feature.icon} ${colors.text} text-sm mt-1`} />
                            <span className="text-sm text-gray-600">{feature.title}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <motion.button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedService(service.id)}
                      >
                        Learn More
                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                      </motion.button>
                    </div>
                    
                    {/* Category badge */}
                    <div className={`absolute top-6 right-6 px-3 py-1 ${colors.accent} ${colors.text} rounded-full text-xs font-medium`}>
                      {service.category}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-8">
                Let's discuss your project requirements and create a custom solution that exceeds your expectations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Start Your Project
                </motion.button>
                
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Schedule Consultation
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Service Modal */}
      <ServiceModal
        serviceId={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}