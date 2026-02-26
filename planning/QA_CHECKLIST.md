# ✅ QA_CHECKLIST.md — 视觉对齐与质量验收清单

> **目标**: 确保最终实现的 Next.js 网站与 [design-preview.html](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/design-preview.html) 达到 1:1 的视觉一致性，并满足 PRD 的工程要求。

---

## 1. 核心视觉 (Core Visuals)
- [ ] **全局噪点 (Grain)**: 噪点是否覆盖全屏？透明度是否合适 (建议 0.05)？
- [ ] **颜色偏差**: 暖白色背景 `#FAF9F5` 是否准确？紫色 `#C8C2E7` 是否有过度饱和？
- [ ] **圆角与间距**: 大卡片圆角必须为 24px，严禁混入 4px/8px 工业圆角。

---

## 2. 交互体验 (Interaction)
- [ ] **Sand 粒子**: 鼠标排开沙粒的物理感是否平滑？移动端是否已降级粒子数量？
- [ ] **蝴蝶动效**: 
  - [ ] 首页两只蝴蝶是否呈 15°/-20° 倾斜？
  - [ ] 悬停时是否准确上浮 12px 并轻微放大？
- [ ] **About 模糊效果**: 兴趣卡片默认 15px 模糊，悬停时是否瞬间或平滑变清晰？
- [ ] **全局平滑**: 所有的 `:hover` 状态是否带有至少 300ms 的 transition？

---

## 3. 内容与数据 (Data & Content)
- [ ] **微信抓取**: 运行 `npm run build` 后，`Post` 页面是否展示了最新的公众号文章？
- [ ] **地图交互**: 点击图钉是否能在地图下方正确滑出对应的足迹卡片？图片是否加载成功？
- [ ] **自动画廊**: 增加一张图片到 `public/images/project/photography/` 后，页面是否自动渲染？

---

## 4. 终端/性能验证 (Performance & SEO)
- [ ] **Responsive**: 
  - [ ] Mobile: 导航是否变为汉堡菜单或底部浮动栏？
  - [ ] Tablet: 瀑布流列数是否从 3 降为 2？
- [ ] **SEO**: 每页是否都有独一无二的 `<title>` 和 `meta description`？
- [ ] **Images**: 所有的图片资产是否都是 `.webp`？控制台是否有由于图片过大导致的警告？
- [ ] **Console**: 首页 Canvas 渲染时是否有内存泄漏或报错？

---

## 5. 部署验收 (Deployment)
- [ ] **Open Graph**: 在微信/飞书分享链接，是否能看到漂亮的蝴蝶预览图？
- [ ] **404 Page**: 是否设计了符合“蜡笔风格”的 404 引导页？
