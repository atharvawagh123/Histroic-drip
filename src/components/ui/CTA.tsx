export function CTA() {
  return (
    <section
      id="cta"
      className="relative min-h-screen flex flex-col justify-end items-center pb-8 px-6 select-none pointer-events-none"
    >
      {/* Tiny Minimal Gothic Footer at the very bottom */}
      <footer className="w-full max-w-6xl mx-auto pt-6 border-t border-[#303033]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bootzy tracking-widest text-[#6f6f73] uppercase pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-[#8c0a14]" />
          <span>© 2026 HISTROIC-DRIP ATELIER</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-[#e8e4dc] transition-colors">
            RETURN
          </a>
          <span className="text-[#303033]">•</span>
          <span className="text-[#e8e4dc]">SS/26 EDITION OF 300</span>
          <span className="text-[#303033]">•</span>
          <a href="mailto:atelier@historic-drip.com" className="hover:text-[#e8e4dc] transition-colors">
            INQUIRE
          </a>
        </div>
      </footer>
    </section>
  );
}
