import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  MessageCircle,
  Shield,
  Truck,
  Award,
  ChevronRight,
  Star,
  Cpu,
  HardDrive,
  MonitorSpeaker,
  MemoryStick,
  CircuitBoard,
  Zap,
  Box,
  Fan,
  Monitor,
  Wifi,
  Scale
} from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { ProductCard } from '@/components/ProductCard';
import { formatPrice } from '@/lib/utils';

const specIcons: Record<string, React.ElementType> = {
  processor: Cpu,
  graphics: MonitorSpeaker,
  memory: MemoryStick,
  storage: HardDrive,
  motherboard: CircuitBoard,
  psu: Zap,
  cooling: Fan,
  case: Box,
  display: Monitor,
  connectivity: Wifi,
  weight: Scale,
};

const specLabels: Record<string, string> = {
  processor: 'Procesador',
  graphics: 'Tarjeta Gráfica',
  memory: 'Memoria RAM',
  storage: 'Almacenamiento',
  motherboard: 'Motherboard',
  psu: 'Fuente de Poder',
  cooling: 'Refrigeración',
  case: 'Gabinete',
  display: 'Pantalla',
  connectivity: 'Conectividad',
  weight: 'Peso',
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { generateWhatsAppLink } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Producto no encontrado</h1>
          <Button asChild variant="neon">
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const gallery = product.gallery || [product.image];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const purchaseMessage = `Hola, quiero comprar:

🖥️ *${product.name}*

${product.specs.map(s => `• ${s}`).join('\n')}

💰 Precio: ${formatPrice(product.price)}

¿Está disponible? ¿Cuáles son las opciones de pago y envío a República Dominicana?`;

  const infoMessage = `Hola, me interesa el producto:

🖥️ *${product.name}*

Precio: ${formatPrice(product.price)}

Me gustaría más información sobre este producto.`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/productos" className="hover:text-primary transition-colors">Productos</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="glass-card overflow-hidden aspect-square relative group">
                {product.badge && (
                  <Badge className="absolute left-4 top-4 z-10 bg-secondary text-secondary-foreground">
                    {product.badge}
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="absolute right-4 top-4 z-10 bg-destructive">
                    -{discount}%
                  </Badge>
                )}
                <img
                  src={gallery[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                          ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
                          : 'border-border hover:border-primary/50'
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="space-y-6">
              {/* Title & price */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                {/* Stars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(47 reseñas)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock */}
                {product.stock <= 5 ? (
                  <p className="text-destructive font-medium">
                    ⚡ ¡Solo quedan {product.stock} unidades!
                  </p>
                ) : (
                  <p className="text-primary font-medium">
                    ✓ En stock ({product.stock} disponibles)
                  </p>
                )}
              </div>

              {/* Quick specs */}
              <div className="glass-card p-4">
                <ul className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="whatsapp"
                  size="xl"
                  className="w-full"
                >
                  <a
                    href={generateWhatsAppLink(purchaseMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-6 w-6" />
                    Comprar por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="neon"
                  size="lg"
                  className="w-full"
                >
                  <a
                    href={generateWhatsAppLink(infoMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar más información
                  </a>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Garantía 3 años</p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Envío en RD</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">100% Original</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full specs */}
        {product.fullSpecs && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-display text-2xl font-bold mb-8">Especificaciones Técnicas</h2>
            <div className="glass-card p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(product.fullSpecs).map(([key, value]) => {
                  const Icon = specIcons[key] || Cpu;
                  const label = specLabels[key] || key;
                  return (
                    <div key={key} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-display text-2xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
