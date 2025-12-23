import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
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
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="glass-card overflow-hidden hover-lift h-full">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          {product.badge && (
            <Badge className="absolute left-3 top-3 z-10 bg-secondary text-secondary-foreground font-bold shadow-lg">
              <Flame className="mr-1 h-3 w-3" />
              {product.badge}
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {product.stock <= 5 && (
            <p className="mb-2 text-xs font-medium text-destructive">
              ⚡ Solo quedan {product.stock} unidades
            </p>
          )}

          <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <ul className="mb-4 space-y-1">
            {product.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {spec}
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
