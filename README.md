# Vinnakota Phani Kumar — Portfolio

A content-first engineering portfolio for **Vinnakota Phani Kumar**, a Computer Science Engineer interested in full-stack software, cloud systems, and agentic AI.

The experience uses Warm Ivory (`#f7f5ef`), white surfaces, ink text (`#18212f`), and Cobalt (`#2457d6`). An interactive CSS 3D software stack anchors the hero: layers float continuously, follow mouse movement, and separate through the “Explore layers” control. A pause button stops the scene animation. Project preview frames remain stationary. The images themselves play a 4.5-second zoom and rotation sequence when they enter view, and pan and tilt under the mouse with a cursor-following light reflection. A brief sheen responds to hover or keyboard focus, and touch presses provide gentle feedback. Sections enter with dimensional transitions, and skills and buttons respond to hover. Touch devices retain normal scrolling and can explore the layers by tapping. Reduced-motion preferences disable automatic movement and pointer tilt.

Project covers are recolored to warm ivory, blue ink, and cobalt, and use compressed JPEGs with lazy loading, asynchronous decoding, and reserved aspect ratios. Original PNG sources remain available for future edits. The decorative full-screen grain filter is omitted to reduce rendering overhead on mobile.

## Stack

- React 18 + TypeScript
- Vite
- Motion for React
- Lucide React
- Space Grotesk + IBM Plex Mono
- Vitest + React Testing Library
- Node.js 22.23.3

## Setup

Requirements:

- Node.js `22.23.3` (see `.nvmrc`)
- npm 10+

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Checks

The project has one reproducible check command:

```bash
make test
```

It runs:

```bash
npm run typecheck
npm run test:run
npm run build
```

The tests cover the complete project list, project filtering, keyboard-operated skill tabs, mobile navigation state, project-detail dialog behavior and focus restoration, resume preview, and copy-email feedback.

## Production build

```bash
npm run build
npm start
```

The production server listens on `http://127.0.0.1:5173` (override with `PORT`). Build output includes Brotli and gzip text variants. Fingerprinted assets receive a one-year immutable cache; HTML and unversioned files revalidate. PDF range requests support the resume viewer. Verify serving behavior with `npm run test:server` after building.

The static output is written to `dist/`.

## Docker

Build and run the production image:

```bash
docker run --rm -p 8080:80 phani-portfolio
```

Open `http://localhost:8080`.

The image uses a pinned Node 22 build stage and nginx for static serving. The nginx fallback keeps the single-page document available on direct navigation.

## Deploy

This is a static Vite site and can be deployed to Vercel, Netlify, GitHub Pages, S3/CloudFront, or any nginx/static host.

- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required
- For history fallback on a host with client-side routes, serve `index.html` for unknown paths

The document metadata currently uses `https://phani-kumar.dev/` as its canonical production URL. Update it in `index.html` if the deployed domain changes.

## Content editing

All personal and portfolio content is centralized in:

```text
src/data/portfolio.ts
```

Edit the `portfolio.person`, `skills`, `projects`, `credentials`, `achievements`, and `education` objects there. The resume is served from `public/resume.pdf` and linked via `portfolio.person.resumeUrl` — drop a real resume PDF at that path to replace the placeholder.

## Visual system

The portfolio uses a consistent light palette with cobalt actions and accessible ink text. Global foundations live in `src/styles/tokens.css` and `src/styles/base.css`; current studio components, supporting sections, and the project index are styled in the three `src/styles/studio*.css` files.

## Contact form

The contact section ships a working form. Leave `VITE_FORMSPREE_ENDPOINT` unset to fall back to the visitor's mail app, or define it with a [Formspree](https://formspree.io) endpoint to send submissions straight to the inbox.

Project descriptions and stacks were written from the supplied GitHub READMEs, repository metadata, and supplied live links. Project visuals are intentionally generated treatments, not claimed screenshots.

The hero uses a lightweight inline SVG architecture illustration rather than a WebGL scene, keeping the page fast and the visual directly connected to the portfolio’s systems focus.

All projects share the same editorial row treatment and case-study actions; filters help visitors narrow the list without introducing a featured/archive hierarchy.

## Interactive refinements

Project illustrations respond to mouse movement with a gentle spring tilt; touch users keep a stable image. Skill selection uses a moving cobalt highlight, project filtering uses a compact entrance, and a back-to-top shortcut appears after the hero leaves the viewport. All motion respects reduced-motion preferences.

To rebuild the recolored covers, run `scripts/theme-project-images.cjs` with `pngjs` and `jpeg-js` available through `NODE_PATH`. The script preserves original PNG artwork and writes JPEG derivatives; these tools are not runtime dependencies.

## Review and responsive assets

See [the performance review](docs/performance-review.md) for measured asset sizes, contrast ratios, content sources, and browser-check limitations. Project case studies distinguish documented outcomes from independently verified results. Team roles are intentionally omitted until confirmed.

Cover images use 480px, 960px, and 1586px WebP variants. To rebuild them from themed JPEGs, set `PORTFOLIO_IMAGE_TOOLS` to a directory containing `jpeg-js` and `@jsquash/webp`, then run `node scripts/responsive-images.mjs`. Encoder packages remain outside the application dependencies.
