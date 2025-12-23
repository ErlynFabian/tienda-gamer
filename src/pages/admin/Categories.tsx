import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminCategories() {
    const [categories, setCategories] = useState([
        { id: '1', name: 'Procesadores', count: 15 },
        { id: '2', name: 'Tarjetas Gráficas', count: 13 },
        { id: '3', name: 'Memorias RAM', count: 7 },
        { id: '4', name: 'Almacenamiento', count: 14 },
        { id: '5', name: 'Fuentes de Poder', count: 14 },
        { id: '6', name: 'Gabinetes', count: 8 },
        { id: '7', name: 'Refrigeración', count: 10 },
        { id: '8', name: 'Periféricos', count: 9 },
    ]);
    const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
    const [isCatDeleteOpen, setIsCatDeleteOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<{ id: string, name: string, count: number } | null>(null);
    const [catName, setCatName] = useState('');

    const openNewCategory = () => {
        setCurrentCategory(null);
        setCatName('');
        setIsCatDialogOpen(true);
    };

    const openEditCategory = (cat: any) => {
        setCurrentCategory(cat);
        setCatName(cat.name);
        setIsCatDialogOpen(true);
    };

    const handleDeleteCategory = () => {
        if (currentCategory) {
            setCategories(categories.filter(c => c.id !== currentCategory.id));
            setIsCatDeleteOpen(false);
        }
    };

    const handleSaveCategory = () => {
        if (currentCategory) {
            setCategories(categories.map(c => c.id === currentCategory.id ? { ...c, name: catName } : c));
        } else {
            setCategories([...categories, {
                id: Date.now().toString(),
                name: catName,
                count: 0
            }]);
        }
        setIsCatDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={openNewCategory}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nueva Categoría
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">{category.name}</h4>
                                <p className="text-sm text-muted-foreground">{category.count} productos</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => openEditCategory(category)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => { setCurrentCategory(category); setIsCatDeleteOpen(true); }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Productos por categoría</h4>
                    <span className="text-sm text-muted-foreground">Total: {products.length} productos</span>
                </div>
                <div className="h-64">
                    <div className="h-full flex items-end gap-4 px-4">
                        {['pc', 'laptop', 'accessory'].map((catId, i) => {
                            const count = products.filter(p => p.category === catId).length || 1;
                            const maxHeight = 180; // Altura máxima en píxeles

                            // Calcular el total de productos para la categoría actual
                            const categoryCounts = ['pc', 'laptop', 'accessory'].map(c =>
                                products.filter(p => p.category === c).length || 1
                            );
                            const maxCount = Math.max(...categoryCounts) || 1;
                            const height = (count / maxCount) * maxHeight;
                            const labels: Record<string, string> = { pc: 'PC de Escritorio', laptop: 'Laptops', accessory: 'Accesorios' };

                            return (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div className="text-center mb-2">
                                        <div className="text-lg font-bold">{count}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {products.length > 0 ? Math.round((count / products.length) * 100) : 0}%
                                        </div>
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-primary to-primary/80 rounded-t-md hover:opacity-90 transition-opacity"
                                        style={{
                                            height: `${Math.max(20, height)}px`,
                                            minHeight: '20px'
                                        }}
                                    />
                                    <span className="text-xs mt-2 text-muted-foreground text-center">{labels[catId]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Categories Dialogs */}
            <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
                        <DialogDescription>
                            {currentCategory ? 'Modifica el nombre de la categoría.' : 'Ingresa el nombre de la nueva categoría.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="catName" className="text-right">Nombre</Label>
                            <Input
                                id="catName"
                                value={catName}
                                onChange={(e) => setCatName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCatDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveCategory}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isCatDeleteOpen} onOpenChange={setIsCatDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará la categoría <span className="font-medium text-foreground">{currentCategory?.name}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteCategory} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
