import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { TrustSection } from '@/components/TrustSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import configuratorBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        
        {/* Featured Products */}
        <section id="products" className="relative py-24 bg-background">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
                <span className="text-foreground">Productos </span>
                <span className="gradient-text">Destacados</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Las PCs y laptops más vendidas. Compra directo por WhatsApp.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="neon" size="xl">
                <Link to="/productos">
                  Ver todos los productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Configurator CTA */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${configuratorBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center neon-border">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Arma tu </span>
                <span className="gradient-text">PC Gamer</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                ¿No encuentras lo que buscas? Diseña tu propia configuración desde cero. 
                Selecciona procesador, tarjeta gráfica, RAM y más. Te enviamos la cotización 
                por WhatsApp en minutos.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Procesadores Intel & AMD', 'RTX 4060 a 4090', 'DDR5 hasta 64GB', 'NVMe hasta 4TB'].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild variant="hero" size="xl">
                <Link to="/arma-tu-pc">
                  <Cpu className="mr-2 h-5 w-5" />
                  Comenzar a armar mi PC
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="trust">
          <TrustSection />
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
