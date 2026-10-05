import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { SIGIL_CROSS_PATH } from '../../lib/sigils';

export function Cursor() {
  const sigilRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const sigil = sigilRef.current;
    const ring = ringRef.current;
    if (!sigil || !ring) return;

    const xToSigil = gsap.quickTo(sigil, 'x', { duration: 0.04, ease: 'power2.out' });
    const yToSigil = gsap.quickTo(sigil, 'y', { duration: 0.04, ease: 'power2.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.24, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.24, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToSigil(e.clientX);
      yToSigil(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Central Red Cybersigil Cross (Scales down slightly on grab) */}
      <div
        ref={sigilRef}
        className={`fixed top-0 left-0 -ml-3 -mt-3 w-6 h-6 pointer-events-none transition-transform duration-100 ${
          isMouseDown ? 'scale-75' : 'scale-100'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <svg viewBox="0 0 60 60" className="w-full h-full fill-[#8c0a14]">
          <path d={SIGIL_CROSS_PATH} />
        </svg>
      </div>

      {/* Trailing Ring (Expands on hover, contracts sharply on grab) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ${
          isMouseDown
            ? 'w-5 h-5 -ml-2.5 -mt-2.5 border border-[#8c0a14] bg-[#8c0a14]/20'
            : isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border border-[#8c0a14] scale-125 shadow-[0_0_12px_rgba(140,10,20,0.5)]'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#6f6f73]/50 scale-100'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
}
