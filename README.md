# 🎨 Qicheng's Wonderland — 个人主页 v1.0

> **欢迎来到我的奇境**。这是一个高度定制化的个人网站，集成了自动化社交动态抓取、动态视觉特效及深度的多媒体内容展示。

---

## ✨ 核心特性

- **🌊 动态背景**：首页采用 Canvas 2D API 驱动的高密度“流沙”粒子系统。沙粒会随鼠标移动产生逼真的排开与加速物理反应。
- **🦋 视觉细节**：具备蜡笔风格滤镜（Crayon Filter）的动态蝴蝶，支持独立悬停交互，为平静的背景注入生命力。
- **📦 自动化文章流 (Post)**：
  - 自研 Node.js 爬虫脚本，在打包时自动同步微信公众号“岱月社”内容。
  - **智能过滤**：自动识别并跳过后台已删除的文章，确保始终抓取最新的 10 篇有效内容。
  - **极致视觉**：采用 Masonry 瀑布流布局，仅保留封面、标题与日期，剔除一切杂质。
- **📽️ 项目舞台 (Project)**：
  - **双图 Featured 排版**：重点项目支持悬停图像切换（Base/Hover），在淡紫色舞台背景中极简呈现。
  - **弹性轮播 (Carousel)**：下方项目组支持水平 Flex 滑动，适配多种显示设备。
- **🗺️ 足迹地图 (Footprint)**：基于 Leaflet.js 的极简白灰风交互式地图，自动统计打过的国家与城市数量。
- **🎭 关于我 (About)**：独特的“模糊->清晰”遮罩交互，引导访客通过交互探索我的兴趣与世界。
- **🎞️ 全局动效**：基于 Framer Motion 的全站页面无缝淡入淡出 (Fade-in) 切换效果。

---

## 🛠️ 技术栈

- **前端框架**：Next.js 14 (App Router)
- **数据层**：纯 JSON 数据驱动 (`public/content/`)，无中央数据库，极大简化运维与多端同步。
- **样式方案**：Vanilla CSS Modules（杜绝冗余代码，极致定制化）。
- **动画引擎**：Framer Motion + Canvas API。
- **数据处理**：Axios (爬虫) / Sharp (图片自动 WebP 压缩)。
- **基础设施**：Vercel 部署 + Google Fonts (Hepta Slab / Afacad / Inter)。

---

## 🚀 开发者指南

### 环境准备

1.  **安装依赖**：
    ```bash
    npm install
    ```
2.  **配置环境变量**：
    创建 `.env` 文件并填入以下微信爬虫凭证（用于 `prebuild` 阶段的文章同步）：
    ```env
    WECHAT_BIZ=Mzg4OTUxODMyOQ==
    WECHAT_TOKEN=你的TOKEN
    WECHAT_COOKIE=你的COOKIE
    ```

### 开发环境运行

```bash
npm run dev
```

### 构建与抓取

执行 build 命令时，系统会自动运行 `prebuild` 脚本触发爬虫同步最新内容：

```bash
npm run build
```

---

## 📂 目录结构预览

- `src/app/`：Next.js 页面逻辑与布局。
- `src/components/`：核心 UI 组件（首页粒子、蝴蝶、导航、轮播、地图等）。
- `src/lib/data.ts`：集中式数据加载器，网站唯一的内容入口。
- `public/content/`：核心内容源（JSON 格式），包含：
    - `site-config.json`：全站配置与社交链接。
    - `projects.json`：项目/播客详情。
    - `wechat-posts.json`：构建时生成的微信文章列表。
- `scripts/crawler.js`：微信内容自动化同步引擎。

---

## 📜 许可证

© 2026 Qicheng (Domino). 保留所有权利。