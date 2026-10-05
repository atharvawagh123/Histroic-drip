import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, Compass, Shield, Activity, Sparkles } from 'lucide-react';
import { sceneState, subscribeScene, toggleShowcase } from '../../lib/sceneState';
import { sound } from '../../lib/audio';

export function MotionHUD() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProg, setScrollProg] = useState(0);
  const [soundOn, setSoundOn] = useState(sound.enabled);
  const [showcaseActive, setShowcaseActive] = useState(sceneState.showcase.active);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    return subscribeScene(() => {
      setActiveSection(sceneState.activeSection);
      setScrollProg(sceneState.scrollProgress);
      setShowcaseActive(sceneState.showcase.active);
    });
  }, []);

  // Simple FPS sample
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundOn(next);
  };

  const handleToggleShowcase = () => {
    sound.playClick();
    toggleShowcase();
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      (window as any).lenis?.scrollTo?.(el, { duration: 1.5 });
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* ── CORNER BRACKETS (CYBER HUD) ────────────────────── */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#8c0a14]/60" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#8c0a14]/60" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#8c0a14]/60" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#8c0a14]/60" />

      {/* ── TOP-LEFT TELEMETRY (under navbar) ─────────────── */}
      <div className="absolute top-20 left-6 md:left-12 hidden sm:flex flex-col gap-1 text-[9px] font-bootzy tracking-widest text-[#6f6f73] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8c0a14] animate-pulse" />
          <span className="text-[#e8e4dc]/80">ATELIER SYS // 0026-SS</span>
        </div>
        <div className="flex items-center gap-2 pl-3.5 border-l border-[#303033]">
          <span>GRID: 48°51'24"N 2°21'07"E</span>
        </div>
        <div className="flex items-center gap-2 pl-3.5 border-l border-[#303033]">
          <span>SPEC: ARCHIVAL SLIP-ON</span>
        </div>
      </div>

      {/* ── TOP-RIGHT CONTROL WIDGETS ──────────────────────── */}
      <div className="absolute top-5 right-6 md:right-12 flex items-center gap-2.5 pointer-events-auto">
        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          onMouseEnter={() => sound.playHover()}
          title={soundOn ? 'Mute sound effects' : 'Enable audio synthesizer'}
          className={`px-3 py-1.5 rounded border text-[10px] font-bootzy tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
            soundOn
              ? 'bg-[#8c0a14]/20 border-[#8c0a14] text-[#e8e4dc] shadow-[0_0_12px_rgba(140,10,20,0.4)]'
              : 'bg-[#09090c]/70 border-[#303033] hover:border-[#6f6f73] text-[#6f6f73] hover:text-[#e8e4dc]'
          }`}
        >
          {soundOn ? <Volume2 size={12} className="text-[#e8e4dc]" /> : <VolumeX size={12} />}
          <span className="hidden md:inline">{soundOn ? 'SFX: ON' : 'SFX: OFF'}</span>
        </button>

        {/* 360 Showcase Quick Trigger Button */}
        <button
          onClick={handleToggleShowcase}
          onMouseEnter={() => sound.playHover()}
          className={`px-3.5 py-1.5 rounded border text-[10px] font-bootzy tracking-widest uppercase transition-all duration-300 flex items-center gap-2 backdrop-blur-md cursor-pointer ${
            showcaseActive
              ? 'bg-[#8c0a14] border-[#8c0a14] text-white shadow-[0_0_20px_rgba(140,10,20,0.7)]'
              : 'bg-[#0b0b0e]/80 border-[#303033] hover:border-[#8c0a14] text-[#e8e4dc] hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
          }`}
        >
          <Eye size={12} className={showcaseActive ? 'animate-pulse text-white' : 'text-[#8c0a14]'} />
          <span>{showcaseActive ? 'EXIT 360°' : '360° SHOWCASE'}</span>
        </button>

        {/* FPS Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#303033]/60 bg-[#070709]/60 text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
          <Activity size={10} className="text-[#8c0a14]" />
          <span>{fps} FPS</span>
        </div>
      </div>

      {/* ── RIGHT-SIDE SECTION NAVIGATION DOCK (ULTRA-MINIMAL) ── */}
      <aside className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-4 pointer-events-auto">
        {[
          { id: 'hero', num: '01', index: 0 },
          { id: 'detail', num: '02', index: 1 },
          { id: 'cta', num: '03', index: 2 },
        ].map((item) => {
          const isActive = activeSection === item.index;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => sound.playHover()}
              title={`Section ${item.num}`}
              className="group flex items-center gap-2 cursor-pointer p-1"
            >
              <span
                className={`text-[8px] font-bootzy tracking-widest transition-all duration-200 ${
                  isActive
                    ? 'text-[#e8e4dc] font-bold'
                    : 'text-[#6f6f73] opacity-50 group-hover:opacity-100 group-hover:text-[#e8e4dc]'
                }`}
              >
                {item.num}
              </span>
              <div
                className={`h-4 transition-all duration-200 rounded-full ${
                  isActive
                    ? 'w-1 bg-[#8c0a14] shadow-[0_0_8px_#8c0a14]'
                    : 'w-[1px] bg-[#303033] group-hover:bg-[#6f6f73]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* ── BOTTOM-LEFT TELEMETRY HUD ───────────────────────── */}
      <div className="absolute bottom-6 left-6 md:left-12 hidden lg:flex flex-col gap-1.5 text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
        <div className="flex items-center gap-3">
          <Compass size={12} className="text-[#8c0a14] animate-spin" style={{ animationDuration: '24s' }} />
          <span>ORIENTATION: 360° CINEMATIC RUN</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PROGRESS:</span>
          <div className="w-24 h-1 bg-[#1a1a1d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8c0a14] to-[#e8e4dc]"
              style={{ width: `${Math.round(scrollProg * 100)}%` }}
            />
          </div>
          <span className="text-[#e8e4dc]">{Math.round(scrollProg * 100)}%</span>
        </div>
      </div>

      {/* ── BOTTOM-RIGHT LIMITED EDITION COUNTER ───────────── */}
      <div className="absolute bottom-6 right-6 md:right-12 hidden sm:flex items-center gap-3 text-[10px] font-bootzy tracking-widest text-[#6f6f73] bg-[#070709]/80 px-3.5 py-1.5 rounded border border-[#303033]/50 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8c0a14]" />
        <span className="text-[#e8e4dc]">EDITION: 142 / 300</span>
        <span className="text-[#303033]">|</span>
        <span className="text-[#a88a4a]">SS/26 ARCHIVE</span>
      </div>
    </div>
  );
}
