import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { setIsLoaded } from '../../lib/sceneState';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const progressObj = { val: 0 };

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsDismissed(true);
            setIsLoaded(true);
            onComplete?.();
          },
        });
      },
    });

    tl.to(progressObj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.floor(progressObj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-bootzy text-4xl text-[#e8e4dc] tracking-widest tabular-nums">
          {percent.toString().padStart(2, '0')}
        </span>
        <div className="w-16 h-[1px] bg-[#8c0a14]" />
        <span className="text-[10px] font-bootzy tracking-ultra text-[#6f6f73] uppercase">
          HISTROIC-DRIP // SS/26
        </span>
      </div>
    </div>
  );
}
