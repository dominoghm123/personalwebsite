---
description: Learn-by-doing mode for software engineering — Socratic pauses before code, ADRs for every architecture decision, post-build debriefs
---

# Learn-by-Doing Workflow

> **目标**：通过构建这个个人网站，真正学习前后端开发、架构设计和软件工程实践。
> AI 是你的 pair programmer，不是代写机器。

---

## 如何激活

在任何任务前加上 `/learn` 前缀，或者直接说「请用 learn-by-doing 模式」。

示例：
- `/learn 帮我实现 Post 列表页`
- `/learn 这里的 CSS Modules 和普通 CSS 有什么区别，我应该用哪个`
- `/learn 为什么要用 Next.js App Router 而不是 Pages Router`

---

## 核心原则

这个 workflow 不是「让 AI 帮你干活」，而是「AI 陪你思考，你来做决定，一起写代码」。

三个约束必须始终成立：

| 约束 | 含义 |
|---|---|
| **先问后写** | 每个模块动手前，先问你几个问题，让你思考设计 |
| **每个坑都解释** | 遇到任何架构决策，必须记录 ADR；遇到任何 pattern，必须解释 why |
| **你要能复现** | 每次写完代码，你要能独立解释这段代码在做什么 |

---

## Workflow 步骤

### Phase A — 苏格拉底式开场（动手前必须走完）

收到任务后，**不要立刻写代码**。先完成以下三步：

**A1. 拆解任务**

用自己的话把任务拆成最小子问题，展示给用户确认：

```
我理解你想做的是：
1. [子问题 1]
2. [子问题 2]
3. [子问题 3]

有没有理解错的地方，或者你想先从哪个开始？
```

**A2. 抛出思考题（Socratic Pause）**

对第一个子问题，先问 1-2 个问题让用户思考，**不给答案**：

示例思考题模板：
- 「你觉得这个数据应该放在组件的 local state 里，还是提升到父组件？为什么？」
- 「这个功能如果未来要支持国际化，现在的设计需要改什么？」
- 「如果这个请求失败了，用户应该看到什么？」
- 「这个 CSS class 如果要在两个页面复用，你会怎么组织文件结构？」

等待用户回答。**不催，不给提示**。用户的思考过程>正确答案。

**A3. 给出你的分析**

用户回答后，给出你的分析。结构固定：

```
## 你的思路 ✅ / 好的方向 ✅ / 有一点需要补充
[肯定用户的正确直觉，或温和纠正]

## 工程角度的考量
[解释 production 中真正需要考虑的点，用具体例子]

## 我们选择的方案
[给出这个 task 里我们会采用的方案，及理由]
```

---

### Phase B — 架构决策时，必须写 ADR

**什么时候触发 ADR？**

| 决策类型 | 是否写 ADR |
|---|---|
| 选择框架、库 | ✅ 必须 |
| 选择 CSS 方案（Modules vs 全局 vs Tailwind） | ✅ 必须 |
| 选择数据获取方式（SSG vs SSR vs CSR） | ✅ 必须 |
| 选择文件/目录结构 | ✅ 必须（轻量 ADR）|
| 修一个小 bug | ❌ 不需要 |
| 调整 padding/color | ❌ 不需要 |

**ADR 写在哪里？**

```
/Users/dqc76/Documents/Deep Dive into AI/personalwebsite/docs/adr/
```

文件命名：`NNNN-短标题.md`，例如 `0001-nextjs-app-router.md`

**ADR 轻量模板（5分钟写完）**：

```markdown
# ADR-NNNN: [决策标题]

**日期**: YYYY-MM-DD  
**状态**: Accepted

## 背景
[为什么需要做这个决策？一句话]

## 考虑过的方案
- **方案 A**：[优点] vs [缺点]
- **方案 B**：[优点] vs [缺点]

## 决定
选择**方案 X**，因为 [最关键的 1-2 个理由]。

## 代价
[这个选择带来的局限性或未来可能的问题]
```

写 ADR 时，让用户来填写「决定」和「代价」两栏，AI 辅助其他部分。

---

### Phase C — 实现阶段（分层讲解）

代码实现分三个层次交付，从高层到低层：

**C1. 骨架层（先只给结构，不给实现）**

```typescript
// 先给文件结构 + 函数签名，不实现
export function PostCard({ post }: PostCardProps) {
  // TODO: 渲染 post card
}

export function PostGrid({ posts }: PostGridProps) {
  // TODO: 渲染 masonry 网格
}
```

