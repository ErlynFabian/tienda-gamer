import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'pc' | 'laptop' | 'accessory';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pc', label: 'PCs Gaming' },
  { value: 'laptop', label: 'Laptops' },
  { value: 'accessory', label: 'Accesorios' },
];

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = products.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="products" className="relative py-24 bg-background">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Nuestros </span>
            <span className="gradient-text">Productos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            PCs y laptops de alto rendimiento con componentes de última generación.
            Compra directo por WhatsApp.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? 'default' : 'glass'}
              size="lg"
              onClick={() => setActiveCategory(cat.value)}
              className="min-w-[120px]"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
