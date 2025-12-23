import { useEffect, useRef } from 'react';

const brands = [
  { name: 'NVIDIA' },
  { name: 'AMD' },
  { name: 'Intel' },
  { name: 'ASUS' },
  { name: 'MSI' },
  { name: 'Corsair' },
  { name: 'Logitech' },
  { name: 'Razer' },
];

// Duplicate the brands for infinite effect
const duplicatedBrands = [...brands, ...brands, ...brands];

export function BrandsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSpeed = 1;
    let animationId: number;
    let position = 0;
    const containerWidth = container.scrollWidth / 3; // Because we've tripled the content

    const animate = () => {
      position += scrollSpeed;
      if (position >= containerWidth) {
        position = 0;
      }
      container.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Removed hover pause functionality

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <h3 className="mb-8 text-center text-xl font-semibold">
        TRABAJAMOS CON LAS MEJORES MARCAS
      </h3>
      
      <div className="relative h-24 w-full">
        <div 
          ref={containerRef}
          className="absolute left-0 top-0 flex h-full w-[300%] items-center gap-12 will-change-transform"
        >
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="flex h-16 shrink-0 items-center justify-center px-6"
            >
              <span className="text-lg font-semibold">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