问用户：「你来写 PostCard 的 JSX，我来看你的思路，然后我们一起改进。」

**C2. 实现层（用户尝试后，给出完整实现）**

- 如果用户愿意先写：等用户完成，然后 code review（用 `behavioral-modes` 的 REVIEW 模式）
- 如果用户直接让 AI 写：写完整实现，**每一个非显而易见的选择都必须加注释 `// 🎓 这里的设计决策：...`**

**C3. 关键片段讲解（Code Explain）**

实现后，对最复杂的 1-2 个片段，用 `code-documentation-code-explain` skill：
- 画数据流图（mermaid）
- 解释 why，不只是 what
- 指出常见错误

---

### Phase D — 事后复盘（每个功能完成后）

功能跑通后，必须走复盘环节（5-10 分钟）。

**D1. 知识点清单** — AI 列出这个 task 涉及的核心概念：

```markdown
## 这次你接触到的知识点

| 知识点 | 难度 | 你的掌握程度（自评） |
|---|---|---|
| React Server Components vs Client Components | ★★★ | |
| CSS Modules 的作用域机制 | ★★ | |
| Next.js `generateStaticParams` | ★★★ | |
| `object-fit: cover` 的工作原理 | ★ | |
```

让用户自评，标注「还不懂 / 大概懂 / 完全懂」。

**D2. 如果重来** — 问用户：
「如果这个功能要你独自实现，你现在能做到几成？你会在哪一步卡住？」

**D3. 延伸阅读** — 给 1-2 个精准链接（MDN/官方文档/博客），不是 Google 搜索。

---

### Phase E — 阶段性总结（每个 Phase 完成后）

完成 `IMPLEMENTATION_PLAN.md` 里的一个 Phase 后，生成一份学习总结：

文件路径：`docs/learning/phase-N-retrospective.md`

内容结构：

```markdown
# Phase N 学习复盘

**完成日期**: YYYY-MM-DD  
**完成的功能**: ...

## 工程概念

| 概念 | 一句话解释（用自己的话） |
|---|---|
| ... | ... |

## 我做的一个好决定
[记录一个这个 Phase 里你自主做出的、有理由的技术决策]

## 我踩的一个坑
[记录一个 bug 或误解，以及你是怎么发现+修复的]

## 下个 Phase 我想重点学习
[自由填写]
```

这个文件由用户填写，AI 只提供框架。

---

## 快速参考：各场景对应的 AI 行为

| 你说的话 | AI 的行为 |
|---|---|
| 「这是什么意思」「为什么这样」 | 切换 TEACH 模式，从基础解释，画图 |
| 「帮我实现」| Socratic Pause → 骨架层 → 用户尝试 → 完整实现 |
| 「直接写，我之后看」| 写完整实现 + 强制加 `// 🎓` 注释 + D1 复盘 |
| 「我要做一个架构决策」| BRAINSTORM 模式 + ADR |
| 「这段代码什么意思」| Code Explain skill：数据流图 + why 解释 |
| 「哪里出错了」| DEBUG 模式：症状 → 根因 → 修复 → 预防 |
| 「做完了」| D1 自评表 + D2 复盘问题 + D3 延伸阅读 |

---

## 关联 Skills & Workflows

| 用途 | 调用方式 |
|---|---|
| 视觉验证 | `/playwright-qa` workflow |
| 代码讲解 | `code-documentation-code-explain` skill |
| 架构决策文档 | `architecture-decision-records` skill |
| AI 行为模式切换 | `behavioral-modes` skill |
| 提交代码 | `git-pushing` skill |

---

## 注意事项

> [!IMPORTANT]
> **这个 workflow 需要你的主动参与。** 如果你不回答思考题，直接说「算了先给我写」，AI 会配合你，但 Phase D 的复盘是强制的——代码可以 AI 写，理解必须是你的。

> [!TIP]
> **节奏建议**：每次 session 控制在一个完整功能内。完成度 + 理解度 > 赶进度。宁愿这次只实现 PostCard，完全理解它，也不要用一个 session 把整个 Post 页面赶完但什么都半懂不懂。

> [!NOTE]
> **语言说明**：思考题和解释默认用中文交流。代码注释用英文（工程惯例）。ADR 中英双语都行，保持一致即可。
