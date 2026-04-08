export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderNotes?: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
