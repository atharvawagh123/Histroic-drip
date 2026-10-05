import { useState, useEffect } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { sceneState, subscribeScene } from '../../lib/sceneState';
import { useMedia } from '../../hooks/useMedia';

export function Effects() {
  const { isMobile, reducedMotion } = useMedia();
  const [bloomEnabled, setBloomEnabled] = useState(sceneState.bloomEnabled);

  useEffect(() => {
    return subscribeScene(() => {
      setBloomEnabled(sceneState.bloomEnabled);
    });
  }, []);

  if (reducedMotion) {
    return null;
  }

  // Lightweight single composer with multisampling=0 for maximum performance
  return (
    <EffectComposer multisampling={0}>
      {!isMobile && bloomEnabled && (
        <Bloom
          luminanceThreshold={0.82}
          luminanceSmoothing={0.3}
          intensity={0.75}
          mipmapBlur
        />
      )}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
