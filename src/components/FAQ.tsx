import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "¿Tienen tienda física o solo ventas online?",
        answer: "Somos principalmente una tienda online con despacho a todo el país. Esto nos permite mantener los precios más competitivos del mercado al reducir costos operativos.",
    },
    {
        question: "¿Cómo funciona el proceso de garantía?",
        answer: "Todos nuestros productos cuentan con garantía oficial. En caso de falla, nos contactas por WhatsApp, coordinamos la recepción del equipo y nuestro equipo técnico lo evalúa en un plazo de 48-72 horas.",
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos transferencias bancarias, tarjetas de crédito (con cuotas según el banco) y pagos vía PayPal. Todo el proceso se coordina de forma segura por WhatsApp.",
    },
    {
        question: "¿Cuánto tardan los envíos?",
        answer: "Los envíos en la capital suelen entregarse en 24 horas. Para el resto del país, el tiempo estimado es de 48 a 72 horas hábiles.",
    },
    {
        question: "¿Las PCs vienen armadas o en piezas?",
        answer: "¡Como tú prefieras! Si usas nuestro configurador, la entregamos armada, testeada y con Windows instalado. También vendemos piezas por separado si prefieres armarla tú mismo.",
    },
];

export function FAQ() {
    return (
        <section className="py-24 bg-background/50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl text-foreground">
                        Preguntas <span className="gradient-text">Frecuentes</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Todo lo que necesitas saber antes de subir de nivel.
                    </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="glass-card border-border/50 px-6 py-2 transition-all hover:bg-card/80"
                        >
                            <AccordionTrigger className="font-display font-semibold hover:no-underline text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
