import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    BarChart3,
    Settings,
    ArrowLeft,
    Cpu,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AdminLayout() {
    const { config } = useStore();
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { id: 'products', label: 'Productos', icon: Package, path: '/admin/products' },
        { id: 'categories', label: 'Categorías', icon: Tags, path: '/admin/categories' },
        { id: 'sales', label: 'Ventas', icon: ShoppingCart, path: '/admin/sales' },
        { id: 'reports', label: 'Reportes', icon: BarChart3, path: '/admin/reports' },
        { id: 'builder', label: 'Armar PC', icon: Cpu, path: '/admin/builder' },
        { id: 'settings', label: 'Configuración', icon: Settings, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/';
    };

    const currentSection = menuItems.find(item =>
        item.path === location.pathname ||
        (item.path === '/admin' && location.pathname === '/admin/')
    )?.label || 'Panel';

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/80 flex flex-col h-screen sticky top-0">
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="font-display text-2xl font-bold gradient-text">Panel de Control</h1>
                        <p className="text-sm text-muted-foreground mt-1">{config.storeName}</p>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path || (location.pathname === '/admin/' && item.path === '/admin');
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted/50'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Botón de Cerrar Sesión */}
                <div className="mt-auto p-6 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-3" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Header Principal */}
                <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between p-6">
                        <h2 className="text-2xl font-bold">
                            {currentSection}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                    {config.storeName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Outlet for pages */}
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
