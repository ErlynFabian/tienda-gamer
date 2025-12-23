import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductsSection } from '@/components/ProductsSection';
import { PCConfigurator } from '@/components/PCConfigurator';
import { TrustSection } from '@/components/TrustSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProductsSection />
        <PCConfigurator />
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
