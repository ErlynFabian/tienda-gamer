import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit2, Trash2, Save, Cpu, MonitorSpeaker, MemoryStick, HardDrive, CircuitBoard, Zap, Box, Fan } from 'lucide-react';
import { pcComponents, PCComponent } from '@/data/products';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
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
import { toast } from 'sonner';

const categories = [
    { key: 'cpu', label: 'Procesador', icon: Cpu },
    { key: 'gpu', label: 'Gráfica', icon: MonitorSpeaker },
    { key: 'ram', label: 'RAM', icon: MemoryStick },
    { key: 'storage', label: 'Almacenamiento', icon: HardDrive },
    { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard },
    { key: 'psu', label: 'Fuente', icon: Zap },
    { key: 'case', label: 'Gabinete', icon: Box },
    { key: 'cooling', label: 'Cooling', icon: Fan },
];

export default function AdminBuilder() {
    const [activeTab, setActiveTab] = useState('cpu');
    const [components, setComponents] = useState<Record<string, PCComponent[]>>(pcComponents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<PCComponent | null>(null);
    const [formData, setFormData] = useState({ name: '', price: '' });
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleEdit = (item: PCComponent) => {
        setCurrentItem(item);
        setFormData({ name: item.name, price: item.price.toString() });
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setFormData({ name: '', price: '' });
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        const price = parseFloat(formData.price);
        if (!formData.name || isNaN(price)) return;

        const newItem: PCComponent = {
            id: currentItem ? currentItem.id : Date.now().toString(),
            category: activeTab as any,
            name: formData.name,
            price: price,
        };

        setComponents(prev => {
            const list = prev[activeTab] || [];
            if (currentItem) {
                return {
                    ...prev,
                    [activeTab]: list.map(i => i.id === currentItem.id ? newItem : i)
                };
            } else {
                return {
                    ...prev,
                    [activeTab]: [...list, newItem]
                };
            }
        });

        setIsDialogOpen(false);
        toast.success(currentItem ? 'Componente actualizado' : 'Componente agregado');
    };

    const handleDelete = () => {
        if (!deleteId) return;
        setComponents(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].filter(i => i.id !== deleteId)
        }));
        setDeleteId(null);
        toast.success('Componente eliminado');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Componente
                </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.key}
                            onClick={() => setActiveTab(cat.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${activeTab === cat.key
                                ? 'bg-primary/10 text-primary border-b-2 border-primary font-medium'
                                : 'text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-muted-foreground border-b border-border bg-muted/40">
                    <div className="col-span-6">Nombre</div>
                    <div className="col-span-3 text-right">Precio</div>
                    <div className="col-span-3 text-right">Acciones</div>
                </div>
                <div className="divide-y divide-border">
                    {components[activeTab]?.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/10 transition-colors">
                            <div className="col-span-6 font-medium">{item.name}</div>
                            <div className="col-span-3 text-right">${item.price.toLocaleString()}</div>
                            <div className="col-span-3 flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => setDeleteId(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {(!components[activeTab] || components[activeTab].length === 0) && (
                        <div className="p-8 text-center text-muted-foreground">
                            No hay componentes en esta categoría
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentItem ? 'Editar Componente' : 'Nuevo Componente'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej: Intel Core i5-13400F"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Precio</Label>
                            <Input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar componente?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. El componente será removido de la lista.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
