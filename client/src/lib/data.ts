import type { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  { id: '1', name: 'Zinger Burger', nameUr: 'زنگر برگر', category: 'burgers', price: 450, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', description: 'Crispy fried chicken fillet with spicy sauce', descriptionUr: 'کرسپی فرائیڈ چکن فلیٹ اسپائسی سوس کے ساتھ', isHot: true },
  { id: '2', name: 'Beef Burger', nameUr: 'بیف برگر', category: 'burgers', price: 400, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop', description: 'Juicy beef patty with fresh vegetables', descriptionUr: 'جوسی بیف پیٹی تازہ سبزیوں کے ساتھ' },
  { id: '3', name: 'Chicken Burger', nameUr: 'چکن برگر', category: 'burgers', price: 380, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', description: 'Grilled chicken with special sauce', descriptionUr: 'گرلڈ چکن اسپیشل سوس کے ساتھ' },
  { id: '4', name: 'Cheese Burger', nameUr: 'چیز برگر', category: 'burgers', price: 420, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', description: 'Double cheese with beef patty', descriptionUr: 'ڈبل چیز بیف پیٹی کے ساتھ' },

  // Sandwiches
  { id: '5', name: 'Club Sandwich', nameUr: 'کلب سینڈوچ', category: 'sandwiches', price: 500, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Triple decker with chicken, bacon & egg', descriptionUr: 'ٹرپل ڈیکر چکن، بیکن اور انڈے کے ساتھ', isHot: true },
  { id: '6', name: 'Chicken Sandwich', nameUr: 'چکن سینڈوچ', category: 'sandwiches', price: 380, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', description: 'Grilled chicken with mayo sauce', descriptionUr: 'گرلڈ چکن مایو سوس کے ساتھ' },
  { id: '7', name: 'Veggie Sandwich', nameUr: 'ویجی سینڈوچ', category: 'sandwiches', price: 300, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop', description: 'Fresh vegetables with special dressing', descriptionUr: 'تازہ سبزیاں اسپیشل ڈریسنگ کے ساتھ' },

  // Rolls
  { id: '8', name: 'Shapatar Roll', nameUr: 'شاپاتر رول', category: 'rolls', price: 650, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop', description: '24 inches of pure flavor wrapped in foil', descriptionUr: '24 انچ خالص ذائقہ فوائل میں لپٹا ہوا', isHot: true },
  { id: '9', name: 'Shawarma Roll', nameUr: 'شورما رول', category: 'rolls', price: 400, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', description: 'Authentic Middle Eastern flavors', descriptionUr: 'اصلی مشرق وسطی کے ذائقے', isHot: true },
  { id: '10', name: 'Chicken Roll', nameUr: 'چکن رول', category: 'rolls', price: 350, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', description: 'Tender chicken with garlic sauce', descriptionUr: 'نرم چکن لہسن کی چٹنی کے ساتھ' },
  { id: '11', name: 'Beef Roll', nameUr: 'بیف رول', category: 'rolls', price: 420, image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop', description: 'Spicy beef with fresh veggies', descriptionUr: 'اسپائسی بیف تازہ سبزیوں کے ساتھ' },

  // Pizzas
  { id: '12', name: 'Chicken Tikka Pizza', nameUr: 'چکن تکہ پیزا', category: 'pizzas', price: 1200, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', description: 'Loaded with chicken tikka & cheese', descriptionUr: 'چکن تکہ اور پنیر سے بھرپور', isHot: true },
  { id: '13', name: 'Pepperoni Pizza', nameUr: 'پیپرونی پیزا', category: 'pizzas', price: 1100, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', description: 'Classic pepperoni with mozzarella', descriptionUr: 'کلاسک پیپرونی موزاریلا کے ساتھ' },
  { id: '14', name: 'Vegetable Pizza', nameUr: 'ویجیٹیبل پیزا', category: 'pizzas', price: 900, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop', description: 'Fresh veggies with cheese blend', descriptionUr: 'تازہ سبزیاں پنیر کے ساتھ' },
  { id: '15', name: 'BBQ Chicken Pizza', nameUr: 'بی بی کیو چکن پیزا', category: 'pizzas', price: 1150, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', description: 'BBQ sauce with grilled chicken', descriptionUr: 'بی بی کیو سوس گرلڈ چکن کے ساتھ' },

  // Drinks
  { id: '16', name: 'Fresh Lime', nameUr: 'فریش لائم', category: 'drinks', price: 150, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', description: 'Refreshing lime juice', descriptionUr: 'تازہ لیموں کا رس' },
  { id: '17', name: 'Mango Shake', nameUr: 'مینگو شیک', category: 'drinks', price: 250, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', description: 'Fresh mango blended shake', descriptionUr: 'تازہ آم کا شیک' },
  { id: '18', name: 'Cola (500ml)', nameUr: 'کولا (500 ملی لیٹر)', category: 'drinks', price: 100, image: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=400&h=300&fit=crop', description: 'Chilled soft drink', descriptionUr: 'ٹھنڈا کولڈ ڈرنک' },
  { id: '19', name: 'Mineral Water', nameUr: 'منرل واٹر', category: 'drinks', price: 80, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop', description: 'Pure mineral water', descriptionUr: 'خالص منرل واٹر' },

  // Specials
  { id: '20', name: 'Family Deal', nameUr: 'فیملی ڈیل', category: 'specials', price: 2500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', description: '2 Pizzas + 4 Burgers + 4 Drinks', descriptionUr: '2 پیزا + 4 برگر + 4 ڈرنکس', isHot: true },
  { id: '21', name: 'Mega Combo', nameUr: 'میگا کمبو', category: 'specials', price: 1800, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', description: '1 Pizza + 2 Burgers + 2 Rolls + 4 Drinks', descriptionUr: '1 پیزا + 2 برگر + 2 رولز + 4 ڈرنکس', isHot: true },
  { id: '22', name: 'Lunch Special', nameUr: 'لنچ اسپیشل', category: 'specials', price: 800, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', description: 'Burger + Roll + Drink + Fries', descriptionUr: 'برگر + رول + ڈرنک + فرائز' }
];
