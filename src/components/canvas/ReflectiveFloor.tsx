import { MeshReflectorMaterial } from '@react-three/drei';
import { useMedia } from '../../hooks/useMedia';

export function ReflectiveFloor() {
  const { isMobile } = useMedia();

  // Mobile optimization: eliminate render-target reflector completely
  if (isMobile) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial color="#040405" />
      </mesh>
    );
  }

  return (
    <group position={[0, -1.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[35, 35]} />
        <MeshReflectorMaterial
          blur={[200, 80]}
          resolution={512}
          mirror={0.08}
          mixBlur={1.2}
          mixStrength={0.12}
          roughness={0.65}
          depthScale={0}
          minDepthThreshold={0}
          maxDepthThreshold={1}
          color="#030304"
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}
