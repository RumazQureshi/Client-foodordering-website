import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { MENU_ITEMS } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import { ItemModal } from './item-modal';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    const handleSelectCategory = (event: any) => {
      const category = event.detail;
      if (category) {
        setActiveCategory(category);
      }
    };

    window.addEventListener('select-menu-category', handleSelectCategory);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('select-menu-category', handleSelectCategory);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const menuItems = MENU_ITEMS;
  const isLoading = false;

  const categories = [
    { id: 'all', label: t('menu.all') },
    { id: 'burgers', label: t('menu.burgers') },
    { id: 'sandwiches', label: t('menu.sandwiches') },
    { id: 'rolls', label: t('menu.rolls') },
    { id: 'pizzas', label: t('menu.pizzas') },
    { id: 'drinks', label: t('menu.drinks') },
    { id: 'specials', label: t('menu.specials') }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const displayedItems = (isMobile && !showAll) 
    ? filteredItems.filter(item => item.isHot)
    : filteredItems;

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="menu" className="py-20 bg-secondary/50" data-testid="menu-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">{t('menu.title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t('menu.desc')}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 scale-105 shadow-glow' 
                  : 'bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-105'
              }`}
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 sm:px-0"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-muted text-lg">{t('menu.noItems')}</p>
              </motion.div>
            ) : (
              displayedItems.map(item => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    id={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="food-card bg-card rounded-2xl overflow-hidden shadow-card border-none hover:shadow-glow group cursor-pointer"
                    data-testid={`menu-item-${item.id}`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.isHot && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-primary text-primary-foreground font-bold border-none shadow-glow animate-pulse">
                            {isRtl ? 'تازہ' : 'HOT'}
                          </Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                    </div>
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2 group-hover:text-accent transition-colors truncate">
                        {isRtl ? item.nameUr : item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4 line-clamp-2 h-8 sm:h-10">
                        {isRtl ? item.descriptionUr : item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          Rs. {item.price}
                        </span>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectItem(item);
                          }}
                          className="bg-primary text-primary-foreground px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary/90 transition shadow-lg hover:scale-105 active:scale-95"
                          data-item-id={item.id}
                          data-testid={`add-to-cart-${item.id}`}
                        >
                          <span className="mr-1">+</span> {t('menu.add')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* See All Items Button (Mobile only) */}
        {isMobile && !showAll && filteredItems.length > displayedItems.length && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              className="bg-primary text-primary-foreground px-10 py-6 rounded-full font-bold text-lg shadow-glow hover:scale-105 transition-all"
            >
              {t('menu.seeAll')}
            </Button>
          </motion.div>
        )}

        {/* Item Selection Modal */}
        <ItemModal 
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}

