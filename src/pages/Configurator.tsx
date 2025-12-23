import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Cpu, 
  MonitorSpeaker, 
  MemoryStick, 
  HardDrive, 
  CircuitBoard, 
  Zap, 
  Box, 
  Fan,
  ArrowLeft,
  Check,
  Sparkles
} from 'lucide-react';
import { pcComponents, PCComponent } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { formatPrice } from '@/lib/utils';

const componentCategories = [
  { key: 'cpu', label: 'Procesador', icon: Cpu, required: true },
  { key: 'gpu', label: 'Tarjeta Gráfica', icon: MonitorSpeaker, required: true },
  { key: 'ram', label: 'Memoria RAM', icon: MemoryStick, required: true },
  { key: 'storage', label: 'Almacenamiento', icon: HardDrive, required: true },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard, required: true },
  { key: 'psu', label: 'Fuente de Poder', icon: Zap, required: true },
  { key: 'case', label: 'Gabinete', icon: Box, required: true },
  { key: 'cooling', label: 'Refrigeración', icon: Fan, required: true },
] as const;

export default function Configurator() {
  const { generateWhatsAppLink } = useStore();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, PCComponent | null>>({
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    motherboard: null,
    psu: null,
    case: null,
    cooling: null,
  });
  
  const [activeCategory, setActiveCategory] = useState('cpu');

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, comp) => {
      return sum + (comp?.price || 0);
    }, 0);
  }, [selectedComponents]);

  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;
  const isComplete = selectedCount === 8;

  const handleSelect = (category: string, component: PCComponent) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: prev[category]?.id === component.id ? null : component,
    }));
  };

  const generateConfigMessage = () => {
    const configLines = Object.entries(selectedComponents)
      .filter(([_, comp]) => comp)
      .map(([_, comp]) => `• ${comp!.name} - ${formatPrice(comp!.price)}`);

    return `Hola, quiero cotizar esta configuración personalizada:

🖥️ *MI PC GAMER PERSONALIZADA*

${configLines.join('\n')}

💰 *Total: ${formatPrice(totalPrice)}*

¿Está disponible? ¿Hacen envíos a toda República Dominicana?`;
  };

  const currentCategoryIndex = componentCategories.findIndex(c => c.key === activeCategory);

  const goToNext = () => {
    if (currentCategoryIndex < componentCategories.length - 1) {
      setActiveCategory(componentCategories[currentCategoryIndex + 1].key);
    }
  };

  const goToPrev = () => {
    if (currentCategoryIndex > 0) {
      setActiveCategory(componentCategories[currentCategoryIndex - 1].key);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-primary/5 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Arma tu </span>
              <span className="gradient-text">PC Gamer</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selecciona cada componente y arma la PC de tus sueños. 
              Al finalizar, envía tu configuración por WhatsApp y te asesoramos.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="glass-card p-4 sticky top-24">
                <h3 className="font-display font-bold mb-4">Componentes</h3>
                <div className="space-y-2">
                  {componentCategories.map(({ key, label, icon: Icon }) => {
                    const isSelected = selectedComponents[key] !== null;
                    const isActive = activeCategory === key;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
                          isActive
                            ? 'bg-primary/20 border border-primary/50 text-primary'
                            : isSelected
                            ? 'bg-muted/50 border border-primary/30 text-foreground'
                            : 'bg-muted/30 border border-transparent hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">{label}</span>
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium text-primary">{selectedCount}/8</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-neon-blue transition-all duration-500"
                      style={{ width: `${(selectedCount / 8) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Component selection */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  {(() => {
                    const cat = componentCategories.find(c => c.key === activeCategory);
                    const Icon = cat?.icon || Cpu;
                    return (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-display text-xl font-bold">{cat?.label}</h2>
                          <p className="text-sm text-muted-foreground">Selecciona una opción</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-3">
                  {pcComponents[activeCategory]?.map((component) => {
                    const isSelected = selectedComponents[activeCategory]?.id === component.id;
                    return (
                      <button
                        key={component.id}
                        onClick={() => handleSelect(activeCategory, component)}
                        className={`w-full flex items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
                            : 'border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {isSelected && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </div>
                          )}
                          <span className="font-medium">{component.name}</span>
                        </div>
                        <span className={`text-lg font-bold ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          {formatPrice(component.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={goToPrev}
                    disabled={currentCategoryIndex === 0}
                  >
                    ← Anterior
                  </Button>
                  <Button
                    variant="default"
                    onClick={goToNext}
                    disabled={currentCategoryIndex === componentCategories.length - 1}
                  >
                    Siguiente →
                  </Button>
                </div>
              </div>
            </div>

            {/* Right sidebar - Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24 neon-border">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl font-bold">Tu Configuración</h3>
                </div>

                {/* Selected components */}
                <div className="space-y-3 mb-6">
                  {componentCategories.map(({ key, label, icon: Icon }) => {
                    const selected = selectedComponents[key];
                    return (
                      <div
                        key={key}
                        className={`rounded-lg border p-3 transition-all ${
                          selected ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-muted/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                          </div>
                          <span className={`text-xs font-medium ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                            {selected ? formatPrice(selected.price) : '—'}
                          </span>
                        </div>
                        {selected && (
                          <p className="mt-1 text-sm font-medium truncate">{selected.name}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 p-5 mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Total estimado</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  {!isComplete && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Selecciona todos los componentes para continuar
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant="whatsapp"
                  size="xl"
                  className="w-full"
                  disabled={selectedCount === 0}
                >
                  <a
                    href={selectedCount > 0 ? generateWhatsAppLink(generateConfigMessage()) : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={selectedCount === 0 ? 'pointer-events-none opacity-50' : ''}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {isComplete ? 'Enviar Configuración' : 'Cotizar por WhatsApp'}
                  </a>
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  ⚡ Te respondemos en menos de 5 minutos
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
