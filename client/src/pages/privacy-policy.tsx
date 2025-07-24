import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-700 mb-6">
                At Rays Innovations, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Information We Collect</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect personal information that you provide directly to us, such as:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company name and job title</li>
                <li>Information provided in messages or inquiries</li>
                <li>Payment information for our services</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Usage Information</h3>
              <p className="text-gray-700 mb-6">
                We automatically collect certain information about your device and how you interact with our website, including IP addresses, browser types, operating systems, and pages viewed.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you updates about our services and promotional materials (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-800 font-semibold">Rays Innovations</p>
                <p className="text-gray-700">Email: privacy@raysinnovations.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Address: 123 Innovation Drive, Tech Hub, CA 90210</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                ← Back to Home
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}