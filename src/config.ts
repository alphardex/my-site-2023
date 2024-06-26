const config = {
  bgColor: "#202027",
  gallery: [
    { id: "3", url: "./textures/shader-book.png" },
    { id: "2", url: "./textures/xiamo.png" },
    { id: "1", url: "./textures/kokomijs.png" },
    { id: "4", url: "./textures/aquacss.png" },
  ],
  details: [
    {
      name: "kokomi.js",
      link: "https://github.com/alphardex/kokomi.js",
      // desc: [
      //   "一个基于 three.js 的3D框架。它封装了很多实用的组件，能极大地助力 three.js 的开发。",
      //   "主要技术：three.js、GLSL",
      //   "主要担当：框架整体的开发",
      //   "项目特色：",
      //   "1. 组件化开发，能让每个组件保存自己的状态，很方便地实现功能的复用。",
      //   "2. 内置很多开箱即用的组件，例如素材加载器、画廊组件、渲染材质组件等。",
      // ],
      desc: [
        [
          "一个基于 three.js 的3D框架。它封装了很多",
          "实用的组件，能极大地助力 three.js 的开发。",
        ],
        ["主要技术：three.js、GLSL"],
        ["主要担当：框架整体的开发"],
        [
          "项目特色：",
          "1. 组件化开发，能让每个组件保存自己的状",
          "态，很方便地实现功能的复用。",
          "2. 内置很多开箱即用的组件，例如素材加载",
          "器、画廊组件、渲染材质组件等。",
        ],
      ],
    },
    {
      name: "夏末",
      link: "https://www.xiamo.fun/",
      // desc: [
      //   "一个极简的在线 3D 建模与渲染工具，基于 web 端的 3D 内容创作平台，面向创作者，提供 3D 创作全流程功能，实现更简单、易用的高质量创作。",
      //   "主要技术：three.js、Raymarching",
      //   "主要担当：SDF 算法部分的实现",
      //   "项目特色：",
      //   "1. SDF 建模，不同于传统的建模，通过拖拉、组合等操作，更直观的进行 3D 创作。",
      //   "2. PBR 模块化渲染， 基于物理的高质量实时渲染。",
      // ],
      desc: [
        [
          "一个极简的在线 3D 建模与渲染工具，基于",
          "web 端的 3D 内容创作平台，面向创作者，",
          "提供 3D 创作全流程功能，实现更简单、易用",
          "的高质量创作。",
        ],
        ["主要技术：three.js、Raymarching"],
        ["主要担当：SDF 算法部分的实现"],
        [
          "项目特色：",
          "1. SDF 建模，不同于传统的建模，通过拖",
          "拉、组合等操作，更直观的进行 3D 创作。",
          "2. PBR 模块化渲染， 基于物理的高质量实时",
          "渲染。",
        ],
      ],
    },
    {
      name: "Shader魔法指南",
      link: "https://juejin.cn/book/7267462574734573604",
      // desc: [
      //   "一个能帮你入门 Shader 编程的小册，从基础案例到项目实战，手把手教你学会 Shader。",
      //   "章节数：17 小节",
      //   "涉及技术：GLSL、three.js、Web开发",
      //   "适宜人群：",
      //   "想做出一个与众不同、富有个性的网站的你；",
      //   "利用 WebGL、three.js 等技术开发3D应用或游戏的你；",
      //   "做过数据可视化，想让结果更加酷炫的你；",
      //   "对创意编程、特效创作感兴趣的你。",
      // ],
      desc: [
        [
          "一个能帮你入门 Shader 编程的小册，从基础",
          "案例到项目实战，手把手教你学会 Shader。",
        ],
        ["章节数：17 小节"],
        ["涉及技术：GLSL、three.js、Web开发"],
        [
          "适宜人群：",
          "想做出一个与众不同、富有个性的网站的你；",
          "利用 WebGL、three.js 等技术开发 3D 的你；",
          "做过数据可视化，想让结果更加酷炫的你；",
          "对创意编程、特效创作感兴趣的你。",
        ],
      ],
    },
    {
      name: "aqua.css",
      link: "https://github.com/alphardex/aqua.css",
      // desc: [
      //   "一个精致的纯 CSS 框架，没有任何 JS。",
      //   "主要技术：CSS",
      //   "主要担当：框架整体的开发",
      //   "易用：诸如 React、Vue 之类框架一概不需掌握，参照组件 demo 复制粘贴就能跑出效果来。并且丰富的工具类能帮助你快速实现想要的效果。",
      //   "易定制：阅读项目源码你会发现许多 CSS 变量，它们往往决定了组件的色彩，如果你想“换肤”，只需用不同的变量覆盖即可。",
      //   "有趣：本项目用到了很多有趣且实用的 CSS 技巧，非常适合学习。",
      // ],
      desc: [
        ["一个精致的纯 CSS 框架，没有任何 JS。"],
        ["主要技术：CSS"],
        ["主要担当：框架整体的开发"],
        [
          "易用：诸如 React、Vue 之类框架一概不需",
          "掌握，参照 demo 复制粘贴就能跑出效果来。",
        ],
        [
          "易定制：阅读源码你会发现许多 CSS 变量，",
          "如果你想“换肤”，只需用变量覆盖即可。",
        ],
        ["有趣：本项目用到了很多有趣且实用的 CSS", "技巧，非常适合学习。"],
      ],
    },
  ],
  about: {
    desc: [
      "我的名字是王浩彬，常用网名是 alphardex 。",
      "我是一位中国的前端开发工程师，主要擅长的技术是 WebGL、three.js、",
      "Shader。平时喜欢用 Shader 来进行各种创意编程相关的开发，这个网站就",
      "是一个很好的例子。希望有朝一日能创造出全世界最酷的网站（大雾）。",
      "同时，我也是一个资深二次元宅，平时喜欢追番、玩主机游戏、收集美少女",
      "插画、本子等。最喜欢的动画有《孤独摇滚》、《少女歌剧》等，最喜欢的",
      "游戏有《异度神剑》系列、《艾尔登法环》、《原神》等。",
      "很高兴能认识你！",
      "（PS：如果不适应该网站的特效，可以点击右下角的开关关闭它）",
    ],
    socialLinks: [
      { name: "Blog", url: "https://alphardex.github.io/mygo/" },
      { name: "Github", url: "https://github.com/alphardex/" },
      { name: "Juejin", url: "https://juejin.cn/user/4353721774401623" },
      { name: "CodePen", url: "https://codepen.io/alphardex" },
      { name: "Twitter", url: "https://twitter.com/alphardex007" },
      { name: "Bangumi", url: "https://bangumi.tv/user/399538" },
      { name: "Email", url: "mailto:2582347430@qq.com" },
      { name: "RSS", url: "https://haobinwang-2023.netlify.app/rss.xml" },
    ],
  },
};

const effectConfig = {
  basic: {
    rippleStrength: 1,
    RGBShiftStrength: 1,
    distortX: 1.2,
    distortZ: 1.6,
  },
  lowMotion: {
    rippleStrength: 0,
    RGBShiftStrength: 0,
    distortX: 0,
    distortZ: 0,
  },
};

export { config, effectConfig };
