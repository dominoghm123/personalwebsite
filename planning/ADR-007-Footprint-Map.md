# ADR 007: Footprint Map Implementation with Leaflet.js

**Date**: 2026-02-28
**Status**: Proposed

## Context
The "Footprint" (足迹) section of the website requires a world map displaying the locations visited by the user. Each point (pin) on the map should reveal a summary card (image + city name) when clicked or hovered.

## Decision
We will use **Leaflet.js** for the map implementation:
1.  **Framework Choice**: Leaflet.js is selected for its lightweight nature, ease of customization with CSS, and excellent performance for simple markers and popups.
2.  **Architecture**: 
    - The Map will be implemented as a Client Component (`FootprintMap.tsx`) because it relies on DOM APIs and Leaflet's instance-based model.
    - We will use `react-leaflet` to provide React-friendly bindings for the Leaflet API.
3.  **Data Sourcing**: Locations will be fetched from `public/content/locations.json`.
4.  **Aesthetics**: 
    - **Tile Provider**: Use **CartoDB Positron** or apply a custom **grayscale CSS filter** (`grayscale(100%) brightness(105%)`) to ensure the world map is strictly white and gray.
    - **Bounds & Zoom**:
        - Set `worldCopyJump: false` and `maxBounds` to prevent infinite horizontal scrolling and keep the map centered.
        - Set `minZoom` such that the world fits exactly within the `mapContainer` (usually zoom level 2).
        - Set `maxZoom` to city-level (around 12-14) to maintain the "footprint" abstraction rather than street-level navigating.
5.  **Simplified Popups**:
    - Remove the text descriptions. Only render the `mainImage` and `cityName` in the popup and simplify the CSS.
6.  **Dynamic Statistics Implementation**:
    - Add a logic to filter and count unique "Countries" and "Cities" from the `locations.json` and render it at the page footer.


## Consequences
- **Pros**: Interactive and visual representation of footprint data. Customizability allows it to feel like part of the site rather than a generic embed.
- **Cons**: Requires client-side JS and careful handling of hydration.
