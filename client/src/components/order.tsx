import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { CheckCircle, Trash2, Plus, Minus } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import type { Order, MenuItem } from '@/lib/types';

const AL_HANI_WHATSAPP_NUMBER = '+923112652126';

export function Order() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const { cart, updateQuantity, removeFromCart, clearCart, getSubtotal, getTotal } = useCart();
  const { toast } = useToast();
  const { t, isRtl } = useLanguage();

  const orderFormSchema = z.object({
    customerName: z.string().min(2, t('order.validation.name')),
    customerPhone: z.string().min(10, t('order.validation.phone')),
    customerAddress: z.string().min(10, t('order.validation.address')),
    orderNotes: z.string().optional(),
  });

  type OrderFormData = z.infer<typeof orderFormSchema>;

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      orderNotes: '',
    },
  });


  const onWhatsAppSubmit = (data: OrderFormData) => {
    if (cart.length === 0) {
      toast({
        title: t('order.toastEmpty'),
        description: t('order.toastEmptyDesc'),
        variant: "destructive",
      });
      return;
    }

    const itemsList = cart
      .map(item => `- ${item.quantity}x ${isRtl ? item.nameUr : item.name} -- Rs ${item.price * item.quantity}`)
      .join('\n');

    const message = isRtl 
      ? `*نیا آرڈر -- الحانی فاسٹ فوڈ آفیشل*
================================================

*آرڈر کی اشیاء:*
${itemsList}

------------------------------------------------
*سب ٹوٹل:* Rs ${subtotal}
*ٹوٹل (COD):* Rs ${subtotal}
================================================

*گاہک کا نام:* ${data.customerName}
*فون نمبر:* ${data.customerPhone}
*پتہ:* ${data.customerAddress}

================================================
*برائے مہربانی ڈیلیوری سے پہلے تصدیق کے لیے کال کریں۔*
تصدیق شدہ بذریعہ: RAS Innovatech | الحانی فاسٹ فوڈ آفیشل`
      : `*NEW ORDER -- AL-HANI FAST FOOD OFFICIAL*
================================================

*Order Items:*
${itemsList}

------------------------------------------------
*Subtotal:* Rs ${subtotal}
*TOTAL (COD):* Rs ${subtotal}
================================================

*Customer Name:* ${data.customerName}
*Phone:* ${data.customerPhone}
*Address:* ${data.customerAddress}

================================================
*Please call customer to VERIFY before dispatch.*
Verified by: RAS Innovatech | AL-HANI FAST FOOD OFFICIAL`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${AL_HANI_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');

    // Pure frontend success flow
    setSuccessOrder({
      id: `WA-${Math.floor(Math.random() * 1000000)}`,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      orderNotes: data.orderNotes || undefined,
      items: cart,
      subtotal: subtotal,
      deliveryFee: 150,
      total: subtotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setOrderSuccess(true);
    clearCart();
    form.reset();
    toast({
      title: t('order.toastSuccess'),
      description: t('order.toastSuccessDesc'),
    });
  };

  const subtotal = getSubtotal();

  const quickOrderItems = cart.slice(0, 8);

  return (
    <section id="order" className="py-12 sm:py-20" data-testid="order-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-primary mb-3 sm:mb-4">{t('order.title')}</h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-4">
            {t('order.desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order Form Section - Appears second on mobile */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Customer Details Form */}
            <Card className="bg-card shadow-card border-none sm:border">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className={`text-xl sm:text-2xl font-bold text-primary ${isRtl ? 'text-right' : ''}`}>{t('order.details')}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Form {...form}>
                  <form id="order-form" onSubmit={form.handleSubmit(onWhatsAppSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem id="customer-name-field">
                          <FormLabel className={`text-muted font-semibold text-sm w-full block ${isRtl ? 'text-right' : ''}`}>{t('order.name')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="customerName"
                              placeholder={t('order.placeholder.name')}
                              className={`bg-secondary border border-border focus:border-primary h-12 ${isRtl ? 'text-right' : ''}`}
                              data-testid="customer-name-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem id="customer-phone-field">
                          <FormLabel className={`text-muted font-semibold text-sm w-full block ${isRtl ? 'text-right' : ''}`}>{t('order.phone')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="customerPhone"
                              type="tel"
                              placeholder={t('order.placeholder.phone')}
                              className={`bg-secondary border border-border focus:border-primary h-12 ${isRtl ? 'text-right' : ''}`}
                              data-testid="customer-phone-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerAddress"
                      render={({ field }) => (
                        <FormItem id="customer-address-field">
                          <FormLabel className={`text-muted font-semibold text-sm w-full block ${isRtl ? 'text-right' : ''}`}>{t('order.address')}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              id="customerAddress"
                              rows={3}
                              placeholder={t('order.placeholder.address')}
                              className={`bg-secondary border border-border focus:border-primary ${isRtl ? 'text-right' : ''}`}
                              data-testid="customer-address-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-muted font-semibold text-sm w-full block ${isRtl ? 'text-right' : ''}`}>{t('order.notes')}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={2}
                              placeholder={t('order.placeholder.notes')}
                              className={`bg-secondary border border-border focus:border-primary ${isRtl ? 'text-right' : ''}`}
                              data-testid="order-notes-input"
                            />
                          </FormControl>
                          <FormMessage className={isRtl ? 'text-right' : ''} />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar - Appears first on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <Card className="bg-card shadow-card sticky top-24 border-none sm:border">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className={`text-xl sm:text-2xl font-bold text-primary ${isRtl ? 'text-right' : ''}`}>{t('order.summary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="space-y-3 max-h-[60vh] lg:max-h-80 overflow-y-auto pr-1" data-testid="cart-items-list">
                  {cart.length === 0 ? (
                    <p className="text-muted text-center py-8">{t('order.empty')}</p>
                  ) : (
                    cart.map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-center space-x-2 sm:space-x-3 bg-secondary rounded-xl p-2 sm:p-3 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}
                        data-testid={`cart-item-${item.id}`}
                      >
                        <img 
                          src={item.image} 
                          alt={isRtl ? item.nameUr : item.name} 
                          className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg object-cover"
                        />
                        <div className={`flex-1 min-w-0 ${isRtl ? 'text-right' : ''}`}>
                          <h4 className="font-semibold text-foreground text-xs sm:text-sm truncate">{isRtl ? item.nameUr : item.name}</h4>
                          <p className="text-primary text-[10px] sm:text-sm">Rs. {item.price} x {item.quantity}</p>
                        </div>
                        <div className={`flex items-center space-x-1 sm:space-x-2 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-primary hover:text-primary-foreground"
                            data-testid={`decrease-quantity-${item.id}`}
                          >
                            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </Button>
                          <span className="text-foreground font-semibold w-4 sm:w-6 text-center text-xs sm:text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-primary hover:text-primary-foreground"
                            data-testid={`increase-quantity-${item.id}`}
                          >
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted hover:text-destructive p-0.5 sm:p-1"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className={`flex justify-between text-lg sm:text-xl font-bold text-primary ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span>{t('order.total')}</span>
                    <span data-testid="total-price">Rs. {subtotal}</span>
                  </div>
                  <p className={`text-[10px] sm:text-xs text-muted italic ${isRtl ? 'text-right' : ''}`}>{t('order.deliveryNote')}</p>
                </div>

                <Button
                  type="submit"
                  form="order-form"
                  disabled={cart.length === 0}
                  className="w-full py-4 sm:py-6 rounded-full font-bold text-base sm:text-lg transition shadow-lg hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: '#25D366', color: '#fff' }}
                  data-testid="order-via-whatsapp-button"
                >
                  <SiWhatsapp className={`w-4 h-4 sm:w-5 sm:h-5 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                  {t('order.whatsapp')}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    if (cart.length > 0 && confirm(t('order.confirmClear'))) {
                      clearCart();
                    }
                  }}
                  disabled={cart.length === 0}
                  className="w-full mt-2 sm:mt-3 border border-border text-muted py-3 sm:py-4 rounded-full font-semibold hover:bg-secondary transition text-sm sm:text-base"
                  data-testid="clear-cart-button"
                >
                  <Trash2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                  {t('order.clear')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Success Modal */}
        <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
          <DialogContent className="w-[92vw] sm:max-w-md bg-card shadow-glow rounded-[2rem] border-none max-h-[90vh] overflow-y-auto" data-testid="order-success-modal">
            <DialogHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-primary text-4xl w-10 h-10" />
              </div>
              <DialogTitle className="text-3xl font-bold text-primary">
                {t('order.success')}
              </DialogTitle>
              <p className="text-muted">{t('order.thanks')}</p>
            </DialogHeader>
            {successOrder && (
              <div className={`bg-secondary rounded-xl p-4 space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                <p><strong className="text-primary">{t('order.id')}</strong> {successOrder.id}</p>
                <p><strong className="text-primary">{t('order.label.name')}</strong> {successOrder.customerName}</p>
                <p><strong className="text-primary">{t('order.label.phone')}</strong> {successOrder.customerPhone}</p>
                <p><strong className="text-primary">{t('order.label.total')}</strong> Rs. {successOrder.total}</p>
              </div>
            )}
            <Button
              onClick={() => {
                setOrderSuccess(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glow-btn bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition"
              data-testid="back-to-home-button"
            >
              <span className={isRtl ? 'ml-2' : 'mr-2'}>🏠</span>{t('order.backHome')}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
