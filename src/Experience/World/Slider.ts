import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

import type Experience from "../Experience";

import sliderVertexShader from "../Shaders/Slider/vert.glsl";
import sliderFragmentShader from "../Shaders/Slider/frag.glsl";

export default class Slider extends kokomi.Component {
  declare base: Experience;
  params;
  uniformParams;
  ig: kokomi.InfiniteGallery;
  ws: kokomi.WheelScroller;
  g: THREE.Group;
  dd: kokomi.DragDetecter;
  constructor(base: Experience) {
    super(base);

    this.params = {
      tiltX: 0,
      tiltY: 0,
      // tiltZ: 6,
      tiltZ: 0,
    };

    this.uniformParams = {
      uDistortX: {
        value: 1.2,
      },
      uDistortZ: {
        value: 1.6,
      },
    };

    this.ig = new kokomi.InfiniteGallery(this.base, {
      // @ts-ignore
      elList: [...document.querySelectorAll(".gallery-item")],
      direction: "vertical",
      gap: 64,
      appendCount: 2,
      vertexShader: sliderVertexShader,
      fragmentShader: sliderFragmentShader,
      uniforms: {
        uVelocity: {
          value: 0,
        },
        uOpacity: {
          value: 1,
        },
        uProgress: {
          value: 0,
        },
        ...this.uniformParams,
      },
      materialParams: {
        transparent: true,
      },
    });

    this.ws = new kokomi.WheelScroller();
    this.ws.listenForScroll();

    // tilt
    const g = new THREE.Group();
    this.g = g;
    this.g.rotation.x = THREE.MathUtils.degToRad(this.params.tiltX);
    this.g.rotation.y = THREE.MathUtils.degToRad(this.params.tiltY);
    this.g.rotation.z = THREE.MathUtils.degToRad(this.params.tiltZ);

    // drag
    this.dd = new kokomi.DragDetecter(this.base);
    this.dd.detectDrag();
    this.dd.on("drag", (delta: THREE.Vector2) => {
      this.ws.scroll.target -= delta[this.ig.dimensionType] * 1.8;
    });
    this.dd.on("dragend", () => {
      const snapTarget = this.ig.snap(this.ws.scroll.target);
      gsap.to(this.ws.scroll, {
        target: snapTarget,
      });
    });

    this.createDebug();
  }
  async addExisting() {
    this.ig.addExisting();
    await this.ig.checkImagesLoaded();

    this.container.add(this.g);
    this.ig.iterate((maku) => {
      this.g.add(maku.mesh);
    });
  }
  update() {
    this.ws.syncScroll();
    const { current, delta } = this.ws.scroll;
    this.ig.sync(-current);

    this.ig.iterate((maku) => {
      const material = maku.mesh.material as THREE.ShaderMaterial;
      material.uniforms.uVelocity.value = delta * 2;

      material.uniforms.uDistortX.value = this.uniformParams.uDistortX.value;
      material.uniforms.uDistortZ.value = this.uniformParams.uDistortZ.value;
    });
  }
  createDebug() {
    const debug = this.base.debug;
    const { params, uniformParams } = this;

    if (debug.active) {
      const debugFolder = debug.ui!.addFolder("gallery");
      debugFolder
        .add(params, "tiltX")
        .min(-360)
        .max(360)
        .step(1)
        .onChange((val: number) => {
          this.g.rotation.x = THREE.MathUtils.degToRad(val);
        });
      debugFolder
        .add(params, "tiltY")
        .min(-360)
        .max(360)
        .step(1)
        .onChange((val: number) => {
          this.g.rotation.y = THREE.MathUtils.degToRad(val);
        });
      debugFolder
        .add(params, "tiltZ")
        .min(-360)
        .max(360)
        .step(1)
        .onChange((val: number) => {
          this.g.rotation.z = THREE.MathUtils.degToRad(val);
        });
      debugFolder
        .add(uniformParams.uDistortX, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortX");
      debugFolder
        .add(uniformParams.uDistortZ, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortZ");
    }
  }
}
