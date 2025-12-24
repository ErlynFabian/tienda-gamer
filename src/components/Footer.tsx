import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useStore } from '@/context/StoreContext';

export function Footer() {
  const { config, generateWhatsAppLink } = useStore();

  return (
    <footer className="relative border-t border-border bg-background mesh-bg py-16">
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
              <FaWhatsapp className="h-5 w-5" />
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
                <a href="/garantia" className="hover:text-primary transition-colors">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center">
            <h4 className="mb-4 font-display font-bold text-center">Síguenos</h4>
            <div className="flex items-center gap-4">
              <a
                href={generateWhatsAppLink('Hola, quiero más información')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)]"
                title="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/nexusgamingrd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#F77737] text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(193,53,132,0.5)]"
                title="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="/sobre-nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</a>
            <span>•</span>
            <a href="/politica-privacidad" className="hover:text-primary transition-colors">Política de Privacidad</a>
            <span>•</span>
            <a href="/terminos-condiciones" className="hover:text-primary transition-colors">Términos y Condiciones</a>
          </div>
          <p>© {new Date().getFullYear()} {config.storeName}. Todos los derechos reservados.</p>
          <p className="mt-1">
            Asistente Virtual 24/7 • Garantía incluida • Envíos a todo RD
          </p>
        </div>
      </div>
    </footer>
  );
}
