# 🛠️ TECH_SPEC.md — 技术架构与工程细节

> **状态**: 归档 | **关联文档**: [PRD_MASTER.md](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/PRD_MASTER.md)
> 本文档定义了项目的目录结构、数据模型、自动化流程及关键代码实现的工程细节。

---

## 1. 目录结构 (Folder Structure)

```text
/
├── components/          # 共享 UI 组件
│   ├── shared/          # Navbar, Footer, TextureOverlay (Noise/Grain)
│   ├── home/            # SandEffect (Canvas), Butterfly (SVG)
│   ├── projects/        # CrayonCard, GalleryViewer
│   └── footprint/       # InteractiveMap (Leaflet)
├── content/             # 核心数据源 (JSON / Markdown)
│   ├── projects.json    # 项目列表数据
│   └── footprint/       # locations.json (足迹坐标)
├── lib/                 # 核心逻辑与工具函数
│   ├── data-loader.ts   # 封装 fs.readFileSync 的静态生成函数
│   └── constants.ts     # 定义 DESIGN_SPEC 中的颜色与变量
├── public/              # 静态资产
│   ├── images/          # 所有的项目/个人图片资产
│   └── content/         # (由脚本生成) wechat-posts.json
├── scripts/             # 构建辅助脚本
│   └── crawler.js       # 微信公众号自动化抓取逻辑
├── styles/              # 全局 CSS 变量与重置
└── types/               # TypeScript 类型定义
```

---

## 2. 数据模型 (Data Schemas)

### 2.1 微信卡片 (`wechat-posts.json`)
```json
[
  {
    "id": "unique-hash",
    "title": "文章标题",
    "cover": "/images/covers/xxx.webp",
    "url": "https://mp.weixin.qq.com/...",
    "publishDate": "2024-02-26"
  }
]
```

### 2.2 项目详情 (`projects.json`)
```json
[
  {
    "id": "project-slug",
    "type": "Featured | Photography | Sketch",
    "title": "项目名称",
    "desc": "简短描述",
    "cover": "/images/project/xxx.webp",
    "images": ["/images/project/category/1.webp", "..."]
  }
]
```

---

## 3. 关键逻辑实现 (Core Engineering)

### 3.1 微信文章自动化抓取 (Scripts)
- **实现方式**: `scripts/crawler.js` 
- **方案**: 采用微信后台管理接口 `appmsgpublish` 直连模式。利用管理员 Cookie 与 Token 在打包时获取官方数据流。
- **纯净方案**: 脚本仅抓取 **标题、封面、原始链接、发布日期**，严格过滤正文摘要 (Excerpt) 与分类标签 (Tags) 以保持 UI 呼吸感。
- **触发**: 在 `package.json` 的 `prebuild` 钩子中运行：`"build": "npm run prebuild && next build"`。

### 3.2 文件夹自动扫描 (Directory API)
- **痛点**: `Photography` 页面图片太多，手动配置 JSON 太累。
- **方案**:
  - 编写一个 Node.js 通用函数，利用 `fast-glob` 扫描特定子目录下的 `.webp` 文件。
  - 在 `getStaticProps` (Page Router) 或直接在 Server Component (App Router) 中调用。

### 3.3 粒子系统 (Sand Canvas)
- **技术**: `Canvas 2D API`。
- **优化**: 
  - 使用 `requestAnimationFrame` 驱动。
  - 检测用户硬件：如果为移动端或低功耗模式，降低粒子密度 (5000 -> 1000) 以保证帧率。

---

## 4. 部署与 CI (Deployment)

- **主干**: `main` 分支。
- **平台**: **Vercel**。
- **环境变量**: 
  - `WECHAT_CRAWLER_ENABLED`: 构建时是否抓取。
- **缓存**: 利用 Vercel 的 Data Cache 缓存抓取到的图片 assets。

---

## 5. 性能指标 (Performance Gates)
- **LCP**: < 1.5s (通过 WebP 与 Next/Image 实现)。
- **Bundle Size**: 减少第三方库，Leaflet 仅在 `Footprint` 页面动态导入。
