# Phani Kumar — Monochrome

## Purpose and palette

An engineering portfolio that leads with personal identity and project evidence.

- Porcelain: `#FFFCF9` — page and light surfaces
- Black: `#050505` — typography, controls, the masthead and Contact surfaces

The interface and conceptual landing covers use these two colors. Semantic tokens and translucent variants live in `src/styles/tokens.css`. Case-study screenshots are displayed in grayscale.

## Typography and layout

Pair Georgia headlines with locally loaded Space Grotesk interface text and IBM Plex Mono metadata. Establish hierarchy through scale, weight, and alignment. Landing section headings use plain labels without descriptive sentences beneath them.

Use a centered content area up to 1392px wide with fluid gutters. Square controls have at least 44px hit areas.

## Page progression

Intro → Projects → Skills → Education → Certifications → Awards → Contact.

Internal landmarks: `top`, `work`, `expertise`, `education`, `credentials`, `achievements`, `contact`.

- Intro: name, developer role, and primary links on black.
- Projects: a ruled index with monochrome concept previews. Expand the index to see all seven projects.
- Skills: porcelain tab workspace with links to project evidence.
- Education, Certifications, Awards: porcelain surfaces and ruled rows.
- Contact: black surface, readable porcelain form controls, explicit delivery help.

Concept covers are labeled. Keep actual screenshots, project descriptions, stacks, confirmed roles, decisions, and source caveats in case-study dialogs. Every project remains accessible.

## Portrait

`portfolio.person.portraitUrl` is empty while awaiting a supplied personal photo. Put an authentic image at `public/portrait.webp` and set `portraitUrl: './portrait.webp'` in `src/data/portfolio.ts`. The masthead uses a text-only layout when the photo is absent or cannot load.

## Motion and interaction

Use Motion for React to coordinate title masks, one-time reveals, filter layout changes, and menu stagger. Preserve native scrolling and reduced-motion preferences.

Evidence galleries have named controls, keyboard navigation, accurate captions, and image retry. Menus and dialogs use viewport portals, contain keyboard focus, and restore triggers. Contact explains direct delivery or email-app drafts and preserves messages after errors.

Exclude stock decorative shapes, 3D stack illustrations, additional interface colors, autoplay carousels, and scroll hijacking.
