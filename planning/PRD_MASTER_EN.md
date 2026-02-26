# 📜 PRD_MASTER.md — Personal Website Master Specification

> **Version**: v1.3 | **Updated**: 2026-02-26
> **Status**: **FROZEN UI DESIGN**. All future code must strictly replicate the `design-preview.html` aesthetics and interactions.

---

## 1. Product Definition

### Core Concept
A "breathing", textured digital territory showcasing Qicheng (Domino)'s creative works. Inspired by **Humanist Minimalism** (Claude-like aesthetics).

---

## 2. Visual Identity (STRICT ALIGNMENT)

### 2.1 CSS Tokens (Must match Design Preview)
```css
:root {
  --color-primary:    #C8C2E7;  /* WONDERLAND text */
  --color-accent:     #B8D4B8; 
  --color-bg:         #FAF9F5;  /* Claude-inspired warm base */
  --color-text:       #2D2D2D;
  --color-hover-bg:   #F0EEE6;  /* Card hover state */
  --shadow-card:      0 24px 48px rgba(0, 0, 0, 0.015);
  --shadow-hover:     0 32px 64px rgba(200, 194, 231, 0.15);
  --radius-sm:        12px;     /* Inner elements */
  --radius-md:        24px;     /* Structural cards */
  --radius-pill:      999px;    /* Tags/Buttons */
}
```

### 2.2 Global Visual Rules
- **Capitals**: Section titles (Post, Project, Footprint) must have the first letter capitalized.
- **Strict Anti-Template**: No 0px/4px/8px corners. No generic outline icons (use Solid SVG).
- **Background Texture**: Passive grain/noise overlay always active.

---

## 3. Interaction & Engineering Logic

### 3.1 Background & Home
- **Sand Effect**: High-density particles (#B5EAD7, #BDE0FE, #FFFFFF). Mouse displaces sand with alpha boost.
- **Butterfly Pair**: One Large (15° tilt), one Small (-20° tilt). Blurry crayon edges.
- **Individual Hover**: Lift (-12px), scale (1.05), and intensified rotation.

### 3.2 Automated Content Crawler (Post Section)
- **Source**: WeChat Official Account "Daiyue 社".
- **Logic**: A pre-build Node.js script fetches titles, covers, and URLs.
- **Output**: Writes to `public/content/wechat-posts.json`.
- **UI**: Masonry grid with `white` cards changing to `#f0eee6` on hover. No physical jump.

### 3.3 Dynamic Projects & Galleries
- **Featured**: Vertical stack (Large `contain` image on tinted stage + description). Hover swaps images.
- **Photography/Sketches**: Clicking these side-cards navigates to a **Masonry Gallery Page**.
  - **Auto-Scanner**: The page must automatically list assets from `public/images/project/[category]/`.
  - **Lightbox**: Click images for full-screen immersive view.

### 3.4 Interactive Footprint
- **Engine**: Leaflet.js with CartoDB Positron (Grayscale).
- **Data Source**: `/content/footprint/locations.json`.
- **Logic**: Click pin -> Display card below map (Image from `/public/images/footprint/` + Link). Descriptions are removed.

### 3.5 About & Hobbies
- **Hobby Grid**: Horizontally scrollable Flexbox. 
- **The "Mask" Interaction**: Images are **15px blurred** by default. **Hover clears the blur**.
- **Context Box**: Clicking an image updates the text description in the fixed box below.
- **Contacts**: High-quality **Solid SVG icons** only.

---

## 4. Technical Stack & Deployment

### 4.1 Framework
- **Core**: Next.js 14+ (App Router), TypeScript.
- **Styles**: Vanilla CSS Modules (Strictly no Tailwind).

### 4.2 Assets & Data
- **Images**: All images must be in `.webp` format for performance.
- **Metadata**: Local JSON/Markdown files for SEO and easy updates.

### 4.3 Deployment (CI/CD)
- **Platform**: **Vercel** (Static Site Generation - SSG).
- **Frequency**: Automatic re-build on GitHub `push`.
- **Optimization**: Vercel Image Optimization for the photography section.

---

## 5. Implementation Commandment
All engineering phases must refer to **`planning/design-preview.html`** as the "Source of Truth" for material source, layout ratios, gap spacing (e.g., 24px/64px), and animation curves (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
