import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StoreConfig {
  whatsappNumber: string;
  storeName: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  urgencyText: string;
  showUrgency: boolean;
}

interface StoreContextType {
  config: StoreConfig;
  updateConfig: (updates: Partial<StoreConfig>) => void;
  generateWhatsAppLink: (message: string) => string;
}

const defaultConfig: StoreConfig = {
  whatsappNumber: '1234567890',
  storeName: 'NEXUS Gaming',
  heroTitle: 'Compra tu PC Gamer hoy',
  heroSubtitle: 'Escríbenos por WhatsApp y la armamos para ti',
  primaryColor: 'neon-green',
  urgencyText: '🔥 Últimas unidades disponibles',
  showUrgency: true,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<StoreConfig>(defaultConfig);

  const updateConfig = (updates: Partial<StoreConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <StoreContext.Provider value={{ config, updateConfig, generateWhatsAppLink }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
