import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  BarChart3,
  Settings,
  ArrowLeft,
  MessageCircle,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { products, stats } from '@/data/products';

type AdminSection = 'dashboard' | 'products' | 'categories' | 'sales' | 'reports' | 'settings';

export default function Admin() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const { config, updateConfig } = useStore();

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as const, label: 'Productos', icon: Package },
    { id: 'categories' as const, label: 'Categorías', icon: Tags },
    { id: 'sales' as const, label: 'Ventas', icon: ShoppingCart },
    { id: 'reports' as const, label: 'Reportes', icon: BarChart3 },
    { id: 'settings' as const, label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 p-6">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Volver al sitio</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-display text-xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1">{config.storeName}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {activeSection === 'dashboard' && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Dashboard</h2>

            {/* Stats cards */}
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Clics WhatsApp</p>
                    <p className="font-display text-3xl font-bold text-foreground">1,284</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-whatsapp/20">
                    <MessageCircle className="h-6 w-6 text-whatsapp" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-primary">+12% vs mes anterior</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ventas Cerradas</p>
                    <p className="font-display text-3xl font-bold text-foreground">87</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-primary">+8% vs mes anterior</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Visitantes</p>
                    <p className="font-display text-3xl font-bold text-foreground">4,521</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-primary">+23% vs mes anterior</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos</p>
                    <p className="font-display text-3xl font-bold text-foreground">$124k</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-primary">+15% vs mes anterior</p>
              </div>
            </div>

            {/* Recent activity placeholder */}
            <div className="glass-card p-6">
              <h3 className="mb-4 font-display font-bold">Actividad Reciente</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg bg-muted/30 p-4">
                    <div className="h-10 w-10 rounded-full bg-whatsapp/20 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-whatsapp" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo clic en WhatsApp</p>
                      <p className="text-xs text-muted-foreground">Producto: TITAN RTX 4090</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Hace {i * 5} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'products' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Productos</h2>
              <Button variant="default">+ Agregar Producto</Button>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Producto</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Categoría</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium">{product.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-primary">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${product.stock <= 5 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Eliminar</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Configuración</h2>

            <div className="max-w-2xl space-y-6">
              <div className="glass-card p-6">
                <h3 className="mb-4 font-display font-bold">WhatsApp</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Número de WhatsApp</label>
                    <input
                      type="text"
                      value={config.whatsappNumber}
                      onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Ej: 521234567890"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Incluye código de país sin el signo +
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="mb-4 font-display font-bold">Textos del Sitio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Nombre de la Tienda</label>
                    <input
                      type="text"
                      value={config.storeName}
                      onChange={(e) => updateConfig({ storeName: e.target.value })}
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Título Hero</label>
                    <input
                      type="text"
                      value={config.heroTitle}
                      onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Subtítulo Hero</label>
                    <input
                      type="text"
                      value={config.heroSubtitle}
                      onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="mb-4 font-display font-bold">Urgencia</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="showUrgency"
                      checked={config.showUrgency}
                      onChange={(e) => updateConfig({ showUrgency: e.target.checked })}
                      className="h-5 w-5 rounded border-border bg-muted text-primary focus:ring-primary"
                    />
                    <label htmlFor="showUrgency" className="text-sm font-medium">
                      Mostrar mensaje de urgencia
                    </label>
                  </div>
                  {config.showUrgency && (
                    <div>
                      <label className="mb-2 block text-sm font-medium">Texto de Urgencia</label>
                      <input
                        type="text"
                        value={config.urgencyText}
                        onChange={(e) => updateConfig({ urgencyText: e.target.value })}
                        className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button variant="default" size="lg" className="w-full">
                Guardar Cambios
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'categories' && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Categorías</h2>
            <div className="glass-card p-6">
              <p className="text-muted-foreground">Gestión de categorías próximamente...</p>
            </div>
          </div>
        )}

        {activeSection === 'sales' && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Ventas</h2>
            <div className="glass-card p-6">
              <p className="text-muted-foreground">Registro de ventas próximamente...</p>
            </div>
          </div>
        )}

        {activeSection === 'reports' && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Reportes</h2>
            <div className="glass-card p-6">
              <p className="text-muted-foreground">Reportes y gráficas próximamente...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
