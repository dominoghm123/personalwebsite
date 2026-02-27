# ADR-0001: CSS 方案选型 — CSS Modules vs Tailwind CSS

**日期**: 2026-02-27  
**状态**: Accepted

---

## 背景

项目已存在完整的视觉原型 `design-preview.html`，采用 CSS 自定义属性（Custom Properties）
定义了 15+ 个 design tokens（颜色、圆角、字体、阴影、动效曲线）。
进入构建阶段前，需要决定实际组件的样式方案。

主要候选：**Tailwind CSS**（utility-first 框架）vs **CSS Modules + 原生 CSS 自定义属性**。

---

## 考虑过的方案

### 方案 A：Tailwind CSS
- ✅ 开发速度快（尤其联合 AI 生成代码时）；团队协作时强制命名一致；生态热门
- ❌ 需要将现有 15 个 CSS custom properties 全部重新翻译为 Tailwind theme config；
  所有现有 CSS rules 需要重写为 utility classes；复杂动画、SVG filter 无法用纯 utility 表达，需要混用 arbitrary values；
  v3→v4 已是破坏性迁移，未来版本升级将带来维护负担；
  个人独立维护，无法分摊迁移成本

### 方案 B：CSS Modules + CSS 自定义属性（原生）
- ✅ 可直接从 `design-preview.html` 抄录，零翻译成本；
  CSS 自定义属性是 W3C 标准，浏览器永久向后兼容；
  CSS Modules 的 scoping 机制稳定，几乎没有破坏性变更历史；
  学到的是可迁移的底层知识，不依赖特定框架
- ❌ 缺少 Tailwind 的响应式 shorthand（`md:flex`）；
  没有内置的 design constraint 系统（需要自己维护 token 规范）；
  AI 辅助生成时略慢（需要手动命名 class）

---

## 决定

> 📝 **由你来填写**：用 1-2 句话说明你选择了哪个方案，以及你认为最关键的理由是什么。

选择**方案 _B__**，因为 _1.该网站维护者只有我自己，而我并不擅长迁移维护；而CSS Modules 可以永久向后兼容。2.可快速复制design_preview.html中的设计规范。

---

## 代价

> 📝 **由你来填写**：这个选择放弃了什么？如果未来项目规模扩大（比如多人协作），会遇到什么问题？

_多人协同开发时，很可能无法强制统一命名，导致样式混乱。

---

## 学到的

> 📝 *构建阶段结束后回来填写*

___________________________

---

## 参考

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Modules GitHub](https://github.com/css-modules/css-modules)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- 站内参考：`planning/design-preview.html`（15 个 design tokens 的原始定义）
