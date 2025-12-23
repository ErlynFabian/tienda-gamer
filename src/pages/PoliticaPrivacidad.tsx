import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FaShieldAlt, FaLock, FaUserShield, FaInfoCircle } from 'react-icons/fa';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-primary text-3xl" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Política de </span>
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Privacidad
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
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaLock className="mr-2 text-primary" />
                    Información que Recopilamos
                  </h2>
                  <p className="mb-4">
                    En Nexus Gaming, recopilamos la siguiente información para proporcionarte nuestros servicios:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Información de contacto (nombre, correo electrónico, número de teléfono)</li>
                    <li>Información de facturación y envío</li>
                    <li>Información de pago (procesada de forma segura a través de nuestros socios de pago)</li>
                    <li>Datos de navegación y preferencias</li>
                    <li>Información de interacción con nuestro sitio web</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaUserShield className="mr-2 text-primary" />
                    Uso de la Información
                  </h2>
                  <p className="mb-4">
                    Utilizamos tu información para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Procesar y gestionar tus pedidos</li>
                    <li>Proporcionar soporte al cliente</li>
                    <li>Mejorar nuestros productos y servicios</li>
                    <li>Enviar actualizaciones y ofertas especiales (solo con tu consentimiento)</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaShieldAlt className="mr-2 text-primary" />
                    Seguridad de los Datos
                  </h2>
                  <p className="mb-4">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, alteración, divulgación o destrucción. Utilizamos cifrado SSL para proteger la transmisión de datos sensibles.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl mb-8 border border-border/50">
                  <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                    <FaInfoCircle className="mr-2 text-primary" />
                    Tus Derechos
                  </h2>
                  <p className="mb-4">
                    Tienes derecho a:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Solicitar acceso a tus datos personales</li>
                    <li>Solicitar la corrección de datos inexactos</li>
                    <li>Solicitar la eliminación de tus datos</li>
                    <li>Oponerte al procesamiento de tus datos</li>
                    <li>Solicitar la limitación del procesamiento</li>
                    <li>Solicitar la portabilidad de tus datos</li>
                    <li>Retirar tu consentimiento en cualquier momento</li>
                  </ul>
                  <p>
                    Para ejercer cualquiera de estos derechos, contáctanos a través de nuestro formulario de contacto o al correo privacidad@nexusgaming.do
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Cambios a esta Política
                  </h2>
                  <p>
                    Podemos actualizar nuestra Política de Privacidad periódicamente. Te notificaremos de cualquier cambio publicando la nueva política en esta página y actualizando la fecha de "Última actualización" en la parte superior.
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
              Si tienes alguna pregunta sobre nuestra Política de Privacidad, no dudes en contactarnos.
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
