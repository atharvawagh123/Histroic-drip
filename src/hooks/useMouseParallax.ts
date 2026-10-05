import { useEffect, useRef } from 'react';

export interface MouseCoords {
  x: number; // -1 to 1
  y: number; // -1 to 1
  rawX: number;
  rawY: number;
}

export function useMouseParallax(disabled = false) {
  const mouseRef = useRef<MouseCoords>({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;
      mouseRef.current.x = (e.clientX - halfW) / halfW;
      mouseRef.current.y = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disabled]);

  return mouseRef;
}
