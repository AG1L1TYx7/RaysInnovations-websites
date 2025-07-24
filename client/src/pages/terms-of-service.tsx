import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-purple-100">Effective Date: January 2024</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using the services provided by Rays Innovations, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">2. Services Description</h2>
              <p className="text-gray-700 mb-6">
                Rays Innovations provides technology consulting services including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>AWS Cloud Consulting and Implementation</li>
                <li>AI and Machine Learning Development</li>
                <li>Web Application Development</li>
                <li>Mobile Application Development</li>
                <li>DevOps and Infrastructure Services</li>
                <li>Cybersecurity Consulting</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">3. User Obligations</h2>
              <p className="text-gray-700 mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt our services or servers</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of Rays Innovations and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">5. Payment Terms</h2>
              <p className="text-gray-700 mb-6">
                Payment for services shall be made according to the terms specified in individual service agreements. All fees are non-refundable unless otherwise specified in writing.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                To the maximum extent permitted by law, Rays Innovations shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">7. Termination</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">8. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">9. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-800 font-semibold">Rays Innovations</p>
                <p className="text-gray-700">Email: legal@raysinnovations.com</p>
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
              <a className="text-purple-600 hover:text-purple-800 font-semibold text-lg">
                ← Back to Home
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}