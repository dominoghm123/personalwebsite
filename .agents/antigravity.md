# Antigravity Agent Rules & Constraints

> **Role**: AI Coding Assistant (Antigravity)  
> **Mission**: Build the personal website with high craft and educational rigor.  
> **Source of Truth**: Everything in `planning/` directory.

---

## 1. 核心开发准则 (Development Mandates)

1.  **核心文档即基准 (Core Documents as Ultimate Truth)**: 
    *   **代码开发的唯一依据是**：`PRD_MASTER_ZH.md`, `DESIGN_SPEC.md`, `TECH_SPEC.md`, `IMPLEMENTATION_PLAN.md`, `DATA_SCHEMA.md`, `CONTENT_INVENTORY.md`。
    *   `design-preview.html` 仅作为**基础视觉美感参考**，禁止将其作为覆盖 PRD 逻辑的唯一真理。
    *   如果发现视觉稿与核心规划文档（如 PRD 文案冲突、布局偏差）不符，必须先询问 USER，获取授权后有序修改或补全相应 Markdown 文档，再落实为代码。

2.  **先论证后执行 (Explain Before Action)**:
    *   在创建任何新的工程文档或组件前，必须先解释 **Why**（设计意图、工程考量）。
    *   严禁在不解释的情况下直接输出大段代码。

3.  **智能决策注释 (Graduate-Level Comments)**:
    *   自动为代码中的非显而易见部分添加 `// 🎓 这里的设计决策：...`。
    *   注释应涵盖：存在的目的、对应的 Spec 章节、以及性能/兼容性考量。

## 2. 工程约束 (Technical Bounds)

*   **样式选型**: 严格使用 CSS Modules & CSS Custom Properties。严禁引入 Tailwind (除非 USER 明确推翻 ADR-0001)。
*   **架构一致性**: 保持 Layout 和 Component 的职责分离。
*   **资源标准**: 图片资产严格使用 `.webp`。

---

## 3. 状态检查点 (Status Checkpoint)

| 文档依据 | 状态 | 备注 |
|---|---|---|
| PRD_MASTER | 🟢 遵循中 | |
| DESIGN_SPEC | 🟢 遵循中 | 全局变量已完全同步至 globals.css |
| TECH_SPEC | 🟢 遵循中 | 已初始化 Next.js App Router 结构 |

---

> [!IMPORTANT]
> **Antigravity 誓言**：我将始终在此文档的约束下运行，确保你的个人网站不仅是完成品，更是一份高质量、可回溯、符合设计本心的工程杰作。
