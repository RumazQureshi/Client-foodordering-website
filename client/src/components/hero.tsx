import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { MENU_ITEMS } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import { Star } from 'lucide-react';

export function Hero() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t, isRtl } = useLanguage();
  const menuItems = MENU_ITEMS;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredItems = [
    {
      name: t('hero.featured.zinger'),
      description: t('hero.featured.zingerDesc'),
      category: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      name: t('hero.featured.club'),
      description: t('hero.featured.clubDesc'),
      category: 'sandwiches',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
    },
    {
      name: t('hero.featured.shawarma'),
      description: t('hero.featured.shawarmaDesc'),
      category: 'rolls',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop'
    },
    {
      name: t('hero.featured.pizza'),
      description: t('hero.featured.pizzaDesc'),
      category: 'pizzas',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    }
  ];
 
  const testimonials = [
    { text: t('hero.test1.text'), author: t('hero.test1.author'), rating: 5 },
    { text: t('hero.test2.text'), author: t('hero.test2.author'), rating: 5 },
    { text: t('hero.test3.text'), author: t('hero.test3.author'), rating: 5 },
    { text: t('hero.test4.text'), author: t('hero.test4.author'), rating: 5 },
    { text: t('hero.test5.text'), author: t('hero.test5.author'), rating: 5 }
  ];
 
  const handleItemClick = (category: string, itemName: string, originalName: string) => {
    // 0. Add to cart if found
    const item = menuItems.find(i => i.name.toLowerCase() === originalName.toLowerCase());
    if (item) {
      addToCart(item);
      toast({
        title: t('modal.toastTitle'),
        description: `${isRtl ? item.nameUr : item.name} ${isRtl ? 'آپ کی کارٹ میں شامل کر دیا گیا ہے۔' : 'has been added to your cart.'}`,
      });
    }

    // 1. Dispatch event to Menu component
    window.dispatchEvent(new CustomEvent('select-menu-category', { detail: category }));
    
    // 2. Scroll to menu section
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 3. Scroll to specific item after a short delay (Menu component needs time to render the category)
    setTimeout(() => {
      const itemId = `menu-item-${itemName.toLowerCase().replace(/\s+/g, '-')}`;
      const itemElement = document.getElementById(itemId);
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Visual feedback highlight
        itemElement.classList.add('ring-4', 'ring-primary', 'shadow-glow-lg');
        setTimeout(() => {
          itemElement.classList.remove('ring-4', 'ring-primary', 'shadow-glow-lg');
        }, 2000);
      }
    }, 100);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-20 flex flex-col items-center justify-start overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center flex-grow justify-center pb-20">
        <div className="text-center max-w-5xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-4 sm:mb-6 px-4"
          >
            <span className="text-primary">{t('hero.title')}</span>
            <span className="text-foreground text-nowrap sm:text-wrap"> {t('hero.subtitle')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-3 sm:mb-4 px-4" 
            data-testid="hero-tagline"
          >
            {t('hero.tagline')}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted mb-8 sm:mb-12 max-w-3xl mx-auto px-6 whitespace-normal"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-6 justify-center mb-16 relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(var(--primary), 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('menu')}
              className="glow-btn bg-primary text-primary-foreground px-8 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-lg sm:text-xl transition-all shadow-glow hover:shadow-glow-lg border-none cursor-pointer flex items-center justify-center w-full sm:w-auto"
              data-testid="view-menu-button"
            >
              <span className={`text-xl sm:text-2xl ${isRtl ? 'ml-2' : 'mr-2'}`}>🍽️</span>{t('hero.viewMenu')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", backgroundColor: "hsl(var(--primary))" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('order')}
              className="border-2 border-primary text-primary bg-transparent px-8 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-lg sm:text-xl transition-all shadow-lg hover:shadow-glow cursor-pointer flex items-center justify-center w-full sm:w-auto"
              data-testid="order-now-button"
            >
              <span className={`text-xl sm:text-2xl ${isRtl ? 'ml-2' : 'mr-2'}`}>🛍️</span>{t('hero.orderNow')}
            </motion.button>
          </motion.div>

          {/* Featured Items Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.8
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          >
            {featuredItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5
                    }
                  }
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 5, -5, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4
                  },
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  },
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -25,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleItemClick(item.category, item.name, ['Zinger Burger', 'Club Sandwich', 'Shawarma Roll', 'Fresh Pizza'][index])}
                className="food-card bg-card rounded-2xl overflow-hidden shadow-card relative group cursor-pointer"
                data-testid={`featured-item-${index}`}
              >
                <div className="overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 bg-gradient-to-t from-card via-card to-transparent text-left">
                  <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* New Arrival Highlight */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl p-6 sm:p-8 border-2 border-primary/50 relative overflow-hidden group shadow-glow mb-12"
            data-testid="shapatar-roll-highlight"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center mb-4"
            >
              <span className="bg-primary text-primary-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-wider">
                <span className={isRtl ? 'ml-2' : 'mr-2'}>⭐</span>{t('hero.newArrival')}
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-2 sm:mb-4">{t('hero.shapatarTitle')}</h2>
            <p className="text-base sm:text-xl md:text-2xl text-foreground font-semibold mb-2 sm:mb-3">
              {t('hero.shapatarDesc')}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto mb-6">
              {t('hero.shapatarDetail')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(var(--primary), 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const shapatar = menuItems.find(item => item.name.toLowerCase().includes('shapatar'));
                if (shapatar) {
                  addToCart(shapatar);
                  toast({
                    title: t('modal.toastTitle'),
                    description: `${isRtl ? shapatar.nameUr : shapatar.name} ${isRtl ? 'آپ کی کارٹ میں شامل کر دیا گیا ہے۔' : 'has been added to your cart.'}`,
                  });
                }
                scrollToSection('order');
              }}
              className="relative z-10 glow-btn bg-primary text-primary-foreground px-6 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-xl transition-all shadow-glow hover:shadow-glow-lg border-none"
              data-testid="order-shapatar-button"
            >
              <span className={isRtl ? 'ml-2' : 'mr-2'}>🔥</span>{t('hero.orderNow')}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Continuous Sliding Testimonials - Wide to Screen */}
      <div className="w-full overflow-hidden relative py-12 bg-card/20 backdrop-blur-sm border-y border-white/5" data-testid="testimonial-marquee">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        
        <h3 className="text-xl font-bold text-primary mb-12 text-center uppercase tracking-widest opacity-80">
          {t('hero.customerLove')}
        </h3>
        
        <div className="flex w-max gap-8 animate-marquee">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i}
              className="flex-shrink-0 bg-card/40 backdrop-blur-md border border-white/5 p-6 sm:p-8 rounded-3xl w-[280px] sm:w-[300px] md:w-[380px] shadow-glow-sm hover:shadow-glow transition-all duration-500 group"
            >
              <div className="flex text-primary mb-4 group-hover:scale-110 transition-transform origin-left">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm md:text-base italic mb-6 whitespace-normal leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {t.author.charAt(0)}
                </div>
                <p className="text-primary font-bold text-sm tracking-wide">
                  {t.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
