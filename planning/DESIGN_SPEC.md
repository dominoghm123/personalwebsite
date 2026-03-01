# 🎨 DESIGN_SPEC.md — 视觉开发指南 (Source of Truth)

> **版本**: v1.2 | **基准**: [PRD_ZH.md](file:///Users/dqc76/Documents/Deep%20Dive%20into%20AI/personalwebsite/planning/PRD_MASTER_ZH.md)
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
| `--color-footer-text`| `#A0A0A0` | **版权文字**：比 muted 更浅，降低视觉干扰 |

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
- **Featured Card**: `var(--shadow-card)`
- **Hover Transitions**: `0.3s var(--ease-out)`
- **Lightbox Overlay**: `rgba(0, 0, 0, 0.9)`, `z-index: 2000` (must be above Navbar), `backdrop-filter: blur(20px)`.
- **Lightbox Buffer**: Top padding `80px` to clear navigation visual space.
- **状态 B**: `filter: blur(0)` (悬停)
- **过渡**: `filter 0.4s var(--ease-out)`

### 3.3 导航栏毛玻璃 (Navbar Blur)
- **背景**: `rgba(250, 249, 247, 0.7)`
- **背景模糊**: `backdrop-filter: blur(10px)`
- **内边距**: `24px 64px`
- **活动状态**: 当前页面对应的导航项底部显示紫色下划线 (`var(--color-primary)`) 且字色变深 (`var(--color-text)`)。

### 3.4 全局容器与间距 (Layout Utilities)
- **.container-padding**: 全局侧边距，桌面端 64px，移动端 (<900px) 32px，手机端 (<600px) 20px。
- **居中对齐**: 所有内容卡片和页眉 H1 均需在 `max-width: 1200px` 内居中并应用背景纹理感。

---

## 4. 组件布局指南 (Layout Spec)

- **主页对齐补偿 (v1.1)**: 在 `flex-column` 容器中通过 `justify-content: center` 替代 `flex-grow`。主体内容通过 `padding-top: 150px` 的固定位移补偿 Navbar 高度占用，使得整体处于视觉中心。同时，主页严格执行“禁滚” (No-Scroll) 策略，所有内容必须在不滚动的情况下在首屏可见（包括页脚）。
- **关于页底部优化 (v1.1)**: 内容容器底部 Padding 从 120px 缩减至 0px，以确保 Footer 能更紧凑地衔接在内容之后，提升视觉整体感。
- **子页顶部补偿**: 所有二级散页（Post, Project, Footprint, About）由于 Navbar 高度为 80px，为了实现视觉上 40px 的安全间距，主容器应当强制设定 `padding-top: 120px`。
- **子页标题规划**: 主标题 H1 必须无标点，字号等比缩小控制在 `44px` 以下，且颜色保持 `var(--color-primary)`。
- **卡片排版约束**: 所有承载内容的组件卡片（PostCard, Carousel Item，Featured 等），其内部标题必须统一为 `var(--font-secondary)` (Hepta Slab)，默认字重 600，且严禁使用死板 Px，必须使用如 `clamp(18px, 1.8vw, 20px)` 的动态比例缩放公式。
- **卡片紧凑度约束**: 瀑布流或网格内的内容卡片，其内部间距（padding）与内联标题字号需执行等比压缩约束。目标是确保在标准视口下（如 1080p），进入二级页面时不滑动页面即可看清卡片的完整下边缘。
- **容器宽度**: `max-width: 1200px`
- **全局左右留白**: 宽屏下为 `64px`
- **响应式断点**:
  - `> 900px`: 桌面布局 (Grid 2/3 cols)
  - `< 900px`: 移动布局 (Stack 1 col)
- **Post卡片**: 采用 `columns: 3` (Masonry) 布局。
- **Footprint 地图规范**:
  - **色调约束**: 
    - **底图 (Base Map)**: 必须是灰白高调（Light Grayscale），通过 CSS 滤镜去色。
    - **前景元素**: 图针 (Pin) 与弹窗内的照片必须保留**原有色彩**，不可被灰度滤镜污染。
  - **图针 (Pin)**: 圆点发光动效（静态与悬停光晕均使用 `var(--color-primary-light)` 或主色）。
  - **弹出气泡 (Popup)**: 极简卡片化。仅 [图片(Top) + 地名(Bottom)]。地名字号颜色统一为 `var(--color-primary)`。
  - **动态统计 (Stats)**: 
    - **位置**: 位于地图容器下方，及感性描述文字 (Prose) 的上方，作为两者的视觉衔接。
    - **样式**: 字体强制使用 `var(--font-secondary)`，Semi-bold (600)，字色 `var(--color-primary)`，字号对齐 Secondary Heading (`clamp(24px, 2.5vw, 32px)`)。
    - **间距**: 保持与地图及文字各 `32px - 48px` 的空气感呼吸间距。

- **全局页脚 (v1.1)**:
    - **位置**: 采用“吸底”布局。在 `100vh` 的 App Shell 中，Footer 位于底部，Main 容器通过 `flex: 1` 占据剩余空间。
    - **首页可见性**: 在首页，Footer 必须默认可见；而在长页面，Footer 随着 Main 容器的整体视口高度贴合展示。
    - **样式**: `font-size: 12px`，`color: var(--color-footer-text)`，`text-align: center`。
    - **装饰**: 在非首页页面，页脚上方需有 `1px solid var(--color-border)` 的超细分割线。

---

## 5. 开发约束 (Hard Rules)
1. **禁止缩放**: 卡片悬停除蝴蝶外，严禁产生任何导致页面重排或物理位移的缩放 (仅允许变更 backgroundColor 为 var(--color-hover-bg) 与 box-shadow)。
2. **禁止突变**: 所有的颜色切换、透明度变化必须绑定 `transition: all 0.3s var(--ease-out)`。
3. **SVG图标**: 全部使用**实心 (Solid)** 风格，杜绝线条感图标。
