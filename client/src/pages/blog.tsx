import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Cloud Computing: AWS Best Practices for 2024',
    excerpt: 'Discover the latest AWS trends and best practices that are shaping cloud infrastructure in 2024. Learn how to optimize your cloud strategy for maximum efficiency and scalability.',
    author: 'Sarah Johnson',
    date: 'January 15, 2024',
    readTime: '8 min read',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    tags: ['AWS', 'Cloud', 'DevOps'],
  },
  {
    id: 2,
    title: 'Building Intelligent Applications with LLMs: A Comprehensive Guide',
    excerpt: 'Explore how Large Language Models are revolutionizing application development. From chatbots to content generation, learn how to integrate AI into your business solutions.',
    author: 'Michael Chen',
    date: 'January 10, 2024',
    readTime: '12 min read',
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    tags: ['AI', 'LLM', 'Machine Learning'],
  },
  {
    id: 3,
    title: 'Cybersecurity in 2024: Protecting Your Digital Assets',
    excerpt: 'Stay ahead of emerging threats with our comprehensive guide to cybersecurity best practices. Learn how to implement robust security measures for your organization.',
    author: 'Emily Rodriguez',
    date: 'January 5, 2024',
    readTime: '10 min read',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    tags: ['Security', 'Cybersecurity', 'Best Practices'],
  },
  {
    id: 4,
    title: 'E-commerce Revolution: Building Scalable Online Stores',
    excerpt: 'Learn the secrets to building high-performance e-commerce platforms that can handle millions of users. From architecture to optimization strategies.',
    author: 'David Park',
    date: 'December 28, 2023',
    readTime: '15 min read',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    tags: ['E-commerce', 'Web Dev', 'Scalability'],
  },
  {
    id: 5,
    title: 'DevOps Excellence: Streamlining Your Development Pipeline',
    excerpt: 'Discover how to implement effective DevOps practices that accelerate delivery while maintaining quality. From CI/CD to infrastructure as code.',
    author: 'Rachel Green',
    date: 'December 20, 2023',
    readTime: '11 min read',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop',
    tags: ['DevOps', 'CI/CD', 'Automation'],
  },
  {
    id: 6,
    title: 'Mobile App Development Trends: Native vs Cross-Platform',
    excerpt: 'Explore the pros and cons of different mobile development approaches. Make informed decisions for your next mobile project.',
    author: 'James Wilson',
    date: 'December 15, 2023',
    readTime: '9 min read',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
    tags: ['Mobile', 'iOS', 'Android'],
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Insights & Innovation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore the latest trends in technology, best practices, and insights from our experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-full">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                    {blogPosts[0].category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{blogPosts[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <motion.button
                      className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Posts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-blue-600 font-semibold text-sm">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-xl mb-8 text-blue-100">
              Subscribe to our newsletter for the latest insights and technology trends
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500"
              />
              <motion.button
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}