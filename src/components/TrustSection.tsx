import { Shield, Truck, Headphones, Award, Users, Star, Monitor } from 'lucide-react';
import { stats, brands, testimonials } from '@/data/products';

const benefits = [
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: 'Hasta 3 años de garantía en todos nuestros productos',
  },
  {
    icon: Truck,
    title: 'Envío Rápido',
    description: 'Entrega en 24-48 horas en todo el país',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Atención personalizada por WhatsApp siempre disponible',
  },
  {
    icon: Award,
    title: 'Componentes Originales',
    description: 'Solo trabajamos con distribuidores oficiales',
  },
];

export function TrustSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Stats counters */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: stats.pcsSold, label: 'PCs Vendidas', icon: Monitor },
            { value: stats.happyCustomers, label: 'Clientes Satisfechos', icon: Users },
            { value: stats.yearsExperience, label: 'Años de Experiencia', suffix: '+', icon: Award },
            { value: stats.rating, label: 'Calificación', suffix: '/5', icon: Star },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover-lift"
            >
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <p className="font-display text-4xl font-bold text-foreground">
                {typeof stat.value === 'number' && stat.value > 100
                  ? stat.value.toLocaleString()
                  : stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="text-foreground">¿Por qué </span>
            <span className="gradient-text">elegirnos?</span>
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover-lift group"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-display font-bold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="text-foreground">Lo que dicen </span>
            <span className="gradient-text">nuestros clientes</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="glass-card p-6 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-4 text-sm text-muted-foreground italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">Compró: {testimonial.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand logos */}
        <div>
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            TRABAJAMOS CON LAS MEJORES MARCAS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex h-12 items-center px-4 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <span className="font-display text-lg font-bold text-muted-foreground hover:text-primary transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
