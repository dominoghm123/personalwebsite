# ADR 006: Immersive Lightbox Preview System

**Date**: 2026-02-28
**Status**: Proposed

## Context
As specified in PRD 3.3, the `Photography` and `Sketches` gallery sub-pages require an immersive full-screen viewing experience. Users expect to click an image in the masonry grid and view it at its maximum resolution without the distraction of the UI.

## Decision
We will implement a custom Client-side Lightbox system:
1.  **Architecture**: A `ProjectGallery` Client Component will be introduced to wrap the masonry grid and maintain the "Active Image" state.
2.  **Interaction**: 
    - Click an image in the grid to open.
    - Full-screen overlay with `backdrop-filter: blur(20px)` and semi-transparent dark background.
    - Navigation: Support `Left`/`Right` arrow keys and UI buttons for browsing the sequence.
    - Dismissal: `ESC` key, Close button, or clicking the backdrop.
3.  **Performance**: Use Next.js `<Image />` with `unoptimized` (or high-quality settings) for the expanded view to ensure maximum clarity, while keeping grid images optimized for bandwidth.
4.  **Aesthetics**: Minimalist controls (thin lines or simple solid icons), smooth opacity transitions (`var(--ease-out)`).

## Consequences
- **Pros**: Significant boost in UX for visual portfolios. Low friction for browsing multiple images.
- **Cons**: Adds client-side state management overhead to the gallery route.
