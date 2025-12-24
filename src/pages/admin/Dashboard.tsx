import React, { useState } from 'react';
import {
    Package,
    Tags,
    DollarSign,
    TrendingUp,
    MessageCircle,
    ShoppingCart,
    Users,
} from 'lucide-react';
import { Product, products as initialProducts } from '@/data/products';
import { salesData } from '@/data/sales';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
    const [inventory, setInventory] = useState(initialProducts);
    const [restockDialogOpen, setRestockDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [restockAmount, setRestockAmount] = useState("");

    const openRestockDialog = (product: Product) => {
        setSelectedProduct(product);
        setRestockAmount("");
        setRestockDialogOpen(true);
    };

    const confirmRestock = () => {
        if (!selectedProduct || !restockAmount) return;
        const amount = parseInt(restockAmount);

        if (isNaN(amount) || amount <= 0) {
            toast.error("Error", { description: "Por favor ingresa una cantidad válida" });
            return;
        }

        setInventory(prev => prev.map(item =>
            item.id === selectedProduct.id ? { ...item, stock: item.stock + amount } : item
        ));

        toast.success("Stock actualizado", {
            description: `Se han añadido ${amount} unidades a ${selectedProduct.name}`
        });

        setRestockDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        title: 'Productos Totales',
                        value: inventory.length.toString(),
                        change: '+4 nuevos',
                        icon: Package,
                        iconBg: 'bg-primary/20',
                        iconColor: 'text-primary',
                        trend: 'up'
                    },
                    {
                        title: 'Categorías',
                        value: '8',
                        change: 'Activas',
                        icon: Tags,
                        iconBg: 'bg-secondary/20',
                        iconColor: 'text-secondary',
                        trend: 'neutral'
                    },
                    {
                        title: 'Ventas Totales',
                        value: `$${salesData.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                        change: '+15%',
                        icon: DollarSign,
                        iconBg: 'bg-green-500/20',
                        iconColor: 'text-green-500',
                        trend: 'up'
                    },
                    {
                        title: 'Crecimiento',
                        value: '24%',
                        change: '+4.5%',
                        icon: TrendingUp,
                        iconBg: 'bg-blue-500/20',
                        iconColor: 'text-blue-500',
                        trend: 'up'
                    }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-500' :
                                        stat.trend === 'neutral' ? 'text-muted-foreground' : 'text-red-500'}`}>
                                        {stat.change}
                                    </p>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna Izquierda: Últimas Actividades */}
                <div className="lg:col-span-1">
                    <div className="bg-card border border-border/50 rounded-xl p-6 h-full">
                        <h4 className="font-medium mb-4">Actividad Reciente</h4>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 1,
                                    type: 'whatsapp',
                                    title: 'Nuevo clic en WhatsApp',
                                    description: 'Producto: TITAN RTX 4090',
                                    time: 'Hace 5 min',
                                    icon: <MessageCircle className="h-4 w-4 text-whatsapp" />
                                },
                                {
                                    id: 2,
                                    type: 'sale',
                                    title: 'Venta completada',
                                    description: 'Orden #12345 - $2,499.00',
                                    time: 'Hace 15 min',
                                    icon: <ShoppingCart className="h-4 w-4 text-green-500" />
                                },
                                {
                                    id: 3,
                                    type: 'user',
                                    title: 'Nuevo registro',
                                    description: 'usuario@ejemplo.com',
                                    time: 'Hace 25 min',
                                    icon: <Users className="h-4 w-4 text-blue-500" />
                                },
                                {
                                    id: 4,
                                    type: 'stock',
                                    title: 'Stock actualizado',
                                    description: 'TITAN RTX 4090 - 3 unidades',
                                    time: 'Hace 1 hora',
                                    icon: <Package className="h-4 w-4 text-amber-500" />
                                },
                                {
                                    id: 5,
                                    type: 'whatsapp',
                                    title: 'Consulta por WhatsApp',
                                    description: 'Pregunta sobre envíos',
                                    time: 'Hace 2 horas',
                                    icon: <MessageCircle className="h-4 w-4 text-whatsapp" />
                                }
                            ].map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{activity.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Productos */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Productos Populares */}
                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <h4 className="font-medium mb-4">Productos Populares</h4>
                        <div className="space-y-3">
                            {inventory
                                .filter(product => product.featured)
                                .sort((a, b) => b.price - a.price)
                                .slice(0, 5)
                                .map((product) => (
                                    <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">Stock: {product.stock} unidades</p>
                                        </div>
                                        <span className="text-sm font-medium">${product.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            {inventory.filter(p => p.featured).length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No hay productos populares</p>
                            )}
                        </div>
                    </div>

                    {/* Stock Crítico - Versión mejorada */}
                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <h4 className="font-medium mb-4">Stock Crítico</h4>
                        <div className="space-y-3">
                            {inventory
                                .filter(product => product.stock < 4)
                                .sort((a, b) => a.stock - b.stock)
                                .map((product) => (
                                    <div key={`critical-${product.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{product.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.stock === 0
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                    }`}>
                                                    {product.stock === 0 ? 'AGOTADO' : `${product.stock} ${product.stock === 1 ? 'unidad' : 'unidades'}`}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium hidden sm:block">${product.price.toLocaleString()}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openRestockDialog(product)}
                                                className={`h-8 px-3 text-xs ${product.stock === 0
                                                    ? 'text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 hover:bg-red-500/10'
                                                    : 'text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 hover:bg-amber-500/10'
                                                    }`}
                                            >
                                                Reponer
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                            {inventory.filter(p => p.stock < 4).length === 0 && (
                                <div className="text-center py-8">
                                    <Package className="h-12 w-12 text-muted-foreground/20 mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Todo el stock está en buen nivel</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reponer Stock</DialogTitle>
                        <DialogDescription>
                            Añadir unidades al inventario de: {selectedProduct?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Cantidad
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Ej: 10"
                                className="col-span-3"
                                value={restockAmount}
                                onChange={(e) => setRestockAmount(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && confirmRestock()}
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRestockDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={confirmRestock}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
