import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Package,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { products as initialProducts, type Product } from '@/data/products';

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

export function ProductsSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Product states for actions
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [specsText, setSpecsText] = useState('');
    const [fullSpecsData, setFullSpecsData] = useState<Record<string, string>>({});
    const [formPricing, setFormPricing] = useState({
        cost: 0,
        regular: 0,
        offer: 0,
        isOffer: false
    });

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Handlers
    const openNewProduct = () => {
        setCurrentProduct(null);
        setFormData({
            name: '',
            category: 'pc',
            price: 0,
            originalPrice: 0,
            costPrice: 0,
            stock: 0,
            badge: '',
            image: '/placeholder.svg',
            description: '',
            specs: []
        });
        setFormPricing({
            cost: 0,
            regular: 0,
            offer: 0,
            isOffer: false
        });
        setSpecsText('');
        setFullSpecsData({});
        setIsFormOpen(true);
    };

    const openEditProduct = (product: Product) => {
        setCurrentProduct(product);
        setFormData({ ...product });
        setSpecsText(product.specs ? product.specs.join('\n') : '');
        setFullSpecsData(product.fullSpecs || {});

        // Calculate pricing state
        const isOffer = !!product.originalPrice && product.originalPrice > product.price;
        setFormPricing({
            cost: product.costPrice || 0,
            regular: isOffer ? (product.originalPrice || 0) : product.price,
            offer: isOffer ? product.price : 0,
            isOffer: isOffer
        });

        setIsFormOpen(true);
    };

    const openViewProduct = (product: Product) => {
        setCurrentProduct(product);
        setIsViewOpen(true);
    };

    const openDeleteConfirm = (product: Product) => {
        setCurrentProduct(product);
        setIsDeleteOpen(true);
    };

    const handleSave = () => {
        // Calculate final prices based on offer state
        const finalPrice = formPricing.isOffer ? formPricing.offer : formPricing.regular;
        const finalOriginalPrice = formPricing.isOffer ? formPricing.regular : undefined;

        const productData = {
            ...formData,
            costPrice: formPricing.cost,
            price: finalPrice,
            originalPrice: finalOriginalPrice,
            specs: specsText.split('\n').filter(s => s.trim() !== ''),
            fullSpecs: Object.keys(fullSpecsData).length > 0 ? fullSpecsData : undefined
        };

        if (currentProduct) {
            // Edit existing
            setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...productData } as Product : p));
        } else {
            // Create new
            const newProduct: Product = {
                id: Date.now().toString(),
                name: productData.name || 'Nuevo Producto',
                category: productData.category as any || 'accessory',
                price: Number(productData.price) || 0,
                originalPrice: Number(productData.originalPrice) || undefined,
                costPrice: Number(productData.costPrice) || 0,
                stock: Number(productData.stock) || 0,
                badge: productData.badge || undefined,
                image: productData.image || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
                description: productData.description || '',
                specs: productData.specs || [],
                fullSpecs: productData.fullSpecs
            };
            setProducts([newProduct, ...products]);
        }
        setIsFormOpen(false);
    };

    const handleDelete = () => {
        if (currentProduct) {
            setProducts(products.filter(p => p.id !== currentProduct.id));
            setIsDeleteOpen(false);
        }
    };

    const updateFullSpec = (key: string, value: string) => {
        setFullSpecsData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Filters */}
            <div className="bg-card border border-border/50 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                            <option value="all">Todas las categorías</option>
                            <option value="pc">PC de Escritorio</option>
                            <option value="laptop">Laptops</option>
                            <option value="accessory">Accesorios</option>
                        </select>
                    </div>
                    <Button className="gap-2 whitespace-nowrap" onClick={openNewProduct}>
                        <Plus className="h-4 w-4" />
                        Nuevo Producto
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-border bg-muted/30">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Producto</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Categoría</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Precio</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">Stock</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">Estado</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden flex-shrink-0 border border-border/50">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{product.name}</p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">ID: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-sm">
                                        ${product.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm">
                                        <span className={`font-medium ${product.stock < 5 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {product.stock === 0 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                Agotado
                                            </span>
                                        ) : product.stock < 5 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                Bajo Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                En Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menú</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openEditProduct(product)}>
                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openViewProduct(product)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Ver detalle
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => openDeleteConfirm(product)}
                                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Dialog for Create/Edit */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col p-0">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle>{currentProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                        <DialogDescription>
                            Completa todos los detalles del producto para que aparezca correctamente en la tienda.
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="flex-1 px-6 py-4">
                        <div className="grid gap-6">
                            {/* Información Básica */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-sm text-muted-foreground border-b pb-2">Información Básica</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Label htmlFor="name">Nombre del Producto</Label>
                                        <Input
                                            id="name"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="ej. TITAN RTX 4090"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Categoría</Label>
                                        <select
                                            id="category"
                                            value={formData.category || 'accessory'}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <option value="pc">PC de Escritorio</option>
                                            <option value="laptop">Laptops</option>
                                            <option value="accessory">Accesorios</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="badge">Etiqueta (Opcional)</Label>
                                        <Input
                                            id="badge"
                                            value={formData.badge || ''}
                                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                            placeholder="ej. NUEVO, OFERTA"
                                        />
                                    </div>
                                    <div className="col-span-2 grid grid-cols-2 gap-4 border p-4 rounded-lg bg-muted/20">
                                        <div className="col-span-2 flex items-center justify-between">
                                            <Label htmlFor="costPrice" className="text-muted-foreground">Costo (Precio Compra)</Label>
                                            <Input
                                                id="costPrice"
                                                type="number"
                                                value={formPricing.cost || ''}
                                                onChange={(e) => setFormPricing({ ...formPricing, cost: Number(e.target.value) })}
                                                placeholder="Costo"
                                                className="w-1/2 bg-background"
                                            />
                                        </div>

                                        <div className="col-span-2 h-px bg-border my-2" />

                                        <div>
                                            <Label htmlFor="regularPrice">Precio Regular (Venta)</Label>
                                            <Input
                                                id="regularPrice"
                                                type="number"
                                                value={formPricing.regular || ''}
                                                onChange={(e) => setFormPricing({ ...formPricing, regular: Number(e.target.value) })}
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-end">
                                            <div className="flex items-center space-x-2 border rounded-md p-3 bg-background">
                                                <Switch
                                                    id="offer-mode"
                                                    checked={formPricing.isOffer}
                                                    onCheckedChange={(checked) => setFormPricing({ ...formPricing, isOffer: checked })}
                                                />
                                                <Label htmlFor="offer-mode cursor-pointer">¿En Oferta?</Label>
                                            </div>
                                        </div>

                                        {formPricing.isOffer && (
                                            <div className="col-span-2 animate-in fade-in slide-in-from-top-2">
                                                <Label htmlFor="offerPrice" className="text-green-600 font-medium">Precio Oferta (Nuevo Precio)</Label>
                                                <div className="relative mt-1.5">
                                                    <Input
                                                        id="offerPrice"
                                                        type="number"
                                                        value={formPricing.offer || ''}
                                                        onChange={(e) => setFormPricing({ ...formPricing, offer: Number(e.target.value) })}
                                                        className="border-green-200 focus:ring-green-500"
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium">
                                                        ahorro: {formPricing.regular > 0 ? Math.round(((formPricing.regular - formPricing.offer) / formPricing.regular) * 100) : 0}%
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="stock">Stock Disponible</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={formData.stock || ''}
                                            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="image">URL de Imagen</Label>
                                        <Input
                                            id="image"
                                            value={formData.image || ''}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description || ''}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Especificaciones Rápidas */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-sm text-muted-foreground border-b pb-2">Especificaciones Rápidas</h3>
                                <div>
                                    <Label htmlFor="specs">Características Principales (Una por línea)</Label>
                                    <Textarea
                                        id="specs"
                                        value={specsText}
                                        onChange={(e) => setSpecsText(e.target.value)}
                                        placeholder="- Procesador Intel i9&#10;- 32GB RAM&#10;- 1TB SSD"
                                        rows={4}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Estas se muestran en la tarjeta del producto y resumen.</p>
                                </div>
                            </div>

                            {/* Especificaciones Técnicas Completas */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-sm text-muted-foreground border-b pb-2">Detalles Técnicos (Full Specs)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(specLabels).map(([key, label]) => (
                                        <div key={key}>
                                            <Label htmlFor={`spec-${key}`}>{label}</Label>
                                            <Input
                                                id={`spec-${key}`}
                                                value={fullSpecsData[key] || ''}
                                                onChange={(e) => updateFullSpec(key, e.target.value)}
                                                placeholder={`Especificación de ${label.toLowerCase()}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-6 border-t mt-auto flex justify-end gap-2 bg-background">
                        <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
                        <Button type="submit" onClick={handleSave}>Guardar Producto</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View Details Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detalles del Producto</DialogTitle>
                    </DialogHeader>
                    {currentProduct && (
                        <div className="grid gap-6 py-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                                {currentProduct.badge && (
                                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                        {currentProduct.badge}
                                    </div>
                                )}
                                <img
                                    src={currentProduct.image}
                                    alt={currentProduct.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{currentProduct.name}</h3>
                                    <p className="text-sm text-muted-foreground capitalize">{currentProduct.category}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex flex-col items-end">
                                        <h3 className="font-bold text-xl">${currentProduct.price.toLocaleString()}</h3>
                                        {currentProduct.originalPrice && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                ${currentProduct.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${currentProduct.stock < 5 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        Stock: {currentProduct.stock}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Descripción</h4>
                                <p className="text-sm text-muted-foreground">{currentProduct.description}</p>
                            </div>

                            {currentProduct.specs && currentProduct.specs.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Resumen</h4>
                                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                        {currentProduct.specs.map((spec, i) => (
                                            <li key={i}>{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {currentProduct.fullSpecs && Object.keys(currentProduct.fullSpecs).length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Especificaciones Técnicas</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {Object.entries(currentProduct.fullSpecs).map(([key, value]) => (
                                            <div key={key} className="flex flex-col p-2 bg-muted/30 rounded">
                                                <span className="text-muted-foreground text-xs font-medium uppercase">{specLabels[key] || key}</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsViewOpen(false)}>Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Alert */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
                            <span className="font-medium text-foreground"> {currentProduct?.name} </span>
                            de tu inventario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
