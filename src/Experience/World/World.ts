import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

import type Experience from "../Experience";

import TestObject from "./TestObject";
import Slider from "./Slider";
import { config } from "../../config";

export default class World extends kokomi.Component {
  declare base: Experience;
  testObject: TestObject | null;
  slider!: Slider | null;
  currentActiveMesh!: THREE.Mesh | null;
  isAnimatingMenu!: boolean;
  isAboutOpen!: boolean;
  constructor(base: Experience) {
    super(base);

    this.testObject = null;

    this.base.am.on("ready", async () => {
      this.emit("ready");
      this.slider = new Slider(this.base);
      await this.slider.addExisting();
      document.querySelector(".loader-screen")?.classList.add("hollow");

      this.currentActiveMesh = null;
      this.isAnimatingMenu = false;

      this.handleSliderDetail();
      this.handleAbout();
      this.createBlinkMenu();
      this.handleEffectSwitch();
    });
  }
  showDetail() {
    document.querySelector(".detail")?.classList.remove("hollow");
    this.slideInText(".detail");
  }
  hideDetail() {
    document.querySelector(".detail")?.classList.add("hollow");
    this.slideOutText(".detail");
  }
  updateDetail(id = 0) {
    const currentDetail = config.details[id];
    document.querySelector(".detail-title")!.textContent = currentDetail.name;
    (document.querySelector(".detail-link")! as HTMLLinkElement).href =
      currentDetail.link;
    document.querySelector(".detail-text")!.innerHTML = currentDetail.desc
      .map(
        (item) =>
          `<div>${item
            .map(
              (item2) =>
                `<div class="slide-in-line"><div class="slide-in-line-child">${item2}</div></div>`
            )
            .join("")}</div>`
      )
      .join("");
  }
  showInteractHint() {
    document.querySelector(".interact-hint")?.classList.remove("hollow");
  }
  hideInteractHint() {
    document.querySelector(".interact-hint")?.classList.add("hollow");
  }
  showReturnHint() {
    document.querySelector(".return-hint")?.classList.remove("hollow");
  }
  hideReturnHint() {
    document.querySelector(".return-hint")?.classList.add("hollow");
  }
  showEffectSwitch() {
    document.querySelector(".effect-switch")?.classList.remove("hollow");
  }
  hideEffectSwitch() {
    document.querySelector(".effect-switch")?.classList.add("hollow");
  }
  handleAbout() {
    document.querySelector(".about-link")?.addEventListener("click", () => {
      this.openMenu();
    });

    document
      .querySelector(".about-return-link")
      ?.addEventListener("click", () => {
        this.closeMenu();
      });
  }
  disableSlider() {
    this.slider?.ws.disable();
    this.slider?.dd.disable();
  }
  enableSlider() {
    this.slider?.ws.enable();
    this.slider?.dd.enable();
  }
  get isAtDetailPage() {
    return !!this.currentActiveMesh;
  }
  openMenu() {
    if (this.isAnimatingMenu) {
      return;
    }

    if (!this.isAtDetailPage) {
      this.disableSlider();
    }

    const overlay = document.querySelector(".overlay") as HTMLElement;
    const overlayPath = document.querySelector(".overlay__path");

    const t1 = gsap.timeline({
      onStart: () => {
        overlay.style.pointerEvents = "auto";
      },
      onComplete: () => {
        this.isAnimatingMenu = false;
      },
    });

    this.isAnimatingMenu = true;
    t1.set(overlayPath, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })
      .to(
        overlayPath,
        {
          duration: 0.8,
          ease: "power4.in",
          attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        },
        0
      )
      .to(overlayPath, {
        duration: 0.3,
        ease: "power2",
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        onComplete: () => {
          document.querySelector(".about-page")?.classList.remove("hollow");
          this.slideInText(".about-page");
        },
      });
  }
  closeMenu() {
    if (this.isAnimatingMenu) {
      return;
    }

    if (!this.isAtDetailPage) {
      this.enableSlider();
    }

    const overlay = document.querySelector(".overlay") as HTMLElement;
    const overlayPath = document.querySelector(".overlay__path");

    const t1 = gsap.timeline({
      onStart: () => {
        overlay.style.pointerEvents = "none";
        document.querySelector(".about-page")?.classList.add("hollow");
      },
      onComplete: () => {
        this.isAnimatingMenu = false;
      },
    });

    this.isAnimatingMenu = true;
    t1.set(overlayPath, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
    })
      .to(overlayPath, {
        duration: 0.3,
        ease: "power2.in",
        attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
      })
      .to(overlayPath, {
        duration: 0.8,
        ease: "power4",
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      });
  }
  handleSliderDetail() {
    this.slider?.ig.iterate((maku) => {
      this.base.interactionManager.add(maku.mesh);
      // @ts-ignore
      maku.mesh.addEventListener("click", () => {
        // console.log(maku);

        if (Math.abs(this.slider!.ws.scroll.delta) > 5) {
          return;
        }

        const otherMakus = this.slider?.ig.makuGroup?.makus.filter(
          (item) => item !== maku
        );

        if (!this.currentActiveMesh) {
          this.disableSlider();
          this.hideInteractHint();
          this.hideEffectSwitch();

          otherMakus?.forEach((item) => {
            const material = item.mesh.material as THREE.ShaderMaterial;
            gsap.to(material.uniforms.uOpacity, {
              value: 0,
              ease: "power2.out",
            });
          });
          this.emit("hide-mask", 0.5);

          const that = this;
          const material = maku.mesh.material as THREE.ShaderMaterial;
          gsap.to(material.uniforms.uProgress, {
            value: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
            onUpdate() {
              if (this.progress() >= 0.5) {
                if (!that.currentActiveMesh) {
                  const detailId = Number(maku.el.dataset["entryId"]) - 1;
                  that.updateDetail(detailId);
                  that.showDetail();
                  that.showReturnHint();

                  //@ts-ignore
                  that.currentActiveMesh = maku.mesh;
                }
              }
            },
          });
          //@ts-ignore
          // this.currentActiveMesh = maku.mesh;
        }
      });
    });

    this.base.container.addEventListener("click", () => {
      if (this.currentActiveMesh) {
        this.hideDetail();
        this.hideReturnHint();

        const that = this;
        const material = this.currentActiveMesh
          .material as THREE.ShaderMaterial;
        gsap.to(material.uniforms.uProgress, {
          value: 0,
          duration: 1,
          ease: "power2.inOut",
          onUpdate() {
            if (this.progress() >= 0.5) {
              if (that.currentActiveMesh) {
                that.enableSlider();
                that.showInteractHint();
                that.showEffectSwitch();

                that.currentActiveMesh = null;
              }
            }
          },
        });
        this.slider?.ig.iterate((item) => {
          const material = item.mesh.material as THREE.ShaderMaterial;
          gsap.to(material.uniforms.uOpacity, {
            value: 1,
            delay: 0.5,
            ease: "power2.out",
          });
        });
        that.emit("show-mask");
        // this.currentActiveMesh = null;
      }
    });
  }
  createBlinkMenu() {
    let blinkTextMenuLinks = document.querySelectorAll(
      ".blink-text-menu .blink-text-menu-item a"
    );
    blinkTextMenuLinks.forEach((link) => {
      let letters = link.textContent?.split("");
      link.textContent = "";
      letters?.forEach((letter, i) => {
        i += 1;
        let span = document.createElement("span");
        let delay = i / 20;
        if (i % 2 === 0) {
          delay -= 0.1;
        } else {
          delay += 0.05;
        }
        let letterOut = document.createElement("span");
        letterOut.textContent = letter;
        letterOut.style.transitionDelay = `${delay}s`;
        letterOut.classList.add("out");
        span.append(letterOut);
        let letterIn = document.createElement("span");
        letterIn.textContent = letter;
        letterIn.style.transitionDelay = `${delay}s`;
        letterIn.classList.add("in");
        span.append(letterIn);
        link.append(span);
      });
    });
  }
  slideInText(container = "") {
    gsap.fromTo(
      `${container} .slide-in-line .slide-in-line-child`,
      { y: "100%", opacity: 1 },
      { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }
    );
  }
  slideOutText(container = "") {
    gsap.fromTo(
      `${container} .slide-in-line .slide-in-line-child`,
      { opacity: 1 },
      { opacity: 0, duration: 0.6, ease: "power2.out" }
    );
  }
  turnOnEffect() {
    this.emit("change-effect", "basic");
  }
  turnOffEffect() {
    this.emit("change-effect", "lowMotion");
  }
  handleEffectSwitch() {
    document
      .querySelector(".effect-switch-input")
      ?.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
          this.turnOffEffect();
        } else {
          this.turnOnEffect();
        }
      });
  }
}
