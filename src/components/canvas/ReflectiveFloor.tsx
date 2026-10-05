import { ContactShadows } from '@react-three/drei';
import { useMedia } from '../../hooks/useMedia';

export function ReflectiveFloor() {
  const { isMobile } = useMedia();

  if (isMobile) return null;

  return (
    <ContactShadows
      position={[0, -0.92, 0]}
      opacity={0.65}
      scale={3.8}
      blur={1.8}
      far={1.6}
      color="#000000"
      frames={1}
    />
  );
}
