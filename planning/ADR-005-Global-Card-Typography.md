# ADR 005: Global Card Typography Standardization

**Date**: 2026-02-28
**Status**: Accepted

## Context
During the reconstruction of the `Project` page's Featured and Carousel components, it was noted that the typography of card headings diverged from the global standards defined in `DESIGN_SPEC.md` and the existing implementation of `PostCard`. They were incorrectly using `--font-heading` with standard px sizes rather than the correct `--font-secondary` (Hepta Slab) with `clamp()` responsive sizing to match the tactile, compact feel of the cards.

## Decision
All cards representing distinct pieces of content (Post cards, Project Carousel cards, Featured Project presentations) must synchronize their typography:
1.  **Font Family**: `var(--font-secondary)` (`Hepta Slab`) is strictly required for card titles, mirroring main page titles but at a lower hierarchy scale.
2.  **Font Weight**: `600` (Semi-bold) rather than `700` (Bold) to preserve "breathing room" and avoid overpowering the imagery and subtitle texts.
3.  **Responsive Sizing**: Titles inside components must utilize `clamp(min, preferred, max)` to ensure proportional scaling alongside padding reductions on smaller screens. For example: `clamp(18px, 1.8vw, 20px)` for standard carousel/post cards, allowing visibility of the entire card without scrolling.
4.  **Updates Applied**: Both `FeaturedProject.module.css` and `ProjectCarousel.module.css` have been refactored to align with `PostCard.module.css` behavior.

## Consequences
- **Pros**: Assures absolute consistency of the visual language across the whole website, maintaining the "Humanist Minimalism" theme securely. Reduces ad-hoc CSS.
- **Cons**: Requires continuous vigilance to ensure new components don't drift back to standard CSS font-family definitions and sizes.
