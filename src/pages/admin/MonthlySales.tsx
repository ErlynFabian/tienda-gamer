import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { salesData } from '@/data/sales';

export default function MonthlySales() {
  const { month, year } = useParams<{ month: string; year: string }>();
  
  // Filtrar ventas por mes y año
  const monthlySales = salesData.filter(sale => {
    const saleDate = new Date(sale.date);
    return (
      saleDate.getMonth() === parseInt(month || '0') &&
      saleDate.getFullYear() === parseInt(year || '2023')
    );
  });
  
  // Calcular totales
  const totalSales = monthlySales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItems = monthlySales.reduce((sum, sale) => 
    sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const monthName = month ? monthNames[parseInt(month)] : '';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/sales" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a ventas
          </Link>
          <h2 className="text-2xl font-bold">Ventas de {monthName} {year}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Ventas Totales</p>
          <h3 className="text-2xl font-bold mt-1">${totalSales.toLocaleString()}</h3>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Órdenes</p>
          <h3 className="text-2xl font-bold mt-1">{monthlySales.length}</h3>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Productos Vendidos</p>
          <h3 className="text-2xl font-bold mt-1">{totalItems}</h3>
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="font-medium">Ventas del Mes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Productos</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlySales.map((sale) => {
                const statusMap = {
                  'completed': { label: 'Completada', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
                  'pending': { label: 'Pendiente', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
                  'shipped': { label: 'Enviada', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
                };
                
                const status = statusMap[sale.status];
                const itemCount = sale.items.reduce((sum, item) => sum + item.quantity, 0);
                const saleDate = new Date(sale.date);
                const formattedDate = saleDate.toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                });
                
                return (
                  <tr key={sale.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{sale.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium mr-2">
                          {sale.customer.charAt(0)}
                        </div>
                        <span>{sale.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {itemCount} producto{itemCount !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      ${sale.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
