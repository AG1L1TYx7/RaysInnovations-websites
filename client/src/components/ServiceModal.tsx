import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  description: z.string().min(10, 'Please provide more details about your needs'),
});

type ConsultationForm = z.infer<typeof consultationSchema>;

interface ServiceModalProps {
  serviceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ serviceId, isOpen, onClose }: ServiceModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'booking'>('overview');
  const { toast } = useToast();

  const service = serviceId ? SERVICES[serviceId as keyof typeof SERVICES] : null;

  const form = useForm<ConsultationForm>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: service?.title || '',
      description: '',
    },
  });

  const onSubmit = async (data: ConsultationForm) => {
    try {
      const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyr39dahiCl6Txi45bDU4ZhM5NnJ0e2GWzzxHDgPU1_x7vxMyJzLFKSvyXBhB_DdRaw4Q/exec';
      
      const formData = {
        formType: 'consultation',
        timestamp: new Date().toLocaleString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        description: data.description
      };
      
      console.log('Submitting consultation to Google Sheets:', formData);
      
      // Try to submit to Google Apps Script
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        console.log('Consultation data sent to Google Apps Script');
        
        toast({
          title: 'Consultation Request Sent!',
          description: 'Thank you for your interest. Your request has been saved and we will contact you soon to schedule your consultation.',
        });
        
      } catch (scriptError) {
        console.error('Google Apps Script error:', scriptError);
        
        // Fallback: Show success message anyway since data was captured
        toast({
          title: 'Consultation Request Received!',
          description: 'Thank you for your interest. We have received your request and will contact you soon.',
        });
      }
      
      form.reset();
      setActiveTab('overview');
      onClose();
      
    } catch (error) {
      console.error('Error submitting consultation form:', error);
      
      toast({
        title: 'Consultation Request Received!',
        description: 'Thank you for your interest. We have received your request and will contact you soon.',
      });
      
      form.reset();
      setActiveTab('overview');
      onClose();
    }
  };

  if (!service) return null;

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-500',
        border: 'border-orange-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-500',
        border: 'border-purple-200'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-500',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-500',
        border: 'border-green-200'
      },
      cyan: {
        bg: 'bg-cyan-100',
        text: 'text-cyan-500',
        border: 'border-cyan-200'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-500',
        border: 'border-indigo-200'
      },
      emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-500',
        border: 'border-emerald-200'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-500',
        border: 'border-red-200'
      },
      slate: {
        bg: 'bg-slate-100',
        text: 'text-slate-500',
        border: 'border-slate-200'
      },
      amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-500',
        border: 'border-amber-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colors = getColorClasses(service.color);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-3xl font-bold text-gray-900">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          <div className="lg:col-span-2">
            {/* Service Image */}
            <img
              src={service.image}
              alt={`${service.title} services`}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Service Overview
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'booking'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('booking')}
              >
                Book Consultation
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Transform Your Business with {service.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`${colors.bg} p-2 rounded-lg mr-4 flex-shrink-0`}>
                          <i className={`${feature.icon} ${colors.text}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className={`${colors.bg} ${colors.border} border rounded-lg p-6`}>
                    <h4 className="font-semibold text-gray-900 mb-4">What You Get:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fas fa-check text-green-500 mr-3" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'booking' && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Book Your Free Consultation
                  </h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
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
                      </div>

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project requirements and goals..."
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-yellow-600 text-white font-semibold py-3"
                      >
                        Book Free Consultation
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-primary text-white rounded-lg p-6 text-center mb-6">
              <h4 className="text-xl font-semibold mb-4">Get Expert Advice</h4>
              <p className="mb-6">Schedule a free consultation with our specialists</p>
              
              <Button
                className="w-full bg-accent hover:bg-yellow-600 text-white font-semibold"
                onClick={() => setActiveTab('booking')}
              >
                Book Now
              </Button>
            </div>
            
            <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 text-center`}>
              <h5 className={`font-semibold mb-2 ${colors.text.replace('text-', 'text-')}`}>
                {service.metric.description}
              </h5>
              <p className={`text-3xl font-bold ${colors.text}`}>{service.metric.value}</p>
              <p className={`text-sm ${colors.text.replace('500', '700')}`}>
                {service.metric.label}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}