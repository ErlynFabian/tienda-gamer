import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FaGamepad, FaHeadset, FaShieldAlt, FaTruck, FaUsers } from 'react-icons/fa';

export default function SobreNosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-primary text-3xl" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Sobre </span>
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Nosotros
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conoce la historia detrás de Nexus Gaming y nuestro compromiso con la comunidad gamer de República Dominicana.
            </p>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Historia</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Fundada en 2023, Nexus Gaming nació de la pasión por los videojuegos y la tecnología.
                  Lo que comenzó como un pequeño proyecto entre amigos se ha convertido en una de las
                  tiendas de tecnología gaming más confiables de República Dominicana.
                </p>
                <p>
                  Nuestro objetivo es simple: proporcionar a la comunidad gamer dominicana acceso a los
                  mejores componentes y equipos gaming, con precios competitivos y un servicio excepcional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaGamepad className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pasión por el Gaming</h3>
                <p className="text-muted-foreground">Vivimos y respiramos gaming. Nuestro equipo está formado por jugadores apasionados que entienden tus necesidades.</p>
              </div>

              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                <p className="text-muted-foreground">Trabajamos solo con marcas reconocidas y ofrecemos garantía en todos nuestros productos.</p>
              </div>

              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
                <p className="text-muted-foreground">Nuestro equipo de soporte está siempre disponible para ayudarte con cualquier consulta o problema.</p>
              </div>

              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTruck className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Envíos Rápidos</h3>
                <p className="text-muted-foreground">Entregamos en todo el país con tiempos de envío rápidos y seguros.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Nuestro Equipo</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">JD</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Juan Delgado</h3>
                <p className="text-primary mb-2">CEO & Fundador</p>
                <p className="text-muted-foreground text-sm">Más de 10 años de experiencia en el mundo del gaming y la tecnología.</p>
              </div>

              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">MP</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">María Pérez</h3>
                <p className="text-primary mb-2">Directora de Ventas</p>
                <p className="text-muted-foreground text-sm">Especialista en atención al cliente y experiencia del usuario.</p>
              </div>

              <div className="bg-card p-6 rounded-xl text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">CR</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Carlos Rodríguez</h3>
                <p className="text-primary mb-2">Especialista Técnico</p>
                <p className="text-muted-foreground text-sm">Experto en armado y mantenimiento de equipos gaming.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para Mejorar tu Experiencia Gaming?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora nuestra selección de productos y lleva tu experiencia de juego al siguiente nivel.
            </p>
            <a
              href="/productos"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Ver Productos
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
