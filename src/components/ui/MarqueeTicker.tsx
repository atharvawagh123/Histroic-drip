export function MarqueeTicker() {
  const items = [
    'HISTROIC-DRIP',
    'SS/26 RUNWAY ARCHIVE',
    'HAND-SCREENED DALMATIAN CANVAS',
    'VULCANIZED WAFFLE CREPE',
    'LIMITED EDITION OF 300',
    'DREAM IN GOLD 2026',
    'ZERO COMPROMISE SPECIFICATION',
    'PARIS ATELIER PROVENANCE',
  ];

  const content = items.map((text, i) => (
    <span key={i} className="inline-flex items-center gap-6 mx-4">
      <span className="text-[#e8e4dc]/70 hover:text-[#e8e4dc] transition-colors tracking-widest uppercase">
        {text}
      </span>
      <span className="text-[#8c0a14] text-xs">◆</span>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden border-y border-[#303033]/40 bg-[#070709]/80 backdrop-blur-sm py-2.5 select-none pointer-events-auto">
      <div className="flex whitespace-nowrap animate-marquee font-bootzy text-[11px] font-medium tracking-widest text-[#6f6f73]">
        {content}
        {content}
      </div>
    </div>
  );
}
