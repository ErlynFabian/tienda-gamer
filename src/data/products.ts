export interface Product {
  id: string;
  name: string;
  category: 'pc' | 'laptop' | 'accessory';
  price: number;
  originalPrice?: number;
  image: string;
  specs: string[];
  badge?: string;
  stock: number;
  featured?: boolean;
}

export interface PCComponent {
  id: string;
  category: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooling';
  name: string;
  price: number;
  image?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'TITAN RTX 4090',
    category: 'pc',
    price: 3499,
    originalPrice: 3999,
    image: '/placeholder.svg',
    specs: ['RTX 4090 24GB', 'Intel i9-14900K', '64GB DDR5', '2TB NVMe SSD'],
    badge: 'MÁS VENDIDA',
    stock: 3,
    featured: true,
  },
  {
    id: '2',
    name: 'PHANTOM RTX 4080',
    category: 'pc',
    price: 2499,
    originalPrice: 2799,
    image: '/placeholder.svg',
    specs: ['RTX 4080 16GB', 'AMD Ryzen 9 7950X', '32GB DDR5', '1TB NVMe SSD'],
    badge: 'OFERTA',
    stock: 5,
    featured: true,
  },
  {
    id: '3',
    name: 'STRIKER RTX 4070 Ti',
    category: 'pc',
    price: 1799,
    originalPrice: 1999,
    image: '/placeholder.svg',
    specs: ['RTX 4070 Ti 12GB', 'Intel i7-14700K', '32GB DDR5', '1TB NVMe SSD'],
    stock: 8,
    featured: true,
  },
  {
    id: '4',
    name: 'VORTEX RTX 4060',
    category: 'pc',
    price: 1199,
    image: '/placeholder.svg',
    specs: ['RTX 4060 8GB', 'AMD Ryzen 5 7600X', '16GB DDR5', '512GB NVMe SSD'],
    badge: 'POPULAR',
    stock: 12,
  },
  {
    id: '5',
    name: 'ASUS ROG Strix G18',
    category: 'laptop',
    price: 2299,
    originalPrice: 2599,
    image: '/placeholder.svg',
    specs: ['RTX 4070 8GB', 'Intel i9-13980HX', '32GB DDR5', '1TB SSD', '18" 240Hz'],
    badge: 'NUEVO',
    stock: 4,
    featured: true,
  },
  {
    id: '6',
    name: 'MSI Raider GE78',
    category: 'laptop',
    price: 2899,
    image: '/placeholder.svg',
    specs: ['RTX 4080 12GB', 'Intel i9-13950HX', '64GB DDR5', '2TB SSD', '17" 240Hz'],
    stock: 2,
  },
  {
    id: '7',
    name: 'Razer DeathAdder V3 Pro',
    category: 'accessory',
    price: 149,
    image: '/placeholder.svg',
    specs: ['30K DPI', '90 horas batería', '63g ultraligero', 'Wireless'],
    stock: 25,
  },
  {
    id: '8',
    name: 'Logitech G Pro X Superlight 2',
    category: 'accessory',
    price: 159,
    originalPrice: 179,
    image: '/placeholder.svg',
    specs: ['32K DPI', '95 horas batería', '60g ultraligero', 'LIGHTSPEED'],
    badge: 'TOP VENTAS',
    stock: 18,
  },
];

