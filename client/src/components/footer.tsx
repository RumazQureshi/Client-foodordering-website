import { Utensils, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { t, isRtl } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary border-t border-border py-12" data-testid="footer">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`grid md:grid-cols-4 gap-8 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className={isRtl ? 'order-1 md:order-1' : ''}>
            <div className={`flex items-center space-x-3 mb-4 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="AL-Hani Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-primary">{t('hero.title')} {t('hero.subtitle')}</h3>
            </div>
            <p className="text-muted text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          <div className={isRtl ? 'order-2 md:order-2' : ''}>
            <h4 className="text-lg font-bold text-primary mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className={`text-muted hover:text-primary transition text-sm w-full ${isRtl ? 'text-right' : 'text-left'}`}
                  data-testid="footer-menu-link"
                >
                  {t('nav.menu')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('order')}
                  className={`text-muted hover:text-primary transition text-sm w-full ${isRtl ? 'text-right' : 'text-left'}`}
                  data-testid="footer-order-link"
                >
                  {t('nav.order')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`text-muted hover:text-primary transition text-sm w-full ${isRtl ? 'text-right' : 'text-left'}`}
                  data-testid="footer-about-link"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`text-muted hover:text-primary transition text-sm w-full ${isRtl ? 'text-right' : 'text-left'}`}
                  data-testid="footer-contact-link"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          <div className={isRtl ? 'order-3 md:order-3' : ''}>
            <h4 className="text-lg font-bold text-primary mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className={`flex items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Phone className={`text-primary w-4 h-4 mt-1 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                <div dir="ltr">
                  <p>+92 311 2652126</p>
                </div>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Mail className={`text-primary w-4 h-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                <span dir="ltr">info@alhanifastfood.com</span>
              </li>
              <li className={`flex items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`text-primary w-4 h-4 mt-1 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                <a 
                  href="https://maps.app.goo.gl/1Xfz5cVZDHbEEjQSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {t('footer.visit')}
                </a>
              </li>
            </ul>
          </div>

          <div className={isRtl ? 'order-4 md:order-4' : ''}>
            <h4 className="text-lg font-bold text-primary mb-4">{t('footer.hours')}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>{t('footer.days')}</li>
              <li dir="ltr">{t('footer.time')}</li>
              <li className="text-primary font-semibold">{t('footer.open')}</li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-border pt-8 flex flex-col items-center md:flex-row md:justify-between text-center md:text-left ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-muted text-sm mb-4 md:mb-0">
            &copy; 2026-2030 {t('hero.title')} {t('hero.subtitle')}. {t('footer.rights')}
          </p>
          <div className={`flex space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
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
