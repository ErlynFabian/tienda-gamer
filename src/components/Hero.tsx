import { MessageCircle, Shield, Cpu, Headphones, ChevronDown, Zap, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import heroBg from '@/assets/hero-bg.jpg';
import { motion } from 'framer-motion';

export function Hero() {
  const { config, generateWhatsAppLink } = useStore();

  const heroMessage = `¡Hola! 👋 Quiero armar mi PC Gamer personalizada. ¿Pueden asesorarme?`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundAttachment: 'fixed'
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern bg-[size:50px_50px]" />

      {/* Animated floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[140px]"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        {/* Animated content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          {/* Main headline */}
          <motion.h1
            className="mb-6 text-center font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {config.heroTitle}
            </span>
            <span className="mt-4 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {config.heroSubtitle}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Las mejores PCs Gamer, Laptops y componentes al mejor precio.
            <span className="block">¡Envíos a todo el país!</span>
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { icon: <Award className="h-6 w-6 text-primary" />, text: 'Garantía de 1 año' },
              { icon: <Shield className="h-6 w-6 text-primary" />, text: 'Componentes originales' },
              { icon: <Clock className="h-6 w-6 text-primary" />, text: 'Envíos en 24-48h' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 rounded-xl bg-muted/30 p-4 backdrop-blur-sm">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              asChild
              variant="whatsapp"
              size="xl"
              className="group relative overflow-hidden px-8 py-6 text-lg font-semibold"
            >
              <a
                href={generateWhatsAppLink(heroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-2"
              >
                <MessageCircle className="h-6 w-6" />
                Comprar por WhatsApp
                <span className="absolute inset-0 -z-10 rounded-lg bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="xl"
              className="group relative overflow-hidden border-2 border-primary/20 bg-background/50 px-8 py-6 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-background/70"
            >
              <Link to="/arma-tu-pc">
                <span className="relative z-10 flex items-center gap-2">
                  <Cpu className="h-6 w-6" />
                  Arma tu PC
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="group flex flex-col items-center">
            <span className="mb-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
              Desplázate
            </span>
            <div className="h-14 w-8 rounded-full border-2 border-muted-foreground/20 p-2 transition-colors group-hover:border-primary/50">
              <ChevronDown className="h-full w-full animate-bounce text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
