import { motion } from 'framer-motion';

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
        { name: 'Blog', action: () => scrollToSection('blog') },
        { name: 'Case Studies', action: () => scrollToSection('blog') },
        { name: 'Whitepapers', action: () => scrollToSection('blog') },
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
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Rays Innovations</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming businesses through innovative technology solutions and expert consulting services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-xl`} />
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
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.button
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      whileHover={{ x: 5 }}
                      onClick={link.action}
                    >
                      {link.name}
                    </motion.button>
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
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 Rays Innovations. All rights reserved.
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
        </motion.div>
      </div>
    </footer>
  );
}
