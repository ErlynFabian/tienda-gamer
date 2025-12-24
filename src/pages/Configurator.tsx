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
    <main>
      {/* Hero */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[100px] opacity-40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">


            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
                Configurador de PC
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Arma tu </span>
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  PC a Medida
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Personaliza cada componente de tu PC ideal. Nuestros expertos te asesorarán para armar el equipo perfecto para tus necesidades.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-10">
              {[
                { icon: <Cpu className="h-6 w-6" />, label: 'Procesadores' },
                { icon: <MonitorSpeaker className="h-6 w-6" />, label: 'Tarjetas Gráficas' },
                { icon: <MemoryStick className="h-6 w-6" />, label: 'Memoria RAM' },
                { icon: <HardDrive className="h-6 w-6" />, label: 'Almacenamiento' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors border border-border/50">
                  <span className="text-primary mb-2">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left sidebar - Categories */}
          <div className="lg:col-span-3">
            <div className="glass-card p-5 sticky top-24 border border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm shadow-sm">
              <h3 className="font-display font-bold mb-4">Componentes</h3>
              <div className="space-y-2">
                {componentCategories.map(({ key, label, icon: Icon }) => {
                  const isSelected = selectedComponents[key] !== null;
                  const isActive = activeCategory === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${isActive
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
          <div className="lg:col-span-6">
            <div className="glass-card p-6 border border-border/50 rounded-2xl bg-background/80 backdrop-blur-sm">
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
                      className={`w-full flex items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${isSelected
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
                {currentCategoryIndex === componentCategories.length - 1 ? (
                  <Button
                    asChild
                    variant="whatsapp"
                    disabled={!isComplete}
                  >
                    <a
                      href={isComplete ? generateWhatsAppLink(generateConfigMessage()) : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={!isComplete ? 'pointer-events-none opacity-50' : 'flex items-center gap-2'}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Cotizar por WhatsApp
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={goToNext}
                  >
                    Siguiente →
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar - Summary */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 sticky top-24 border-2 border-primary/20 rounded-2xl bg-background/90 backdrop-blur-sm shadow-lg">
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
                      className={`rounded-lg border p-3 transition-all ${selected ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-muted/10'
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


              <p className="mt-4 text-center text-xs text-muted-foreground">
                ⚡ Te respondemos en menos de 5 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
