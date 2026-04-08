import type { MenuItem } from '@shared/schema';

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  { id: '1', name: 'Zinger Burger', category: 'burgers', price: 450, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', description: 'Crispy fried chicken fillet with spicy sauce' },
  { id: '2', name: 'Beef Burger', category: 'burgers', price: 400, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop', description: 'Juicy beef patty with fresh vegetables' },
  { id: '3', name: 'Chicken Burger', category: 'burgers', price: 380, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', description: 'Grilled chicken with special sauce' },
  { id: '4', name: 'Cheese Burger', category: 'burgers', price: 420, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', description: 'Double cheese with beef patty' },

  // Sandwiches
  { id: '5', name: 'Club Sandwich', category: 'sandwiches', price: 500, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Triple decker with chicken, bacon & egg' },
  { id: '6', name: 'Chicken Sandwich', category: 'sandwiches', price: 380, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', description: 'Grilled chicken with mayo sauce' },
  { id: '7', name: 'Veggie Sandwich', category: 'sandwiches', price: 300, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop', description: 'Fresh vegetables with special dressing' },

  // Rolls
  { id: '8', name: 'Shapatar Roll', category: 'rolls', price: 650, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop', description: '24 inches of pure flavor wrapped in foil' },
  { id: '9', name: 'Shawarma Roll', category: 'rolls', price: 400, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', description: 'Authentic Middle Eastern flavors' },
  { id: '10', name: 'Chicken Roll', category: 'rolls', price: 350, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', description: 'Tender chicken with garlic sauce' },
  { id: '11', name: 'Beef Roll', category: 'rolls', price: 420, image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop', description: 'Spicy beef with fresh veggies' },

  // Pizzas
  { id: '12', name: 'Chicken Tikka Pizza', category: 'pizzas', price: 1200, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', description: 'Loaded with chicken tikka & cheese' },
  { id: '13', name: 'Pepperoni Pizza', category: 'pizzas', price: 1100, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', description: 'Classic pepperoni with mozzarella' },
  { id: '14', name: 'Vegetable Pizza', category: 'pizzas', price: 900, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop', description: 'Fresh veggies with cheese blend' },
  { id: '15', name: 'BBQ Chicken Pizza', category: 'pizzas', price: 1150, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', description: 'BBQ sauce with grilled chicken' },

  // Drinks
  { id: '16', name: 'Fresh Lime', category: 'drinks', price: 150, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', description: 'Refreshing lime juice' },
  { id: '17', name: 'Mango Shake', category: 'drinks', price: 250, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', description: 'Fresh mango blended shake' },
  { id: '18', name: 'Cola (500ml)', category: 'drinks', price: 100, image: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=400&h=300&fit=crop', description: 'Chilled soft drink' },
  { id: '19', name: 'Mineral Water', category: 'drinks', price: 80, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop', description: 'Pure mineral water' },

  // Specials
  { id: '20', name: 'Family Deal', category: 'specials', price: 2500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', description: '2 Pizzas + 4 Burgers + 4 Drinks' },
  { id: '21', name: 'Mega Combo', category: 'specials', price: 1800, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', description: '1 Pizza + 2 Burgers + 2 Rolls + 4 Drinks' },
  { id: '22', name: 'Lunch Special', category: 'specials', price: 800, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', description: 'Burger + Roll + Drink + Fries' }
];
