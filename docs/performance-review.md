# Portfolio verification — 25 November 2026

## Current design

Porcelain #FFFCF9 and Black #050505. The shared stylesheet defines the complete interface, including hover, focus, selection, dark sections, and reduced-motion behavior. Section headings remain concise. The portrait area uses a bespoke woven Three.js PK signature until the user supplies an authentic photo, with a static monogram if WebGL is unavailable.

All seven landing covers are custom SVG interface concepts in ProjectArtwork.tsx. Their colors, typography, window frames, and controls match the portfolio. They are labeled as concepts; actual public screenshots remain in project-detail galleries.

## Evidence

User-confirmed roles distinguish solo work, group contributions, and Mentora's core developer role. Transport results use the committed benchmark CSV with synthetic-date and heuristic-target limitations. GoodFind commerce flows are simulated; the rehabilitation project is an engineering prototype. SkillTern's unavailable repository link is omitted.

## Automated verification

- 44 tests passed across 9 files, covering conceptual covers, project filters/expansion, repeated hidden-project links, skill keyboard tabs, galleries, clipboard feedback, contact states, overlay focus, portrait fallback, signature controls, morph geometry, and renderer cleanup.
- TypeScript and the production build passed.
- Both production server checks passed, covering compression, caching, conditional requests, PDF ranges, missing assets, and safe paths.
- Native in-app browser inspection covered assembled/unfolded Three.js rendering, drag and keyboard rotation, pause controls, and a 375px mobile viewport. The camera framing and reusable-context cleanup were corrected after inspection. No Playwright commands were used for this update.
- Source and branding checks found no remaining red or previous palette tokens. The native SVG compositions were reviewed for their bounds and labels.

## Measured production assets

- Main CSS: approximately 33.5 KB raw / 6.9 KB gzip.
- Main JavaScript: approximately 342.3 KB raw / 110 KB gzip.
- The separate lazy Three.js renderer is approximately 529.6 KB raw / 132.6 KB gzip. This exceeds Vite's default chunk-size warning threshold; it stays outside the initial page chunk.
- Project dialogs and the resume remain separate lazy chunks.
- SVG covers reserve their aspect ratio and scale without bitmap requests.
- Five original evidence screenshots are retained at approximately 42–85 KB each.

Payload sizes are build measurements. Core Web Vitals and deployed field performance were not measured.

The signature uses five custom capped, beveled ribbons with precomputed GPU morph targets. Rendering is capped at 30fps and pixel ratio 1.5, pauses offscreen or in hidden tabs, and becomes static under reduced motion. Renderer resources are released on unmount, context failure, or photo override.

## Calculated contrast

WCAG sRGB luminance calculations for the defined tokens:

- Black / Porcelain: 19.94:1.
- Muted text on porcelain: 6.84:1.
- Muted text on black: 9.11:1.
- Input boundary on porcelain: 3.83:1.
- Input boundary on black: 6.15:1.

These token ratios are not a complete accessibility certification. Run npm test, npm run build, and npm run test:server to reproduce the automated checks.
