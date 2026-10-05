import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ReflectiveFloor } from './ReflectiveFloor';
import { DustParticles } from './DustParticles';
import { Sneaker } from './Sneaker';
import { Lighting } from './Lighting';
import { Effects } from './Effects';
import {
  sceneState,
  subscribeScene,
  setHasInteracted,
  setAdaptivePerformance,
} from '../../lib/sceneState';
import { useMedia } from '../../hooks/useMedia';

// Controller to manage OrbitControls interaction states
function SceneController({
  controlsRef,
  onInteractionStart,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl>;
  onInteractionStart: () => void;
}) {
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      onInteractionStart();
      setHasInteracted(true);
    };

    controls.addEventListener('start', handleStart);

    return () => {
      controls.removeEventListener('start', handleStart);
    };
  }, [controlsRef, onInteractionStart]);

  return null;
}

export function Scene() {
  const { isMobile, reducedMotion } = useMedia();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [showcaseActive, setShowcaseActive] = useState(false);

  useEffect(() => {
    return subscribeScene(() => {
      setIsScrollingState(sceneState.isScrolling);
      setShowcaseActive(sceneState.showcase.active);
    });
  }, []);

  return (
    <div
      id="canvas-container"
      className={`fixed inset-0 select-none ${
        isInteracting ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      <Canvas
        camera={{ position: [0, 0.12, 3.2], fov: 36 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        shadows={!isMobile}
      >
        <PerformanceMonitor
          onIncline={() => setAdaptivePerformance(1.5, true)}
          onDecline={() => setAdaptivePerformance(1.0, false)}
        />

        {/* Pure Clean Black Void */}
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 6.0, 16]} />

        {/* OrbitControls: 360 horizontal drag, limited vertical tilt, min/max zoom */}
        <OrbitControls
          ref={controlsRef}
          enabled={!isScrollingState && !reducedMotion && !showcaseActive}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={2.2}
          maxDistance={4.8}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.72}
          autoRotate={false}
          target={[0, 0.05, 0]}
        />

        <SceneController
          controlsRef={controlsRef}
          onInteractionStart={() => setIsInteracting(true)}
        />

        <Lighting />
        <ReflectiveFloor />
        <DustParticles />
        <Sneaker />
        <Effects />
      </Canvas>
    </div>
  );
}
