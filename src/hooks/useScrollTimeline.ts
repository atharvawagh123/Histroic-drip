import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { sceneState, notifySceneChange, setIsScrolling } from '../lib/sceneState';

export function useScrollTimeline(enabled = true) {
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const END_ROT_Y = -1.5708; // Exact sideways pose with toes at left (matching photo)
    const START_ROT_Y = END_ROT_Y - Math.PI * 2; // Exactly 1 round (360.0°) before end pose = -7.8548

    const proxy = {
      camX: 0,
      camY: 0.12,
      camZ: 3.2,
      targetX: 0,
      targetY: 0.05,
      targetZ: 0,
      shoeX: 0,
      shoeY: 0.05,
      shoeZ: 0,
      shoeRotX: -0.14, // Subtle pitch revealing vulcanized bumper along base
      shoeRotY: START_ROT_Y, // Initial diagonal pose (360° from end)
      shoeRotZ: 0.52,  // Steep diagonal drop tilt: toe down-left, heel up-right
    };

    const updateScene = () => {
      sceneState.camera.pos = [proxy.camX, proxy.camY, proxy.camZ];
      sceneState.camera.lookAt = [proxy.targetX, proxy.targetY, proxy.targetZ];
      sceneState.shoe.pos = [proxy.shoeX, proxy.shoeY, proxy.shoeZ];
      sceneState.shoe.rot = [proxy.shoeRotX, proxy.shoeRotY, proxy.shoeRotZ];
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          setIsScrolling(true);
          sceneState.scrollProgress = self.progress;
          sceneState.activeSection = Math.min(2, Math.floor(self.progress * 2.99));
          notifySceneChange();

          // Debounce scroll end to safely re-enable OrbitControls
          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
          }, 200);
        },
      },
    });

    // STRICTLY 1 ROUND (360.0°) - NEVER MORE THAN ONE ROUND!
    // Smooth, uniform rotation across the entire page ending at the exact sideways pose
    tl.to(
      proxy,
      {
        shoeRotY: END_ROT_Y,     // Rotates exactly 360° (1 full round) to land at toes-at-left profile
        shoeRotZ: 0.0,           // Gracefully straightens out diagonal tilt into level profile
        shoeRotX: 0.0,           // Straightens pitch
        camY: 0.06,
        shoeY: 0.0,
        ease: 'none',            // Perfectly uniform, steady rotation speed per scroll distance
        onUpdate: updateScene,
        duration: 1,
      },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [enabled]);
}
