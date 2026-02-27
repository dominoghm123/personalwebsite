# Architecture Decision Records

这里记录了本项目所有重大技术决策。每个决策不应被修改——如果想法变了，写一个新的 ADR 来"supersede"旧的。

## 索引

| ADR | 标题 | 状态 | 日期 |
|-----|------|------|------|
| [0001](0001-css-modules-vs-tailwind.md) | CSS 方案：Modules vs Tailwind | Accepted | 2026-02-27 |
| [0002](0002-animation-performance-strategy.md) | 动画方案：Canvas vs SVG Filter | Accepted | 2026-02-27 |

## 如何创建新 ADR

1. 复制 `template.md` 为 `NNNN-标题.md`
2. 填写模板（5-10 分钟）
3. 更新上面的索引表
4. Git commit：`docs: add ADR-NNNN <标题>`

## ADR 状态说明

- **Proposed** — 正在讨论中
- **Accepted** — 已采纳，正在实施
- **Deprecated** — 不再相关
- **Superseded by ADR-XXXX** — 被新决策取代
- **Rejected** — 考虑过但未采纳（保留记录，有教学价值）
