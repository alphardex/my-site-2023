import "@alphardex/aqua.css/dist/aqua.min.css";
import "./style.css";

import img1 from "/textures/shader-book.png";
import img2 from "/textures/xiamo.png";
import img3 from "/textures/kokomijs.png";
import img4 from "/textures/aquacss.png";

import Experience from "./Experience/Experience";
import { config } from "./config";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
<div id="sketch"></div>
<div class="loader-screen">
  <div class="loading-container">
    <div class="loading">
      <span style="--i: 0">L</span>
      <span style="--i: 1">O</span>
      <span style="--i: 2">A</span>
      <span style="--i: 3">D</span>
      <span style="--i: 4">I</span>
      <span style="--i: 5">N</span>
      <span style="--i: 6">G</span>
    </div>
  </div>
</div>
<div class="gallery">
  <img class="gallery-item" src="${img1}" crossorigin="anonymous" alt="" data-entry-id="3" />
  <img class="gallery-item" src="${img2}" crossorigin="anonymous" alt="" data-entry-id="2" />
  <img class="gallery-item" src="${img3}" crossorigin="anonymous" alt="" data-entry-id="1" />
  <img class="gallery-item" src="${img4}" crossorigin="anonymous" alt="" data-entry-id="4" />
</div>
<div class="fixed z-4 top-12 left-15 pointer-events-none">
  <div class="text-2xl font-bold text-white select-none">Haobin W.</div>
</div>
<div class="interact-hint fixed z-4 bottom-12 left-15 pointer-events-none">
  <div class="text-white select-none">Scroll or Drag</div>
</div>
<div class="return-hint fixed z-4 bottom-12 left-15 pointer-events-none hollow">
  <div class="text-white">←</div>
</div>
<div class="fixed z-4 top-12 right-15 cursor-pointer">
  <div class="about-link text-white select-none underline-flash">ABOUT</div>
</div>
<div class="detail absolute z-4 top-0 left-0 cover pointer-events-none hollow">
  <div class="absolute top-34 left-15 pointer-events-auto">
    <div class="flex flex-col space-y-6 max-w-90 text-white text-lg">
      <div class="detail-text flex flex-col space-y-6 leading-relaxed whitespace-no-wrap">
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍
          </div>
        </div>
      </div>
      <div>
        <a class="detail-link inline-flex underline-flash" href="https://github.com/alphardex" target="_blank">
          <div class="slide-in-line">
            <div class="slide-in-line-child">
              查看详情
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="absolute top-10 pointer-events-auto" style="left: 33rem;">
    <div class="slide-in-line">
      <div class="slide-in-line-child">
        <div class="detail-title text-4xl font-bold text-white">kokomi.js</div>
      </div>
    </div>
  </div>
</div>
<svg class="overlay" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path class="overlay__path" vector-effect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
</svg>
<div class="about-page absolute z-5 top-0 left-0 cover hollow">
  <div class="absolute top-12 right-15 cursor-pointer">
    <div class="about-return-link text-white select-none underline-flash">RETURN</div>
  </div>
  <div class="absolute top-12 left-15 pointer-events-none">
    <div class="text-2xl font-bold text-white select-none">Haobin W.</div>
  </div>
  <div class="absolute hv-center">
    <div class="space-y-6 text-white" style="max-width: 42rem;">
      <div class="text-xl leading-loose whitespace-no-wrap">
        <div class="slide-in-line">
          <div class="slide-in-line-child">我的名字是王浩彬，常用网名是 alphardex 。</div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">我是一位中国的前端开发工程师，主要擅长的技术是 WebGL、three.js、
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">Shader。平时喜欢用Shader来进行各种创意编程相关的开发，这个网站就</div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">是一个很好的例子。希望有朝一日能创造出全世界最酷的网站（大雾）。</div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            同时，我也是一个资深二次元宅，平时喜欢追番、玩主机游戏、收集美少女
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            插画、本子等。最喜欢的动画有《孤独摇滚》、《少女歌剧》等，最喜欢的
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">
            游戏有《异度神剑》系列、《艾尔登法环》、《原神》等。
          </div>
        </div>
        <div class="slide-in-line">
          <div class="slide-in-line-child">很高兴能认识你！</div>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-12 left-15">
    <div class="blink-text-menu text-white leading-relaxed">
      <div class="blink-text-menu-item">
        <a href="https://github.com/alphardex/" target="_blank">Github</a>
      </div>
      <div class="blink-text-menu-item">
        <a href="https://juejin.cn/user/4353721774401623" target="_blank">Juejin</a>
      </div>
      <div class="blink-text-menu-item">
        <a href="https://codepen.io/alphardex" target="_blank">CodePen</a>
      </div>
      <div class="blink-text-menu-item">
        <a href="https://bangumi.tv/user/399538" target="_blank">Bangumi</a>
      </div>
      <div class="blink-text-menu-item">
        <a href="mailto:2582347430@qq.com">Email</a>
      </div>
    </div>
  </div>
  <div class="absolute bottom-12 right-15">
    <div class="text-sm text-white leading-relaxed">
      <div>©2023 By alphardex</div>
      <div>
        <a target="_blank" href="https://icons8.com/icon/64794/source-code">Code</a> icon by <a target="_blank"
          href="https://icons8.com">Icons8</a>
      </div>
    </div>
  </div>
</div>
`;

const body = document.documentElement;
body.style.background = config.bgColor;

const loaderScreen = document.querySelector(".loader-screen") as HTMLElement;
loaderScreen.style.setProperty("--bg-color", config.bgColor);

new Experience("#sketch");
