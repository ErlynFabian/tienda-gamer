import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Footer() {
  const { config, generateWhatsAppLink } = useStore();

  return (
    <footer className="relative border-t border-border bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-display text-2xl font-bold gradient-text">
              {config.storeName}
            </h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Tu tienda de confianza para PCs y laptops gaming de alto rendimiento en República Dominicana. 
              Armamos tu setup perfecto y te lo entregamos listo para jugar.
            </p>
            <a
              href={generateWhatsAppLink('Hola, quiero más información sobre sus productos')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="h-5 w-5" />
              Contáctanos por WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-display font-bold">Enlaces</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/productos" className="hover:text-primary transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="/arma-tu-pc" className="hover:text-primary transition-colors">
                  Arma tu PC
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display font-bold">Contacto</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-whatsapp" />
                <span>WhatsApp 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@nexusgaming.do</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Santo Domingo, RD</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {config.storeName}. Todos los derechos reservados.</p>
          <p className="mt-1">
            Compra segura por WhatsApp • Garantía incluida • Envíos a todo RD
          </p>
        </div>
      </div>
    </footer>
  );
}
