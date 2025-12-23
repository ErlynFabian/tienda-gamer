import { Link } from 'react-router-dom';
import { Flame, Sparkles } from 'lucide-react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/producto/${product.id}`} className="group block h-full">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:neon-border h-full relative">
        {/* RGB hover effect wrapper */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary via-secondary to-primary animate-pulse blur-[1px] -z-10" />
        </div>

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          {product.badge && (
            <Badge className="absolute left-3 top-3 z-10 bg-secondary text-secondary-foreground font-bold shadow-lg animate-pulse-glow">
              <Flame className="mr-1 h-3 w-3" />
              {product.badge}
            </Badge>
          )}

          {/* Performance Badge (Mock logic based on category/price) */}
          {product.category === 'pc' && product.price > 2000 && (
            <Badge variant="outline" className="absolute left-3 bottom-14 z-10 border-primary bg-background/80 text-primary backdrop-blur-sm">
              <Sparkles className="mr-1 h-3 w-3" />
              4K Ready
            </Badge>
          )}

          {discount > 0 && (
            <Badge className="absolute right-3 top-3 z-10 bg-destructive text-destructive-foreground font-bold">
              -{discount}%
            </Badge>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          {product.stock <= 5 && (
            <p className="mb-2 text-xs font-medium text-destructive flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
              Solo quedan {product.stock} unidades
            </p>
          )}

          <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:gradient-text transition-colors">
            {product.name}
          </h3>

          <ul className="mb-4 space-y-1">
            {product.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary/40" />
                {spec}
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through decoration-destructive/50">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
