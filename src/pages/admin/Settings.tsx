import React from 'react';
import { useStore, type StoreConfig } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Settings, MessageCircle, Edit2, Clock, Save } from 'lucide-react';

export default function AdminSettings() {
    const { config, updateConfig } = useStore();

    return (
        <div className="space-y-8 w-full">
            <div className="w-full px-6 py-4">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Configuración General</h2>

                {/* Información General */}
                <div className="bg-card border border-border/50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        Información General
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Nombre de la Tienda</label>
                            <input
                                type="text"
                                value={config.storeName}
                                onChange={(e) => updateConfig({ storeName: e.target.value })}
                                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-card border border-border/50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        Información de Contacto
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Número de WhatsApp</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-muted-foreground">+</span>
                                </div>
                                <input
                                    type="text"
                                    value={config.whatsappNumber}
                                    onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                                    className="pl-6 w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="521234567890"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                Incluye código de país sin el signo +
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Correo Electrónico</label>
                            <input
                                type="email"
                                value={config.email || ''}
                                onChange={(e) => updateConfig({ email: e.target.value })}
                                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="contacto@tienda.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Ubicación</label>
                            <input
                                type="text"
                                value={config.location || ''}
                                onChange={(e) => updateConfig({ location: e.target.value })}
                                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Dirección de la tienda"
                            />
                        </div>
                    </div>
                </div>

                {/* Textos del Sitio */}
                <div className="bg-card border border-border/50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Edit2 className="h-5 w-5 text-primary" />
                        Textos del Sitio
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Título Principal</label>
                            <input
                                type="text"
                                value={config.heroTitle}
                                onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Subtítulo</label>
                            <input
                                type="text"
                                value={config.heroSubtitle}
                                onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Horarios */}
                <div className="bg-card border border-border/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Horario de Atención
                    </h3>
                    <div className="space-y-3">
                        {[
                            { day: 'Lunes', id: 'monday' },
                            { day: 'Martes', id: 'tuesday' },
                            { day: 'Miércoles', id: 'wednesday' },
                            { day: 'Jueves', id: 'thursday' },
                            { day: 'Viernes', id: 'friday' },
                            { day: 'Sábado', id: 'saturday' },
                            { day: 'Domingo', id: 'sunday' }
                        ].map(({ day, id }) => (
                            <div key={id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                <label className="text-sm font-medium">{day}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        value={config[`${id}Open` as keyof StoreConfig] as string || ''}
                                        onChange={(e) => updateConfig({ [`${id}Open`]: e.target.value } as any)}
                                        className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                                        disabled={config[`${id}Closed` as keyof StoreConfig] as boolean}
                                    />
                                    <span className="text-muted-foreground text-sm">a</span>
                                    <input
                                        type="time"
                                        value={config[`${id}Close` as keyof StoreConfig] as string || ''}
                                        onChange={(e) => updateConfig({ [`${id}Close`]: e.target.value } as any)}
                                        className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                                        disabled={config[`${id}Closed` as keyof StoreConfig] as boolean}
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <input
                                        type="checkbox"
                                        id={`${id}Closed`}
                                        checked={config[`${id}Closed` as keyof StoreConfig] as boolean || false}
                                        onChange={(e) => updateConfig({
                                            [`${id}Closed`]: e.target.checked,
                                            ...(e.target.checked ? {
                                                [`${id}Open`]: '',
                                                [`${id}Close`]: ''
                                            } : {})
                                        } as any)}
                                        className="h-4 w-4 rounded border-border bg-muted text-primary focus:ring-primary"
                                    />
                                    <label htmlFor={`${id}Closed`} className="text-sm text-muted-foreground whitespace-nowrap">
                                        Cerrado
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-0 bg-background border-t border-border p-4 -mx-6 -mb-6">
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" size="lg">
                            Descartar Cambios
                        </Button>
                        <Button variant="default" size="lg" className="min-w-[180px]">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
