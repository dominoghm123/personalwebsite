# 📊 DATA_SCHEMA.md — 数据契约与内容规范

> **Status**: **规划中 (Planning)** | **Version**: v1.0
> 本文档定义了网站核心 JSON 数据的结构以及媒体资产的处理规范，确保开发过程中数据流动的准确性。

---

## 1. 核心 JSON 数据结构

### 1.1 微信文章索引 (`content/wechat-posts.json`)
由抓取脚本自动生成。
```json
{
  "posts": [
    {
      "id": "string (unique)",
      "title": "string (文章标题)",
      "cover": "string (封面图 URL/路径)",
      "url": "string (原始微信链接)",
      "tags": ["string"],
      "excerpt": "string (摘要)",
      "publishDate": "string (YYYY-MM-DD)"
    }
  ]
}
```

### 1.2 足迹数据 ([content/footprint/locations.json](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/content/footprint/locations.json))
```json
{
  "locations": [
    {
      "id": "string (city-id)",
      "cityName": "string",
      "coords": [lat, lng],
      "mainImage": "string (相对于 public 的路径)",
      "articleLink": "string (可选关联文章 URL)"
    }
  ]
}
```

### 1.3 项目数据 (`content/projects.json`)
作为首页 Carousel 和 Featured 的核心索引。
```json
{
  "featured": {
    "id": "urban-aesthetics",
    "title": "From Alleys to Aesthetics",
    "description": "I built the guide on the belief that 'Our wealth hides in daily familiarity.'",
    "images": {
      "base": "/images/project/urban-aesthetics-guide/booklet-shanghai-playbook-cover.webp",
      "hover": "/images/project/urban-aesthetics-guide/booklet-shanghai-playbook-2.webp"
    },
    "link": "https://payhip.com/..." 
  },
  "carousel": [
    {
      "id": "podcast",
      "title": "Podcast: Theroversays",
      "thumbnail": "/images/project/podcast/podcast_cover.webp",
      "description": "A solo podcast centred around travel narratives. Principle: 'To nurture imagination for the unfamiliar; our wealth lies in observation.'",
      "externalUrl": "https://www.xiaoyuzhoufm.com/podcast/63b53f37a7b161b6b921c84d"
    },
    {
      "id": "sketches",
      "title": "Illustration Sketches",
      "thumbnail": "/images/project/illustration-sketches/sketch-1.webp",
      "type": "gallery",
      "category": "illustration-sketches"
    },
    {
      "id": "photography",
      "title": "Photography",
      "thumbnail": "/images/project/photography/12.webp",
      "type": "gallery",
      "category": "photography"
    }
  ]
}
```

### 1.4 兴趣模块数据 (`content/about/hobbies.json`)
支撑关于页的“遮罩交互”。
```json
{
  "hobbies": [
    {
      "id": "music",
      "title": "Music",
      "image": "/images/about/hobbies/music/IMG_20251212_162426.webp",
      "description": "Music is an essential part of my life. I am passionate about attending live performances in various places."
    },
    {
      "id": "solotrip",
      "title": "Solo Trip",
      "image": "/images/about/hobbies/solotrip/IMG_20251223_183207_1.webp",
      "description": "I am an avid solo travel enthusiast. I hope that one day, I can fly close to the ground, completing a journey of self-discovery."
    },
    {
      "id": "self-expression",
      "title": "Expression",
      "image": "/images/about/hobbies/self-expression/mmexport1764560632475.webp",
      "description": "I am dedicated to exploring different forms of self-expression. Text and audio have both been avenues I've explored extensively."
    }
  ]
}
```

### 1.5 全局站点配置 (`content/site-config.json`)
```json
{
  "siteName": "Official Design Preview | Qicheng Domino",
  "about": {
    "bio": "Hi I'm Qicheng — a builder, designer, writer, and wanderer. This site is my Wonderland — a place to collect thoughts and share work.",
    "avatar": {
      "base": "/images/about/avatar/avatar-2.webp",
      "hover": "/images/about/avatar/avatar-1.webp"
    }
  },
  "contacts": [
    { "platform": "Email", "value": "ANNApipedream@gmail.com", "icon": "ri-mail-fill" },
    { "platform": "Rednote", "url": "https://xhslink.com/m/1oSmWcMMIZm", "icon": "ri-rednote-fill" },
    { "platform": "Instagram", "url": "https://www.instagram.com/imdomino76", "icon": "ri-instagram-fill" },
    { "platform": "X", "url": "https://x.com/Dianaghm1298", "icon": "ri-twitter-x-fill" },
    { "platform": "Linkedin", "url": "https://www.linkedin.com/in/qicheng-dai-a8b07a273", "icon": "ri-linkedin-fill" }
  ]
}
```

---

## 2. 媒体资产规范 (Asset Standards)

### 2.1 图像处理
- **格式**: 强制使用 [.webp](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/public/images/project/photography/8.webp)。
- **尺寸**:
    - **Hero/Featured Logo**: 1200px+。
    - **Card/Hobby**: 600px+。
- **存储路径**:
    - `public/images/project/` - 项目/画廊/Podcast 封面图。
    - `public/images/footprint/` - 足迹图。
    - `public/images/about/` - 头像与 Hobbies/Avatar 素材。

### 2.2 命名约定与排序
- **命名**: 小写字母 + 连字符 (e.g., `my-photo.webp`)。
- **画廊逻辑**: 二级页通过扫描 `public/images/project/[category]/` 自动生成。图片需带两位数字前缀控制顺序 (`01-xx.webp`)。

---

## 3. 内容源管理 (Content Sourcing)
- **Markdown**: `content/**/*.md`。
- **静态扫描 (Auto-Scan)**: 
  - **画廊页**: 构建时深度读取指定目录。
  - **WeChat**: 调用构建脚本抓取并生成 `public/content/wechat-posts.json`。

