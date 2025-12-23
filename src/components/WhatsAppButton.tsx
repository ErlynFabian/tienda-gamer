import { MessageCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function WhatsAppFloatingButton() {
  const { generateWhatsAppLink } = useStore();

  const defaultMessage = `¡Hola! 👋 Estoy interesado en sus PCs Gamer. ¿Podrían ayudarme?`;

  return (
    <a
      href={generateWhatsAppLink(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-whatsapp px-5 py-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] animate-bounce-subtle"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-bold sm:inline">¡Escríbenos!</span>
    </a>
  );
}

interface WhatsAppProductButtonProps {
  productName: string;
  price: number;
  specs: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WhatsAppProductButton({
  productName,
  price,
  specs,
  className = '',
  size = 'md',
}: WhatsAppProductButtonProps) {
  const { generateWhatsAppLink } = useStore();

  const message = `Hola, quiero comprar esta PC Gamer:
🖥️ ${productName}
${specs.map(s => `• ${s}`).join('\n')}
💰 Precio: $${price.toLocaleString()}

¿Está disponible?`;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      href={generateWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>Comprar por WhatsApp</span>
    </a>
  );
}
