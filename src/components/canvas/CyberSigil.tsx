import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SIGIL_HERO_PATHS } from '../../lib/sigils';

export function CyberSigil() {
  const sigilRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  // Generate procedural vector texture with soft radial alpha mask (NO rectangular clipping)
  const sigilTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 1024, 1024);

    // Scaling from 600x600 viewBox to 1024x1024
    ctx.save();
    ctx.scale(1024 / 600, 1024 / 600);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 8;

    // Draw blood-red razor strokes
    ctx.strokeStyle = '#8c0a14';
    ctx.lineWidth = 1.6;

    SIGIL_HERO_PATHS.forEach((pathData) => {
      const p = new Path2D(pathData);
      ctx.stroke(p);
    });

    // Central diamond spike core
    ctx.fillStyle = '#8c0a14';
    const core = new Path2D("M 300 270 L 316 300 L 300 330 L 284 300 Z");
    ctx.fill(core);
    ctx.restore();

    // Apply smooth radial falloff mask so all outer and bottom edges fade out to 0 opacity
    ctx.globalCompositeOperation = 'destination-in';
    const radialGrad = ctx.createRadialGradient(512, 512, 180, 512, 512, 500);
    radialGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    radialGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
    radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (!sigilRef.current) return;
    sigilRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group ref={sigilRef} position={[0, 0.05, -0.6]}>
      {/* Sized down to frame the shoe like a tight halo without edge clipping */}
      <mesh>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          ref={matRef}
          map={sigilTexture}
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
