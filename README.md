# NOCTURNE — SS/26 Archival Drop

A dark, luxurious, gothic + cybersigilism 3D sneaker landing showcase. Engineered with Vite, React 18, TypeScript, Three.js, React Three Fiber, Drei, Postprocessing, GSAP ScrollTrigger, and Lenis smooth scroll.

---

## Visual Direction & Palette
- **Void Background**: `#050505` to `#0b0b0c` with subtle atmospheric fog
- **Primary Typography**: Bone White `#e8e4dc`
- **Muted Elements / Lines**: Ash Grey `#6f6f73`
- **Single Accent**: Deep Blood Red `#8c0a14`
- **Secondary Detail**: Antique Tarnished Gold `#a88a4a`
- **Aesthetic**: Cold luxury, gothic blackletter, razor-sharp mathematical cybersigilism

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 3D Scene Architecture

```
src/
├── components/
│   ├── canvas/
│   │   ├── Scene.tsx           # Fullscreen R3F Canvas & Camera Controller
│   │   ├── CyberSigil.tsx      # Rotating blood-red razor-sharp vector emblem
│   │   ├── Sneaker.tsx         # GLTF loader with procedural gothic leather fallback
│   │   ├── ReflectiveFloor.tsx # Glossy obsidian MeshReflectorMaterial floor
│   │   ├── DustParticles.tsx   # Subtle drifting ash motes
│   │   └── Lighting.tsx        # Cold-white key light & blood-red rear rim light
│   └── ui/
│       ├── Preloader.tsx       # Hypnotic SVG stroke-by-stroke sigil drawing intro
│       ├── Cursor.tsx          # Custom red cybersigil cross & trailing ring
│       ├── Navbar.tsx          # Minimal gothic glass bar with barbed divider
│       ├── Hero.tsx            # Massive wordmark NOCTURNE & ENTER button
│       ├── Detail.tsx          # 3 razor micro-labels with line connectors
│       └── CTA.tsx             # DEFY THE LIGHT headline & PRE-ORDER button
├── hooks/
│   ├── useScrollTimeline.ts    # 3-section cinematic GSAP camera timeline
│   ├── useMouseParallax.ts     # Damped mouse tilt tracking
│   └── useMedia.ts             # Responsive breakpoints & prefers-reduced-motion
├── lib/
│   ├── gsap.ts                 # Configured GSAP & ScrollTrigger setup
│   ├── sceneState.ts           # Lightweight reactive 3D state bridge
│   └── sigils.ts               # Mathematical cybersigilism vector paths
```

---

## Customization Guide

### 1. Swapping the 3D Sneaker Model
1. Obtain any GLTF/GLB model (e.g., from [Sketchfab](https://sketchfab.com/3d-models/sneakers) or [Poly Pizza](https://poly.pizza)).
2. Place the file at:
   ```
   public/models/sneaker.glb
   ```
3. In `src/components/canvas/Sneaker.tsx`, the `GLTFSneaker` component automatically loads the file, normalizes bounding dimensions, casts shadows, and overrides surfaces with the obsidian leather PBR material.
4. If the file is missing or encounters a network error, the app gracefully falls back to the built-in procedural gothic leather high-top silhouette without crashing.

### 2. Tweaking the Accent Color
- To adjust the blood red accent (`#8c0a14`), update:
  - `tailwind.config.js`: `colors.blood.DEFAULT`
  - `src/index.css`: `--blood`
  - `src/components/canvas/CyberSigil.tsx`: `ctx.strokeStyle = '#8c0a14'`
  - `src/components/canvas/Lighting.tsx`: Rim light color hex

### 3. Adjusting Lighting & Atmosphere
- **Overhead Key Light**: In `src/components/canvas/Lighting.tsx`, adjust the `directionalLight` intensity and position `[1.5, 5.0, 2.5]`.
- **Blood Red Rim**: Adjust the rear directional light `position={[0, 3.5, -3.0]}` and the lateral point light.
- **Reflective Floor Blur & Mirror**: In `src/components/canvas/ReflectiveFloor.tsx`, modify `mirror` (default: `0.2`) and `blur` (default: `[500, 200]`).
