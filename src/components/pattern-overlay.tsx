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
      className="absolute inset-0 w-full h-full pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:before:bg-[length:40px_40px] dark:before:bg-center"
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
    />
  );
}
