# ⚡ IMPLEMENTATION_PLAN_OPTIMIZED.md — 高效开发实施计划 (缩短工期版)

> **Status**: **规划优化中 (Optimized)** | **Version**: v1.1
> **核心策略**：通过并行开发、复用预览版逻辑、以及优先交付 MVP (最少可行性产品) 来极大缩短开发周期。

---

## 🚀 第一步：核心骨架与视觉复刻 (Core & Visuals - 并行)
*策略：直接将 [design-preview.html](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/design-preview.html) 验证过的 CSS 和 Canvas 逻辑组件化，快速铺满首页。*

- [ ] **Next.js & Global Layout**: 快速搭建 Next.js 骨架，同步完成 `TextureOverlay` 和 `Navbar`（2小时内容）。
- [ ] **视觉逻辑迁移 (Visual Porting)**:
    - [ ] 直接迁移 Sand 粒子代码至 React Canvas 组件。
    - [ ] 封装 Butterfly SVG 为独立 React 组件（带 Crayon Filter）。
- [ ] **页面切换 (Fast Routes)**: 使用 `framer-motion` 全局配置页面淡入淡出。

## ⛓️ 第二步：数据驱动与自动化 (Data & Automation - 核心)
*策略：取消复杂的数据库，直接采用“本地文件系统即数据库”的思路，简化权限与部署。*

- [ ] **通用数据加载器 (Single Logic)**: 编写一个统一的 `getStaticProps` 逻辑，用于读取 `public/content/` 下的所有 JSON。
- [ ] **微信抓取脚本 (scripts/crawler.js)**: 在构建脚本中加入一行命令，自动从公众号获取内容。
- [ ] **Post 瀑布流组件**:
    - [ ] 基于 React 纯 CSS Column 分配制作流式的 Masonry 卡片网络，并引入 `Hepta Slab` 卡片专属字体响应约束。
- [ ] **Project 特型舞台**:
    - [ ] 开发高度还原的 `FeaturedProject`（悬停换图）与横向拉拽的 `ProjectCarousel`（弹性滑动），彻底废弃标准版栅格机制。

## 📸 第三步：多媒体系统 (Multis & Map) [DONE]
*策略：通过文件夹动态扫描 (Directory Scanning) 替代手动录入，减少后续维护工作。*

- [x] **动态分类路由 (`/project/[category]`)**: 
    - [x] 自动扫描 `public/images/project/[category]` 下的所有 WebP 图片。
    - [x] 使用 CSS Columns 渲染 Masonry 图集。
- [x] **沉浸式 Lightbox**:
    - [x] 开发 `Lightbox.tsx` 通用组件，支持全屏遮罩、键盘 ESC 退出。
    - [x] 支持在图集中通过箭头（或物理按键）前后无缝切换图片。
- [x] **足迹互动 (Footprint Map)**:
    - [x] 接入 Leaflet.js 并加载 `locations.json`。
    - [x] **视觉重构**: 切换为灰白极简风格，锁定全球视野范围 (Max Bounds)。
    - [x] **交互简化**: 去除 Popup 描述，仅保留快照与地名。
    - [x] **动态统计**: 实现地图与文字之间的统计看板（国家/城市计数）。
- [ ] **Hobbies 特效**: 集中攻克“模糊->清晰”的遮罩逻辑组件。

## 🛸 第四步：体验打磨与一键部署 (Polish & Ship)
*策略：跳过过度优化，直接上线，利用 Vercel 本身的性能优势。*

- [ ] **全局 SEO & Meta**: 快速填充 metadata。
- [ ] **Vercel 一键上线**: 配置 GitHub Action 自动部署。

---

### ⏱️ 为什么这份计划更快？
| 优化点 | 传统方案 | 优化方案 | 节省成本 |
| :--- | :--- | :--- | :--- |
| **样式** | 重新编写 CSS | **1:1 迁移预览版 CSS 到 CSS Modules** | ⬇️ 40% 时间 |
| **数据** | 后端 API + 数据库 | **本地 JSON + 文件夹动态扫描** | ⬇️ 60% 时间 |
| **动效** | 逐一调试 | **直接复用验证过的 Bezier 曲线和 Canvas 帧逻辑** | ⬇️ 30% 时间 |
| **开发顺序** | 顺序串行 | **UI 迁移与数据脚本并行开发** | ⬇️ 2天工期 |

---

## ⚓ 快速通道 (Fast-Track Guidelines)
- **不纠结**: 遇到复杂动画，先实现视觉对齐，再优化性能。
- **不重写**: 如果预览版里的代码能跑，就不要在 React 里过度“重构”。
- **优先 Webp**: 图片不需要转换，开发前一次性用工具转好。
