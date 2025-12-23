import { MessageCircle, Shield, Cpu, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import heroBg from '@/assets/hero-bg.jpg';

export function Hero() {
  const { config, generateWhatsAppLink } = useStore();

  const heroMessage = `¡Hola! 👋 Quiero armar mi PC Gamer personalizada. ¿Pueden asesorarme?`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern bg-[size:50px_50px]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        {/* Urgency badge */}
        {config.showUrgency && (
          <div className="mb-8 animate-fade-in rounded-full border border-primary/30 bg-primary/10 px-6 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">{config.urgencyText}</span>
          </div>
        )}

        {/* Main headline */}
        <h1 className="mb-6 text-center font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-slide-up">
          <span className="block text-foreground">{config.heroTitle}</span>
          <span className="mt-2 block gradient-text">{config.heroSubtitle}</span>
        </h1>

        {/* Trust indicators */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Garantía incluida</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span>Componentes originales</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-primary" />
            <span>Soporte personalizado</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Button
            asChild
            variant="whatsapp"
            size="xl"
            className="animate-pulse-glow"
          >
            <a
              href={generateWhatsAppLink(heroMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-6 w-6" />
              Comprar por WhatsApp
            </a>
          </Button>
          
          <Button
            variant="neon"
            size="xl"
            onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Arma tu PC
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-14 w-8 rounded-full border-2 border-muted-foreground/30 p-2">
            <div className="h-3 w-1 mx-auto rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
