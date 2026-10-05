export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen h-screen flex flex-col justify-center px-8 sm:px-14 md:px-20 select-none pointer-events-none"
    >
      {/* ── MINIMAL FAR-LEFT TYPOGRAPHY: 100% CLEAN ───────── */}
      <div className="w-64 sm:w-72 flex flex-col gap-2 z-20 pointer-events-auto">
        <span className="text-[9px] font-bootzy tracking-ultra text-[#8c0a14] uppercase font-bold">
          SS/26 ARCHIVE
        </span>

        <h1 className="text-4xl sm:text-5xl font-black font-bootzy tracking-tight text-[#e8e4dc] leading-[0.95]">
          DREAM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8e4dc] via-[#e8e4dc] to-[#8c0a14]">
            IN GOLD
          </span>
        </h1>

        <p className="text-[10px] font-bootzy text-[#8e8b83] leading-relaxed pt-1">
          16oz raw duck canvas, hand-screened graffiti art & vulcanized crepe sole.
        </p>

        <div className="flex items-center gap-2 pt-1 text-[9px] font-bootzy tracking-widest text-[#6f6f73]">
          <span className="text-[#e8e4dc] font-bold">$480 USD</span>
          <span>•</span>
          <span>EDITION OF 300</span>
        </div>
      </div>
    </section>
  );
}
