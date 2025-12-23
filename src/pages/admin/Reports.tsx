import React, { useState } from 'react';
import { SalesSection } from '@/components/admin/SalesSection';
import { salesData } from '@/data/sales';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Componente para el gráfico de ventas
const SalesChart = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // Precios de ejemplo para calcular montos
    const getRandomPrice = () => Math.floor(Math.random() * 900) + 100; // Precios entre 100 y 1000

    // Generar datos de ventas simuladas
    const generateSalesData = () => {
        const daysWithSales = [];
        const daysToShow = 7; // Mostrar los últimos 7 días

        for (let i = daysToShow - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const day = date.getDate();
            const dayOfWeek = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            if (month === currentMonth && year === currentYear && day <= currentDay) {
                const baseSales = Math.floor(Math.random() * 20) + 5;
                const sales = dayOfWeek === 0 || dayOfWeek === 6 ?
                    Math.floor(baseSales * 1.5) : baseSales;

                const price = getRandomPrice();
                const amount = sales * price;

                daysWithSales.push({
                    day: day.toString(),
                    sales,
                    amount,
                    isToday: day === currentDay,
                    dayName: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][dayOfWeek],
                    fullDate: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
                    dateKey: date.toISOString().split('T')[0]
                });
            }
        }

        return daysWithSales;
    };

    const data = generateSalesData();
    const maxAmount = Math.max(...data.map(d => d.amount), 1000);

    // Componente personalizado para el punto del día actual
    const CustomDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (payload.isToday) {
            return (
                <g>
                    <circle cx={cx} cy={cy} r={8} fill="#3b82f6" fillOpacity={0.2} />
                    <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />
                </g>
            );
        }
        return null;
    };

    // Formatear el tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg text-sm">
                    <p className="font-medium">{data.dayName} {data.day}</p>
                    <p className="text-primary font-semibold">{data.sales} ventas</p>
                    <p className="text-green-600 font-semibold">
                        ${data.amount.toLocaleString('es-ES')}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Formatear valores del eje Y (monto en dinero)
    const formatAmount = (tick: number): string => {
        if (tick >= 1000000) return `$${(tick / 1000000).toFixed(1)}M`;
        if (tick >= 1000) return `$${(tick / 1000).toFixed(0)}K`;
        return `$${tick}`;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                {/* Eje X - Días */}
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickMargin={10}
                    tickFormatter={(value, index) => {
                        const day = data[index]?.day || '';
                        const dayName = data[index]?.dayName || '';
                        return `${day} ${dayName}`.trim();
                    }}
                    padding={{ left: 20, right: 20 }}
                />

                {/* Eje Y - Monto en dinero */}
                <YAxis
                    orientation="left"
                    stroke="#10b981"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#10b981' }}
                    domain={[0, maxAmount * 1.1]}
                    tickFormatter={formatAmount}
                    width={70}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Línea de monto */}
                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={<CustomDot />}
                    activeDot={{ r: 8, fill: '#3b82f6' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default function AdminReports() {
    const currentMonthRevenue = salesData
        .filter(sale => {
            const d = new Date(sale.date);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-medium">Ventas Diarias - {new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()}</h4>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">Ver por:</span>
                                <select className="text-sm bg-muted/50 border border-border rounded-md px-3 py-1.5">
                                    <option>Día</option>
                                    <option>Semana</option>
                                    <option>Mes</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <SalesChart />
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <h4 className="font-medium mb-6">Productos más vendidos</h4>
                        <div className="space-y-4">
                            {[
                                {
                                    name: 'TITAN RTX 4090',
                                    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                                    sales: 80
                                },
                                {
                                    name: 'Intel i9-13900K',
                                    image: 'https://images.unsplash.com/photo-1587202372775-e229f1725510?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                                    sales: 70
                                },
                                {
                                    name: 'Samsung 2TB NVMe',
                                    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                                    sales: 60
                                },
                                {
                                    name: 'Corsair 32GB DDR5',
                                    image: 'https://images.unsplash.com/photo-1587202372775-e229f1725510?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                                    sales: 50
                                },
                                {
                                    name: 'NZXT H7 Flow',
                                    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                                    sales: 40
                                }
                            ].map((product, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-10 h-10 rounded-md bg-muted/50 mr-3 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://via.placeholder.com/40';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{product.name}</p>
                                        <div className="w-full bg-muted/30 h-2 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${product.sales}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-4 text-right">
                                        <p className="text-sm font-bold">{product.sales}</p>
                                        <p className="text-xs text-muted-foreground">ventas</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Gráfico Circular y Resumen */}
                <div className="space-y-6">
                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <h4 className="font-medium mb-6">Distribución por Categoría</h4>
                        <div className="h-64 w-full flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Producto A', value: 35, fill: '#FF6B6B' },
                                            { name: 'Producto B', value: 25, fill: '#4ECDC4' },
                                            { name: 'Producto C', value: 20, fill: '#45B7D1' },
                                            { name: 'Producto D', value: 15, fill: '#96CEB4' },
                                            { name: 'Otros', value: 5, fill: '#FFEEAD' }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {[
                                            { name: 'Producto A', value: 35, fill: '#FF6B6B' },
                                            { name: 'Producto B', value: 25, fill: '#4ECDC4' },
                                            { name: 'Producto C', value: 20, fill: '#45B7D1' },
                                            { name: 'Producto D', value: 15, fill: '#96CEB4' },
                                            { name: 'Otros', value: 5, fill: '#FFEEAD' }
                                        ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {[
                                { name: 'Producto A', value: '35%', color: '#FF6B6B' },
                                { name: 'Producto B', value: '25%', color: '#4ECDC4' },
                                { name: 'Producto C', value: '20%', color: '#45B7D1' },
                                { name: 'Otros', value: '20%', color: '#96CEB4' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                        <span className="text-muted-foreground">{item.name}</span>
                                    </div>
                                    <span className="font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 rounded-xl p-6">
                        <h4 className="font-medium mb-4">Resumen de Objetivos</h4>
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-sm font-medium text-muted-foreground mb-1">Ventas Mensuales</h5>
                                <div className="text-3xl font-bold">
                                    ${currentMonthRevenue.toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Total acumulado este mes
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
