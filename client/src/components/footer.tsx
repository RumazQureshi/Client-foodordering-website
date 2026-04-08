import { Utensils, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';

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
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="AL-Hani Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-primary">AL-Hani Fast Food</h3>
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
              <li className="flex items-start">
                <Phone className="text-primary mr-2 w-4 h-4 mt-1" />
                <div>
                  <p>+92 311 2652126</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2 w-4 h-4" />
                info@alhanifastfood.com
              </li>
              <li className="flex items-start">
                <MapPin className="text-primary mr-2 w-4 h-4 mt-1" />
                <a 
                  href="https://maps.app.goo.gl/1Xfz5cVZDHbEEjQSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Click here to visit live location
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Monday - Sunday</li>
              <li>4:00 PM - 4:00 AM</li>
              <li className="text-primary font-semibold">We're Open Every Day!</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col items-center md:flex-row md:justify-between text-center md:text-left">
          <p className="text-muted text-sm mb-4 md:mb-0">
            &copy; 2026-2030 AL-Hani Fast Food. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/share/1JFYRYqgWp/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/asim9530?igsh=MWZwYWd3NGFiNWFw" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@muhammadaasim36?_r=1&_t=ZN-95MWHUonZMU" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition"
              data-testid="footer-social-tiktok"
            >
              <SiTiktok className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/923112652126" 
              target="_blank"
              rel="noopener noreferrer"
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
