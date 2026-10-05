import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { sceneState } from '../../lib/sceneState';

// ============================================================================
// GOTHIC OBSIDIAN PROCEDURAL SNEAKER (0 MB, 60 FPS, Instant Load)
// Fills ~60-65% of viewport height, sculpted obsidian leather & forged sole
// ============================================================================
function ProceduralGothicSneaker() {
  return (
    <group scale={[1.42, 1.42, 1.42]} position={[0, -0.06, 0]} rotation={[0, Math.PI / 4.2, 0]}>
      {/* --- FORGED CHUNKY MONOLITH SOLE --- */}
      {/* Bottom Outsole with Sharp Faceted Lugs */}
      <mesh position={[0, 0.04, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.74, 0.1, 1.76]} />
        <meshStandardMaterial
          color="#060608"
          roughness={0.4}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* Midsole Arch - Beveled Monolith */}
      <mesh position={[0, 0.2, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[0.78, 0.22, 1.82]} />
        <meshStandardMaterial
          color="#09090b"
          roughness={0.32}
          metalness={0.25}
          flatShading
        />
      </mesh>

      {/* Chunky Angular Heel Block */}
      <mesh position={[0, 0.25, -0.48]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.28, 0.7]} />
        <meshStandardMaterial
          color="#050506"
          roughness={0.28}
          metalness={0.35}
          flatShading
        />
      </mesh>

      {/* --- FULL-GRAIN OBSIDIAN LEATHER UPPER --- */}
      {/* Sculpted Toe Box */}
      <mesh position={[0, 0.42, 0.26]} castShadow receiveShadow>
        <boxGeometry args={[0.66, 0.26, 1.06]} />
        <meshStandardMaterial
          color="#0d0d10"
          roughness={0.22}
          metalness={0.16}
          flatShading
        />
      </mesh>

      {/* High-Top Collar - Sharp Gothic Cut */}
      <mesh position={[0, 0.72, -0.22]} rotation={[-0.12, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.58, 0.66]} />
        <meshStandardMaterial
          color="#0e0e12"
          roughness={0.24}
          metalness={0.15}
          flatShading
        />
      </mesh>

      {/* Padded Collar Trim */}
      <mesh position={[0, 0.98, -0.24]} rotation={[-0.12, 0, 0]} castShadow>
        <torusGeometry args={[0.26, 0.06, 12, 24]} />
        <meshStandardMaterial
          color="#08080a"
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>

      {/* Elongated Leather Tongue */}
      <mesh position={[0, 0.76, 0.04]} rotation={[0.38, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.66, 0.08]} />
        <meshStandardMaterial
          color="#0b0b0e"
          roughness={0.25}
          metalness={0.18}
          flatShading
        />
      </mesh>

      {/* Gunmetal Cybersigil Tongue Plate */}
      <mesh position={[0, 0.99, -0.04]} rotation={[0.38, 0, 0]}>
        <boxGeometry args={[0.22, 0.12, 0.03]} />
        <meshStandardMaterial
          color="#383842"
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* --- WAXED LACES & HARDWARE EYELETS --- */}
      {[-0.04, 0.12, 0.28, 0.44].map((zPos, idx) => (
        <group key={idx} position={[0, 0.51 + idx * 0.06, zPos]}>
          <mesh rotation={[0, 0, idx % 2 === 0 ? 0.06 : -0.06]} castShadow>
            <boxGeometry args={[0.42, 0.035, 0.045]} />
            <meshStandardMaterial
              color="#020202"
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0.22, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
            <meshStandardMaterial color="#50505a" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.22, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
            <meshStandardMaterial color="#50505a" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Razor Cybersigil Lateral Chrome Barbs */}
      <mesh position={[0.34, 0.46, 0.02]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.015, 0.08, 0.72]} />
        <meshStandardMaterial
          color="#2a2a32"
          metalness={0.88}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[-0.34, 0.46, 0.02]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.015, 0.08, 0.72]} />
        <meshStandardMaterial
          color="#2a2a32"
          metalness={0.88}
          roughness={0.15}
        />
      </mesh>

      {/* Rear Spine Stabilizer with Blood Red Accent Thread */}
      <mesh position={[0, 0.76, -0.56]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.36, 0.03]} />
        <meshStandardMaterial
          color="#09090b"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.76, -0.58]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.02, 0.28, 0.01]} />
        <meshStandardMaterial
          color="#8c0a14"
          emissive="#8c0a14"
          emissiveIntensity={0.65}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// GLTF SNEAKER LOADER (Normalizes scale to fill ~65% viewport height)
