import { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import ServiceModal from '@/components/ServiceModal';

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-500',
        hover: 'hover:bg-orange-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-500',
        hover: 'hover:bg-purple-200'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-500',
        hover: 'hover:bg-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-500',
        hover: 'hover:bg-green-200'
      },
      cyan: {
        bg: 'bg-cyan-100',
        text: 'text-cyan-500',
        hover: 'hover:bg-cyan-200'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-500',
        hover: 'hover:bg-indigo-200'
      },
      emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-500',
        hover: 'hover:bg-emerald-200'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-500',
        hover: 'hover:bg-red-200'
      },
      slate: {
        bg: 'bg-slate-100',
        text: 'text-slate-500',
        hover: 'hover:bg-slate-200'
      },
      amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-500',
        hover: 'hover:bg-amber-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium mb-6 shadow-lg"
          >
            ⚡ Premium IT Solutions
          </motion.div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Transform Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technology solutions designed to accelerate your digital transformation journey
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {Object.values(SERVICES).slice(0, 8).map((service, index) => {
            const colors = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service.id)}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Main card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center cursor-pointer border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 service-card">
                  {/* Floating icon with gradient background */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.hover} flex items-center justify-center mx-auto shadow-lg icon-glow group-hover:shadow-xl transition-all duration-300`}>
                      <i className={`${service.icon} text-3xl ${colors.text} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    
                    {/* Floating particles effect */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                  </motion.div>
                  
                  {/* Service details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                      {service.shortDescription}
                    </p>
                    
                    {/* CTA Button */}
                    <motion.button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Service
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </motion.button>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Additional Services Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {Object.values(SERVICES).slice(8).map((service, index) => {
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={service.id}
                  className="group relative"
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedService(service.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center cursor-pointer border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 service-card">
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.hover} flex items-center justify-center mx-auto shadow-lg icon-glow group-hover:shadow-xl transition-all duration-300`}>
                        <i className={`${service.icon} text-3xl ${colors.text} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                    </motion.div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {service.shortDescription}
                      </p>
                      
                      <motion.button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Service
                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                      </motion.button>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                    Let's discuss your unique requirements and create a custom solution that drives results.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.button
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('contact')}
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Start Your Project
                  </motion.button>
                  
                  <motion.button
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('contact')}
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Book Consultation
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Service Modal */}
      <ServiceModal
        serviceId={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
