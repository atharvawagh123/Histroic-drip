import { useState } from 'react';
import { ShieldCheck, ArrowRight, X } from 'lucide-react';
import { sound } from '../../lib/audio';

const SIZES = ['39', '40', '41', '42', '43', '44', '45', '46'];

export function CTA() {
  const [selectedSize, setSelectedSize] = useState('42');
  const [isReserved, setIsReserved] = useState(false);

  const handleSizeClick = (size: string) => {
    sound.playHover();
    setSelectedSize(size);
  };

  const handleCommission = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setIsReserved(true);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      (window as any).lenis?.scrollTo?.(heroEl, { duration: 1.6 });
    }
  };

  return (
    <section
      id="cta"
      className="relative min-h-screen h-screen flex flex-col justify-between pt-24 pb-6 px-6 sm:px-10 md:px-14 select-none pointer-events-none"
    >
      {/* ── TOP SECTION BADGE (MINIMAL) ──────────────────── */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#303033]/60 bg-[#070709]/70 text-[8px] font-bootzy tracking-ultra text-[#8c0a14] uppercase">
          <span className="w-1 h-1 rounded-full bg-[#8c0a14] animate-ping" />
          <span>03 // FINAL ALLOCATION</span>
        </div>

        <div className="text-[8px] font-bootzy tracking-widest text-[#6f6f73]">
          EDITION 142 / 300
        </div>
      </div>

      {/* ── SNEAKER IS FULLY UNOBSTRUCTED — TINY DOCKED CARD ON RIGHT ── */}
      <div className="w-full flex items-center justify-end my-auto pointer-events-auto pr-2 sm:pr-8">
        {/* ULTRA-COMPACT MICRO ORDER DOCK */}
        <div className="w-60 p-3.5 rounded-lg border border-[#303033]/80 bg-[#08080c]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 z-20">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-bootzy tracking-ultra text-[#8c0a14] uppercase font-bold">
              SS/26 ARCHIVE
            </span>
            <span className="text-[8px] font-bootzy text-[#e8e4dc] font-bold">
              $480 USD
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black font-bootzy text-[#e8e4dc] tracking-tight">
              ACQUIRE PAIR
            </h2>
            <span className="text-[8px] font-bootzy text-[#6f6f73]">EU {selectedSize}</span>
          </div>

          {/* Allocation Bar */}
          <div className="w-full h-1 bg-[#141418] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8c0a14] to-[#e8e4dc]"
              style={{ width: '47%' }}
            />
          </div>

          {/* Micro Size Grid */}
          <div className="grid grid-cols-4 gap-1 pt-0.5">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeClick(size)}
                  className={`py-1 rounded text-[8px] font-bootzy font-bold tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8c0a14] text-white shadow-[0_0_8px_rgba(140,10,20,0.6)] border border-[#8c0a14]'
                      : 'bg-[#101015] text-[#8e8b83] hover:text-white border border-[#232328]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Single Action Button */}
          <button
            onClick={handleCommission}
            onMouseEnter={() => sound.playHover()}
            className="w-full mt-1 py-2 bg-[#8c0a14] hover:bg-[#a60d19] text-[#e8e4dc] font-bootzy text-[9px] tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(140,10,20,0.5)] flex items-center justify-center gap-1.5 sigil-cut cursor-pointer"
          >
            <span>COMMISSION</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* ── MINIMAL FOOTER ───────────────────────────────── */}
      <footer className="w-full flex items-center justify-between text-[8px] font-bootzy tracking-widest text-[#6f6f73] uppercase pointer-events-auto border-t border-[#303033]/30 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 bg-[#8c0a14] rounded-full" />
          <span>© 2026 HISTROIC-DRIP</span>
        </div>

        <div className="flex items-center gap-3">
          <a href="#hero" onClick={scrollToTop} className="hover:text-[#e8e4dc] transition-colors">
            TOP
          </a>
          <span className="text-[#303033]">•</span>
          <a href="mailto:atelier@historic-drip.com" className="hover:text-[#e8e4dc] transition-colors">
            INQUIRE
          </a>
        </div>
      </footer>

      {/* ── SUCCESS MODAL ─────────────────────────────────── */}
      {isReserved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md pointer-events-auto">
          <div className="relative max-w-xs w-full p-5 rounded-lg border border-[#8c0a14] bg-[#08080b] shadow-[0_0_35px_rgba(140,10,20,0.6)] flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsReserved(false)}
              className="absolute top-2.5 right-2.5 text-[#6f6f73] hover:text-white p-1 cursor-pointer"
            >
              <X size={14} />
            </button>

            <div className="w-8 h-8 rounded-full bg-[#8c0a14]/20 border border-[#8c0a14] flex items-center justify-center text-[#8c0a14]">
              <ShieldCheck size={16} />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-bootzy tracking-ultra text-[#8c0a14] uppercase font-bold">
                COMMISSION ALLOCATED
              </span>
              <h3 className="text-base font-black font-bootzy text-[#e8e4dc]">
                EU {selectedSize} RESERVED
              </h3>
            </div>

            <p className="text-[10px] font-bootzy text-[#8e8b83]">
              Assigned token <strong className="text-[#e8e4dc]">#HDRIP-0143</strong>. Encrypted session dispatch initiated.
            </p>

            <button
              onClick={() => setIsReserved(false)}
              className="w-full py-2 bg-[#8c0a14] hover:bg-[#a60d19] text-white text-[9px] font-bootzy tracking-widest uppercase font-bold rounded sigil-cut transition-all cursor-pointer"
            >
              RETURN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
