import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Send, Phone, Mail, Clock, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const AL_HANI_WHATSAPP_NUMBER = '+923122684096';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });


  const onSubmit = (data: ContactFormData) => {
    const message = `*NEW CONTACT MESSAGE -- AL-HANI FAST FOOD*
================================================
*Name:* ${data.name}
*Email:* ${data.email}
*Message:* 
${data.message}
================================================
Verified by: RAS Innovatech | AL-Hani Fast Food Official`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${AL_HANI_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');

    toast({
      title: "WhatsApp Opened!",
      description: "Complete sending your message in WhatsApp.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-20" data-testid="contact-section">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">Get In Touch</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card shadow-card border-none hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your name"
                              className="bg-secondary border border-border focus:border-primary transition-all"
                              data-testid="contact-name-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Email *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              className="bg-secondary border border-border focus:border-primary transition-all"
                              data-testid="contact-email-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder="Your message..."
                              className="bg-secondary border border-border focus:border-primary transition-all"
                              data-testid="contact-message-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full glow-btn text-white py-4 rounded-full font-bold text-lg transition shadow-lg hover:scale-105 active:scale-95 border-none"
                      style={{ backgroundColor: '#25D366' }}
                      data-testid="send-message-button"
                    >
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Google Map */}
            <Card className="bg-card shadow-card overflow-hidden border-none cursor-pointer group h-64">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.370!2d67.144!3d24.813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c696e5675fd%3A0xe54d8ed96fe08764!2sCoast%20Guard%20Chowrangi%2C%20Korangi%2C%20Karachi!5e0!3m2!1sen!2s!4v1712502683123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.5] contrast-[1.2] invert-[0.05] hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </Card>

            {/* Contact Details */}
            <Card className="bg-card shadow-card border-none hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <MapPin className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Location</h4>
                    <p className="text-muted">Coast Guard Chowrangi, Korangi</p>
                    <p className="text-muted">Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Phone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Phone</h4>
                    <p className="text-muted">+92 311 2652126</p>
                    <p className="text-muted">+92 312 2684096</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Mail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Email</h4>
                    <p className="text-muted">info@alhanifastfood.com</p>
                    <p className="text-muted">orders@alhanifastfood.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Clock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Hours</h4>
                    <p className="text-muted">Mon - Sun: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-card shadow-card border-none">
              <CardContent className="p-8 text-center sm:text-left">
                <h4 className="text-xl font-bold text-primary mb-4">Follow Us</h4>
                <div className="flex justify-center sm:justify-start space-x-4">
                  {[
                    { icon: Facebook, id: "social-facebook", href: "https://www.facebook.com/rumazqureshi" },
                    { icon: Instagram, id: "social-instagram", href: "https://www.instagram.com/rumaznaveed/" },
                    { icon: Twitter, id: "social-twitter", href: "https://x.com/rasinnovatech" },
                    { icon: SiWhatsapp, id: "social-whatsapp", href: `https://wa.me/923122684096` }
                  ].map((social, idx) => (
                    <motion.a 
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                      data-testid={social.id}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