export const pcComponents: Record<string, PCComponent[]> = {
  cpu: [
    { id: 'cpu1', category: 'cpu', name: 'Intel Core i5-14600K', price: 319 },
    { id: 'cpu2', category: 'cpu', name: 'Intel Core i7-14700K', price: 419 },
    { id: 'cpu3', category: 'cpu', name: 'Intel Core i9-14900K', price: 589 },
    { id: 'cpu4', category: 'cpu', name: 'AMD Ryzen 5 7600X', price: 249 },
    { id: 'cpu5', category: 'cpu', name: 'AMD Ryzen 7 7800X3D', price: 449 },
    { id: 'cpu6', category: 'cpu', name: 'AMD Ryzen 9 7950X', price: 549 },
  ],
  gpu: [
    { id: 'gpu1', category: 'gpu', name: 'NVIDIA RTX 4060 8GB', price: 299 },
    { id: 'gpu2', category: 'gpu', name: 'NVIDIA RTX 4060 Ti 8GB', price: 399 },
    { id: 'gpu3', category: 'gpu', name: 'NVIDIA RTX 4070 12GB', price: 549 },
    { id: 'gpu4', category: 'gpu', name: 'NVIDIA RTX 4070 Ti 12GB', price: 799 },
    { id: 'gpu5', category: 'gpu', name: 'NVIDIA RTX 4080 16GB', price: 1199 },
    { id: 'gpu6', category: 'gpu', name: 'NVIDIA RTX 4090 24GB', price: 1599 },
  ],
  ram: [
    { id: 'ram1', category: 'ram', name: '16GB DDR5 5600MHz', price: 79 },
    { id: 'ram2', category: 'ram', name: '32GB DDR5 5600MHz', price: 139 },
    { id: 'ram3', category: 'ram', name: '32GB DDR5 6000MHz RGB', price: 179 },
    { id: 'ram4', category: 'ram', name: '64GB DDR5 5600MHz', price: 259 },
  ],
  storage: [
    { id: 'st1', category: 'storage', name: '512GB NVMe SSD', price: 49 },
    { id: 'st2', category: 'storage', name: '1TB NVMe SSD', price: 89 },
    { id: 'st3', category: 'storage', name: '2TB NVMe SSD', price: 159 },
    { id: 'st4', category: 'storage', name: '4TB NVMe SSD', price: 299 },
  ],
  motherboard: [
    { id: 'mb1', category: 'motherboard', name: 'ASUS ROG Strix B650-A', price: 229 },
    { id: 'mb2', category: 'motherboard', name: 'MSI MAG Z790 Tomahawk', price: 289 },
    { id: 'mb3', category: 'motherboard', name: 'ASUS ROG Maximus Z790', price: 599 },
  ],
  psu: [
    { id: 'psu1', category: 'psu', name: '650W 80+ Gold', price: 89 },
    { id: 'psu2', category: 'psu', name: '850W 80+ Gold', price: 129 },
    { id: 'psu3', category: 'psu', name: '1000W 80+ Platinum', price: 199 },
  ],
  case: [
    { id: 'case1', category: 'case', name: 'NZXT H5 Flow', price: 99 },
    { id: 'case2', category: 'case', name: 'Lian Li O11 Dynamic', price: 149 },
    { id: 'case3', category: 'case', name: 'Corsair 5000D RGB', price: 199 },
  ],
  cooling: [
    { id: 'cool1', category: 'cooling', name: 'Air Cooler 120mm', price: 39 },
    { id: 'cool2', category: 'cooling', name: 'AIO 240mm RGB', price: 99 },
    { id: 'cool3', category: 'cooling', name: 'AIO 360mm RGB', price: 159 },
  ],
};

export const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    avatar: '/placeholder.svg',
    rating: 5,
    text: 'Increíble servicio. Armaron mi PC exactamente como la pedí y la entrega fue super rápida. La atención por WhatsApp fue de 10.',
    product: 'TITAN RTX 4090',
  },
  {
    id: 2,
    name: 'María González',
    avatar: '/placeholder.svg',
    rating: 5,
    text: 'Primera vez comprando por WhatsApp y la experiencia fue perfecta. Me asesoraron muy bien y el precio fue mejor que en otras tiendas.',
    product: 'STRIKER RTX 4070 Ti',
  },
  {
    id: 3,
    name: 'Diego Ramírez',
    avatar: '/placeholder.svg',
    rating: 5,
    text: 'La laptop llegó en perfectas condiciones. El equipo de soporte me ayudó a elegir la mejor opción para mi presupuesto.',
    product: 'ASUS ROG Strix G18',
  },
];

export const brands = [
  'NVIDIA',
  'AMD',
  'Intel',
  'ASUS',
  'MSI',
  'Corsair',
  'Logitech',
  'Razer',
];

export const stats = {
  pcsSold: 2847,
  happyCustomers: 2654,
  yearsExperience: 8,
  rating: 4.9,
};
