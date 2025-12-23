import { MessageCircle, Flame, Zap } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { generateWhatsAppLink } = useStore();

  const message = `Hola, quiero comprar:
🖥️ ${product.name}
${product.specs.map(s => `• ${s}`).join('\n')}
💰 Precio: $${product.price.toLocaleString()}

¿Está disponible?`;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-card overflow-hidden hover-lift">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        {/* Badge */}
        {product.badge && (
          <Badge className="absolute left-3 top-3 z-10 bg-secondary text-secondary-foreground font-bold shadow-lg">
            <Flame className="mr-1 h-3 w-3" />
            {product.badge}
          </Badge>
        )}
        
        {/* Discount badge */}
        {discount > 0 && (
          <Badge className="absolute right-3 top-3 z-10 bg-destructive text-destructive-foreground font-bold">
            -{discount}%
          </Badge>
        )}

        {/* Product image with placeholder */}
        <div className="flex h-full items-center justify-center">
          <div className="h-32 w-32 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Zap className="h-16 w-16 text-primary/50" />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stock indicator */}
        {product.stock <= 5 && (
          <p className="mb-2 text-xs font-medium text-destructive">
            ⚡ Solo quedan {product.stock} unidades
          </p>
        )}

        {/* Name */}
        <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Specs */}
        <ul className="mb-4 space-y-1">
          {product.specs.slice(0, 3).map((spec, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              • {spec}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={generateWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
        >
          <MessageCircle className="h-5 w-5" />
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  );
}
