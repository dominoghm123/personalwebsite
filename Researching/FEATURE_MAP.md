# 🗺️ FEATURE_MAP.md

> **Strategic Map: Feature Prioritization (MoSCoW)**
> 定义 1.0 版本核心功能与未来演进方向。

---

## 1. 🟥 Must Have (核心必选)
*   **Architecture:** 基于 Next.js (App Router) 及 TypeScript 的稳健底层。
*   **Static Sections:** 首页 (Home)、内容 (Post)、项目 (Project)、足迹 (Footprint)、关于 (About)。
*   **Responsive Layout (响应式兼容):** 
    *   遵循三端布局稿 (Desktop/Tablet/Mobile)。
    *   Mobile 端采用简洁的汉堡菜单或底部导航转换。
*   **Design System:** 全局 CSS 变量控制主色 (#C8C2E7) 与特定字体 (Hepta Slab / Afacad)。
*   **Content Display:**
    *   **Home:** 极简自述 + 右侧手绘插画 (Hover 时具有位移与旋转动效)。
    *   **Post:** 支持微信公众号长文链接的瀑布流 (Masonry) 布局。
    *   **Project:** 采用 "1 主 + 3 副" 的阶梯式层级布局；支持外部橱窗链接 (CTA 按钮)，用于引导付费资源（如图册购买）。
    *   **About:** 个人简介及分段展示真实的 Hobbies 照片（架子鼓、徒步摄影等）。
*   **Footprint Interaction (核心交互):** 
    *   静态地图底座叠加交互式 Marker。
    *   点击 Marker 触发联级显示：侧边或底部滑出详细路线图及关联社交动态。

---

## 2. 🟧 Should Have (重要建议)
*   **Global Ripple Background:** 全屏背景纹理层叠加鼠标跟随的轻柔波纹动效 (Canvas/WebGL 实现)。
*   **Asset Pipeline:** 自动化的图片处理——所有上传图片自动应用平滑圆角逻辑。
*   **Transitions:** 基于页面路由的淡入淡出动效。
*   **Context Management:** 离线内容的持久化读取逻辑。
*   **Article Scraper:** 自动抓取微信公众号文章的封面与摘要。
*   **Podcast Sync:** "漫游者说theroversays" RSS 自动抓取与展示。

---

## 3. 🟨 Could Have (锦上添花)
*   **Footprint V2:** 引入 MapLibre GL 实现真正的矢量 3D 地图缩放。
*   **Dark Mode:** 基于浅紫深度的平衡暗色模式。


---

## 4. ⬜ Won't Have (明确推迟)
*   **Backend CMS:** 初期不使用动态后台，通过本地 Markdown/JSON 管理。
*   **Live Location:** 不实现实时地理位置分享。
*   **Short-form Stream:** 初期暂不同步小红书等短内容流，专注于长文。
