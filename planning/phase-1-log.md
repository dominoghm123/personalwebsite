
## Iteration 5: UI Typographical Strictness & Layout Restructuring

### What we learned:
- **Never Assume Layouts**: We attempted to port a Masonry layout from the Post page to the Project page, which actively broke the design specifications for Featured/Carousel displays. We must strictly adhere to the PRD.
- **Component Typography Standardization**: Card headings were initially built using basic sans-serif headings rather than maintaining the tactile `Hepta Slab` serif typography defined in the global CSS tokens (`var(--font-secondary)`). A new ADR (005) was implemented to enforce this rule globally across all component variations to maintain cohesive aesthetics.
- **Next.js Image Compliance**: `<Image fill />` creates highly specific absolute positions which break if you use global wrapper selectors like `.container img`. Selectors must be precisely targeted (`.baseImg`, `.hoverImg`) to preserve `object-fit` logic out of the box.

### Improvements Made:
- The Project root page layout was correctly mapped to the `FeaturedProject` and `ProjectCarousel` distinct structures.
- Connected the project feed to real assets defined in `CONTENT_INVENTORY.md`.
- Restored hover background variables (`--color-hover-bg`) in globals and purged card-scaling transforms to respect UI guidelines.
- Standardized Card Heading typography using responsive `clamp()` logic matching `PostCard.module.css`.

### Next Actions:
Moving to implement the `[category]` gallery views (Photography & Sketches) with Lightbox functionality.
