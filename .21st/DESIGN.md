# Project Design Context

Updated 2026-11-26. Keep this summary aligned with `design.json` and application sources.

## Identity

- Theme: `theme-monochrome`
- Palette: Porcelain `#FFFCF9` and Black `#050505`
- Stack: React, TypeScript, Vite, Motion for React
- Local fonts: Space Grotesk and IBM Plex Mono with Georgia for serif headlines
- Layout: 1392px maximum content width with fluid gutters
- Controls: square buttons and image frames

## Composition

Intro → Projects → Skills → Education → Certifications → Awards → Contact.

The masthead uses the developer name, role, and primary links. An optional authentic portrait can be configured in `src/data/portfolio.ts`.

Projects use custom monochrome conceptual covers in ruled rows with project copy and previews side by side on wide screens. Case-study dialogs show grayscale screenshots and source evidence. All seven projects stay accessible; landing headings have simple labels.

Skills use a porcelain tab workspace. The masthead and Contact use black surfaces. Qualifications use porcelain ruled layouts. Contact has readable porcelain form controls and truthful email-draft help.

## Behavior

Coordinate one-time title masks, reveals, filter layout transitions, and menu stagger through Motion. Preserve native scrolling, reduced-motion support, keyboard focus, and manual gallery controls.

## Sources

`src/styles/tokens.css`, `src/components/`, `src/assets/`, `public/`, and `AGENTS.md`.

Label conceptual covers and preserve confirmed roles and source limitations. Exclude stock decorative shapes, 3D stack illustrations, additional interface colors, autoplay carousels, scroll hijacking, invented portraits, and fabricated metrics.
