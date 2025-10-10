import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart, type CartItem } from '@/hooks/use-cart';

interface NavigationProps {
  onCartClick: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { getTotalItems } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ['home', 'menu', 'order', 'about', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const NavLink = ({ item }: { item: { id: string; label: string } }) => (
    <button
      onClick={() => scrollToSection(item.id)}
      className={`nav-link text-foreground hover:text-primary transition-colors ${
        activeSection === item.id ? 'active text-primary' : ''
      }`}
      data-testid={`nav-${item.id}`}
    >
      {item.label}
    </button>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      data-testid="navigation-bar"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            data-testid="logo-button"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Utensils className="text-primary-foreground text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-primary">Shan Fast Food</h1>
              <p className="text-xs text-muted hidden sm:block">Taste That Speaks for Itself!</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative p-3 hover:bg-secondary rounded-full transition"
              data-testid="cart-button"
            >
              <ShoppingCart className="text-primary text-xl" />
              {getTotalItems() > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground min-w-5 h-5 flex items-center justify-center text-xs cart-pulse"
                  data-testid="cart-count"
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden p-3 hover:bg-secondary rounded-full transition"
                  data-testid="mobile-menu-trigger"
                >
                  <Menu className="text-primary text-xl" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-secondary">
                <div className="flex flex-col space-y-6 mt-12">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-foreground hover:text-primary text-lg text-left transition-colors"
                      data-testid={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
