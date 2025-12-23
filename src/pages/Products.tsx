import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'pc' | 'laptop' | 'accessory';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pc', label: 'PCs Gaming' },
  { value: 'laptop', label: 'Laptops' },
  { value: 'accessory', label: 'Accesorios' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name', label: 'Nombre A-Z' },
];

const priceRanges = [
  { min: 0, max: 500, label: 'Menos de $500' },
  { min: 500, max: 1500, label: '$500 - $1,500' },
  { min: 1500, max: 2500, label: '$1,500 - $2,500' },
  { min: 2500, max: Infinity, label: 'Más de $2,500' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.specs.some(s => s.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, sortBy, searchQuery, selectedPriceRange]);

  const clearFilters = () => {
    setActiveCategory('all');
    setSortBy('featured');
    setSearchQuery('');
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = activeCategory !== 'all' || searchQuery || selectedPriceRange !== null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[100px] opacity-40"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
                  Nuestros Productos
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">Explora Nuestro </span>
                  <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Catálogo
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubre nuestra selección de productos de alta calidad para gamers y entusiastas de la tecnología.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search and filters bar */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-card/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={activeCategory === cat.value ? 'default' : 'glass'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}

              <div className="ml-auto flex items-center gap-3">
                {/* Mobile filter toggle */}
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>

                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg border border-border bg-card/50 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price filter (desktop always visible, mobile toggleable) */}
            <div className={`flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              <span className="text-sm text-muted-foreground self-center mr-2">Precio:</span>
              {priceRanges.map((range, index) => (
                <Button
                  key={index}
                  variant={selectedPriceRange === index ? 'default' : 'glass'}
                  size="sm"
                  onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                >
                  {range.label}
                </Button>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-muted-foreground">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-medium text-muted-foreground mb-4">
                No se encontraron productos
              </p>
              <Button variant="neon" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
