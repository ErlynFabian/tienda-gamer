import React, { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Search,
    Filter,
    Download,
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Clock,
    Ban,
    Eye,
    Edit2,
    Trash2,
    Calendar,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { salesData, type Sale } from '@/data/sales';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// Helper to simulate profit (30% margin)
const calculateProfit = (amount: number) => amount * 0.3;

export function SalesSection() {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [sales, setSales] = useState<Sale[]>(salesData);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // New Sale Modal State
    const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
    const [newSaleCustomer, setNewSaleCustomer] = useState('');
    const [newSaleProduct, setNewSaleProduct] = useState('');
    const [newSaleQuantity, setNewSaleQuantity] = useState(1);

    // Action States
    const [viewSale, setViewSale] = useState<Sale | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [editSale, setEditSale] = useState<Sale | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<string>('');

    const [deleteSale, setDeleteSale] = useState<Sale | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Autocomplete states
    const [productSearch, setProductSearch] = useState('');
    const [showProductSuggestions, setShowProductSuggestions] = useState(false);

    const filteredSearchProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

    // Process sales by month from local state
    const salesByMonth = useMemo(() => {
        const grouped: Record<string, { sales: Sale[]; total: number }> = {};
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        sales.forEach(sale => {
            const date = new Date(sale.date); // Ensure it's a Date object
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!grouped[key]) {
                grouped[key] = { sales: [], total: 0 };
            }

            grouped[key].sales.push(sale);
            grouped[key].total += sale.total;
        });
        return grouped;
    }, [sales]);

    // Process data for Month Cards
    const monthCardsData = useMemo(() => {
        const keys = Object.keys(salesByMonth);

        return keys.map(monthName => {
            const data = salesByMonth[monthName];
            const completed = data.sales.filter(s => s.status === 'completed' || s.status === 'shipped').length;
            const pending = data.sales.filter(s => s.status === 'pending').length;
            const cancelled = data.sales.filter(s => s.status === 'cancelled').length;

            return {
                id: monthName,
                name: monthName,
                totalSales: data.sales.length,
                revenue: data.total,
                profit: calculateProfit(data.total),
                completed,
                pending,
                cancelled,
                trend: 'up'
            };
        });
    }, [salesByMonth]);

    // Get data for the selected month
    const selectedMonthData = useMemo(() => {
        if (!selectedMonth) return null;
        return salesByMonth[selectedMonth] || { sales: [], total: 0 };
    }, [selectedMonth, salesByMonth]);

    // Filter sales in the detail view
    const filteredSales = useMemo(() => {
        if (!selectedMonthData) return [];

        return selectedMonthData.sales.filter(sale => {
            const matchSearch =
                sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchStatus = statusFilter === 'all' ||
                (statusFilter === 'completed' && (sale.status === 'completed' || sale.status === 'shipped')) ||
                sale.status === statusFilter;

            return matchSearch && matchStatus;
        });
    }, [selectedMonthData, searchTerm, statusFilter]);

    // Handlers
    const handleMonthClick = (monthId: string) => {
        setSelectedMonth(monthId);
        setSearchTerm('');
        setStatusFilter('all');
    };

    const handleBack = () => {
        setSelectedMonth(null);
    };

    const handleNewSale = () => {
        setNewSaleCustomer('');
        setNewSaleProduct('');
        setProductSearch('');
        setShowProductSuggestions(false);
        setNewSaleQuantity(1);
        setIsNewSaleOpen(true);
    };

    const handleSaveSale = () => {
        const product = products.find(p => p.id === newSaleProduct);
        if (!product || !newSaleCustomer) return;

        const total = product.price * newSaleQuantity;
        const newSale: Sale = {
            id: `SALE-${Date.now().toString().slice(-6)}`,
            customer: newSaleCustomer,
            items: [{
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: newSaleQuantity
            }],
            total: total,
            date: new Date(), // Current date/month
            status: 'completed'
        };

        setSales([newSale, ...sales]);
        setIsNewSaleOpen(false);
        toast.success("Venta registrada exitosamente");
    };

    // Action Handlers
    const handleView = (sale: Sale) => {
        setViewSale(sale);
        setIsViewOpen(true);
    };

    const handleEdit = (sale: Sale) => {
        setEditSale(sale);
        setNewStatus(sale.status);
        setIsEditOpen(true);
    };

    const handleUpdateStatus = () => {
        if (!editSale) return;

        setSales(sales.map(s =>
            s.id === editSale.id ? { ...s, status: newStatus as Sale['status'] } : s
        ));

        setIsEditOpen(false);
        toast.success("Estado de venta actualizado");
    };

    const handleDelete = (sale: Sale) => {
        setDeleteSale(sale);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (!deleteSale) return;

        setSales(sales.filter(s => s.id !== deleteSale.id));
        setIsDeleteOpen(false);
        toast.success("Venta eliminada correctamente");
    };

    if (!selectedMonth) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-end items-center">
                    <Button onClick={handleNewSale} className="bg-green-600 hover:bg-green-700">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Registrar Venta
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {monthCardsData.map((month) => (
                        <div
                            key={month.id}
                            onClick={() => handleMonthClick(month.id)}
                            className="group cursor-pointer bg-card hover:bg-muted/50 border border-border/50 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div className="flex items-center text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs font-medium">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        Tendencia
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{month.name}</h3>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">${month.revenue.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Ganancia est.: <span className="text-green-600 font-medium">+${month.profit.toLocaleString()}</span>
                                    </p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Completadas</p>
                                        <p className="font-semibold text-green-600">{month.completed}</p>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <p className="text-xs text-muted-foreground">Pendientes</p>
                                        <p className="font-semibold text-amber-600">{month.pending}</p>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <p className="text-xs text-muted-foreground">Canceladas</p>
                                        <p className="font-semibold text-red-600">{month.cancelled}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Registrar Nueva Venta</DialogTitle>
                            <DialogDescription>
                                La venta se registrará con la fecha de hoy.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="customer">Cliente</Label>
                                <Input
                                    id="customer"
                                    value={newSaleCustomer}
                                    onChange={(e) => setNewSaleCustomer(e.target.value)}
                                    placeholder="Nombre del cliente"
                                />
                            </div>
                            <div className="grid gap-2 relative">
                                <Label htmlFor="product">Producto (Buscar)</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="product"
                                        placeholder="Buscar producto..."
                                        value={productSearch}
                                        onChange={(e) => {
                                            setProductSearch(e.target.value);
                                            setShowProductSuggestions(true);
                                            setNewSaleProduct('');
                                        }}
                                        onFocus={() => setShowProductSuggestions(true)}
                                        className="pl-8"
                                        autoComplete="off"
                                    />
                                    {showProductSuggestions && (
                                        <div className="absolute z-10 w-full mt-1 bg-popover text-popover-foreground shadow-md rounded-md border border-border max-h-[200px] overflow-y-auto">
                                            {filteredSearchProducts.map(p => (
                                                <div
                                                    key={p.id}
                                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground flex justify-between items-center"
                                                    onClick={() => {
                                                        setNewSaleProduct(p.id);
                                                        setProductSearch(p.name);
                                                        setShowProductSuggestions(false);
                                                    }}
                                                >
                                                    <span>{p.name}</span>
                                                    <span className="text-muted-foreground text-xs">${p.price}</span>
                                                </div>
                                            ))}
                                            {filteredSearchProducts.length === 0 && (
                                                <div className="px-3 py-2 text-sm text-muted-foreground">No encontrado</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Cantidad</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={newSaleQuantity}
                                    onChange={(e) => setNewSaleQuantity(parseInt(e.target.value))}
                                />
                            </div>
                            {newSaleProduct && (
                                <div className="pt-2 flex justify-between items-center border-t">
                                    <span className="font-medium">Total:</span>
                                    <span className="font-bold text-lg">
                                        ${((products.find(p => p.id === newSaleProduct)?.price || 0) * newSaleQuantity).toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsNewSaleOpen(false)}>Cancelar</Button>
                            <Button onClick={handleSaveSale} disabled={!newSaleCustomer || !newSaleProduct}>
                                Registrar Venta
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    const stats = [
        {
            label: 'Ventas Totales',
            value: selectedMonthData?.sales.length || 0,
            icon: ShoppingCart,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            label: 'Completadas',
            value: filteredSales.filter(s => s.status === 'completed' || s.status === 'shipped').length,
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        },
        {
            label: 'Ingresos Totales',
            value: `$${(selectedMonthData?.total || 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'text-primary',
            bg: 'bg-primary/10'
        },
        {
            label: 'Ganancias Estimadas',
            value: `$${calculateProfit(selectedMonthData?.total || 0).toLocaleString()}`,
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Navigation */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a meses
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">{selectedMonth}</h2>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <h4 className="text-xl font-bold">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Actions */}
            <div className="bg-card border border-border/50 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por cliente, producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="relative min-w-[180px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="completed">Completadas</option>
                                <option value="pending">Pendientes</option>
                                <option value="cancelled">Canceladas</option>
                            </select>
                        </div>
                    </div>

                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Sales Table */}
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-border bg-muted/30">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Fecha</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Producto(s)</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Cliente</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">Cant.</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Ganancia</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">Estado</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredSales.map((sale) => {
                                const totalItems = sale.items.reduce((acc, item) => acc + item.quantity, 0);
                                const profit = calculateProfit(sale.total);

                                let statusColor = 'bg-gray-100 text-gray-800';
                                let statusLabel: string = sale.status;

                                if (sale.status === 'completed' || sale.status === 'shipped') {
                                    statusColor = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                                    statusLabel = 'Completada';
                                } else if (sale.status === 'pending') {
                                    statusColor = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
                                    statusLabel = 'Pendiente';
                                } else if (sale.status === 'cancelled') {
                                    statusColor = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
                                    statusLabel = 'Cancelada';
                                }

                                return (
                                    <tr key={sale.id} className="hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                            {new Date(sale.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium truncate max-w-[200px]">{sale.items[0]?.name}</span>
                                                {sale.items.length > 1 && (
                                                    <span className="text-xs text-muted-foreground">+{sale.items.length - 1} más</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {sale.customer}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                                            {totalItems}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            ${sale.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-green-600 font-medium">
                                            +${profit.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                                                {statusLabel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    onClick={() => handleView(sale)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                                    onClick={() => handleEdit(sale)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(sale)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredSales.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                        No se encontraron ventas con los filtros seleccionados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Sale Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalle de Venta</DialogTitle>
                        <DialogDescription>
                            ID: {viewSale?.id} - {viewSale && new Date(viewSale.date).toLocaleDateString()}
                        </DialogDescription>
                    </DialogHeader>
                    {viewSale && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-muted/40 p-3 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                                    <p className="font-semibold">{viewSale.customer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-muted-foreground">Estado</p>
                                    <p className={`font-semibold capitalize ${viewSale.status === 'completed' ? 'text-green-500' :
                                        viewSale.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                                        }`}>
                                        {viewSale.status === 'completed' ? 'Completada' :
                                            viewSale.status === 'pending' ? 'Pendiente' :
                                                viewSale.status === 'cancelled' ? 'Cancelada' : viewSale.status}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Productos</h4>
                                <div className="border border-border rounded-md divide-y divide-border">
                                    {viewSale.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between p-3 text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="font-mono">${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t text-lg font-bold">
                                <span>Total</span>
                                <span>${viewSale.total.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Sale Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Actualizar Estado</DialogTitle>
                        <DialogDescription>
                            Cambiar el estado de la venta {editSale?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label className="mb-2 block">Nuevo Estado</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="completed">Completada</SelectItem>
                                <SelectItem value="pending">Pendiente</SelectItem>
                                <SelectItem value="cancelled">Cancelada</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                        <Button onClick={handleUpdateStatus}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Alert */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro de eliminar esta venta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. La venta {deleteSale?.id} será eliminada permanentemente del registro.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