// ============================================================================
function GLTFSneaker({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const [diffuseMap, normalMap, roughnessMap] = useTexture([
    '/textures/sneaker_diffuse.jpg',
    '/textures/sneaker_normal.jpg',
    '/textures/sneaker_roughness.jpg',
  ]);

  // Diffuse — preserve original Dalmatian / graffiti art colours
  diffuseMap.flipY = false;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  // Normal — canvas weave grain in tangent space
  normalMap.flipY = false;
  normalMap.colorSpace = THREE.NoColorSpace;
  // Tile 4× across the shoe surface so weave is visibly fine-grained
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(4, 4);

  // Roughness — spatial variation: canvas matte body vs glossy toe-cap + sole
  roughnessMap.flipY = false;
  roughnessMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(4, 4);

  (window as any).__originalScene = scene;

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Target ~2.38 units length so it leaves ample breathing room for the backdrop branding
    const scaleFactor = 2.38 / (maxDim || 1);
    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center.multiplyScalar(scaleFactor));
    clone.position.y += 0.05;

    // ── PREMIUM AESTHETIC MATERIAL ────────────────────────────────────────
    // Diffuse:    Original Dalmatian / Cruella graphic art (untouched colours)
    // Normal:     Canvas weave grain — adds real micro-surface tactility
    // Roughness:  Spatial map — matte canvas body, semi-gloss toe-box & sole
    // envMap:     Scene reflection on glossy zones (toe-cap sheen)
    const authenticMat = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      normalMap,
      normalScale: new THREE.Vector2(1.2, 1.2),   // Strong weave grain — tactile canvas feel
      roughnessMap,
      roughness: 0.38,          // Lower = more micro-sheen across canvas threads
      metalness: 0.0,
      envMapIntensity: 0.0,     // No envMap needed — manual rig is premium enough
      side: THREE.DoubleSide,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = authenticMat;
      }
    });

    (window as any).__sneakerClone = clone;
    return clone;
  }, [scene, diffuseMap, normalMap, roughnessMap]);

  return <primitive object={clonedScene} />;
}

class SneakerErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

try {
  useGLTF.preload('/models/sneaker.glb');
  useTexture.preload('/textures/sneaker_diffuse.jpg');
  useTexture.preload('/textures/sneaker_normal.jpg');
  useTexture.preload('/textures/sneaker_roughness.jpg');
} catch {}

