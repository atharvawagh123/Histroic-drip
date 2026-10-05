export type HotspotId = 'sole' | 'lace' | 'heel' | null;

export interface HotspotInfo {
  id: 'sole' | 'lace' | 'heel';
  label: string;
  sublabel: string;
  position: [number, number, number]; // 3D anchor relative to shoe
  cameraTarget: [number, number, number];
  cameraPos: [number, number, number];
}

export const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'sole',
    label: 'FORGED CARBON SOLE',
    sublabel: 'MONOLITH 4.5MM ARCH',
    position: [0.35, -0.3, 0.45],
    cameraTarget: [0.1, -0.2, 0.2],
    cameraPos: [0.9, -0.1, 2.3],
  },
  {
    id: 'lace',
    label: 'OBSIDIAN WAXED LACE',
    sublabel: 'GUNMETAL HARDWARE',
    position: [0.0, 0.48, 0.22],
    cameraTarget: [0.0, 0.35, 0.1],
    cameraPos: [0.2, 0.9, 2.2],
  },
  {
    id: 'heel',
    label: 'SPINE STABILIZER',
    sublabel: 'SERIALIZED STEEL #300',
    position: [-0.25, 0.42, -0.6],
    cameraTarget: [-0.1, 0.3, -0.3],
    cameraPos: [-1.4, 0.6, 2.0],
  },
];

export type ShowcaseMode = 'orbit' | 'vamp' | 'profile' | 'sole';

export interface ShowcaseState {
  active: boolean;
  mode: ShowcaseMode;
  isPaused: boolean;
  speed: number;
}

export interface SceneState {
  camera: {
    pos: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
  };
  shoe: {
    pos: [number, number, number];
    rot: [number, number, number];
  };
  activeSection: number;
  scrollProgress: number;
  isLoaded: boolean;
  hasInteracted: boolean;
  activeHotspot: HotspotId;
  isScrolling: boolean;
  dpr: number;
  bloomEnabled: boolean;
  showcase: ShowcaseState;
}

export const sceneState: SceneState = {
  camera: {
    pos: [0, 0.15, 3.4],
    lookAt: [0, 0.05, 0],
    fov: 38,
  },
  shoe: {
    pos: [0, 0.05, 0],
    rot: [-0.14, -7.854, 0.52],
  },
  activeSection: 0,
  scrollProgress: 0,
  isLoaded: false,
  hasInteracted: false,
  activeHotspot: null,
  isScrolling: false,
  dpr: 1.5,
  bloomEnabled: true,
  showcase: {
    active: false,
    mode: 'orbit',
    isPaused: false,
    speed: 1.0,
  },
};

(window as any).sceneState = sceneState;

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeScene(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifySceneChange() {
  listeners.forEach((fn) => fn());
}

export function setHasInteracted(val: boolean) {
  if (sceneState.hasInteracted !== val) {
    sceneState.hasInteracted = val;
    notifySceneChange();
  }
}

export function setActiveHotspot(id: HotspotId) {
  sceneState.activeHotspot = id;
  notifySceneChange();
}

export function setIsScrolling(scrolling: boolean) {
  sceneState.isScrolling = scrolling;
  notifySceneChange();
}

export function setIsLoaded(loaded: boolean) {
  sceneState.isLoaded = loaded;
  notifySceneChange();
}

export function setAdaptivePerformance(dpr: number, bloom: boolean) {
  sceneState.dpr = dpr;
  sceneState.bloomEnabled = bloom;
  notifySceneChange();
}

export function toggleShowcase(active?: boolean) {
  const nextActive = active !== undefined ? active : !sceneState.showcase.active;
  sceneState.showcase.active = nextActive;
  if (nextActive) {
    (window as any).lenis?.stop?.();
  } else {
    (window as any).lenis?.start?.();
  }
  notifySceneChange();
}

export function setShowcaseMode(mode: ShowcaseMode) {
  sceneState.showcase.mode = mode;
  notifySceneChange();
}

export function toggleShowcasePause() {
  sceneState.showcase.isPaused = !sceneState.showcase.isPaused;
  notifySceneChange();
}

export function setShowcaseSpeed(speed: number) {
  sceneState.showcase.speed = speed;
  notifySceneChange();
}
