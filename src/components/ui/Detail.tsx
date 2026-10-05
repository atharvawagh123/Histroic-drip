import { useState } from 'react';
import { Crosshair, Eye, ShieldCheck, Cpu } from 'lucide-react';
import { setShowcaseMode, toggleShowcase, ShowcaseMode } from '../../lib/sceneState';
import { sound } from '../../lib/audio';

export function Detail() {
  const [activeZone, setActiveZone] = useState<ShowcaseMode>('vamp');

  const handleFocus = (mode: ShowcaseMode) => {
    sound.playClick();
    setActiveZone(mode);
    setShowcaseMode(mode);
    toggleShowcase(true);
  };

  return (
    <section
      id="detail"
      className="relative min-h-screen h-screen flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 md:px-14 select-none pointer-events-none"
    >
      {/* ── SECTION HEADER (MINIMAL, TOP-LEFT) ────────────── */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 text-xs font-bootzy tracking-ultra text-[#8c0a14] uppercase">
          <Crosshair size={12} className="text-[#8c0a14] animate-spin" style={{ animationDuration: '14s' }} />
          <span>02 // ANATOMY SPECIFICATIONS</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
          <span>SELECT ZONE TO INSPECT DETAILS</span>
        </div>
      </div>

      {/* ── SIDE-ANCHORED CARDS: SNEAKER FLOATS UNTOUCHED IN CENTER ── */}
      <div className="w-full flex items-center justify-between my-auto">
        {/* LEFT SIDE CARDS (Specs 01 & 02) */}
        <div className="w-64 sm:w-72 flex flex-col gap-3.5 pointer-events-auto z-20">
          {/* Spec 01: Vamp */}
          <div
            className={`p-3.5 rounded-lg border backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 ${
              activeZone === 'vamp'
                ? 'bg-[#09090c]/90 border-[#8c0a14] shadow-[0_0_20px_rgba(140,10,20,0.35)]'
                : 'bg-[#07070a]/75 border-[#26262d] hover:border-[#6f6f73]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bootzy tracking-widest text-[#8c0a14] uppercase font-bold">
                01 // FOREFOOT
              </span>
              <span className="text-[9px] font-bootzy text-[#e8e4dc]">16OZ CANVAS</span>
            </div>
            <h3 className="text-xs font-bold font-bootzy text-[#e8e4dc] tracking-wider">
              HAND-SCREENED VAMP
            </h3>
            <p className="text-[10px] font-bootzy text-[#8e8b83] leading-relaxed">
              Raw duck canvas with 'DREAM IN GOLD' blood-red graffiti pigment.
            </p>
            <button
              onClick={() => handleFocus('vamp')}
              onMouseEnter={() => sound.playHover()}
              className={`mt-1 py-1.5 px-2.5 rounded border text-[8px] font-bootzy tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeZone === 'vamp'
                  ? 'bg-[#8c0a14] border-[#8c0a14] text-white shadow-[0_0_10px_rgba(140,10,20,0.5)]'
                  : 'bg-[#101015]/60 border-[#26262d] hover:border-[#8c0a14] text-[#a3a099] hover:text-white'
              }`}
            >
              <Eye size={10} className={activeZone === 'vamp' ? 'text-white' : 'text-[#8c0a14]'} />
              <span>FOCUS VAMP MACRO</span>
            </button>
          </div>

          {/* Spec 02: Dalmatian Quarter */}
          <div
            className={`p-3.5 rounded-lg border backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 ${
              activeZone === 'profile'
                ? 'bg-[#09090c]/90 border-[#8c0a14] shadow-[0_0_20px_rgba(140,10,20,0.35)]'
                : 'bg-[#07070a]/75 border-[#26262d] hover:border-[#6f6f73]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bootzy tracking-widest text-[#8c0a14] uppercase font-bold">
                02 // LATERAL
              </span>
              <span className="text-[9px] font-bootzy text-[#e8e4dc]">380 GSM</span>
            </div>
            <h3 className="text-xs font-bold font-bootzy text-[#e8e4dc] tracking-wider">
              DALMATIAN HIDE & PIPING
            </h3>
            <p className="text-[10px] font-bootzy text-[#8e8b83] leading-relaxed">
              Tactile spotted print collar framed with blood-crimson nylon piping.
            </p>
            <button
              onClick={() => handleFocus('profile')}
              onMouseEnter={() => sound.playHover()}
              className={`mt-1 py-1.5 px-2.5 rounded border text-[8px] font-bootzy tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeZone === 'profile'
                  ? 'bg-[#8c0a14] border-[#8c0a14] text-white shadow-[0_0_10px_rgba(140,10,20,0.5)]'
                  : 'bg-[#101015]/60 border-[#26262d] hover:border-[#8c0a14] text-[#a3a099] hover:text-white'
              }`}
            >
              <Eye size={10} className={activeZone === 'profile' ? 'text-white' : 'text-[#8c0a14]'} />
              <span>FOCUS PROFILE MACRO</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CARD (Spec 03: Sole & Foundation) */}
        <div className="hidden md:flex w-64 sm:w-72 flex-col gap-3.5 pointer-events-auto z-20">
          <div
            className={`p-3.5 rounded-lg border backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 ${
              activeZone === 'sole'
                ? 'bg-[#09090c]/90 border-[#8c0a14] shadow-[0_0_20px_rgba(140,10,20,0.35)]'
                : 'bg-[#07070a]/75 border-[#26262d] hover:border-[#6f6f73]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bootzy tracking-widest text-[#8c0a14] uppercase font-bold">
                03 // FOUNDATION
              </span>
              <span className="text-[9px] font-bootzy text-[#e8e4dc]">65 SHORE A</span>
            </div>
            <h3 className="text-xs font-bold font-bootzy text-[#e8e4dc] tracking-wider">
              VULCANIZED OBSIDIAN SOLE
            </h3>
            <p className="text-[10px] font-bootzy text-[#8e8b83] leading-relaxed">
              Autoclave-cured rubber foxing tape with razor textured bumper and waffle tread.
            </p>
            <button
              onClick={() => handleFocus('sole')}
              onMouseEnter={() => sound.playHover()}
              className={`mt-1 py-1.5 px-2.5 rounded border text-[8px] font-bootzy tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeZone === 'sole'
                  ? 'bg-[#8c0a14] border-[#8c0a14] text-white shadow-[0_0_10px_rgba(140,10,20,0.5)]'
                  : 'bg-[#101015]/60 border-[#26262d] hover:border-[#8c0a14] text-[#a3a099] hover:text-white'
              }`}
            >
              <Eye size={10} className={activeZone === 'sole' ? 'text-white' : 'text-[#8c0a14]'} />
              <span>FOCUS SOLE MACRO</span>
            </button>
          </div>

          {/* Micro Telemetry Box */}
          <div className="p-3 rounded border border-[#232328] bg-[#07070a]/60 backdrop-blur-md flex flex-col gap-1.5 text-[9px] font-bootzy text-[#6f6f73]">
            <div className="flex items-center justify-between text-[#e8e4dc]">
              <span className="flex items-center gap-1.5">
                <Cpu size={10} className="text-[#8c0a14]" />
                <span>NFC VERIFICATION</span>
              </span>
              <span className="text-[#8c0a14]">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CALIBRATION:</span>
              <span className="text-[#e8e4dc]">ATELIER PARIS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STATUS BAR ─────────────────────────────── */}
      <div className="w-full flex items-center justify-between pointer-events-auto pt-2 border-t border-[#303033]/30">
        <div className="flex items-center gap-2 text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
          <ShieldCheck size={11} className="text-[#8c0a14]" />
          <span>AUTHENTICATED ARCHIVAL SPECIFICATION</span>
        </div>

        <div className="text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
          SECTION 02 / 03
        </div>
      </div>
    </section>
  );
}
