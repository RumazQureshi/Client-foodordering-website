import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import type { MenuItem } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t, isRtl } = useLanguage();

  // Reset quantity when modal opens for a new item
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, item]);

  if (!item) return null;

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddMore = () => {
    addToCart(item, quantity);
    toast({
      title: t('modal.toastTitle'),
      description: `${quantity}x ${isRtl ? item.nameUr : item.name} ${t('modal.addedToCart')}`,
    });
    onClose();
  };

  const handleCheckout = () => {
    addToCart(item, quantity);
    onClose();
    // Scroll to order section
    setTimeout(() => {
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[92vw] sm:w-[400px] max-w-[92vw] sm:max-w-[400px] bg-card border-none shadow-glow p-0 overflow-hidden rounded-[2rem] z-50 max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="relative h-48 sm:h-60 w-full">
          <img 
            src={item.image} 
            alt={isRtl ? item.nameUr : item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-3 left-5 right-5 sm:bottom-4 sm:left-6 sm:right-6">
             <DialogTitle className={`text-xl sm:text-2xl font-bold text-white drop-shadow-lg ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? item.nameUr : item.name}
              </DialogTitle>
          </div>
        </div>
        
        <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
          <div>
            <p className={`text-muted text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none ${isRtl ? 'text-right' : 'text-left'}`}>
              {isRtl ? item.descriptionUr : item.description}
            </p>
            <div className={`flex items-center justify-between bg-secondary/30 p-3 sm:p-4 rounded-2xl border border-border ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex flex-col ${isRtl ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] sm:text-xs text-muted font-semibold uppercase tracking-wider">{t('modal.price')}</span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  Rs. {item.price * quantity}
                </span>
              </div>
              <div className={`flex items-center bg-card rounded-full p-0.5 sm:p-1 border border-border shadow-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrease}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="w-8 sm:w-10 text-center font-bold text-lg sm:text-xl">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrease}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <Button 
              onClick={handleAddMore}
              variant="outline"
              className="w-full py-5 sm:py-7 rounded-xl sm:rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/5 font-bold text-base sm:text-lg transition-all active:scale-95"
            >
              {t('modal.addMore')}
            </Button>
            <Button 
              onClick={handleCheckout}
              className="w-full py-5 sm:py-7 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground font-bold text-base sm:text-lg shadow-glow hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 ${isRtl ? 'ml-2' : 'mr-2'}`} />
              {t('modal.checkout')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
