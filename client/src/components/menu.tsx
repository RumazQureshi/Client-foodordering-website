import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import type { MenuItem } from '@shared/schema';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-card text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="bg-card shadow-card overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted text-lg">No items found in this category.</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <Card 
                key={item.id} 
                className="food-card bg-card rounded-2xl overflow-hidden shadow-card"
                data-testid={`menu-item-${item.id}`}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-muted mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      Rs. {item.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition"
                      data-item-id={item.id}
                      data-testid={`add-to-cart-${item.id}`}
                    >
                      <span className="mr-1">+</span> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
