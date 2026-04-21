import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { Send, Phone, Mail, Clock, MapPin, Facebook, Instagram } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';

const AL_HANI_WHATSAPP_NUMBER = '+923112652126';

export function Contact() {
  const { toast } = useToast();
  const { t, isRtl } = useLanguage();
  
  const contactFormSchema = z.object({
    name: z.string().min(2, isRtl ? 'نام کم از کم 2 حروف کا ہونا چاہیے' : 'Name must be at least 2 characters'),
    email: z.string().email(isRtl ? 'براہ کرم ایک درست ای میل پتہ درج کریں' : 'Please enter a valid email address'),
    message: z.string().min(10, isRtl ? 'پیغام کم از کم 10 حروف کا ہونا چاہیے' : 'Message must be at least 10 characters'),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });


  const onSubmit = (data: ContactFormData) => {
    const message = isRtl 
      ? `*رابطہ پیغام -- الحانی فاسٹ فوڈ*
================================================
*نام:* ${data.name}
*ای میل:* ${data.email}
*پیغام:* 
${data.message}
================================================
تصدیق شدہ بذریعہ: RAS Innovatech | الحانی فاسٹ فوڈ آفیشل`
      : `*NEW CONTACT MESSAGE -- AL-HANI FAST FOOD*
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
      title: t('contact.toastTitle'),
      description: t('contact.toastDesc'),
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
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isRtl ? 'order-2 lg:order-1' : ''}
          >
            <Card className="bg-card shadow-card border-none hover:shadow-glow transition-shadow duration-300">
              <CardHeader className={isRtl ? 'text-right' : 'text-left'}>
                <CardTitle className="text-2xl font-bold text-primary">{t('contact.formTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-muted font-semibold w-full block ${isRtl ? 'text-right' : ''}`}>{t('contact.name')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t('contact.placeholder.name')}
                              className={`bg-secondary border border-border focus:border-primary transition-all ${isRtl ? 'text-right' : ''}`}
                              data-testid="contact-name-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-muted font-semibold w-full block ${isRtl ? 'text-right' : ''}`}>{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder={t('contact.placeholder.email')}
                              className={`bg-secondary border border-border focus:border-primary transition-all ${isRtl ? 'text-right' : ''}`}
                              data-testid="contact-email-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-muted font-semibold w-full block ${isRtl ? 'text-right' : ''}`}>{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder={t('contact.placeholder.message')}
                              className={`bg-secondary border border-border focus:border-primary transition-all ${isRtl ? 'text-right' : ''}`}
                              data-testid="contact-message-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full glow-btn text-white py-4 rounded-full font-bold text-lg transition shadow-lg hover:scale-105 active:scale-95 border-none"
                      style={{ backgroundColor: '#25D366' }}
                      data-testid="send-message-button"
                    >
                      <SiWhatsapp className={`w-5 h-5 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                      {t('contact.whatsapp')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`space-y-8 ${isRtl ? 'order-1 lg:order-2' : ''}`}
          >
            {/* Google Map */}
            <Card className="bg-card shadow-card overflow-hidden border-none cursor-pointer group h-64">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.361165461665!2d67.13768859999999!3d24.817319599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33b0038fb1f3d%3A0x80ca8a695f581326!2sAlhani%20broast!5e0!3m2!1sen!2s!4v1775634645482!5m2!1sen!2s"
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
            <Card className="bg-card shadow-card border-none hover:shadow-glow transition-all duration-300 px-4 sm:px-0">
              <CardContent className={`p-8 space-y-6 ${isRtl ? 'text-right' : ''}`}>
                <div className={`flex items-start group ${isRtl ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <MapPin className="text-primary text-xl" />
                  </div>
                  <div className={isRtl ? 'mr-4' : ''}>
                    <h4 className="text-lg font-bold text-primary mb-1">{t('contact.location')}</h4>
                    <a 
                      href="https://maps.app.goo.gl/1Xfz5cVZDHbEEjQSA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors font-medium border-b border-primary/20 hover:border-primary"
                    >
                      {isRtl ? 'گوگل میپس پر الحانی بروسٹ' : 'Al Hani Broast on google maps'}
                    </a>
                  </div>
                </div>

                <div className={`flex items-start group ${isRtl ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Phone className="text-primary text-xl" />
                  </div>
                  <div className={isRtl ? 'mr-4' : ''}>
                    <h4 className="text-lg font-bold text-primary mb-1">{t('contact.phone')}</h4>
                    <p className="text-muted" dir="ltr">+92 311 2652126</p>
                  </div>
                </div>

                <div className={`flex items-start group ${isRtl ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Mail className="text-primary text-xl" />
                  </div>
                  <div className={isRtl ? 'mr-4' : ''}>
                    <h4 className="text-lg font-bold text-primary mb-1">{t('contact.emailLabel')}</h4>
                    <p className="text-muted">info@alhanifastfood.com</p>
                    <p className="text-muted">orders@alhanifastfood.com</p>
                  </div>
                </div>

                <div className={`flex items-start group ${isRtl ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/40">
                    <Clock className="text-primary text-xl" />
                  </div>
                  <div className={isRtl ? 'mr-4' : ''}>
                    <h4 className="text-lg font-bold text-primary mb-1">{t('contact.hours')}</h4>
                    <p className="text-muted">{t('footer.days')}: {t('footer.time')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-card shadow-card border-none">
              <CardContent className="p-8 text-center sm:text-left">
                <h4 className={`text-xl font-bold text-primary mb-4 ${isRtl ? 'text-right' : ''}`}>{t('contact.follow')}</h4>
                <div className={`flex justify-center sm:justify-start space-x-4 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {[
                    { icon: Facebook, id: "social-facebook", href: "https://www.facebook.com/share/1JFYRYqgWp/" },
                    { icon: Instagram, id: "social-instagram", href: "https://www.instagram.com/asim9530?igsh=MWZwYWd3NGFiNWFw" },
                    { icon: SiTiktok, id: "social-tiktok", href: "https://www.tiktok.com/@muhammadaasim36?_r=1&_t=ZN-95MWHUonZMU" },
                    { icon: SiWhatsapp, id: "social-whatsapp", href: `https://wa.me/923112652126` }
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
