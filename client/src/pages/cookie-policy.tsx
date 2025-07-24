import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-indigo-100">Last updated: January 2024</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
              <p className="text-gray-700 mb-6">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Types of Cookies We Use</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Essential Cookies</h3>
              <p className="text-gray-700 mb-6">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Analytics Cookies</h3>
              <p className="text-gray-700 mb-6">
                We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's functionality and content.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Functionality Cookies</h3>
              <p className="text-gray-700 mb-6">
                These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Marketing Cookies</h3>
              <p className="text-gray-700 mb-6">
                These cookies are used to track visitors across websites to display ads that are relevant and engaging for individual users.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve our website's performance and user experience</li>
                <li>Deliver relevant content and advertisements</li>
                <li>Analyze website traffic and usage patterns</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Managing Cookies</h2>
              <p className="text-gray-700 mb-6">
                Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Please note that disabling cookies may affect the functionality of our website.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Control Cookies</h3>
              <p className="text-gray-700 mb-4">You can control and manage cookies in various ways:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Browser Settings:</strong> Most browsers allow you to view, delete, and block cookies from websites</li>
                <li><strong>Third-party Tools:</strong> Various tools are available to help you manage cookies across different websites</li>
                <li><strong>Mobile Devices:</strong> Your mobile device may offer settings to control cookies and tracking</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-6">
                We may use third-party services that place cookies on your device. These services include Google Analytics, social media platforms, and advertising networks. These third parties have their own privacy policies governing the use of cookies.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Updates to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about our use of cookies, please contact us at:
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
              <a className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg">
                ← Back to Home
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}