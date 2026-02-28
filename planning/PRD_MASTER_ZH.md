# 📜 PRD_ZH.md — 个人网站需求规格说明书 (中文版)

> **版本**: v1.3 | **最后更新**: 2026-02-26
> **状态**: **UI 设计已冻结**。代码开发的唯一依据是：`PRD_MASTER_ZH.md`, `DESIGN_SPEC.md`, `TECH_SPEC.md`, `IMPLEMENTATION_PLAN.md`, `DATA_SCHEMA.md`, `CONTENT_INVENTORY.md`。`design-preview.html` 仅作为**基础视觉美感参考**，禁止将其作为覆盖 PRD 逻辑的唯一真理。

---

## 1. 产品定义

### 核心理念
一个具有“呼吸感”、带有独特质感的个人数字领地，用于展示 Qicheng (Domino) 的创意作品、旅行足迹与思考。视觉风格深受 **人文主义极简 (Humanist Minimalism)**（类似 Claude 官网美学）启发。

---

## 2. 视觉一致性要求 (严格对齐)

### 2.1 CSS 样式标记 (必须匹配预览版)
```css
:root {
  --color-primary:    #C8C2E7;  /* WONDERLAND 文字紫色 */
  --color-accent:     #B8D4B8;  /* 辅助淡绿色 */
  --color-bg:         #FAF9F5;  /* Claude 风格的暖白色底色 */
  --color-text:       #2D2D2D;  /* 核心文本色 */
  --color-hover-bg:   #F0EEE6;  /* 卡片悬停时的背景变色 */
  --shadow-card:      0 24px 48px rgba(0, 0, 0, 0.015); /* 极低不透明度的漫反射阴影 */
  --shadow-hover:     0 32px 64px rgba(200, 194, 231, 0.15);
  --radius-sm:        12px;     /* 内部小元素圆角 */
  --radius-md:        24px;     /* 结构卡片大圆角 */
  --radius-pill:      999px;    /* 标签/胶囊按钮圆角 */
}
```

### 2.2 全局视觉准则
- **标题规范**: 所有二级版块页面的主标题（Post, Project, Footprint, About）必须为**首字母大写且无标点后缀**（如 `Post` 而非 `Post.`），字色保持主题淡紫色（`var(--color-primary)`），并缩小字号层级避免抢夺卡片视觉核心。
- **卡片字体约束**: 全部卡片内部的 heading 标题严禁使用默认的无衬线字体。必须强制使用全局设置的 Slab Serif 衬线体 `var(--font-secondary)`，并将字重放宽至 600（非加粗），同时配合 `clamp()` 限制最大宽度，以确保卡片呼吸感。
- **反模版约束**: 严禁使用 0px/4px/8px 这类工业感圆角。严禁使用细线条轮廓图标（应使用 **实心 SVG** 图标）。
- **背景纹理**: 
  - 全局覆盖微弱的颗粒（Grain/Noise）噪点，营造类似蜡笔/纸张的纸手感。
  - 全局应用流沙粒子背景（Sand Effect），由原本的单首页展示提升为贯穿所有页面的基础底面组件（无视路由切换持续运转，基于 Canvas 实现）。

---

## 3. 交互与工程逻辑

### 3.1 背景与首页动效
- **文案与布局约束**: 标题区仅保留 `Welcome to my WONDERLAND.`（无需任何前置招呼语）。受上方悬浮导航栏遮挡影响，为避免视觉重心下坠，主栅格容器强制执行 `-120px` 的纵向负向补偿。
- **流沙效果 (Sand Effect)**: 背景布满高密度细微粒子。鼠标移动时会排开沙粒，且碰撞处透明度提升 50%。
- **由于对蝴蝶 (Butterfly Pair)**: 一一大（右侧倾斜15°）一小（更靠右倾斜-20°）。边缘需具备蜡笔样式的模糊（Crayon Blur）滤镜感。
- **独立悬停**: 鼠标指向某只蝴蝶时，该蝴蝶独立产生 translateY(-12px) 上浮、缩放 (1.05) 及旋转偏移。

### 3.2 自动化内容抓取 (Post 页面)
- **数据源**: 微信公众号“岱月社”。
- **工程逻辑**: 编写 Node.js 脚本在构建时抓取文章题目、封面图和 URL。
- **输出**: 保存至本地 `public/content/wechat-posts.json`。
- **UI**: 瀑布流 (Masonry) 布局。卡片默认白色，悬停变为 `#f0eee6`。**悬停时不产生位移或放大**。

