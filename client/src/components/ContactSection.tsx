import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Removed backend dependencies
import { useToast } from '@/hooks/use-toast';
import { SERVICES } from '@/lib/constants';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      // Create email content
      const subject = `Contact Form Submission - ${data.service}`;
      const body = `
Contact Form Submission
======================

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service Interest: ${data.service}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
Form Type: Contact
      `.trim();
      
      const mailtoLink = `mailto:bishworupx7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      console.log('Opening email client with contact form data');
      
      // Open email client
      window.location.href = mailtoLink;
      
      toast({
        variant: 'success',
        title: 'Email Client Opened!',
        description: 'Please send the pre-filled email to complete your message submission.',
      });
      
      form.reset();
      
    } catch (error) {
      console.error('Error opening email client:', error);
      
      toast({
        variant: 'error',
        title: 'Unable to Open Email',
        description: 'Please contact us directly at bishworupx7@gmail.com',
      });
      
      form.reset();
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Office Address',
      content: ['123 Innovation Drive', 'Tech Hub, CA 90210']
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone Number',
      content: ['+1 (555) 123-4567']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Address',
      content: ['hello@raysinnovations.com']
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      content: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: Closed']
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-blue-600 font-semibold text-lg mb-4 block"
          >
            Let's Connect
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
            Start Your Digital Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Our experts are here to discuss your vision and create tailored solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h3>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interested In</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(SERVICES).map((service) => (
                            <SelectItem key={service.id} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about your project..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3"
                >
                  Send Message
                </Button>
              </form>
            </Form>
            </div>
          </motion.div>
          
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-12 -translate-x-12 opacity-50"></div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl flex-shrink-0 shadow-lg">
                      <i className={`${info.icon} text-white text-2xl`} />
                    </div>
                    <div className="ml-5">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{info.title}</h4>
                      {info.content.map((line, i) => (
                        <p key={i} className="text-gray-600 text-base">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Interactive Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
              <div className="text-center relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <i className="fas fa-globe text-6xl text-blue-600/50" />
                </motion.div>
                <p className="text-2xl font-bold text-gray-800 mb-2">Visit Our Office</p>
                <p className="text-lg text-gray-600 font-medium">123 Innovation Drive</p>
                <p className="text-lg text-gray-600">Tech Hub, CA 90210</p>
                <motion.button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const address = "123 Innovation Drive, Tech Hub, CA 90210";
                    const encodedAddress = encodeURIComponent(address);
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                    window.open(googleMapsUrl, '_blank');
                  }}
                >
                  Get Directions
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.button>
              </div>
              
              {/* Animated map markers */}
              <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <i className="fas fa-map-marker-alt text-red-500 text-3xl" />
              </motion.div>
              <motion.div
                className="absolute bottom-1/3 right-1/4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <i className="fas fa-map-marker-alt text-purple-500 text-2xl" />
              </motion.div>
              <motion.div
                className="absolute top-1/3 right-1/3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <i className="fas fa-map-marker-alt text-blue-500 text-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
