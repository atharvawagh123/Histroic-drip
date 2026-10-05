export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 md:px-14 py-5 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Minimal Gothic Wordmark Logo: HISTROIC-DRIP */}
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
      </div>
    </header>
  );
}
