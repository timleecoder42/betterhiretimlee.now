'use client';

import { useEffect, useRef, useState } from 'react';

export function PatternOverlay() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: 'center center',
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <div
        className="absolute inset-0 dark:opacity-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px',
        }}
      />
    </div>
  );
}
