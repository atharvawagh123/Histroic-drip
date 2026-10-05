import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function BrandBackdrop() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const target = new THREE.Vector3(0, 0.05, 0);
    // Vector pointing from camera to shoe
    const dir = target.clone().sub(camera.position).normalize();
    
    // Position text directly behind the shoe along camera's view axis
    const pos = target.clone().add(dir.multiplyScalar(1.15));
    pos.y += 0.22; // raised so it crowns the sneaker silhouette cleanly
    
    groupRef.current.position.copy(pos);
    groupRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={groupRef}>
      {/* Top Monumental Brand Name - Fully visible crowning above the sneaker */}
      <Text
        font="/fonts/BootzyTM.ttf"
        fontSize={0.82}
        letterSpacing={0.05}
        color="#e8e4dc"
        fillOpacity={0.46}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.54, 0]}
        renderOrder={-1}
      >
        HISTROIC
      </Text>

      {/* Bottom Bold Anchor Word - Grounding beneath the sneaker sole */}
      <Text
        font="/fonts/BootzyTM.ttf"
        fontSize={0.92}
        letterSpacing={0.08}
        color="#e8e4dc"
        fillOpacity={0.46}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.48, 0]}
        renderOrder={-1}
      >
        DRIP
      </Text>
    </group>
  );
}
