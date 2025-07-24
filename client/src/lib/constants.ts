export const SERVICES = {
  aws: {
    id: 'aws',
    title: 'AWS Consulting',
    shortDescription: 'Cloud infrastructure & migration',
    icon: 'fab fa-aws',
    color: 'orange',
    description: 'Optimize your cloud infrastructure with our certified AWS experts and reduce costs by up to 40%',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
    features: [
      {
        icon: 'fas fa-cloud-upload',
        title: 'Cloud Migration',
        description: 'Seamlessly migrate your applications and data to AWS with zero downtime and minimal disruption to your business operations.'
      },
      {
        icon: 'fas fa-cog',
        title: 'Infrastructure Optimization',
        description: 'Optimize your AWS resources for performance and cost-efficiency using advanced monitoring and automation tools.'
      },
      {
        icon: 'fas fa-shield-alt',
        title: 'Security & Compliance',
        description: 'Implement robust security measures and ensure compliance with industry standards and regulations.'
      }
    ],
    benefits: [
      'Free initial consultation and assessment',
      'Detailed migration roadmap and timeline',
      '24/7 support during migration process',
      'Post-migration optimization and monitoring',
      'Training for your technical team'
    ],
    metric: {
      value: '40%',
      label: 'on cloud infrastructure costs',
      description: 'Average Savings'
    }
  },
  ai: {
    id: 'ai',
    title: 'AI Development',
    shortDescription: 'Machine learning solutions',
    icon: 'fas fa-brain',
    color: 'purple',
    description: 'Harness the power of artificial intelligence to automate processes and gain competitive advantages',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
    features: [
      {
        icon: 'fas fa-robot',
        title: 'Process Automation',
        description: 'Automate repetitive tasks and workflows using intelligent algorithms that learn and adapt to your business processes.'
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Predictive Analytics',
        description: 'Leverage machine learning to predict trends, customer behavior, and business outcomes with remarkable accuracy.'
      },
      {
        icon: 'fas fa-comments',
        title: 'Natural Language Processing',
        description: 'Build intelligent chatbots and language processing systems that understand and respond to human communication.'
      }
    ],
    benefits: [
      'Custom machine learning models',
      'Intelligent chatbots and virtual assistants',
      'Computer vision and image recognition',
      'Recommendation engines',
      'Fraud detection systems'
    ],
    metric: {
      value: '70%',
      label: 'process automation achieved',
      description: 'Efficiency Gain'
    }
  },
  web: {
    id: 'web',
    title: 'Web Development',
    shortDescription: 'Custom web applications',
    icon: 'fas fa-code',
    color: 'blue',
    description: 'Create stunning, high-performance web applications that engage users and drive conversions',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
    features: [
      {
        icon: 'fas fa-palette',
        title: 'Custom Web Design',
        description: 'Create unique, brand-aligned designs that capture attention and provide exceptional user experiences across all devices.'
      },
      {
        icon: 'fas fa-code',
        title: 'Frontend Development',
        description: 'Build responsive, fast-loading interfaces using modern frameworks like React, Vue.js, and Angular for optimal performance.'
      },
      {
        icon: 'fas fa-server',
        title: 'Backend Development',
        description: 'Develop robust server-side solutions with secure APIs, databases, and integrations to power your web applications.'
      }
    ],
    benefits: [
      'Responsive design for all devices',
      'SEO optimization and fast loading',
      'Modern frameworks and technologies',
      'Secure backend and API development',
      'Ongoing maintenance and support'
    ],
    metric: {
      value: '300%',
      label: 'in conversion rates',
      description: 'Avg. Improvement'
    }
  },
  mobile: {
    id: 'mobile',
    title: 'App Development',
    shortDescription: 'iOS & Android applications',
    icon: 'fas fa-mobile-alt',
    color: 'green',
    description: 'Build native iOS and Android applications that deliver exceptional user experiences',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
    features: [
      {
        icon: 'fab fa-apple',
        title: 'iOS Development',
        description: 'Build native iOS applications using Swift and SwiftUI that leverage the full power of Apple\'s ecosystem and App Store.'
      },
      {
        icon: 'fab fa-android',
        title: 'Android Development',
        description: 'Create powerful Android applications using Kotlin and Java that perform excellently across all Android devices.'
      },
      {
        icon: 'fas fa-sync',
        title: 'Cross-Platform Solutions',
        description: 'Develop once, deploy everywhere using React Native and Flutter for cost-effective multi-platform solutions.'
      }
    ],
    benefits: [
      'UI/UX design and prototyping',
      'Native and cross-platform development',
      'App Store optimization and publishing',
      'Backend API development and integration',
      'Ongoing maintenance and updates'
    ],
    metric: {
      value: '95%',
      label: 'apps published successfully',
      description: 'Success Rate'
    }
  }
};

export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080'
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Smith',
    title: 'CEO, TechCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: 'Rays Innovations transformed our entire cloud infrastructure. Their AWS expertise helped us reduce costs by 45% while improving performance significantly.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'CTO, InnovateLab',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: 'The AI solution they developed for us has automated 70% of our manual processes. Exceptional work and ongoing support.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    title: 'Founder, Digital Ventures',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: 'Their web development team created a platform that increased our conversion rates by 300%. Outstanding technical expertise.'
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of AI in Business Operations',
    excerpt: 'Discover how artificial intelligence is reshaping business processes and creating new opportunities for growth...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    date: 'March 15, 2024',
    category: 'AI Development'
  },
  {
    id: 2,
    title: 'Cloud Migration Best Practices for 2024',
    excerpt: 'Learn the essential strategies for successful cloud migration and maximize your AWS investment...',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    date: 'March 12, 2024',
    category: 'AWS Consulting'
  },
  {
    id: 3,
    title: 'Modern Web Development Trends',
    excerpt: 'Explore the latest frameworks and technologies shaping the future of web development...',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    date: 'March 10, 2024',
    category: 'Web Development'
  }
];

export const COMPANY_STATS = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Happy Clients', value: '100+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Support', value: '24/7' }
];
