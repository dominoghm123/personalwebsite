# ADR 004: Project Page Truth Structure & Asset Alignment

**Date**: 2026-02-28
**Status**: Accepted

## Context
The initial implementation of the `Project` page incorrectly utilized a generic masonry grid layout and fake data, completely disregarding the specific layout requirements in the PRD (Section 3.3) and the actual physical assets provided in `CONTENT_INVENTORY.md` and `DATA_SCHEMA.md`. Furthermore, the global hover background color (`--color-hover-bg`) definition was missing from CSS, leading to buggy hover states on cards.

## Decision
We will completely restructure the `Project` page to adhere to the PRD and physical data constraints:

1. **Rebuild `projects.json`**: Discard mockup data. Map strictly to local markdown descriptions and `public/images/project/...` webp files as defined in `CONTENT_INVENTORY.md`.
2. **Implement Dual-Component Layout**:
   - `FeaturedProject`: A large, prominent stage for "From Alleys to Aesthetics" with a light-purple background and image-swap capabilities on hover.
   - `ProjectCarousel`: A horizontal scrolling list for remaining categories (Podcast, Photography, Sketches), matching the `design-preview.html` blueprint.
3. **Fix Global Hover CSS**: Reinstate `--color-hover-bg: #F0EEE6;` in `globals.css` and ensure all interactive cards use this exact background color change on hover without erroneous transform scaling, matching the preview's tactile feel.

## Consequences
- **Pros**: The Project page becomes a true reflection of the design intent, showcasing the "hero" project properly and utilizing real content. The hover interaction is standardized across the site.
- **Cons**: Requires dropping the simple masonry grid for this page and building out specific, bespoke components (`FeaturedProject`, `ProjectCarousel`) as dictated by the design source of truth.
