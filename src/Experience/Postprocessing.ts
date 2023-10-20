import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

import type Experience from "./Experience";

import postprocessingFragmentShader from "./Shaders/Postprocessing/frag.glsl";

import RippleEffect from "./Effects/RippleEffect";

export interface PostprocessingConfig {
  bgColor: string;
}

export default class Postprocessing extends kokomi.Component {
  declare base: Experience;
  uniformParams;
  ce: kokomi.CustomEffect;
  re: RippleEffect;
  constructor(base: Experience, config: Partial<PostprocessingConfig> = {}) {
    super(base);

    const { bgColor = "#000000" } = config;

    this.uniformParams = {
      uRippleStrength: {
        value: 1,
      },
      uRGBShiftStrength: {
        value: 1,
      },
    };

    this.ce = new kokomi.CustomEffect(this.base, {
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        uRGBShift: {
          value: 0,
        },
        uBgColor: {
          value: new THREE.Color(bgColor),
        },
        uMaskStrength: {
          value: 1,
        },
        uDisplacement: {
          value: null,
        },
        ...this.uniformParams,
      },
    });

    this.re = new RippleEffect(this.base);
    this.ce.customPass.material.uniforms.uDisplacement.value =
      this.re.rippleRt.texture;

    this.createDebug();
  }
  addExisting() {
    this.ce.addExisting();
  }
  hideMask(delay = 0) {
    gsap.to(this.ce.customPass.material.uniforms.uMaskStrength, {
      value: 0,
      delay,
    });
  }
  showMask(delay = 0) {
    gsap.to(this.ce.customPass.material.uniforms.uMaskStrength, {
      value: 1,
      delay,
    });
  }
  createDebug() {
    const debug = this.base.debug;
    const { uniformParams } = this;

    const material = this.ce.customPass.material;

    if (debug.active) {
      const debugFolder = debug.ui?.addFolder("postprocessing");
      debugFolder
        ?.add(uniformParams.uRippleStrength, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("rippleStrength")
        .onChange((val: number) => {
          material.uniforms.uRippleStrength.value = val;
        });
      debugFolder
        ?.add(uniformParams.uRGBShiftStrength, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("RGBShiftStrength")
        .onChange((val: number) => {
          material.uniforms.uRGBShiftStrength.value = val;
        });
    }
  }
}
