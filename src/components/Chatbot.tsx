import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { products, type Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'product_list';
    products?: Product[];
    timestamp: Date;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'init-1',
                    text: '¡Hola! Bienvenido a Tienda Gamer. 🤖✨\n\nSoy tu asistente virtual y estoy aquí para ayudarte a elegir tu próxima PC, mostrarte nuestras ofertas o resolver tus dudas sobre envíos y garantía.\n\n¿En qué puedo apoyarte hoy?',
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    // Auto-focus when chat opens
    useEffect(() => {
        if (isOpen) {
            // Small timeout to ensure the entering animation doesn't interfere with focus
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Refocus input after sending
        inputRef.current?.focus();

        // Simulate processing delay
        setTimeout(() => {
            const botResponse = generateResponse(userMessage.text);
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 500);
    };

    const normalize = (text: string) => {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    const generateResponse = (text: string): Message => {
        const normalized = normalize(text);
        const responseId = (Date.now() + 1).toString();

        // Helper to create a basic text response
        const textResponse = (content: string): Message => ({
            id: responseId,
            text: content,
            sender: 'bot',
            timestamp: new Date()
        });

        // --- 1. PRIORITY INTENTS (Quick Actions & Direct Keywords) ---

        // OFFERS
        if (normalized.includes('oferta') || normalized.includes('promo') || normalized.includes('descuento') || normalized.includes('barato')) {
            const deals = products.filter(p =>
                (p.originalPrice && p.originalPrice > p.price) ||
                (p.badge && normalize(p.badge).includes('oferta'))
            );
            return {
                id: responseId,
                text: deals.length > 0
                    ? '¡Claro! Estas son nuestras ofertas más calientes de hoy: 🔥'
                    : 'Actualmente no tenemos ofertas marcadas, ¡pero nuestros precios base son los más competitivos del mercado! 🚀',
                sender: 'bot',
                type: deals.length > 0 ? 'product_list' : 'text',
                products: deals.slice(0, 3),
                timestamp: new Date()
            };
        }

        // SHIPPING
        if (normalized.includes('envio') || normalized.includes('entrega') || normalized.includes('llega') || normalized.includes('donde') || normalized.includes('ubica')) {
            return textResponse('Hacemos envíos a todo el país 🚚.\n\n• **Santo Domingo:** En menos de 24h.\n• **Interior:** 2 a 3 días hábiles.\n• **Gratis:** En pedidos superiores a $200.\n\nNuestra tienda principal está en Santo Domingo, Plaza Central.');
        }

        // PAYMENTS
        if (normalized.includes('pago') || normalized.includes('pagar') || normalized.includes('tarjeta') || normalized.includes('transferencia') || normalized.includes('precio') || normalized.includes('cuota')) {
            return textResponse('Aceptamos múltiples formas de pago: 💳\n\n• Transferencias (Popular, BHD, Reservas).\n• Tarjetas de Crédito y Débito (Sin recargo).\n• Efectivo en tienda.\n• Pagos vía PayPal.');
        }

        // WARRANTY
        if (normalized.includes('garantia') || normalized.includes('falla') || normalized.includes('soporte') || normalized.includes('problema') || normalized.includes('cambio')) {
            return textResponse('Tu compra está 100% protegida. 🛡️\n\n• PCs de Escritorio: 2 años de garantía.\n• Laptops: 1 año de garantía oficial.\n• Soporte técnico especializado incluido en todas las compras.');
        }

        // ARMADO / CONFIGURADOR
        if (normalized.includes('armar') || normalized.includes('configurar') || normalized.includes('pc personalizada') || normalized.includes('arma tu pc')) {
            return textResponse('¡Somos expertos armando las mejores máquinas de RD! 🛠️\n\nPuedes usar nuestro **Configurador Online** para armarla a tu gusto, o decirme qué juegos quieres correr y te daré una recomendación personalizada.');
        }

        // CONTACT
        if (normalized.includes('contacto') || normalized.includes('whatsapp') || normalized.includes('escribir') || normalized.includes('hablar con alguien')) {
            return textResponse('¡Claro! Puedes contactarnos directamente por WhatsApp para una atención personalizada: 📱\n\n• **WhatsApp:** [829-XXX-XXXX](https://wa.me/yournumber)\n• **Correo:** soporte@tiendagamer.do\n• **Tienda Física:** Plaza Central, Santo Domingo.');
        }

        // HELP
        if (normalized.includes('ayuda') || normalized.includes('servicios') || normalized.includes('que haces') || normalized.includes('como funciona')) {
            return textResponse('¡Estoy aquí para ayudarte! 🤖\n\nPuedo asistirte en:\n\n🚀 **Ver ofertas** actuales.\n🚚 Saber sobre **envíos y entregas**.\n💳 Conocer los **métodos de pago**.\n🛡️ Información de **garantía**.\n🛠️ Ayudarte a **armar tu PC** gamer.');
        }

        // GREETINGS
        if (normalized.match(/^(hola|buen|hey|que tal|salud|hi|hello)/)) {
            return textResponse('¡Hola! 👋 Soy el asistente virtual de Tienda Gamer. ¿En qué puedo ayudarte hoy?\n\nPuedo mostrarte **ofertas**, darte info sobre **envíos** o ayudarte a **armar tu PC**.');
        }

        // --- 2. SMART PRODUCT SEARCH (FALLBACK) ---
        const searchTerms = normalized.split(/\s+/).filter(w => w.length > 2);
        if (searchTerms.length > 0) {
            const results = products.filter(p =>
                searchTerms.some(term =>
                    normalize(p.name).includes(term) ||
                    normalize(p.category).includes(term) ||
                    p.specs.some(s => normalize(s).includes(term))
                )
            );

            if (results.length > 0) {
                return {
                    id: responseId,
                    text: `He encontrado estos productos que coinciden con "${text}":`,
                    sender: 'bot',
                    type: 'product_list',
                    products: results.slice(0, 3),
                    timestamp: new Date()
                };
            }
        }

        // --- 3. FINAL FALLBACK ---
        return textResponse('Mmm, no estoy seguro de cómo responder a eso. 😅\n\nPero puedes intentar preguntarme por:\n🚀 **Ver ofertas**\n🚚 **Envíos y Entregas**\n💳 **Métodos de pago**\n🛡️ **Armar una PC**');
    };

    const handleOptionClick = (option: string) => {
        setInputValue(option);
        // We set input then immediately trigger send handled by useEffect or modifying handleSendMessage to accept string, 
        // but for simplicity let's just use the logic directly or reuse handleSendMessage via ref
        // Wait, handleSendMessage relies on state `inputValue` if called without args, but here we passed prompt.
        // Better implementation:

        const userMessage: Message = {
            id: Date.now().toString(),
            text: option,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setInputValue('');

        // Refocus input after action
        inputRef.current?.focus();

        setTimeout(() => {
            const botResponse = generateResponse(option);
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-16 w-16 rounded-full shadow-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white relative flex items-center justify-center border-none p-0 group"
                        >
                            <Bot className="h-10 w-10" strokeWidth={2.5} />
                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-[#ef4444] rounded-full border-[3px] border-white shadow-sm" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-full">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Asistente Gamer</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        En línea
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 text-primary-foreground"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30"
                            ref={scrollRef}
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`
                                        max-w-[85%] rounded-2xl p-3 px-4 text-sm shadow-sm
                                        ${msg.sender === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-card border border-border rounded-bl-none'
                                        }
                                    `}>
                                        <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                                        {/* Product List Attachment */}
                                        {msg.type === 'product_list' && msg.products && (
                                            <div className="mt-3 space-y-2">
                                                {msg.products.map(product => (
                                                    <div
                                                        key={product.id}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            navigate(`/producto/${product.id}`);
                                                        }}
                                                        className="block bg-background/50 hover:bg-background border border-border/50 rounded-lg p-2 cursor-pointer transition-colors group"
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-xs line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
                                                                <p className="text-primary font-bold text-xs mt-1">${product.price}</p>
                                                            </div>
                                                            <div className="flex items-center text-muted-foreground">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <p className={`text-[10px] mt-1 text-right opacity-70 ${msg.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border rounded-2xl rounded-bl-none p-4 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions (only if bot just spoke) */}
                        {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
                            <div className="px-4 py-2 flex flex-nowrap justify-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {['Ofertas', 'Envíos', 'Armar PC', 'Pagos', 'Garantía'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleOptionClick(opt)}
                                        className="whitespace-nowrap px-2 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-medium transition-colors border border-primary/20"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 bg-card border-t border-border">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex gap-2"
                            >
                                <Input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu consulta..."
                                    className="flex-1 bg-muted/50 focus-visible:ring-primary"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-primary hover:bg-primary/90 text-white shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
