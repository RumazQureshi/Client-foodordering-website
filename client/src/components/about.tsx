import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Zap, Star } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-secondary/50" data-testid="about-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">
              About Shan Fast Food
            </h2>
            <p className="text-lg text-muted">Our Story of Flavor & Excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" 
                alt="Restaurant Interior" 
                className="rounded-2xl shadow-glow w-full h-auto"
                data-testid="restaurant-image"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">Our Journey</h3>
              <p className="text-muted mb-4 leading-relaxed">
                Shan Fast Food began with a simple vision: to serve delicious, high-quality fast food that brings people together. What started as a small family kitchen has grown into a beloved local favorite, known for our commitment to freshness and flavor.
              </p>
              <p className="text-muted mb-4 leading-relaxed">
                Every dish we serve is crafted with care, using the finest ingredients and time-tested recipes. From our signature Zinger Burgers to our innovative Shapatar Roll, we believe that great food should be both fast and exceptional.
              </p>
              <p className="text-muted leading-relaxed">
                Our success is built on three core principles: <span className="text-primary font-semibold">Fresh Ingredients</span>, <span className="text-primary font-semibold">Fast Service</span>, and <span className="text-primary font-semibold">Unforgettable Taste</span>.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid sm:grid-cols-3 gap-8">
            <Card className="bg-card shadow-card hover:shadow-glow transition-all duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-primary text-3xl w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Fresh Ingredients</h4>
                <p className="text-muted">
                  We source the freshest ingredients daily to ensure every meal is of the highest quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card hover:shadow-glow transition-all duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-primary text-3xl w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Fast Service</h4>
                <p className="text-muted">
                  Quick preparation and delivery without compromising on quality or taste.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card hover:shadow-glow transition-all duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="text-primary text-3xl w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Great Taste</h4>
                <p className="text-muted">
                  Recipes perfected over years to deliver flavors that keep you coming back.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