// ============================================================================
// MAIN HERO SNEAKER CONTAINER (Zero square markers, 100% focus on shoe)
// ============================================================================
export function Sneaker() {
  const outerGroup = useRef<THREE.Group>(null);
  const tiltGroup = useRef<THREE.Group>(null);
  const modelGroup = useRef<THREE.Group>(null);
  const showcaseYaw = useRef(-1.57);

  useFrame((state, delta) => {
    if (!outerGroup.current || !tiltGroup.current || !modelGroup.current) return;

    // --- CINEMATIC SHOWCASE MODE ---
    if (sceneState.showcase.active) {
      const t = state.clock.elapsedTime;
      const { mode, isPaused, speed } = sceneState.showcase;

      if (!isPaused && mode === 'orbit') {
        showcaseYaw.current += delta * 1.1 * speed;
      }

      let targetPos: [number, number, number] = [0, 0.08, 0.2];
      let targetTiltZ = Math.sin(t * 1.2) * 0.14; // dynamic cinematic float
      let targetPitchX = 0.12 + Math.cos(t * 0.9) * 0.08;
      let targetYaw = showcaseYaw.current;

      if (mode === 'vamp') {
        targetPos = [0, 0.02, 0.35]; // perfectly framed macro close-up on vamp graffiti
        targetPitchX = 0.38; // angled to reveal both vamp art and lateral silhouette
        targetTiltZ = -0.08;
        targetYaw = -0.32; // dynamic 3/4 angle
      } else if (mode === 'profile') {
        targetPos = [0, 0.02, 0.4];
        targetPitchX = 0.02;
        targetTiltZ = 0.0;
        targetYaw = -1.57; // toes at left
      } else if (mode === 'sole') {
        targetPos = [0, 0.14, 0.5];
        targetPitchX = -0.62; // sole angled toward camera
        targetTiltZ = 0.28;
        targetYaw = -1.25;
      }

      outerGroup.current.position.x = THREE.MathUtils.lerp(outerGroup.current.position.x, targetPos[0], delta * 3.5);
      outerGroup.current.position.y = THREE.MathUtils.lerp(outerGroup.current.position.y, targetPos[1], delta * 3.5);
      outerGroup.current.position.z = THREE.MathUtils.lerp(outerGroup.current.position.z, targetPos[2], delta * 3.5);

      tiltGroup.current.rotation.z = THREE.MathUtils.lerp(tiltGroup.current.rotation.z, targetTiltZ, delta * 3.5);
      modelGroup.current.rotation.x = THREE.MathUtils.lerp(modelGroup.current.rotation.x, targetPitchX, delta * 3.5);

      if (mode === 'orbit') {
        modelGroup.current.rotation.y = showcaseYaw.current;
      } else {
        modelGroup.current.rotation.y = THREE.MathUtils.lerp(modelGroup.current.rotation.y, targetYaw, delta * 3.5);
      }
      return;
    }

    // --- STANDARD SCROLL TIMELINE MODE ---
    // Follow GSAP scroll timeline targets smoothly
    const [tx, ty, tz] = sceneState.shoe.pos;
    const [rx, ry, rz] = sceneState.shoe.rot;

    // Subtle organic floating levitation
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 1.6) * 0.018;
    const floatTilt = Math.sin(t * 1.2) * 0.012;

    // 1. World Translation & Float
    outerGroup.current.position.x = THREE.MathUtils.lerp(outerGroup.current.position.x, tx, delta * 3.5);
    outerGroup.current.position.y = THREE.MathUtils.lerp(outerGroup.current.position.y, ty + floatY, delta * 3.5);
    outerGroup.current.position.z = THREE.MathUtils.lerp(outerGroup.current.position.z, tz, delta * 3.5);

    // 2. Pure Screen-Space Roll / Diagonal Tilt (Z-axis in screen plane)
    tiltGroup.current.rotation.z = THREE.MathUtils.lerp(tiltGroup.current.rotation.z, rz, delta * 3.5);

    // 3. Intrinsic 3D Pitch (X) and Yaw (Y) for clean rotational spins
    modelGroup.current.rotation.x = THREE.MathUtils.lerp(modelGroup.current.rotation.x, rx + floatTilt, delta * 3.5);
    modelGroup.current.rotation.y = THREE.MathUtils.lerp(modelGroup.current.rotation.y, ry, delta * 3.5);

    // Keep showcase starting angle synced with current scroll yaw
    showcaseYaw.current = ry;
  });

  const fallback = <ProceduralGothicSneaker />;

  return (
    <group ref={outerGroup} position={[0, 0.05, 0]}>
      <group ref={tiltGroup}>
        <group ref={modelGroup}>
          <SneakerErrorBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <GLTFSneaker url="/models/sneaker.glb" />
            </Suspense>
          </SneakerErrorBoundary>
        </group>
      </group>
    </group>
  );
}
