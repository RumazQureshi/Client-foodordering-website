import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Zap, Star } from 'lucide-react';

export function About() {
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
              About AL-Hani Fast Food
            </h2>
            <p className="text-lg text-muted">Our Story of Flavor & Excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" 
                alt="Restaurant Interior" 
                className="rounded-2xl shadow-glow w-full h-auto transition-transform duration-500 hover:scale-105"
                data-testid="restaurant-image"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-primary mb-6">Our Journey</h3>
              <p className="text-muted mb-4 leading-relaxed">
                AL-Hani Fast Food began with a simple vision: to serve delicious, high-quality fast food that brings people together. What started as a small family kitchen has grown into a beloved local favorite, known for our commitment to freshness and flavor.
              </p>
              <p className="text-muted mb-4 leading-relaxed">
                Every dish we serve is crafted with care, using the finest ingredients and time-tested recipes. From our signature Zinger Burgers to our innovative Shapatar Roll, we believe that great food should be both fast and exceptional.
              </p>
              <p className="text-muted leading-relaxed">
                Our success is built on three core principles: <span className="text-primary font-semibold">Fresh Ingredients</span>, <span className="text-primary font-semibold">Fast Service</span>, and <span className="text-primary font-semibold">Unforgettable Taste</span>.
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
            className="grid sm:grid-cols-3 gap-8"
          >
            {[
              { icon: Leaf, title: "Fresh Ingredients", desc: "We source the freshest items daily to ensure every meal is of the highest quality." },
              { icon: Zap, title: "Fast Service", desc: "Quick preparation and delivery without compromising on quality or taste." },
              { icon: Star, title: "Great Taste", desc: "Recipes perfected over years to deliver flavors that keep you coming back." }
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
