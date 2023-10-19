import * as kokomi from "kokomi.js";
import * as THREE from "three";

import type Experience from "../Experience";

export interface RippleEffectConfig {
  texture: THREE.Texture;
  waveCount: number;
  waveSize: number;
}

export default class RippleEffect extends kokomi.Component {
  declare base: Experience;
  rippleRt: kokomi.RenderTexture;
  constructor(base: Experience, config: Partial<RippleEffectConfig> = {}) {
    super(base);

    const {
      texture = this.base.am.items["ripple-texture"],
      waveCount = 100,
      waveSize = 100,
    } = config;

    // ripple displacement renderTexture
    const createRippleRt = () => {
      const rt = new kokomi.RenderTexture(this.base, {
        rtCamera: this.base.camera,
      });

      let currentWave = 0;

      const geometry = new THREE.PlaneGeometry(waveSize, waveSize);

      const ripples: THREE.Mesh[] = [];
      for (let i = 0; i < waveCount; i++) {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          depthWrite: false,
        });

        const ripple = new THREE.Mesh(geometry, material);
        rt.add(ripple);
        ripples.push(ripple);
        ripple.visible = false;
        ripple.rotation.z = 2 * Math.PI * Math.random();
      }

      this.base.update(() => {
        if (this.base.iMouse.isMouseMoving) {
          currentWave = (currentWave + 1) % waveCount;

          let activeRipple = ripples[currentWave];
          activeRipple.visible = true;
          activeRipple.position.x = this.base.iMouse.mouseScreen.x;
          activeRipple.position.y = this.base.iMouse.mouseScreen.y;
          (activeRipple.material as THREE.MeshBasicMaterial).opacity = 0.5;
          activeRipple.scale.x = 0.2;
          activeRipple.scale.y = 0.2;
        }

        ripples.forEach((ripple) => {
          if (!ripple.visible) {
            return;
          }
          ripple.rotation.z += 0.02;
          (ripple.material as THREE.MeshBasicMaterial).opacity *= 0.96;
          ripple.scale.x = 0.982 * ripple.scale.x + 0.108;
          ripple.scale.y = ripple.scale.x;
          if ((ripple.material as THREE.MeshBasicMaterial).opacity < 0.002) {
            ripple.visible = false;
          }
        });
      });

      return rt;
    };

    const rippleRt = createRippleRt();
    this.rippleRt = rippleRt;
  }
}
