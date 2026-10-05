import { useState, useEffect } from 'react';

export function useMedia() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMedia);
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet, reducedMotion };
}
