import { useState } from 'react';
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

  const contactMutation = useMutation({
    mutationFn: async (contactData: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', contactData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to Send Message",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Contact error:', error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20" data-testid="contact-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">Get In Touch</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card shadow-card">
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
                            className="bg-secondary border border-border focus:border-primary"
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
                            className="bg-secondary border border-border focus:border-primary"
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
                            className="bg-secondary border border-border focus:border-primary"
                            data-testid="contact-message-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition"
                    data-testid="send-message-button"
                  >
                    {contactMutation.isPending ? (
                      <>🔄 Sending...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <Card className="bg-card shadow-card overflow-hidden">
              <div 
                className="bg-secondary/50 h-64 flex items-center justify-center border-2 border-dashed border-border"
                data-testid="map-placeholder"
              >
                <div className="text-center">
                  <MapPin className="text-primary text-5xl mx-auto mb-4" />
                  <p className="text-muted">Google Maps Location</p>
                  <p className="text-sm text-muted/70 mt-2">
                    Interactive map will be embedded here
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Details */}
            <Card className="bg-card shadow-card">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Phone</h4>
                    <p className="text-muted">+92 300 1234567</p>
                    <p className="text-muted">+92 321 9876543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Email</h4>
                    <p className="text-muted">info@shanfastfood.com</p>
                    <p className="text-muted">orders@shanfastfood.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
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
            <Card className="bg-card shadow-card">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold text-primary mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                    data-testid="social-facebook"
                  >
                    <Facebook className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                    data-testid="social-instagram"
                  >
                    <Instagram className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                    data-testid="social-twitter"
                  >
                    <Twitter className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                    data-testid="social-whatsapp"
                  >
                    <SiWhatsapp className="text-xl" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
