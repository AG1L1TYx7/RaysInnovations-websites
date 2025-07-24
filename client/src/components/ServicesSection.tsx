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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver comprehensive IT solutions that drive business growth and digital transformation
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {Object.values(SERVICES).slice(0, 8).map((service) => {
            const colors = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className={`${colors.bg} ${colors.hover} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:scale-110 duration-300 relative z-10`}>
                  <i className={`${service.icon} text-2xl ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{service.shortDescription}</p>
                <motion.button
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Show More Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.values(SERVICES).slice(8).map((service) => {
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedService(service.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-50"></div>
                  <div className={`${colors.bg} ${colors.hover} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:scale-110 duration-300 relative z-10`}>
                    <i className={`${service.icon} text-2xl ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{service.shortDescription}</p>
                  <motion.button
                    className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
          
          <motion.button
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            Get Custom Solution
          </motion.button>
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
