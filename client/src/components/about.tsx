import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Zap, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export function About() {
  const { t, isRtl } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-secondary/50" data-testid="about-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted">{t('about.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={isRtl ? 'order-2 md:order-1' : ''}
            >
              <img 
                src="/owner.png" 
                alt="Al-Hani Fast Food Owner" 
                className="rounded-2xl shadow-glow w-full h-[500px] object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                data-testid="owner-image"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${isRtl ? 'order-1 md:order-2 text-right' : 'text-left'}`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">{t('about.journey.title')}</h3>
              <p className="text-muted mb-4 leading-relaxed">
                {t('about.journey.p1')}
              </p>
              <p className="text-muted mb-4 leading-relaxed">
                {t('about.journey.p2')}
              </p>
              <p className="text-muted leading-relaxed">
                {t('about.journey.p3')} <span className="text-primary font-semibold">{t('about.fresh')}</span>, <span className="text-primary font-semibold">{t('about.service')}</span>, {isRtl ? 'اور' : 'and'} <span className="text-primary font-semibold">{t('about.taste')}</span>.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { icon: Leaf, title: t('about.fresh'), desc: t('about.fresh.desc') },
              { icon: Zap, title: t('about.service'), desc: t('about.service.desc') },
              { icon: Star, title: t('about.taste'), desc: t('about.taste.desc') }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                <Card className="bg-card shadow-card hover:shadow-glow transition-all duration-300 text-center p-8 border-none group cursor-default">
                  <CardContent className="pt-6">
                    <motion.div 
                      whileHover={{ rotate: 20, scale: 1.1 }}
                      className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group-hover:bg-primary/30"
                    >
                      <value.icon className="text-primary text-3xl w-8 h-8" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-primary mb-3">{value.title}</h4>
                    <p className="text-muted">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
