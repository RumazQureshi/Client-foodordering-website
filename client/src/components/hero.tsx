import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredItems = [
    {
      name: 'Zinger Burger',
      description: 'Crispy & Spicy',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      name: 'Club Sandwich',
      description: 'Triple Decker Delight',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
    },
    {
      name: 'Shawarma Roll',
      description: 'Authentic Flavors',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop'
    },
    {
      name: 'Fresh Pizza',
      description: 'Loaded with Cheese',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-6">
            <span className="text-primary">Shan</span>
            <span className="text-foreground"> Fast Food</span>
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-4" data-testid="hero-tagline">
            Taste That Speaks for Itself!
          </p>
          <p className="text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto">
            Experience the perfect blend of authentic flavors and fast service. From our signature Zinger Burgers to our famous Shapatar Roll, every bite is a celebration!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button
              onClick={() => scrollToSection('menu')}
              className="glow-btn bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition"
              data-testid="view-menu-button"
            >
              <span className="mr-2">🍽️</span>View Menu
            </Button>
            <Button
              onClick={() => scrollToSection('order')}
              variant="outline"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-primary-foreground transition"
              data-testid="order-now-button"
            >
              <span className="mr-2">🛍️</span>Order Now
            </Button>
          </div>

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredItems.map((item, index) => (
              <div 
                key={index}
                className="food-card bg-card rounded-2xl overflow-hidden shadow-card"
                data-testid={`featured-item-${index}`}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Arrival Highlight */}
          <div 
            className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl p-8 border-2 border-primary/50"
            data-testid="shapatar-roll-highlight"
          >
            <div className="flex items-center justify-center mb-4">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <span className="mr-2">⭐</span>New Arrival
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Shapatar Roll</h2>
            <p className="text-xl md:text-2xl text-foreground font-semibold mb-3">
              Rolled in Foil, 24 Inches of Flavor!
            </p>
            <p className="text-muted max-w-2xl mx-auto mb-6">
              Our signature creation - a massive 24-inch roll packed with tender meat, fresh vegetables, and our secret sauce, all wrapped perfectly in foil for the ultimate portable feast.
            </p>
            <Button
              onClick={() => scrollToSection('order')}
              className="glow-btn bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition"
              data-testid="order-shapatar-button"
            >
              <span className="mr-2">🔥</span>Order Shapatar Roll Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
