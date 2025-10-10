import { Utensils, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary border-t border-border py-12" data-testid="footer">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Utensils className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary">Shan Fast Food</h3>
            </div>
            <p className="text-muted text-sm">
              Taste That Speaks for Itself! Serving delicious fast food with love since 2020.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="text-muted hover:text-primary transition text-sm text-left"
                  data-testid="footer-menu-link"
                >
                  Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('order')}
                  className="text-muted hover:text-primary transition text-sm text-left"
                  data-testid="footer-order-link"
                >
                  Order Online
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-muted hover:text-primary transition text-sm text-left"
                  data-testid="footer-about-link"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-muted hover:text-primary transition text-sm text-left"
                  data-testid="footer-contact-link"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center">
                <Phone className="text-primary mr-2 w-4 h-4" />
                +92 300 1234567
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2 w-4 h-4" />
                info@shanfastfood.com
              </li>
              <li className="flex items-center">
                <MapPin className="text-primary mr-2 w-4 h-4" />
                Main Street, City Center
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Monday - Sunday</li>
              <li>11:00 AM - 11:00 PM</li>
              <li className="text-primary font-semibold">We're Open Every Day!</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm mb-4 md:mb-0">
            &copy; 2024 Shan Fast Food. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
