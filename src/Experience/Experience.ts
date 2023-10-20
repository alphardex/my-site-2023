import * as kokomi from "kokomi.js";
import * as THREE from "three";

import World from "./World/World";

import Debug from "./Debug";

import Postprocessing from "./Postprocessing";

import { resources } from "./resources";
import { config, effectConfig } from "../config";

export default class Experience extends kokomi.Base {
  params;
  world: World;
  debug: Debug;
  am: kokomi.AssetManager;
  postprocessing: Postprocessing | null;
  constructor(sel = "#sketch") {
    super(sel);

    (window as any).experience = this;

    this.params = {
      bgColor: config.bgColor,
    };

    this.setBgColor(this.params.bgColor);

    this.debug = new Debug();

    this.am = new kokomi.AssetManager(this, resources);

    // this.camera.position.set(0, 0, 5);
    // new kokomi.OrbitControls(this);
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    this.postprocessing = null;

    this.world = new World(this);
    this.world.on("ready", () => {
      this.postprocessing = new Postprocessing(this, {
        bgColor: this.params.bgColor,
      });
      this.postprocessing.addExisting();
      this.setBgColor(this.params.bgColor);
    });
    this.world.on("hide-mask", (delay: number) => {
      this.postprocessing?.hideMask(delay);
    });
    this.world.on("show-mask", (delay: number) => {
      this.postprocessing?.showMask(delay);
    });

    this.update(() => {
      if (this.postprocessing) {
        this.postprocessing.ce.customPass.material.uniforms.uRGBShift.value =
          // @ts-ignore
          Math.abs(this.world.slider?.ws.scroll.delta) * 0.0004;
      }
    });

    this.world.on("change-effect", (type: any) => {
      this.changeEffectConfig(type);
    });

    this.createDebug();
  }
  setBgColor(val: string) {
    const bgColor = new THREE.Color(val).convertLinearToSRGB();
    this.scene.background = bgColor;
    if (this.postprocessing) {
      this.postprocessing.ce.customPass.material.uniforms.uBgColor.value =
        bgColor;
    }
  }
  createDebug() {
    const debug = this.debug;
    const { params } = this;

    if (debug.active) {
      const debugFolder = debug.ui!.addFolder("scene");
      debugFolder.addColor(params, "bgColor").onChange((val: string) => {
        this.setBgColor(val);
      });
    }
  }
  changeEffectConfig(type: "basic" | "lowMotion" = "basic") {
    const targetConfig = effectConfig[type];

    const ceMaterial = this.postprocessing?.ce.customPass.material;
    if (ceMaterial) {
      ceMaterial.uniforms.uRippleStrength.value = targetConfig.rippleStrength;
      ceMaterial.uniforms.uRGBShiftStrength.value =
        targetConfig.RGBShiftStrength;
    }

    const igUniformParams = this.world.slider?.uniformParams;
    if (igUniformParams) {
      igUniformParams.uDistortX.value = targetConfig.distortX;
      igUniformParams.uDistortZ.value = targetConfig.distortZ;
    }
  }
}
