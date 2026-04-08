import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { MENU_ITEMS } from '@/lib/data';
import type { MenuItem } from '@/lib/types';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const handleSelectCategory = (event: any) => {
      const category = event.detail;
      if (category) {
        setActiveCategory(category);
      }
    };

    window.addEventListener('select-menu-category', handleSelectCategory);
    return () => window.removeEventListener('select-menu-category', handleSelectCategory);
  }, []);

  const menuItems = MENU_ITEMS;
  const isLoading = false;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'sandwiches', label: 'Sandwiches' },
    { id: 'rolls', label: 'Rolls' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'specials', label: 'Specials' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
    // Add visual feedback
    const button = document.querySelector(`[data-item-id="${item.id}"]`);
    if (button) {
      button.classList.add('cart-pulse');
      setTimeout(() => button.classList.remove('cart-pulse'), 300);
    }
  };

  return (
    <section id="menu" className="py-20 bg-secondary/50" data-testid="menu-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">Our Menu</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Explore our delicious selection of fast food favorites, made fresh and served hot!
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
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-muted text-lg">No items found in this category.</p>
              </motion.div>
            ) : (
              filteredItems.map(item => (
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
                    className="food-card bg-card rounded-2xl overflow-hidden shadow-card border-none hover:shadow-glow group"
                    data-testid={`menu-item-${item.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          Rs. {item.price}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition shadow-lg hover:scale-105 active:scale-95"
                          data-item-id={item.id}
                          data-testid={`add-to-cart-${item.id}`}
                        >
                          <span className="mr-1">+</span> Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
