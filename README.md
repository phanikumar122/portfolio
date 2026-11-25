# Phani Kumar — Portfolio

A portfolio for Vinnakota Phani Kumar, a Computer Science undergraduate building full-stack applications, data tools, and connected systems.

## Design

The `theme-monochrome` interface uses Porcelain (`#FFFCF9`) and Black (`#050505`). A type-led Intro pairs the name and developer role with a bespoke woven PK sculpture on black. Five custom capped, beveled ribbons morph through GPU targets into a phase-shifted weave.

The page follows Intro → Projects → Skills → Education → Certifications → Awards → Contact. Projects use custom monochrome conceptual covers in a full-width lead and paired staggered composition; the remaining collection expands on request. Actual screenshots, descriptions, technology stacks, confirmed roles, and source limitations remain in case-study evidence galleries and dialogs.

Skills and Contact use black surfaces. Education, Certifications, and Awards use porcelain ruled layouts. Contact has readable porcelain form controls and explicit delivery help. Landing section labels stay concise.

Space Grotesk and IBM Plex Mono load locally. Pill controls and 8–10px image corners share a 1280px shell with 48px desktop and 20px mobile gutters. Motion coordinates one-time title masks, SVG drawing, reveals, filter layout changes, and menu stagger while respecting reduced motion and native scrolling.

The signature uses Three.js 0.187.0 in a separate lazy renderer module. Unfold/Reform changes its form; Pause/Play controls ambient motion; Reset restores form and view. Rotate buttons, arrow keys, and horizontal drag provide view control while preserving vertical scrolling and pinch zoom. Rendering is capped at 30fps and pixel ratio 1.5, pauses offscreen or in hidden tabs, and releases resources on unmount or photo override. Reduced-motion changes are immediate; a static SVG covers unavailable WebGL.

## Development

- Node.js 22.23.3 (see `.nvmrc`) and npm 10+
- React 18, TypeScript, Vite 6, Motion for React, Three.js 0.187.0, Lucide
- Run `npm ci`, then `npm run dev`
- Open `http://localhost:5173`

## Validation and production

Run checks before delivery:

```sh
npm test
npm run build
npm run test:server
```

The interaction suite exercises signature controls and geometry, photo override, project filtering, skill tabs, evidence galleries, navigation, clipboard feedback, and dialog/resume focus behavior.

The build writes static assets plus gzip and Brotli variants to `dist/`. Run `npm start` for the production server; its default port is 5173 and can be overridden with `PORT`. The server supports asset caching, conditional requests, and PDF byte ranges. Static hosts can also serve `dist/` directly.

## Content and portrait

Edit content in `src/data/portfolio.ts`. All seven projects remain available. `ProjectVisual` supplies conceptual landing illustrations; actual public screenshots in `src/assets/projects/` retain their evidence captions and original colors.

`portfolio.person.portraitUrl` is empty while awaiting an authentic personal photo. To add one:

1. Put the photo at `public/portrait.webp`.
2. Set `portraitUrl: './portrait.webp'` in `src/data/portfolio.ts`.

The authentic photo overrides the sculpture and releases its renderer. The signature remains the fallback while the photo is absent or cannot load.

Replace `public/resume.pdf` to update the resume. Update the canonical URL and social metadata in `index.html` when using a domain other than `https://phani-kumar.dev/`.

## Contact

Without `VITE_FORMSPREE_ENDPOINT`, the form prepares a draft in the visitor's email app and explains that they send it there. Configure that build-time environment variable with a Formspree endpoint for direct delivery. Labeled inputs retain content after failed submissions and remain protected while delivery is pending.

## Design sources

`src/styles/tokens.css` defines semantic tokens; `src/styles/portfolio.css` is the application stylesheet. Design context is recorded in `.21st/design.json`, `.21st/DESIGN.md`, and `design-system/phani-kumar-portfolio/MASTER.md`.
