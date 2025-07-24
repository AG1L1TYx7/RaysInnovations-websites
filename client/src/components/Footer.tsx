import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Footer() {
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

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'AWS Consulting', action: () => scrollToSection('services') },
        { name: 'AI Development', action: () => scrollToSection('services') },
        { name: 'Web Development', action: () => scrollToSection('services') },
        { name: 'Mobile Apps', action: () => scrollToSection('services') },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', action: () => scrollToSection('about') },
        { name: 'Our Team', action: () => scrollToSection('about') },
        { name: 'Careers', action: () => scrollToSection('contact') },
        { name: 'Contact', action: () => scrollToSection('contact') },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/blog' },
        { name: 'Whitepapers', href: '/blog' },
        { name: 'Support', action: () => scrollToSection('contact') },
      ]
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook', href: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fab fa-linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rays Innovations
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Transforming businesses through innovative technology solutions and expert consulting services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-2xl`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 relative">
                {section.title}
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href ? (
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-all duration-300 text-left group flex items-center">
                        <motion.div
                          className="flex items-center w-full"
                          whileHover={{ x: 5 }}
                        >
                          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">→</span>
                          {link.name}
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.button
                        className="text-gray-300 hover:text-white transition-all duration-300 text-left group flex items-center"
                        whileHover={{ x: 5 }}
                        onClick={link.action}
                      >
                        <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">→</span>
                        {link.name}
                      </motion.button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-base mb-4 md:mb-0">
              © 2024 <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Rays Innovations</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
