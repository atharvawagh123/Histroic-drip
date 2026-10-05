import { useEffect, useState, useCallback } from 'react';
import {
  sceneState,
  subscribeScene,
  toggleShowcase,
  setShowcaseMode,
} from '../../lib/sceneState';

export function ShowcaseControl() {
  const [showcase, setShowcase] = useState({ ...sceneState.showcase });
  // Hidden by default until user presses Alt + 1
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return subscribeScene(() => {
      setShowcase({ ...sceneState.showcase });
    });
  }, []);

  // Expose global trigger for devtools & accessibility
  useEffect(() => {
    (window as any).showAnimationButton = () => setIsVisible(true);
    (window as any).hideAnimationButton = () => {
      toggleShowcase(false);
      setIsVisible(false);
    };
    (window as any).toggleAnimationButton = () => {
      setIsVisible((prev) => {
        if (prev) {
          toggleShowcase(false);
          return false;
        }
        return true;
      });
    };
    return () => {
      delete (window as any).showAnimationButton;
      delete (window as any).hideAnimationButton;
      delete (window as any).toggleAnimationButton;
    };
  }, []);

  // Keyboard shortcut listener: ALT + 1 toggles show / disappear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isAlt1 = e.altKey && (e.key === '1' || e.code === 'Digit1' || e.keyCode === 49);

      if (isAlt1) {
        e.preventDefault();
        e.stopPropagation();
        // Only toggle button visibility — NEVER stop the animation
        setIsVisible((prev) => !prev);
        return;
      }

      // Escape key stops showcase and makes button disappear
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleShowcase(false);
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  const handleToggle = useCallback(() => {
    if (!showcase.active) {
      setShowcaseMode('orbit');
      toggleShowcase(true);
    } else {
      toggleShowcase(false);
    }
  }, [showcase.active]);

  // If not triggered by Alt + 1, do not render any UI (clean, zero clutter)
  if (!isVisible) {
    return null;
  }

  // Compact, sleek, minimal button (No big UI, no top banners)
  return (
    <div className="fixed bottom-7 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center pointer-events-auto select-none transition-all duration-300 animate-fadeIn">
      <div className="relative group">
        {/* Subtle ambient crimson glow */}
        <div className="absolute -inset-1 rounded-full bg-[#8c0a14]/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Minimal Button */}
        <button
          id="btn-start-animation"
          onClick={handleToggle}
          className={`relative px-5 py-2.5 rounded-full backdrop-blur-xl border flex items-center gap-2.5 text-xs font-bootzy tracking-widest uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)] cursor-pointer ${
            showcase.active
              ? 'bg-[#8c0a14]/20 border-[#8c0a14] text-[#ffffff] shadow-[0_0_20px_rgba(140,10,20,0.4)]'
              : 'bg-[#09090c]/90 border-[#303033] hover:border-[#8c0a14] text-[#e8e4dc] hover:text-[#ffffff]'
          }`}
          aria-label={showcase.active ? 'Stop Animation' : 'Start Animation'}
        >
          {/* Status Dot */}
          <span className="relative flex h-2 w-2">
            {showcase.active && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c0a14] opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8c0a14]" />
          </span>

          {/* Action Text */}
          <span className="font-bootzy">
            {showcase.active ? 'STOP ANIMATION' : 'START ANIMATION'}
          </span>

          {/* Keycap Badge */}
          <span className="text-[9px] font-bootzy text-[#6f6f73] border-l border-[#303033] pl-2 tracking-wider">
            {showcase.active ? 'ESC' : 'ALT+1'}
          </span>
        </button>
      </div>
    </div>
  );
}
