# 🎨 DESIGN_SPEC.md — 视觉开发指南 (Source of Truth)

> **版本**: v1.1 | **基准**: [design-preview.html](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/design-preview.html) & [PRD_ZH.md](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/PRD_MASTER_ZH.md)
> **核心原则**: 还原“呼吸感”与“纸张质感”。严禁使用标准框架默认样式。

---

## 1. 全局设计定义 (Design Tokens)

### 1.1 核心色彩 (Color Tokens)
| 变量 | 值 | 类比/意义 |
| :--- | :--- | :--- |
| `--color-bg` | `#FAF9F5` | **核心底色**：暖白色纸张感，模拟 Claude UI 氛围 |
| `--color-primary` | `#C8C2E7` | **文字淡紫色**：用于 Logo、标题装饰、重点链接 |
| `--color-accent` | `#B8D4B8` | **辅助淡绿色**：用于次要图形组件 |
| `--color-text` | `#2D2D2D` | **主文字**：低对比度深灰，非纯黑 |
| `--color-text-muted`| `#888888` | **次要文字**：描述、辅助说明 |
| `--color-hover-bg` | `#F0EEE6` | **按压感**：卡片在鼠标滑过时的柔和背景色 |
| `--color-border` | `#E8E4F0` | **分割线**：极弱的边界线 |

### 1.2 字体与排版 (Typography)
- **标题 (Heading)**: `'Hepta Slab'`, serif. 
  - 特性: 重量感强，首字母大写。
- **界面与正文 (UI/Body)**: `'Afacad'`, sans-serif. 
  - 特性: 人文主义无衬线，现代感。
- **渲染设置**: `-webkit-font-smoothing: antialiased`。

### 1.3 表面与阴影 (Surfaces & Shadows)
- **默认阴影 (`--shadow-card`)**: `0 24px 48px rgba(0, 0, 0, 0.015), 0 4px 12px rgba(0, 0, 0, 0.01)`
- **悬停阴影 (`--shadow-hover`)**: `0 32px 64px rgba(200, 194, 231, 0.15), 0 8px 16px rgba(0, 0, 0, 0.02)`
- **圆角规范**: 
  - 内部元素 (`--radius-sm`): 12px
  - 结构卡片 (`--radius-md`): 24px
  - 标签胶囊 (`--radius-pill`): 999px

---

## 2. 交互与动画参数 (Motion & Physics)

### 2.1 核心曲线
- **通用平滑 (`--ease-out`)**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **页面淡入 (`pageFadeIn`)**: 
  - 关键帧: `opacity: 0 + translateY(10px)` -> `opacity: 1 + translateY(0)`
  - 时长: 500ms

### 2.2 蝴蝶悬停 (Butterfly Physics)
- **触发**: `Home` 页面 SVG 蝴蝶
- **变换**: `translateY(-12px)`, `scale(1.05)`, 旋转增加 `5°`
- **过渡**: `transform 0.6s var(--ease-out)`
- **滤镜**: `drop-shadow(0 16px 32px rgba(200, 194, 231, 0.3))`

---

## 3. 关键视觉特征实现 (Visual Features)

### 3.1 纸张噪点层 (Texture Overlay)
- **实现**: `position: fixed; inset: 0; pointer-events: none;`
- **SVG背景**:
  ```svg
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' />
  </filter>
  <rect opacity='0.05' filter='url(#n)' />
  ```

### 3.2 关于页趣味遮罩 (About Mask)
- **状态 A**: `filter: blur(15px)` (默认)
- **状态 B**: `filter: blur(0)` (悬停)
- **过渡**: `filter 0.4s var(--ease-out)`

### 3.3 导航栏毛玻璃 (Navbar Blur)
- **背景**: `rgba(250, 249, 247, 0.7)`
- **背景模糊**: `backdrop-filter: blur(10px)`
- **内边距**: `24px 64px`

---

## 4. 组件布局指南 (Layout Spec)

- **主页位移补偿**: 由于 Navbar (fixed) 脱离文档流，为防止 `100vh` 主容器导致光标和视口绝对死板居中，主栅格必须追加 `margin-top: -120px` 的光学校正。
- **容器宽度**: `max-width: 1200px`
- **全局左右留白**: 宽屏下为 `64px`
- **响应式断点**:
  - `> 900px`: 桌面布局 (Grid 2/3 cols)
  - `< 900px`: 移动布局 (Stack 1 col)
- **Post卡片**: 采用 `columns: 3` (Masonry) 布局。

---

## 5. 开发约束 (Hard Rules)
1. **禁止缩放**: 卡片悬停除蝴蝶外，严禁产生任何导致页面重排或物理位移的缩放。
2. **禁止突变**: 所有的颜色切换、透明度变化必须绑定 `transition: all 0.3s var(--ease-out)`。
3. **SVG图标**: 全部使用**实心 (Solid)** 风格，杜绝线条感图标。
