# 📜 PRD_ZH.md — 个人网站需求规格说明书 (中文版)

> **版本**: v1.3 | **最后更新**: 2026-02-26
> **状态**: **UI 设计已冻结**。后续所有代码实现必须严格还原 [design-preview.html](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/design-preview.html) 的美学风格与交互逻辑。

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
- **标题规范**: 所有版块标题（Post, Project, Footprint）必须保持**首字母大写**。
- **反模版约束**: 严禁使用 0px/4px/8px 这类工业感圆角。严禁使用细线条轮廓图标（应使用 **实心 SVG** 图标）。
- **背景纹理**: 全局覆盖微弱的颗粒（Grain/Noise）噪点，营造类似蜡笔/纸张的纸手感。

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
- **摄影/草图**: 点击对应卡片进入相应的 **二级瀑布流图集页**。
  - **自动扫描**: 页面逻辑需自动读取 `/public/images/project/[分类]/` 下的所有图片资产。
  - **画廊交互**: 支持点击图片进入沉浸式全屏查看模式 (Lightbox)。

### 3.4 交互式地图 (Footprint 页面)
- **引擎**: Leaflet.js 配搭 CartoDB Positron 浅灰风格主题。
- **数据源**: [/content/footprint/locations.json](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/content/footprint/locations.json)。
- **逻辑**: 点击图钉 (Pin) -> 在地图下方滑出详情卡片。详情卡片不包含灰色文字描述，仅展示关联图片及跳转链接。

### 3.5 关于与兴趣 (About 页面)
- **兴趣模块 (Hobby Grid)**: 横向排列的 Flex 卡片组。
- **遮罩交互**: 图片默认带有 **15px 高强度模糊 (Blur)**。只有鼠标悬停时才变为清晰。
- **文案呈现**: 点击某张图片后，下方的固定文本框更新显示对应的文字介绍。
- **联系方式**: 必须且仅能使用高品质 **实心 SVG 图标**。

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

## 5. 实现“诫命”
所有代码开发阶段必须将 **[planning/design-preview.html](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/design-preview.html)** 视为唯一的“事实真相源”。任何素材来源、布局比例、间距大小（如 24px/64px）以及贝塞尔动画曲线必须做到 1:1 复刻。
