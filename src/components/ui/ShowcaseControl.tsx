import { useEffect, useState } from 'react';
import { Play, Pause, X, RotateCcw } from 'lucide-react';
import {
  sceneState,
  subscribeScene,
  toggleShowcase,
  setShowcaseMode,
  toggleShowcasePause,
  ShowcaseMode,
} from '../../lib/sceneState';
import { sound } from '../../lib/audio';

export function ShowcaseControl() {
  const [showcase, setShowcase] = useState({ ...sceneState.showcase });

  useEffect(() => {
    return subscribeScene(() => {
      setShowcase({ ...sceneState.showcase });
    });
  }, []);

  // Keyboard shortcut listener: ESC key stops showcase
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showcase.active) {
        e.preventDefault();
        sound.playClick();
        toggleShowcase(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showcase.active]);

  if (!showcase.active) {
    return null;
  }

  const modes: { id: ShowcaseMode; label: string }[] = [
    { id: 'orbit', label: '360° ORBIT' },
    { id: 'vamp', label: 'VAMP GRAFFITI' },
    { id: 'profile', label: 'PROFILE' },
    { id: 'sole', label: 'OBSIDIAN SOLE' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center pointer-events-auto select-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="relative p-1.5 rounded-full border border-[#8c0a14]/60 bg-[#08080c]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(140,10,20,0.4)] flex items-center gap-1.5 sm:gap-2">
        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1 bg-[#101015] p-1 rounded-full border border-[#232328]">
          {modes.map((m) => {
            const isCurrent = showcase.mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  setShowcaseMode(m.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bootzy tracking-wider uppercase transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#8c0a14] text-white font-bold shadow-[0_0_10px_rgba(140,10,20,0.6)]'
                    : 'text-[#6f6f73] hover:text-[#e8e4dc]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Orbit Pause / Play Toggle (Only relevant in orbit mode) */}
        {showcase.mode === 'orbit' && (
          <button
            onClick={() => {
              sound.playClick();
              toggleShowcasePause();
            }}
            onMouseEnter={() => sound.playHover()}
            title={showcase.isPaused ? 'Resume 360 rotation' : 'Pause rotation'}
            className="p-2 rounded-full bg-[#101015] hover:bg-[#1a1a22] text-[#e8e4dc] border border-[#232328] transition-colors cursor-pointer"
          >
            {showcase.isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        )}

        {/* Exit Showcase Button */}
        <button
          onClick={() => {
            sound.playClick();
            toggleShowcase(false);
          }}
          onMouseEnter={() => sound.playHover()}
          title="Exit 360 showcase (ESC)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e0508] hover:bg-[#8c0a14] text-[#e8e4dc] border border-[#8c0a14]/50 transition-colors text-[10px] font-bootzy tracking-wider uppercase cursor-pointer"
        >
          <X size={12} />
          <span className="hidden sm:inline">EXIT</span>
          <span className="text-[8px] text-[#6f6f73] ml-0.5">ESC</span>
        </button>
      </div>
    </div>
  );
}
