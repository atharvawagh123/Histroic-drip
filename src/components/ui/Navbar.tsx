import { SIGIL_DIVIDER_PATH } from '../../lib/sigils';

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 md:px-12 py-5 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Gothic Wordmark Logo: HISTROIC-DRIP */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href="#hero"
            className="font-bootzy text-2xl sm:text-3xl tracking-wider text-[#e8e4dc] hover:text-[#8c0a14] transition-colors"
          >
            HISTROIC-DRIP
          </a>
          <span className="text-[10px] font-bootzy tracking-widest text-[#6f6f73] uppercase pt-1 border-l border-[#303033] pl-2.5">
            SS/26
          </span>
        </div>

        {/* Center Symmetrical Barbed Sigil Ornament */}
        <div className="hidden lg:block w-64 h-5 opacity-30 pointer-events-none">
          <svg viewBox="0 0 400 40" className="w-full h-full fill-none stroke-[#6f6f73] stroke-[1]">
            <path d={SIGIL_DIVIDER_PATH} />
          </svg>
        </div>

        {/* Right Limited Edition Archive Counter & Acquire Button */}
        <div className="flex items-center gap-4 text-[11px] font-bootzy tracking-widest text-[#e8e4dc]/80 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c0a14] animate-pulse" />
            <span className="text-[#6f6f73]">EDITION:</span>
            <span className="text-[#e8e4dc]">300</span>
          </div>

          <a
            href="#cta"
            className="px-3.5 py-1 border border-[#303033] hover:border-[#8c0a14] hover:text-[#ffffff] text-[#e8e4dc] text-[10px] font-bootzy tracking-widest uppercase transition-colors"
          >
            ACQUIRE
          </a>
        </div>
      </div>
    </header>
  );
}
