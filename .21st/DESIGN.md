# Project Design Context

Updated 2026-11-25. Keep this summary aligned with `design.json` and application sources.

## Identity

- Theme: `theme-monochrome`
- Palette: Porcelain `#FFFCF9` and Black `#050505`
- Stack: React, TypeScript, Vite, Motion for React, Three.js 0.187.0
- Local fonts: Space Grotesk and IBM Plex Mono
- Layout: 1280px shell, 48px desktop gutters, 20px mobile gutters
- Controls: pill buttons; 8–10px image corners

## Composition

Intro → Projects → Skills → Education → Certifications → Awards → Contact.

The Intro pairs the name and factual developer role with a bespoke woven PK sculpture on black: five custom capped, beveled ribbons morph through GPU targets into a phase-shifted weave. `portfolio.person.portraitUrl` is empty. Add an authentic photo at `public/portrait.webp` and set `portraitUrl: './portrait.webp'` in `src/data/portfolio.ts`; the photo overrides the sculpture and releases its renderer.

Projects use custom monochrome conceptual covers in a full-width lead and paired staggered composition. Actual screenshots and source evidence remain in dialogs. All seven projects stay accessible; landing headings have simple labels.

Skills and Contact use black surfaces. Qualifications use porcelain ruled layouts. Contact has readable porcelain form controls and truthful email-draft help.

## Behavior

Coordinate one-time title masks, SVG drawing, reveals, filter layout transitions, and menu stagger through Motion. Preserve native scrolling, reduced-motion support, keyboard focus, and manual gallery controls.

The signature's lazy Three.js renderer caps rendering at 30fps and pixel ratio 1.5, pauses offscreen/hidden, and disposes on unmount or photo override. Unfold/Reform, Pause/Play, Reset form/view, rotate buttons, keyboard arrows, and horizontal drag control the scene. Vertical scrolling and pinch zoom remain native. Reduced-motion changes are immediate; static SVG handles unavailable WebGL.

## Sources

`src/styles/tokens.css`, `src/components/`, `src/assets/`, `public/`, and `AGENTS.md`.

Label conceptual covers and preserve confirmed roles and source limitations. Confine 3D to the bespoke signature. Exclude stock decorative shapes, 3D stack illustrations, additional interface colors, autoplay carousels, scroll hijacking, invented portraits, and fabricated metrics.
