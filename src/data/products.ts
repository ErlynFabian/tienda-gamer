// Product images
import pcTitan from '@/assets/products/pc-titan.jpg';
import pcPhantom from '@/assets/products/pc-phantom.jpg';
import pcStriker from '@/assets/products/pc-striker.jpg';
import pcVortex from '@/assets/products/pc-vortex.jpg';
import laptopRog from '@/assets/products/laptop-rog.jpg';
import laptopMsi from '@/assets/products/laptop-msi.jpg';
import mouseRazer from '@/assets/products/mouse-razer.jpg';
import mouseLogitech from '@/assets/products/mouse-logitech.jpg';

export interface Product {
  id: string;
  name: string;
  category: 'pc' | 'laptop' | 'accessory';
  price: number;
  originalPrice?: number;
  image: string;
  specs: string[];
  fullSpecs?: {
    processor?: string;
    graphics?: string;
    memory?: string;
    storage?: string;
    motherboard?: string;
    psu?: string;
    cooling?: string;
    case?: string;
    display?: string;
    connectivity?: string;
    weight?: string;
  };
  description: string;
  badge?: string;
  stock: number;
  featured?: boolean;
  gallery?: string[];
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
    image: pcTitan,
    specs: ['RTX 4090 24GB', 'Intel i9-14900K', '64GB DDR5', '2TB NVMe SSD'],
    fullSpecs: {
      processor: 'Intel Core i9-14900K (24 núcleos, hasta 6.0GHz)',
      graphics: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      memory: '64GB DDR5 5600MHz RGB (2x32GB)',
      storage: '2TB Samsung 990 Pro NVMe Gen4 SSD',
      motherboard: 'ASUS ROG Maximus Z790 Hero',
      psu: 'Corsair HX1200i 1200W 80+ Platinum',
      cooling: 'NZXT Kraken Z73 360mm AIO RGB',
      case: 'Lian Li O11 Dynamic EVO',
    },
    description: 'La bestia definitiva para gaming y creación de contenido. Con la RTX 4090 y el i9-14900K, no hay juego ni tarea que se le resista. Ideal para 4K gaming, streaming y renderizado profesional.',
    badge: 'MÁS VENDIDA',
    stock: 3,
    featured: true,
    gallery: [pcTitan, pcPhantom, pcStriker],
  },
  {
    id: '2',
    name: 'PHANTOM RTX 4080',
    category: 'pc',
    price: 2499,
    originalPrice: 2799,
    image: pcPhantom,
    specs: ['RTX 4080 16GB', 'AMD Ryzen 9 7950X', '32GB DDR5', '1TB NVMe SSD'],
    fullSpecs: {
      processor: 'AMD Ryzen 9 7950X (16 núcleos, hasta 5.7GHz)',
      graphics: 'NVIDIA GeForce RTX 4080 16GB GDDR6X',
      memory: '32GB DDR5 5600MHz RGB (2x16GB)',
      storage: '1TB WD Black SN850X NVMe Gen4 SSD',
      motherboard: 'ASUS ROG Crosshair X670E Hero',
      psu: 'EVGA SuperNOVA 1000W 80+ Gold',
      cooling: 'Corsair iCUE H150i Elite 360mm AIO',
      case: 'NZXT H7 Flow',
    },
    description: 'Rendimiento excepcional con el poder de AMD y NVIDIA. Perfecta para gaming competitivo en 1440p y 4K, con temperaturas óptimas y diseño espectacular.',
    badge: 'OFERTA',
    stock: 5,
    featured: true,
    gallery: [pcPhantom, pcTitan, pcVortex],
  },
  {
    id: '3',
    name: 'STRIKER RTX 4070 Ti',
    category: 'pc',
    price: 1799,
    originalPrice: 1999,
    image: pcStriker,
    specs: ['RTX 4070 Ti 12GB', 'Intel i7-14700K', '32GB DDR5', '1TB NVMe SSD'],
    fullSpecs: {
      processor: 'Intel Core i7-14700K (20 núcleos, hasta 5.6GHz)',
      graphics: 'NVIDIA GeForce RTX 4070 Ti 12GB GDDR6X',
      memory: '32GB DDR5 5200MHz (2x16GB)',
      storage: '1TB Kingston Fury Renegade NVMe SSD',
      motherboard: 'MSI MAG Z790 Tomahawk WiFi',
      psu: 'Corsair RM850x 850W 80+ Gold',
      cooling: 'be quiet! Dark Rock Pro 4',
      case: 'Fractal Design Meshify 2',
    },
    description: 'El balance perfecto entre precio y rendimiento. Diseño minimalista con componentes de alta gama para gaming fluido en 1440p con ray tracing.',
    stock: 8,
    featured: true,
    gallery: [pcStriker, pcPhantom, pcTitan],
  },
  {
    id: '4',
    name: 'VORTEX RTX 4060',
    category: 'pc',
    price: 1199,
    image: pcVortex,
    specs: ['RTX 4060 8GB', 'AMD Ryzen 5 7600X', '16GB DDR5', '512GB NVMe SSD'],
    fullSpecs: {
      processor: 'AMD Ryzen 5 7600X (6 núcleos, hasta 5.3GHz)',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      memory: '16GB DDR5 5200MHz (2x8GB)',
      storage: '512GB Crucial P5 Plus NVMe SSD',
      motherboard: 'ASUS TUF Gaming B650-PLUS WiFi',
      psu: 'Corsair CV650 650W 80+ Bronze',
      cooling: 'Cooler Master Hyper 212 RGB',
      case: 'NZXT H5 Flow',
    },
    description: 'Tu entrada al gaming de nueva generación. Ideal para 1080p con ray tracing y DLSS 3. Compacta, eficiente y lista para cualquier juego actual.',
    badge: 'POPULAR',
    stock: 12,
    featured: true,
    gallery: [pcVortex, pcStriker, pcPhantom],
  },
  {
    id: '5',
    name: 'ASUS ROG Strix G18',
    category: 'laptop',
    price: 2299,
    originalPrice: 2599,
    image: laptopRog,
    specs: ['RTX 4070 8GB', 'Intel i9-13980HX', '32GB DDR5', '1TB SSD', '18" 240Hz'],
    fullSpecs: {
      processor: 'Intel Core i9-13980HX (24 núcleos, hasta 5.6GHz)',
      graphics: 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB',
      memory: '32GB DDR5 4800MHz',
      storage: '1TB PCIe 4.0 NVMe M.2 SSD',
      display: '18" QHD+ 240Hz IPS, 100% DCI-P3, G-Sync',
      connectivity: 'WiFi 6E, Bluetooth 5.3, Thunderbolt 4',
      weight: '3.0 kg',
    },
    description: 'Potencia de escritorio en formato portátil. Pantalla de 18 pulgadas a 240Hz para gaming competitivo sin compromiso. Sistema de refrigeración avanzado ROG.',
    badge: 'NUEVO',
    stock: 4,
    featured: true,
    gallery: [laptopRog, laptopMsi],
  },
  {
    id: '6',
    name: 'MSI Raider GE78',
    category: 'laptop',
    price: 2899,
    image: laptopMsi,
    specs: ['RTX 4080 12GB', 'Intel i9-13950HX', '64GB DDR5', '2TB SSD', '17" 240Hz'],
    fullSpecs: {
      processor: 'Intel Core i9-13950HX (24 núcleos, hasta 5.5GHz)',
      graphics: 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB',
      memory: '64GB DDR5 5600MHz',
      storage: '2TB PCIe 4.0 NVMe M.2 SSD RAID',
      display: '17" UHD 144Hz Mini LED, 100% DCI-P3',
      connectivity: 'WiFi 6E, Bluetooth 5.3, Thunderbolt 4, HDMI 2.1',
      weight: '3.1 kg',
    },
    description: 'La laptop gaming más potente del mercado. RTX 4080 con pantalla Mini LED para colores increíbles. Para gamers y creadores que no aceptan límites.',
    stock: 2,
    featured: true,
    gallery: [laptopMsi, laptopRog],
  },
  {
    id: '7',
    name: 'Razer DeathAdder V3 Pro',
    category: 'accessory',
    price: 149,
    image: mouseRazer,
    specs: ['30K DPI', '90 horas batería', '63g ultraligero', 'Wireless'],
    fullSpecs: {
      connectivity: 'Razer HyperSpeed Wireless / Bluetooth',
      weight: '63 gramos',
    },
    description: 'El mouse ergonómico favorito de los profesionales, ahora inalámbrico y más ligero. Sensor Focus Pro 30K para precisión absoluta.',
    stock: 25,
    gallery: [mouseRazer, mouseLogitech],
  },
  {
    id: '8',
    name: 'Logitech G Pro X Superlight 2',
    category: 'accessory',
    price: 159,
    originalPrice: 179,
    image: mouseLogitech,
    specs: ['32K DPI', '95 horas batería', '60g ultraligero', 'LIGHTSPEED'],
    fullSpecs: {
      connectivity: 'LIGHTSPEED Wireless 2.4GHz',
      weight: '60 gramos',
    },
    description: 'El mouse más ligero de la historia de Logitech G. Usado por profesionales de esports en todo el mundo. Precisión y velocidad sin cables.',
    badge: 'TOP VENTAS',
    stock: 18,
    gallery: [mouseLogitech, mouseRazer],
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
