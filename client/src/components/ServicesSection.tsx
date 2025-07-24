import { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import ServiceModal from './ServiceModal';

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.values(SERVICES).map((service) => {
            const colors = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-all group"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(service.id)}
              >
                <div className={`${colors.bg} ${colors.hover} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group-hover:scale-110 duration-300`}>
                  <i className={`${service.icon} text-3xl ${colors.text}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <motion.button
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            );
          })}
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
