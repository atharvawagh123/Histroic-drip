export interface Colorway {
  id: string;
  name: string;
  code: string;
  tag: string;
  shoeColor: string;
  soleColor: string;
  accentColor: string;
  skyTop: string;
  skyMid: string;
  skyBottom: string;
  boulderTint: string;
  description: string;
  price: string;
}

export const COLORWAYS: Colorway[] = [
  {
    id: 'sand-yellow',
    name: 'Sand Dune 01',
    code: '#e8d98a',
    tag: 'OG HERITAGE',
    shoeColor: '#e8d98a',
    soleColor: '#f7edd2',
    accentColor: '#ffd166',
    skyTop: '#2a1245',
    skyMid: '#6b3fa0',
    skyBottom: '#b58ad8',
    boulderTint: '#c98f6b',
    description: 'Inspired by wind-carved desert quartz and twilight sands under low moonlight.',
    price: '$285'
  },
  {
    id: 'lilac-dusk',
    name: 'Lilac Horizon 02',
    code: '#b58ad8',
    tag: 'LIMITED DROP',
    shoeColor: '#b58ad8',
    soleColor: '#ded0ee',
    accentColor: '#f3c4fb',
    skyTop: '#1f0d38',
    skyMid: '#582b82',
    skyBottom: '#9b71bc',
    boulderTint: '#a4727e',
    description: 'Cool violet atmospheric tones capturing the serene chill of high desert afterglow.',
    price: '$295'
  },
  {
    id: 'midnight-rift',
    name: 'Midnight Rift 03',
    code: '#2d2738',
    tag: 'NOCTURNAL LAB',
    shoeColor: '#2b233a',
    soleColor: '#453c57',
    accentColor: '#6ee7b7',
    skyTop: '#0d0618',
    skyMid: '#24143a',
    skyBottom: '#4a3266',
    boulderTint: '#5f4b66',
    description: 'Stealth obsidian bio-polymer engineered for pitch-black astronomical running.',
    price: '$310'
  }
];

export interface FeatureCallout {
  id: string;
  title: string;
  subtitle: string;
  stat: string;
  description: string;
  coords: { x: number; y: number }; // Percentage for 2D UI line placement
  modelAnchor: [number, number, number]; // 3D world reference
}

export const FEATURE_CALLOUTS: FeatureCallout[] = [
  {
    id: 'cushioning',
    title: 'LunarFoam™ Core',
    subtitle: 'Zero-Gravity Response',
    stat: '84% Energy Return',
    description: 'Supercritical nitrogen-infused EVA midsole sculpted to absorb jagged desert impacts with buoyant rebound.',
    coords: { x: 22, y: 38 },
    modelAnchor: [-0.6, -0.4, 0.4]
  },
  {
    id: 'upper',
    title: 'Bio-Chitin Knit Upper',
    subtitle: 'Ultra-Breathable Cage',
    stat: '280g Featherweight',
    description: 'Seamless variable-density weave designed to seal out fine silica while channeling cold nocturnal airflow.',
    coords: { x: 74, y: 28 },
    modelAnchor: [0.3, 0.6, 0.1]
  },
  {
    id: 'traction',
    title: 'CraterGrip™ Outsole',
    subtitle: 'Multi-Directional Lug',
    stat: '4.5mm Geodesic Depth',
    description: 'Siped radial lug geometry mapped directly from lunar topography for unyielding friction on slick boulders.',
    coords: { x: 70, y: 68 },
    modelAnchor: [0.8, -0.5, 0.3]
  }
];

export const NAV_LINKS = [
  { label: 'Silhouette', href: '#hero' },
  { label: 'Architecture', href: '#details' },
  { label: 'Colorways', href: '#colorways' },
  { label: 'Expedition', href: '#story' },
  { label: 'Pre-Order', href: '#preorder' }
];

export const SIZES = ['US 7', 'US 8', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12', 'US 13'];

export const MARQUEE_ITEMS = [
  'DUSK RUNNER — 01 LUNAR SILHOUETTE',
  'GRAVITY IS OPTIONAL',
  'SUPERCRITICAL LUNARFOAM™',
  'CRATERGRIP™ 4.5MM OUTSOLE',
  'ENGINEERED FOR NOCTURNAL ENDURANCE',
  'SURREAL DESERT ARCHITECTURE',
  'DROP 01 // 500 PAIRS WORLDWIDE'
];
