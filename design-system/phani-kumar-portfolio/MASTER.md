# Phani Kumar — Monochrome

## Purpose and palette

An engineering portfolio that leads with personal identity and project evidence.

- Porcelain: `#FFFCF9` — page and light surfaces
- Black: `#050505` — typography, controls, Skills and Contact surfaces

The interface and conceptual landing covers use these two colors. Semantic tokens and translucent variants live in `src/styles/tokens.css`. Actual screenshots retain their original colors in evidence galleries.

## Typography and layout

Use locally loaded Space Grotesk for titles and interface text, with IBM Plex Mono for metadata. Establish hierarchy through scale, weight, and alignment. Landing section headings use plain labels without descriptive sentences beneath them.

Use a centered shell up to 1280px wide, with 48px desktop and 20px mobile gutters. Buttons and paging controls share a pill radius and at least 44px hit areas. Image corners are 8–10px.

## Page progression

Intro → Projects → Skills → Education → Certifications → Awards → Contact.

Internal landmarks: `top`, `work`, `expertise`, `education`, `credentials`, `achievements`, `contact`.

- Intro: name, factual developer role, bespoke porcelain woven PK sculpture on black.
- Projects: custom monochrome interface concepts, a full-width lead, and paired staggered covers; remaining projects expand on request.
- Skills: black tab workspace with links to project evidence.
- Education, Certifications, Awards: porcelain surfaces and ruled rows.
- Contact: black surface, readable porcelain form controls, explicit delivery help.

Concept covers are labeled. Keep actual screenshots, project descriptions, stacks, confirmed roles, decisions, and source caveats in case-study dialogs. Every project remains accessible.

## Portrait

`portfolio.person.portraitUrl` is empty while awaiting a supplied personal photo. Put an authentic image at `public/portrait.webp` and set `portraitUrl: './portrait.webp'` in `src/data/portfolio.ts`. The photo overrides the signature and releases its renderer. The sculpture remains the fallback while the photo is absent or cannot load.

## Motion and interaction

Use Motion for React to coordinate title masks, drawn SVG strokes, one-time reveals, filter layout changes, and menu stagger. Preserve native scrolling and reduced-motion preferences.

The hero signature uses five custom capped, beveled ribbons with GPU morph targets that unfold into a phase-shifted weave. Its separate lazy Three.js 0.187.0 renderer caps rendering at 30fps and pixel ratio 1.5, pauses offscreen or in hidden tabs, and disposes resources on photo override or unmount. Static SVG provides the unavailable-WebGL fallback.

Unfold/Reform controls form; Pause/Play controls ambient motion; Reset restores form and view. Rotate buttons and keyboard arrows complement horizontal drag. Preserve native vertical scrolling and pinch zoom. Reduced-motion changes are immediate and ambient motion stops.

Evidence galleries have named controls, keyboard navigation, accurate captions, and image retry. Menus and dialogs use viewport portals, contain keyboard focus, and restore triggers. Contact explains direct delivery or email-app drafts and preserves messages after errors.

Confine 3D to the bespoke PK signature. Exclude stock decorative shapes, 3D stack illustrations, additional interface colors, autoplay carousels, and scroll hijacking.
