import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Menu } from '@/components/menu';
import { Order } from '@/components/order';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart, type CartItem } from '@/hooks/use-cart';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotal } = useCart();

  const subtotal = getSubtotal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCartSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navigation onCartClick={() => setCartSidebarOpen(true)} />
      <Hero />
      <Menu />
      <Order />
      <About />
      <Contact />
      <Footer />

      {/* Cart Sidebar */}
      <Sheet open={cartSidebarOpen} onOpenChange={setCartSidebarOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] bg-card p-0 flex flex-col border-l-primary/10">
          <div className="p-5 sm:p-6 border-b border-border flex justify-between items-center bg-secondary/20">
            <h3 className="text-xl sm:text-2xl font-bold text-primary">Your Cart</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCartSidebarOpen(false)}
              className="rounded-full hover:bg-primary/10 text-primary sm:hidden"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6" data-testid="cart-sidebar-items">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-muted/40" />
                </div>
                <p className="text-muted text-lg">Your cart is empty</p>
                <Button 
                  onClick={() => {
                    scrollToSection('menu');
                    setCartSidebarOpen(false);
                  }}
                  variant="outline"
                  className="rounded-full"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-3 bg-secondary/50 hover:bg-secondary rounded-2xl p-3 transition-colors"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm truncate">{item.name}</h4>
                      <p className="text-primary text-sm font-semibold">Rs. {item.price}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center space-x-1 bg-card rounded-full p-1 border border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 p-0 rounded-full hover:bg-primary hover:text-primary-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-foreground font-bold w-5 text-center text-xs">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 p-0 rounded-full hover:bg-primary hover:text-primary-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted/60 hover:text-destructive h-6 px-2 text-[10px]"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 border-t border-border bg-secondary/10">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xl sm:text-2xl font-bold text-primary">
                <span>Total:</span>
                <span data-testid="sidebar-total">Rs. {subtotal}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted italic">Delivery charges will be confirmed based on your location.</p>
            </div>
            <Button
              onClick={() => {
                scrollToSection('order');
                setCartSidebarOpen(false);
              }}
              disabled={cart.length === 0}
              className="w-full py-6 sm:py-7 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
              data-testid="proceed-to-checkout-button"
            >
              🛍️ Proceed to Order
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
