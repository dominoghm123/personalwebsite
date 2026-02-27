# ADR-0002: 动画性能方案 — Canvas vs React State vs SVG

**日期**: 2026-02-27  
**状态**: Accepted

---

## 背景

首页流沙效果 (Sand Effect) 需要渲染 5000+ 粒子的实时位移；首页蝴蝶 (Butterfly) 需要手写质感的「蜡笔模糊」。需要决定不同动效的底层实现。

---

## 考虑过的方案

### 方案 A：React State 驱动 (HTML/SVG Nodes)
- 优点：符合 React 声明式思维，容易维护。
- 缺点：成千上万个粒子的更新会导致每一帧触发大量的 DOM Diff，在大屏高刷新率显示器上会出现严重卡顿。

### 方案 B：原生 Canvas 2D API (流沙专用)
- 优点：直接操作位图像素，性能极高；兼容性极广。
- 缺点：命令式编程而非声明式，需要手动处理 `requestAnimationFrame` 和清理机制。

### 方案 C：SVG Filters (蝴蝶质感专用)
- 优点：可以使用 `feTurbulence` 和 `feDisplacementMap` 模拟出真实的「蜡笔笔触」不规则感，远胜于普通的 CSS `blur()`。
- 缺点：滤镜复杂的 SVG 会增加 GPU 负载。

---

## 决定

> 📝 **由你来填写**：请说明你为什么认同「粒子用 Canvas，细节用 SVG Filter」的混合策略。

选择**方案 B+C**，因为 ____________________________________________________________________

---

## 代价

> 📝 **由你来填写**：这样做会增加代码复杂度（Canvas 命令式）还是维护难度？

________________________________________________________________________________________

---

## 参考

- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [SVG Filters 101](https://css-tricks.com/gulp-svg-sprites-and-icon-fonts-and-something-something-svg-filters/)