### 3.3 动态项目与图集 (Project 页面)
- **置顶项目**: 上下布局（顶部为大尺寸 cover 并在淡紫色背景舞台展示 + 底部为描述文字）。悬停时平滑切换图像。
- **项目轮播**: 位于置顶项目下方，使用横向弹性滑动（Carousel / flex overflow-x）展示 podcast 与图集项目。**严禁在顶层 Project 页使用全屏瀑布流。**
- **摄影/草图**: 点击对应卡片进入相应的 **二级瀑布流图集页**。
  - **自动扫描**: 页面逻辑需自动读取 `/public/images/project/[分类]/` 下的所有图片资产。
  - **画廊交互**: 支持点击图片进入沉浸式全屏查看模式 (Lightbox)。

### 3.4 交互式地图 (Footprint 页面)
- **引擎**: Leaflet.js。
- **视觉风格**: **灰白极简底图与高亮原色点缀**。
  - **底图 (Tiles)**：强制为灰白（Grayscale Minimalist）。
  - **图针与气泡 (Markers & Popups)**：图针发光点和气泡中的文字标题使用主题淡紫色 (`var(--color-primary)`)。气泡中的快照保留**原图本来色彩**。
- **边界约束**: 
  - **缩放范围**: 最小缩放级别必须正好适配全球范围且固定不可滑动；最大缩放级别限制为城市细节级。
  - **平移限制**: 不允许无限左右循环滑动（`no wrap`）。
- **交互逻辑**: 点击图钉 (Pin) -> 弹出式气泡（Popup）呈现**地名**与**城市快照**（此处**不显示描述文字**）。
- **数据统计**: 在页面中动态展示已点亮的“国家/城市”总数。
  - **字体要求**: 与页面大标题一致（`var(--font-secondary)`，Semi-bold）。
  - **位置布局**: 紧贴地图下方，位于感性文字描述（Small Prose）的上方，作为地图与文字之间的过渡。

### 3.5 关于与兴趣 (About 页面)
- **简历模块 (Hero Section)**: 
  - **布局**: 左侧显示双态 Hover 的个人头像卡片 (Avatar Box, 1:1 Aspect Ratio)，右侧显示 "About Me" 简历富文本描述。桌面端两列网格布局 (`4fr 6fr`)，带有宽裕的 Grid Gap (64px)。
- **兴趣模块 (Interests and Hobbies)**:
  - **结构**: 位于简介下方，使用一条 Subtle Bottom Border 进行切分。
  - **布局**: 横向排列的水平滑动容器 (Flex, `overflow-x: auto`)，每个兴趣卡片为一个 320px 宽的定宽元素，背景底色使用主题副色 (`#f0eee6`)。
  - **遮罩交互**: 图片默认带有 **15px 高强度模糊 (Blur)**，并隐藏标题。鼠标悬停时模糊消除（Blur变0），标题向上浮动显示。
  - **文案呈现**: 点击某张兴趣长图后，下方预留的带投影的容器将激活动画，展开显示兴趣具体描述段落文字。
- **底部联系方式 (Contact Section)**:
  - 位于页面底部。左侧居下写“Contact Me >”，右侧横向排布一排社交图标链接。
  - 必须且仅能使用高品质 **实心纯色 SVG 图标**。图标附有简洁的微缩放/颜色渐变 Hover 实效。


---

## 4. 技术栈与部署规范

### 4.1 技术选型
- **框架**: Next.js 14+ (App Router), TypeScript.
- **样式**: Vanilla CSS / CSS Modules (严格禁止使用 TailwindCSS)。

### 4.2 资产与性能
- **格式**: 所有图像资产优先使用 [.webp](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/public/images/about/avatar/avatar-1.webp)。
- **SEO**: 使用本地 JSON 和 Markdown 管理内容，确保极致的加载速度和 SEO 支持。

### 4.3 部署 (CI/CD)
- **平台**: **Vercel** (静态生成 SSG)。
- **流程**: GitHub Push 代码后触发自动构建。
- **优化**: 部署时需开启 Vercel 的图像自动优化功能。

---
