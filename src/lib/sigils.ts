// Symmetrical Cybersigilism Vector Path Definitions (Barbed, Spiky, Razor-sharp)

export const SIGIL_HERO_PATHS = [
  // Central razor spire & spearhead
  "M 300 30 L 308 120 L 322 170 L 300 230 L 278 170 L 292 120 Z",
  "M 300 230 L 312 300 L 335 340 L 300 420 L 265 340 L 288 300 Z",
  "M 300 420 L 310 500 L 300 570 L 290 500 Z",

  // Outer primary arched barbed wings (Right side + Left side)
  // Right Wing Top
  "M 300 120 Q 380 90 460 50 Q 480 80 440 130 Q 380 160 322 170",
  "M 460 50 Q 530 30 570 10 Q 550 50 500 90 Q 450 120 440 130",
  "M 500 90 Q 560 110 590 140 Q 530 150 470 140",

  // Left Wing Top (Symmetrical reflection)
  "M 300 120 Q 220 90 140 50 Q 120 80 160 130 Q 220 160 278 170",
  "M 140 50 Q 70 30 30 10 Q 50 50 100 90 Q 150 120 160 130",
  "M 100 90 Q 40 110 10 140 Q 70 150 130 140",

  // Mid barbed claws (Right side)
  "M 322 170 Q 420 200 490 250 Q 440 265 380 240 Q 335 220 312 300",
  "M 490 250 Q 560 270 585 310 Q 520 315 450 280",
  "M 450 280 Q 510 330 530 380 Q 470 360 410 320",

  // Mid barbed claws (Left side)
  "M 278 170 Q 180 200 110 250 Q 160 265 220 240 Q 265 220 288 300",
  "M 110 250 Q 40 270 15 310 Q 80 315 150 280",
  "M 150 280 Q 90 330 70 380 Q 130 360 190 320",

  // Lower sweeping sickle thistles (Right side)
  "M 300 360 Q 390 410 440 480 Q 380 470 340 430 Q 315 400 300 420",
  "M 440 480 Q 480 540 510 590 Q 460 550 400 510",
  "M 340 430 Q 390 520 410 570 Q 360 525 320 470",

  // Lower sweeping sickle thistles (Left side)
  "M 300 360 Q 210 410 160 480 Q 220 470 260 430 Q 285 400 300 420",
  "M 160 480 Q 120 540 90 590 Q 140 550 200 510",
  "M 260 430 Q 210 520 190 570 Q 240 525 280 470",

  // Concentric barbed halo spikes
  "M 200 300 A 100 100 0 0 1 400 300",
  "M 220 300 A 80 80 0 0 1 380 300",
  "M 300 200 L 300 180 M 300 400 L 300 420 M 200 300 L 180 300 M 400 300 L 420 300"
];

// Horizontal Barbed Divider (Symmetrical 400x40)
export const SIGIL_DIVIDER_PATH =
  "M 0 20 L 120 20 L 140 14 L 160 20 L 180 10 L 195 24 L 200 6 L 205 24 L 220 10 L 240 20 L 260 14 L 280 20 L 400 20 M 180 20 L 190 28 L 200 34 L 210 28 L 220 20";

// Sharp Cybersigil Cross (60x60)
export const SIGIL_CROSS_PATH =
  "M 30 4 L 33 22 L 56 30 L 33 38 L 30 56 L 27 38 L 4 30 L 27 22 Z M 30 18 L 36 30 L 30 42 L 24 30 Z";
