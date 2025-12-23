import { Link } from 'react-router-dom';
import { Flame, Eye, ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-card overflow-hidden hover-lift">
      {/* Image container */}
      <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted/20">
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-4">
          <span className="flex items-center gap-2 text-sm font-medium text-primary">
            <Eye className="h-4 w-4" />
            Ver detalles
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {product.stock <= 5 && (
          <p className="mb-2 text-xs font-medium text-destructive">
            ⚡ Solo quedan {product.stock} unidades
          </p>
        )}

        <Link to={`/producto/${product.id}`}>
          <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <ul className="mb-4 space-y-1">
          {product.specs.slice(0, 3).map((spec, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              • {spec}
            </li>
          ))}
        </ul>

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

        <Button asChild variant="neon" className="w-full">
          <Link to={`/producto/${product.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Ver detalles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
