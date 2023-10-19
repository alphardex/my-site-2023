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
  ce: kokomi.CustomEffect;
  re: RippleEffect;
  constructor(base: Experience, config: Partial<PostprocessingConfig> = {}) {
    super(base);

    const { bgColor = "#000000" } = config;

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
      },
    });

    this.re = new RippleEffect(this.base);
    this.ce.customPass.material.uniforms.uDisplacement.value =
      this.re.rippleRt.texture;
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
}
