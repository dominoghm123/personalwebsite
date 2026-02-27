# Phase 1 学习复盘 (Completed)

**完成日期**: 2026-02-27  
**完成的功能**: 核心骨架（CSS Tokens, TextureOverlay, Navbar）搭建，项目约束宪法定义，首页视觉 1:1 物理还原。

---

## 工程概念

| 概念 | 一句话解释 |
|---|---|
| **CSS Modules** | 解决全局命名冲突。 |
| **App Router Layouts** | 保持全局状态（背景、导航）不闪烁。 |
| **Fixed Context** | 理解固定定位如何脱离文档流，以及如何进行视觉补偿。 |
| **Center Compensation** | 针对头部悬浮导航栏，对内容进行物理重心上移的校准技术。 |
| **Source of Truth** | 区分“视觉参考” (design-preview) 与“工程基准” (PRD/Spec) 的优先级。 |

---

## 知识点总结（AI 视角的关键能力点）

| 知识点 | 难度 | 状态 |
|---|---|---|
| CSS 自定义属性管理 (Tokens) | ★★☆ | 已同步至 globals.css |
| Next.js App Router 项目目录结构 | ★★★ | 已建立 Layout/Component 模式 |
| 视觉重心补偿算法 (-120px) | ★★★ | 已通过测量修复 |
| 响应式字体断句 (Max-width wrap) | ★★☆ | 已移除硬编码 <br> |

---

## 总结与反思

### 🌟 好的工程决定
- **建立 .agents/antigravity.md**：这是项目最核心的决定，它让 AI 从“一次性工具”变成了“有契约精神的合作伙伴”。
- **坚持 Vanilla CSS**：这让我们在处理极高性能要求（如 100vh 居中）时有最直接的控制力。

### ⚠️ 踩过的深坑
- **“参数盲信” vs “流式布局”**：最初试图通过写死 `<br/>` 还原三行断句，不仅代码脏，且在不同宽度下易碎。最终通过 `460px` 宽度的“软约束”实现了自然排画，这是从“写死”到“工程化”的进化。
- **Navbar 屏蔽后的居中误区**：在 fixed navbar 存在时，标准的 `align-items: center` 会导致视觉下沉。我们学习了通过 `-120px` 这种物理偏移来换取视觉上的审美平衡。

---

## 下个阶段重点

- [ ] Canvas 绘图基础与沙粒碰撞逻辑
- [ ] 动态数据驱动 (Next.js Data Fetching from JSON)
- [ ] 瀑布流 (Masonry) 的 CSS 级实现
- [ ] **严格执行宪法**：任何文档变更先行，代码在后。

**Phase 1 状态：已结项 (Closed)**
