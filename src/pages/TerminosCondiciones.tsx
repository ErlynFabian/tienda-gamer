import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FaFileContract, FaShoppingCart, FaExchangeAlt, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaFileContract className="text-primary text-3xl" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Términos y </span>
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Condiciones
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Última actualización: 23 de Diciembre, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg text-muted-foreground max-w-none">
                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    1. Introducción
                  </h2>
                  <p className="mb-4">
                    Bienvenido a Nexus Gaming. Al acceder y utilizar nuestro sitio web, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente antes de realizar una compra.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaShoppingCart className="mr-2 text-primary" />
                    2. Proceso de Compra
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Al realizar un pedido, aceptas que la información proporcionada es precisa y completa.</li>
                    <li>Nos reservamos el derecho de rechazar o cancelar pedidos en cualquier momento por razones que incluyen, entre otras, disponibilidad de productos, errores en la descripción o precio del producto, o sospecha de fraude.</li>
                    <li>Los precios están sujetos a cambios sin previo aviso.</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaTruck className="mr-2 text-primary" />
                    3. Envíos y Entregas
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad del producto.</li>
                    <li>Los gastos de envío se calcularán durante el proceso de compra.</li>
                    <li>No nos hacemos responsables por retrasos causados por factores fuera de nuestro control razonable.</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaUndo className="mr-2 text-primary" />
                    4. Devoluciones y Reembolsos
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Aceptamos devoluciones dentro de los 14 días posteriores a la recepción del producto.</li>
                    <li>Los productos deben estar en su embalaje original y en condiciones de reventa.</li>
                    <li>Los gastos de envío de devolución corren por cuenta del cliente, a menos que el producto esté defectuoso o se haya cometido un error por nuestra parte.</li>
                    <li>Los reembolsos se procesarán dentro de los 14 días posteriores a la recepción de la devolución.</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaShieldAlt className="mr-2 text-primary" />
                    5. Garantía
                  </h2>
                  <p className="mb-4">
                    Todos nuestros productos están cubiertos por la garantía del fabricante. Los términos específicos de la garantía varían según el producto y el fabricante. Para hacer válida la garantía, es necesario presentar el comprobante de compra original.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    6. Propiedad Intelectual
                  </h2>
                  <p className="mb-4">
                    Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Nexus Gaming o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    7. Limitación de Responsabilidad
                  </h2>
                  <p className="mb-4">
                    Nexus Gaming no será responsable por ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestros productos o servicios.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    8. Cambios en los Términos
                  </h2>
                  <p>
                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Se considerará que los clientes aceptan los términos modificados al continuar utilizando nuestros servicios después de dichos cambios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">¿Tienes Preguntas?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Si tienes alguna pregunta sobre nuestros Términos y Condiciones, no dudes en contactarnos.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
