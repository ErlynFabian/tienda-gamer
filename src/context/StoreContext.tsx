import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StoreConfig {
  // General Info
  storeName: string;
  primaryColor: string;
  
  // Contact Info
  whatsappNumber: string;
  email: string;
  location: string;
  
  // Homepage Content
  heroTitle: string;
  heroSubtitle: string;
  
  // Business Hours
  mondayOpen: string;
  mondayClose: string;
  mondayClosed: boolean;
  tuesdayOpen: string;
  tuesdayClose: string;
  tuesdayClosed: boolean;
  wednesdayOpen: string;
  wednesdayClose: string;
  wednesdayClosed: boolean;
  thursdayOpen: string;
  thursdayClose: string;
  thursdayClosed: boolean;
  fridayOpen: string;
  fridayClose: string;
  fridayClosed: boolean;
  saturdayOpen: string;
  saturdayClose: string;
  saturdayClosed: boolean;
  sundayOpen: string;
  sundayClose: string;
  sundayClosed: boolean;
}

interface StoreContextType {
  config: StoreConfig;
  updateConfig: (updates: Partial<StoreConfig>) => void;
  generateWhatsAppLink: (message: string) => string;
}

const defaultConfig: StoreConfig = {
  // General Info
  storeName: 'NEXUS Gaming',
  primaryColor: 'neon-green',
  
  // Contact Info
  whatsappNumber: '1234567890',
  email: 'contacto@nexusgaming.com',
  location: 'Ciudad de México, México',
  
  // Homepage Content
  heroTitle: 'Compra tu PC Gamer hoy',
  heroSubtitle: 'Escríbenos por WhatsApp y la armamos para ti',
  
  // Business Hours (Lun-Vie 9am-7pm, Sáb 10am-4pm, Dom Cerrado)
  mondayOpen: '09:00',
  mondayClose: '19:00',
  mondayClosed: false,
  tuesdayOpen: '09:00',
  tuesdayClose: '19:00',
  tuesdayClosed: false,
  wednesdayOpen: '09:00',
  wednesdayClose: '19:00',
  wednesdayClosed: false,
  thursdayOpen: '09:00',
  thursdayClose: '19:00',
  thursdayClosed: false,
  fridayOpen: '09:00',
  fridayClose: '19:00',
  fridayClosed: false,
  saturdayOpen: '10:00',
  saturdayClose: '16:00',
  saturdayClosed: false,
  sundayOpen: '00:00',
  sundayClose: '00:00',
  sundayClosed: true,
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
