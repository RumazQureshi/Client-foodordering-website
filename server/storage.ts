import { type MenuItem, type InsertMenuItem, type Order, type InsertOrder, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.menuItems = new Map();
    this.orders = new Map();
    this.contactMessages = new Map();
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    const items: Omit<MenuItem, 'id'>[] = [
      // Burgers
      { name: 'Zinger Burger', category: 'burgers', price: 450, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', description: 'Crispy fried chicken fillet with spicy sauce' },
      { name: 'Beef Burger', category: 'burgers', price: 400, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop', description: 'Juicy beef patty with fresh vegetables' },
      { name: 'Chicken Burger', category: 'burgers', price: 380, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', description: 'Grilled chicken with special sauce' },
      { name: 'Cheese Burger', category: 'burgers', price: 420, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', description: 'Double cheese with beef patty' },

      // Sandwiches
      { name: 'Club Sandwich', category: 'sandwiches', price: 500, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Triple decker with chicken, bacon & egg' },
      { name: 'Chicken Sandwich', category: 'sandwiches', price: 380, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', description: 'Grilled chicken with mayo sauce' },
      { name: 'Veggie Sandwich', category: 'sandwiches', price: 300, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop', description: 'Fresh vegetables with special dressing' },

      // Rolls
      { name: 'Shapatar Roll', category: 'rolls', price: 650, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop', description: '24 inches of pure flavor wrapped in foil' },
      { name: 'Shawarma Roll', category: 'rolls', price: 400, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', description: 'Authentic Middle Eastern flavors' },
      { name: 'Chicken Roll', category: 'rolls', price: 350, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', description: 'Tender chicken with garlic sauce' },
      { name: 'Beef Roll', category: 'rolls', price: 420, image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop', description: 'Spicy beef with fresh veggies' },

      // Pizzas
      { name: 'Chicken Tikka Pizza', category: 'pizzas', price: 1200, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', description: 'Loaded with chicken tikka & cheese' },
      { name: 'Pepperoni Pizza', category: 'pizzas', price: 1100, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', description: 'Classic pepperoni with mozzarella' },
      { name: 'Vegetable Pizza', category: 'pizzas', price: 900, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop', description: 'Fresh veggies with cheese blend' },
      { name: 'BBQ Chicken Pizza', category: 'pizzas', price: 1150, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', description: 'BBQ sauce with grilled chicken' },

      // Drinks
      { name: 'Fresh Lime', category: 'drinks', price: 150, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', description: 'Refreshing lime juice' },
      { name: 'Mango Shake', category: 'drinks', price: 250, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', description: 'Fresh mango blended shake' },
      { name: 'Cola (500ml)', category: 'drinks', price: 100, image: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=400&h=300&fit=crop', description: 'Chilled soft drink' },
      { name: 'Mineral Water', category: 'drinks', price: 80, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop', description: 'Pure mineral water' },

      // Specials
      { name: 'Family Deal', category: 'specials', price: 2500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', description: '2 Pizzas + 4 Burgers + 4 Drinks' },
      { name: 'Mega Combo', category: 'specials', price: 1800, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', description: '1 Pizza + 2 Burgers + 2 Rolls + 4 Drinks' },
      { name: 'Lunch Special', category: 'specials', price: 800, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', description: 'Burger + Roll + Drink + Fries' }
    ];

    items.forEach(item => {
      const id = randomUUID();
      this.menuItems.set(id, { ...item, id });
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.category === category);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status || 'pending',
      orderNotes: insertOrder.orderNotes || null,
      createdAt: new Date().toISOString()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
