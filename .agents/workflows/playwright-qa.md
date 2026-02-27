---
description: Run Playwright QA checks against the local dev server to screenshot and validate the personal website
---

# Playwright QA Workflow

Use this workflow after completing any visible UI change to generate screenshots and validate the design matches the `design-preview.html` reference.

**SKILL_DIR**: `/Users/dqc76/.gemini/antigravity/skills/playwright-skill`

---

## Step 1: Detect running dev server

// turbo
Run server detection to find the active localhost port:

```bash
cd /Users/dqc76/.gemini/antigravity/skills/playwright-skill && node -e "require('./lib/helpers').detectDevServers().then(s => console.log(JSON.stringify(s)))"
```

- If 1 server found → use it automatically, continue to Step 2
- If multiple found → ask user which port
- If none found → ask user to run `npm run dev` first, then retry

---

## Step 2: Run per-page screenshot sweep

Write and execute a Playwright script that visits each nav page and takes a full-page screenshot. Replace `PORT` with the detected port from Step 1.

Write to `/tmp/playwright-test-personalsite.js`:

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:PORT'; // ← replace PORT

const PAGES = [
  { name: 'home',       url: TARGET_URL + '/',           nav: null },
  { name: 'post',       url: TARGET_URL + '/post',        nav: null },
  { name: 'project',    url: TARGET_URL + '/project',     nav: null },
  { name: 'footprint',  url: TARGET_URL + '/footprint',   nav: null },
  { name: 'about',      url: TARGET_URL + '/about',       nav: null },
];

const VIEWPORTS = [
  { label: 'desktop',  width: 1440, height: 900 },
  { label: 'mobile',   width: 390,  height: 844 },
];

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const pg of PAGES) {
      try {
        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(600); // Allow animations to settle

        const outPath = `/tmp/qa_${pg.name}_${vp.label}.png`;
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`✅ [${vp.label}] ${pg.name} → ${outPath}`);
      } catch (err) {
        console.error(`❌ [${vp.label}] ${pg.name} FAILED: ${err.message}`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('\n📸 Screenshot sweep complete. Review /tmp/qa_*.png files.');
})();
```

// turbo
Execute the script:

```bash
cd /Users/dqc76/.gemini/antigravity/skills/playwright-skill && node run.js /tmp/playwright-test-personalsite.js
```

---

## Step 3: Hover & interaction spot-checks

After the sweep, run targeted interaction tests for the key hover states defined in `design-preview.html`.

Write to `/tmp/playwright-test-interactions.js`:

```javascript
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:PORT'; // ← replace PORT

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // ── 1. Home: butterfly hover ──────────────────────────────
  await page.goto(TARGET_URL + '/', { waitUntil: 'networkidle' });
  const butterfly = page.locator('.butterfly-wrapper.large');
  if (await butterfly.count() > 0) {
    await butterfly.hover();
    await page.waitForTimeout(700);
    await page.screenshot({ path: '/tmp/qa_interaction_butterfly_hover.png' });
    console.log('✅ Butterfly hover captured');
  } else {
    console.warn('⚠️  .butterfly-wrapper.large not found');
  }

  // ── 2. About: avatar hover (base → hover image swap) ─────
  await page.goto(TARGET_URL + '/about', { waitUntil: 'networkidle' });
  const avatar = page.locator('.avatar-box');
  if (await avatar.count() > 0) {
    await avatar.hover();
    await page.waitForTimeout(700);
    await page.screenshot({ path: '/tmp/qa_interaction_avatar_hover.png' });
    console.log('✅ Avatar hover captured');
  } else {
    console.warn('⚠️  .avatar-box not found');
  }

  // ── 3. About: hobby card blur → reveal on hover ──────────
  const hobbyCard = page.locator('.hobby-card').first();
  if (await hobbyCard.count() > 0) {
    await hobbyCard.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/qa_interaction_hobby_hover.png' });
    console.log('✅ Hobby card hover captured');
  } else {
    console.warn('⚠️  .hobby-card not found');
  }

  // ── 4. Post: card hover background color change ──────────
  await page.goto(TARGET_URL + '/post', { waitUntil: 'networkidle' });
  const postCard = page.locator('.post-card').first();
  if (await postCard.count() > 0) {
    await postCard.hover();
    await page.waitForTimeout(400);
    await page.screenshot({ path: '/tmp/qa_interaction_post_hover.png' });
    console.log('✅ Post card hover captured');
  } else {
    console.warn('⚠️  .post-card not found');
  }

  await browser.close();
  console.log('\n🎯 Interaction checks complete. Review /tmp/qa_interaction_*.png');
})();
```

// turbo
Execute:

```bash
cd /Users/dqc76/.gemini/antigravity/skills/playwright-skill && node run.js /tmp/playwright-test-interactions.js
```

---

## Step 4: Review screenshots and report issues

View each `/tmp/qa_*.png` file (use `view_file` tool) and compare against these reference checklists:

### Desktop Checklist (1440px)
- [ ] **Home**: Butterfly SVGs visible, correct rotation angles (large: 15°, small: -20°)
- [ ] **Home**: Text hierarchy — subtitle h2 + name h1 with lavender `span` colour
- [ ] **Post**: 3-column masonry grid with correct card shadow
- [ ] **Project**: Featured card with 540px cover + carousel below
- [ ] **Footprint**: Map box 500px height + dot markers + empty detail panel
- [ ] **About**: 4/6 grid (avatar | bio), hobby horizontal scroll, contact footer

### Mobile Checklist (390px)
- [ ] **All pages**: Single-column layout, no horizontal overflow
- [ ] **Nav**: Mobile nav collapses correctly (hamburger or stack)
- [ ] **Home**: Butterfly stack or single visible, not clipped

### Interaction Checklist
- [ ] `qa_interaction_butterfly_hover.png` — butterfly lifted + rotated
- [ ] `qa_interaction_avatar_hover.png` — hover image visible (opacity 1)
- [ ] `qa_interaction_hobby_hover.png` — image blur removed (filter: blur(0))
- [ ] `qa_interaction_post_hover.png` — background colour changed to `#f0eee6`

---

## Step 5: Log issues and next steps

For any checklist item that fails:
1. Note the selector and page name
2. Cross-reference against `planning/design-preview.html` for the expected CSS
3. Create a targeted fix (do NOT regenerate the whole page)
4. Re-run only the affected page's screenshot to verify the fix

---

## When to run this workflow

| Trigger | Scope |
|---|---|
| After building a new page | Steps 2 → 4 for that page only |
| After a global CSS change | Full Steps 2 → 4 |
| Before a git commit | Steps 2 → 4, all pages |
| After responsive tweaks | Step 2, mobile viewport only |
