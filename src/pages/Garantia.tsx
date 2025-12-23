import { Layout } from '../components/Layout';
import { ShieldCheck, Truck, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Garantia() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-4xl font-bold gradient-text">Política de Garantía</h1>
                        <p className="text-lg text-muted-foreground">
                            En Nexus Gaming, nos comprometemos a ofrecerte productos de la más alta calidad con el respaldo que mereces.
                        </p>
                    </div>

                    {/* Cards de Beneficios */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card border border-border/50 p-6 rounded-xl flex gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Garantía Directa</h3>
                                <p className="text-sm text-muted-foreground">
                                    Todos nuestros componentes cuentan con garantía directa del fabricante, gestionada a través de nosotros para tu comodidad.
                                </p>
                            </div>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-xl flex gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Periodo de Cobertura</h3>
                                <p className="text-sm text-muted-foreground">
                                    PCs Ensambladas: 1 año de garantía en piezas y servicios.<br />
                                    Laptops y Periféricos: Según normativa del fabricante (usualmente 1 año).
                                </p>
                            </div>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-xl flex gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <Wrench className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Soporte Técnico</h3>
                                <p className="text-sm text-muted-foreground">
                                    Diagnóstico gratuito durante el periodo de garantía. Mano de obra calificada para cualquier reparación o upgrade.
                                </p>
                            </div>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-xl flex gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <Truck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Devoluciones</h3>
                                <p className="text-sm text-muted-foreground">
                                    7 días para cambios por defectos de fábrica inmediatos. El producto debe estar en su empaque original.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detalles de la Política */}
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-bold text-foreground">Términos y Condiciones Generales</h2>
                        <p>
                            1. <strong>Cobertura:</strong> La garantía cubre defectos de fabricación y funcionamiento bajo condiciones normales de uso. No cubre daños por mal manejo, descargas eléctricas, humedad, o modificaciones no autorizadas.
                        </p>
                        <p>
                            2. <strong>Proceso de Reclamo:</strong> Para hacer válida la garantía, es indispensable presentar la factura de compra original. El equipo técnico evaluará el producto en un plazo de 24-48 horas laborables.
                        </p>
                        <p>
                            3. <strong>Exclusiones:</strong> La garantía no aplica para software (virus, sistemas operativos corruptos), datos perdidos (siempre respalde su información), o mantenimiento preventivo (limpieza).
                        </p>
                        <p>
                            4. <strong>PCs Personalizadas:</strong> En equipos armados por Nexus Gaming, la garantía cubre tanto los componentes individuales como el correcto ensamblaje. Si decides abrir el equipo para limpieza o upgrades, contáctanos primero para no invalidar el sello de garantía.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">¿Tienes problemas con tu equipo?</h3>
                        <p className="mb-6">Estamos aquí para ayudarte. Escríbenos y nuestro equipo técnico te asistirá.</p>
                        <Button className="bg-whatsapp hover:bg-whatsapp/90 text-white font-bold">
                            Contactar Soporte Técnico
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
