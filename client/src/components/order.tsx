import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Trash2, Plus, Minus } from 'lucide-react';
import type { Order } from '@shared/schema';

const orderFormSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 characters'),
  customerAddress: z.string().min(10, 'Address must be at least 10 characters'),
  orderNotes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export function Order() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const { cart, updateQuantity, removeFromCart, clearCart, getSubtotal, getTotal } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      orderNotes: '',
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: (order: Order) => {
      setSuccessOrder(order);
      setOrderSuccess(true);
      clearCart();
      form.reset();
      toast({
        title: "Order Placed Successfully!",
        description: "We'll deliver your food shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Order error:', error);
    },
  });

  const onSubmit = (data: OrderFormData) => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      ...data,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: getSubtotal(),
      deliveryFee: 150,
      total: getTotal(),
      status: 'pending',
    };

    createOrderMutation.mutate(orderData);
  };

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const quickOrderItems = cart.slice(0, 8);

  return (
    <section id="order" className="py-20" data-testid="order-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">Place Your Order</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Add your favorite items to cart and complete your order in seconds!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Details Form */}
            <Card className="bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your name"
                              className="bg-secondary border border-border focus:border-primary"
                              data-testid="customer-name-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+92 300 1234567"
                              className="bg-secondary border border-border focus:border-primary"
                              data-testid="customer-phone-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Delivery Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              placeholder="Enter complete delivery address"
                              className="bg-secondary border border-border focus:border-primary"
                              data-testid="customer-address-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted font-semibold">Special Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={2}
                              placeholder="Any special requests?"
                              className="bg-secondary border border-border focus:border-primary"
                              data-testid="order-notes-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 max-h-64 overflow-y-auto" data-testid="cart-items-list">
                  {cart.length === 0 ? (
                    <p className="text-muted text-center py-8">Your cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div 
                        key={item.id}
                        className="flex items-center space-x-3 bg-secondary rounded-lg p-3"
                        data-testid={`cart-item-${item.id}`}
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
                            data-testid={`decrease-quantity-${item.id}`}
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
                            data-testid={`increase-quantity-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted hover:text-destructive p-1"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal:</span>
                    <span data-testid="subtotal">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Delivery Fee:</span>
                    <span data-testid="delivery-fee">Rs. {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-3">
                    <span>Total:</span>
                    <span data-testid="total-price">Rs. {total}</span>
                  </div>
                </div>

                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={cart.length === 0 || createOrderMutation.isPending}
                  className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition"
                  data-testid="place-order-button"
                >
                  {createOrderMutation.isPending ? (
                    <>🔄 Processing...</>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  disabled={cart.length === 0}
                  className="w-full mt-3 border border-border text-muted py-3 rounded-full font-semibold hover:bg-secondary transition"
                  data-testid="clear-cart-button"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Success Modal */}
        <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
          <DialogContent className="max-w-md bg-card shadow-glow" data-testid="order-success-modal">
            <DialogHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-primary text-4xl w-10 h-10" />
              </div>
              <DialogTitle className="text-3xl font-bold text-primary">
                Order Placed Successfully!
              </DialogTitle>
              <p className="text-muted">Thank you for your order. We'll deliver your food shortly.</p>
            </DialogHeader>
            {successOrder && (
              <div className="bg-secondary rounded-xl p-4 space-y-2 text-left">
                <p><strong className="text-primary">Order ID:</strong> {successOrder.id}</p>
                <p><strong className="text-primary">Name:</strong> {successOrder.customerName}</p>
                <p><strong className="text-primary">Phone:</strong> {successOrder.customerPhone}</p>
                <p><strong className="text-primary">Total:</strong> Rs. {successOrder.total}</p>
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
              <span className="mr-2">🏠</span>Back to Home
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
