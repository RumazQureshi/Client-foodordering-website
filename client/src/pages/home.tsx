import { useState } from 'react';
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
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export default function Home() {
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotal } = useCart();

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCartSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onCartClick={() => setCartSidebarOpen(true)} />
      <Hero />
      <Menu />
      <Order />
      <About />
      <Contact />
      <Footer />

      {/* Cart Sidebar */}
      <Sheet open={cartSidebarOpen} onOpenChange={setCartSidebarOpen}>
        <SheetContent side="right" className="w-[400px] bg-card p-0 flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-2xl font-bold text-primary">Your Cart</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartSidebarOpen(false)}
              className="text-muted hover:text-primary"
              data-testid="close-cart-sidebar"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-testid="cart-sidebar-items">
            {cart.length === 0 ? (
              <p className="text-muted text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-3 bg-secondary rounded-lg p-3"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                      <p className="text-primary text-sm">Rs. {item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 p-0 hover:bg-primary hover:text-primary-foreground"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-foreground font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 p-0 hover:bg-primary hover:text-primary-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted hover:text-destructive p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-muted">
                <span>Subtotal:</span>
                <span data-testid="sidebar-subtotal">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery:</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-primary">
                <span>Total:</span>
                <span data-testid="sidebar-total">Rs. {total}</span>
              </div>
            </div>
            <Button
              onClick={() => scrollToSection('order')}
              disabled={cart.length === 0}
              className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-full font-bold hover:bg-primary/90 transition"
              data-testid="proceed-to-checkout-button"
            >
              🛍️ Proceed to Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
