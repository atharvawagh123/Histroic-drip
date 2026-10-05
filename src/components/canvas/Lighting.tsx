import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lighting() {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const glintLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!glintLight.current) return;
    // Subtle breathing drift of the frontal specular point light to make reflections glide across the leather
    const t = state.clock.elapsedTime * 0.8;
    glintLight.current.position.x = Math.sin(t) * 0.4;
    glintLight.current.position.y = 1.3 + Math.cos(t * 0.7) * 0.2;
  });

  return (
    <>
      {/* 1. Studio Dome Hemisphere Light: Natural sky-to-ground bounce preventing muddy blacks */}
      <hemisphereLight
        args={['#646a7d', '#101015', 1.8]}
      />

      {/* 2. Soft Ambient Base for shadow depth */}
      <ambientLight color="#181822" intensity={1.0} />

      {/* 3. Main Studio Key Light (Front-Right-High) */}
      <directionalLight
        ref={keyLight}
        position={[3.2, 4.2, 3.5]}
        color="#ffffff"
        intensity={3.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0001}
      />

      {/* 4. Secondary Fill Key Light (Front-Left-Mid) - Sculpts the opposite side */}
      <directionalLight
        position={[-3.2, 2.6, 3.2]}
        color="#e4e8f2"
        intensity={2.8}
      />

      {/* 5. Top Specular Strip Light - Traces sharp razor sheen along collar, tongue, and toe ridge */}
      <directionalLight
        position={[0, 6.0, 0.4]}
        color="#ffffff"
        intensity={3.2}
      />

      {/* 6. Studio Edge Rim Light (Rear-Left) - Razor-sharp silhouette definition */}
      <directionalLight
        position={[-3.8, 2.2, -2.6]}
        color="#c8d6ec"
        intensity={3.4}
      />

      {/* 7. Antique Gold Accent Edge Light (Rear-Right) */}
      <directionalLight
        position={[3.8, 2.0, -2.6]}
        color="#c89d46"
        intensity={2.8}
      />

      {/* 8. Moving Front Specular Point Light (Produces tactile moving gleams over leather grain) */}
      <pointLight
        ref={glintLight}
        position={[0.2, 1.4, 2.0]}
        color="#ffffff"
        intensity={2.6}
        distance={6.0}
        decay={2}
      />

      {/* 9. Sole Under-Glow Reflector (Reveals vulcanized diamond bumper grip & forged sole lugs) */}
      <pointLight
        position={[0, -1.2, 1.2]}
        color="#484b5c"
        intensity={2.0}
        distance={4.5}
        decay={2}
      />
    </>
  );
}
