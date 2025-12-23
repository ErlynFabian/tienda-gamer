import { useState, useMemo } from 'react';
import { MessageCircle, Cpu, MonitorSpeaker, MemoryStick, HardDrive, CircuitBoard, Zap, Box, Fan, Sparkles } from 'lucide-react';
import { pcComponents, PCComponent } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const componentCategories = [
  { key: 'cpu', label: 'Procesador', icon: Cpu },
  { key: 'gpu', label: 'Tarjeta Gráfica', icon: MonitorSpeaker },
  { key: 'ram', label: 'Memoria RAM', icon: MemoryStick },
  { key: 'storage', label: 'Almacenamiento', icon: HardDrive },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard },
  { key: 'psu', label: 'Fuente de Poder', icon: Zap },
  { key: 'case', label: 'Gabinete', icon: Box },
  { key: 'cooling', label: 'Refrigeración', icon: Fan },
] as const;

export function PCConfigurator() {
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

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, comp) => {
      return sum + (comp?.price || 0);
    }, 0);
  }, [selectedComponents]);

  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;

  const handleSelect = (category: string, component: PCComponent) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: prev[category]?.id === component.id ? null : component,
    }));
  };

  const generateConfigMessage = () => {
    const configLines = Object.entries(selectedComponents)
      .filter(([_, comp]) => comp)
      .map(([_, comp]) => `• ${comp!.name} - $${comp!.price}`);

    return `Hola, quiero cotizar esta configuración personalizada:

🖥️ MI PC GAMER PERSONALIZADA

${configLines.join('\n')}

💰 Total: $${totalPrice.toLocaleString()}

¿Está disponible? ¿Tienen algún descuento?`;
  };

  return (
    <section id="configurator" className="relative py-24 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Sparkles className="mr-2 h-3 w-3" />
            Configurador Pro v2.0
          </Badge>
          <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Arma tu </span>
            <span className="gradient-text">PC a Medida</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Personaliza cada componente. Nuestros expertos te asesorarán para armar el equipo perfecto.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Components selector */}
          <div className="lg:col-span-2 space-y-6">
            {componentCategories.map(({ key, label, icon: Icon }) => (
              <div key={key} className="glass-card p-5 group hover:neon-border transition-all duration-500">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">{label}</h3>
                      {selectedComponents[key] && (
                        <p className="text-xs text-primary animate-fade-in">Seleccionado: {selectedComponents[key]?.name}</p>
                      )}
                    </div>
                  </div>
                  {selectedComponents[key] && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                      Ready
                    </Badge>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {pcComponents[key]?.map((component) => {
                    const isSelected = selectedComponents[key]?.id === component.id;
                    return (
                      <button
                        key={component.id}
                        onClick={() => handleSelect(key, component)}
                        className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all duration-300 relative overflow-hidden ${isSelected
                          ? 'border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
                          : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
                          }`}
                      >
                        <span className="text-sm font-medium z-10">{component.name}</span>
                        <span className={`text-sm font-bold z-10 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          ${component.price}
                        </span>
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6 neon-border overflow-hidden">
              {/* Decorative background for summary */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/10 blur-3xl rounded-full" />

              <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2">
                <MonitorSpeaker className="h-5 w-5 text-primary" />
                Tu Configuración
              </h3>

              {/* Selected components */}
              <div className="mb-6 space-y-3">
                {componentCategories.map(({ key, label, icon: Icon }) => {
                  const selected = selectedComponents[key];
                  return (
                    <div
                      key={key}
                      className={`flex flex-col gap-1 rounded-lg border p-3 transition-all ${selected ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-muted/20 opacity-60'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</span>
                        </div>
                        <span className={`text-xs font-bold ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                          {selected ? `$${selected.price}` : '—'}
                        </span>
                      </div>
                      {selected && (
                        <p className="text-xs font-medium text-foreground truncate animate-slide-up">
                          {selected.name}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total Card */}
              <div className="relative mb-6 rounded-xl bg-gradient-to-br from-card to-muted p-5 border border-primary/20 shadow-2xl">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Estimado</span>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-3xl font-bold text-primary animate-pulse-glow">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-muted-foreground/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500 ease-out"
                    style={{ width: `${(selectedCount / 8) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground text-right font-bold">
                  {selectedCount}/8 COMPONENTES SELECCIONADOS
                </p>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                variant="whatsapp"
                size="xl"
                className="w-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all"
                disabled={selectedCount === 0}
              >
                <a
                  href={selectedCount > 0 ? generateWhatsAppLink(generateConfigMessage()) : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={selectedCount === 0 ? 'pointer-events-none opacity-50' : 'flex items-center gap-2'}
                >
                  <MessageCircle className="h-5 w-5" />
                  Cotizar por WhatsApp
                </a>
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Atención inmediata por WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Total for Mobile/Scroll */}
      {selectedCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="glass-card px-6 py-3 border-primary/50 flex items-center gap-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Total</span>
              <span className="font-display text-xl font-bold text-primary">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="h-8 w-[1px] bg-border" />
            <Button asChild size="sm" variant="whatsapp">
              <a href={generateWhatsAppLink(generateConfigMessage())} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Cotizar
              </a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
