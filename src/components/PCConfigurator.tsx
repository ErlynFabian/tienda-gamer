import { useState, useMemo } from 'react';
import { MessageCircle, Cpu, MonitorSpeaker, MemoryStick, HardDrive, CircuitBoard, Zap, Box, Fan } from 'lucide-react';
import { pcComponents, PCComponent } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';

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
          <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Arma tu </span>
            <span className="gradient-text">PC Gamer</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Selecciona los componentes que deseas y te enviaremos la cotización por WhatsApp
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Components selector */}
          <div className="lg:col-span-2 space-y-6">
            {componentCategories.map(({ key, label, icon: Icon }) => (
              <div key={key} className="glass-card p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold">{label}</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {pcComponents[key]?.map((component) => {
                    const isSelected = selectedComponents[key]?.id === component.id;
                    return (
                      <button
                        key={component.id}
                        onClick={() => handleSelect(key, component)}
                        className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all duration-300 ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
                            : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <span className="text-sm font-medium">{component.name}</span>
                        <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          ${component.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6 neon-border">
              <h3 className="mb-6 font-display text-xl font-bold">Tu Configuración</h3>

              {/* Selected components */}
              <div className="mb-6 space-y-3">
                {componentCategories.map(({ key, label, icon: Icon }) => {
                  const selected = selectedComponents[key];
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        selected ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-muted/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </div>
                      <span className={`text-xs font-medium ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {selected ? `$${selected.price}` : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mb-6 rounded-lg bg-primary/10 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total estimado</span>
                  <span className="font-display text-3xl font-bold text-primary">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedCount}/8 componentes seleccionados
                </p>
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
                  Enviar Configuración
                </a>
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Te responderemos en menos de 5 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
