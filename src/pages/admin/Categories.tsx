import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

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
