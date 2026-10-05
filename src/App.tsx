import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import { useScrollTimeline } from './hooks/useScrollTimeline';
import { useMedia } from './hooks/useMedia';
import { Scene } from './components/canvas/Scene';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { Detail } from './components/ui/Detail';
import { CTA } from './components/ui/CTA';
import { Cursor } from './components/ui/Cursor';
import { Preloader } from './components/ui/Preloader';
import { ShowcaseControl } from './components/ui/ShowcaseControl';

export default function App() {
  const { reducedMotion } = useMedia();

  // Ensure fresh page start at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize 3-section cinematic camera scroll timeline
  useScrollTimeline(!reducedMotion);

  // Synchronize smooth Lenis scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    // Global anchor click smooth handler via Lenis
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        const el = document.querySelector(target.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 });
        }
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      document.removeEventListener('click', handleAnchor);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [reducedMotion]);

  const handlePreloaderComplete = () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <div
      id="scroll-root"
      className="relative min-h-screen bg-[#050505] text-[#e8e4dc] selection:bg-[#8c0a14] selection:text-[#e8e4dc]"
    >
      {/* Cybersigil Custom Desktop Cursor */}
      <Cursor />

      {/* Stroke-by-Stroke Drawing Cybersigil Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* 3D Scene fixed behind content */}
      <Scene />

      {/* Interactive 360° Shoe Animation Showcase Button & Controls */}
      <ShowcaseControl />

      {/* Minimal Gothic Glass Navbar */}
      <Navbar />

      {/* 3 Short Cinematic Sections with Motion Graphics */}
      <main id="content-layer" className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Structural Detail */}
        <Detail />

        {/* Section 3: Call to Action & Minimal Footer */}
        <CTA />
      </main>
    </div>
  );
}
