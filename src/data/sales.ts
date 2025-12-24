export interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  customer: string;
  items: SaleItem[];
  total: number;
  date: Date;
  status: 'completed' | 'pending' | 'shipped' | 'cancelled';
}

// Datos de ejemplo de ventas
const generateMockSales = (): Sale[] => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentYear = new Date().getFullYear();
  const sales: Sale[] = [];

  // Generar ventas para los últimos 6 meses
  for (let month = 0; month < 6; month++) {
    const salesCount = Math.floor(Math.random() * 10) + 5; // Entre 5 y 15 ventas por mes

    for (let i = 0; i < salesCount; i++) {
      const day = Math.floor(Math.random() * 28) + 1; // Día del mes
      const saleDate = new Date(currentYear, 5 - month, day); // Últimos 6 meses
      const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 productos por venta

      const items: SaleItem[] = [];
      let total = 0;

      for (let j = 0; j < itemCount; j++) {
        const price = Math.floor(Math.random() * 900) + 100; // Precio entre 100 y 1000
        const quantity = Math.floor(Math.random() * 2) + 1; // 1-3 unidades
        items.push({
          id: `item-${i}-${j}`,
          name: `Producto ${String.fromCharCode(65 + j)}`,
          price,
          quantity
        });
        total += price * quantity;
      }

      const statuses: ('completed' | 'pending' | 'shipped' | 'cancelled')[] = ['completed', 'pending', 'shipped', 'cancelled'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      sales.push({
        id: `SALE-${months[5 - month].substring(0, 3).toUpperCase()}${100 + i}`,
        customer: `Cliente ${String.fromCharCode(65 + i)}`,
        items,
        total,
        date: saleDate,
        status
      });
    }
  }

  return sales.sort((a, b) => b.date.getTime() - a.date.getTime()); // Ordenar por fecha más reciente
};

export const salesData = generateMockSales();

// Función para obtener ventas agrupadas por mes
export const getSalesByMonth = () => {
  const salesByMonth: Record<string, { sales: Sale[]; total: number }> = {};
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  salesData.forEach(sale => {
    const month = months[sale.date.getMonth()];
    const year = sale.date.getFullYear();
    const key = `${month} ${year}`;

    if (!salesByMonth[key]) {
      salesByMonth[key] = { sales: [], total: 0 };
    }

    salesByMonth[key].sales.push(sale);
    salesByMonth[key].total += sale.total;
  });

  return salesByMonth;
};

// Función para obtener estadísticas de ventas por mes
export const getMonthlyStats = () => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Obtener los últimos 6 meses
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((currentMonth - i) / 12);
    last6Months.push({ month, year, name: `${months[month]} ${year}` });
  }

  // Calcular totales por mes
  const monthlyData = last6Months.map(({ month, year, name }) => {
    const monthSales = salesData.filter(sale =>
      sale.date.getMonth() === month && sale.date.getFullYear() === year
    );

    const total = monthSales.reduce((sum, sale) => sum + sale.total, 0);
    const orderCount = monthSales.length;
    const averageOrder = orderCount > 0 ? total / orderCount : 0;

    return {
      name,
      month,
      year,
      total,
      orderCount,
      averageOrder
    };
  });

  return monthlyData;
};
