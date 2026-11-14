# Vinnakota Phani Kumar — Portfolio

A content-first engineering portfolio for **Vinnakota Phani Kumar**, a Computer Science Engineer interested in full-stack software, cloud systems, and agentic AI.

The experience uses a dark editorial studio language built from Royal Ink (`#18152e`), Digital Lavender (`#c9b8ff`), and Acid Yellow (`#f2f762`). Selective yellow underlines identify key ideas while restrained motion supports hierarchy without competing with the work.

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
npm run preview
```

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

The portfolio uses one deliberate three-color dark palette. Global foundations live in `src/styles/tokens.css` and `src/styles/base.css`; current studio components, supporting sections, and the project index are styled in the three `src/styles/studio*.css` files.

## Contact form

The contact section ships a working form. Leave `VITE_FORMSPREE_ENDPOINT` unset to fall back to the visitor's mail app, or define it with a [Formspree](https://formspree.io) endpoint to send submissions straight to the inbox.

Project descriptions and stacks were written from the supplied GitHub READMEs, repository metadata, and supplied live links. Project visuals are intentionally generated treatments, not claimed screenshots.

The hero uses a lightweight inline SVG architecture illustration rather than a WebGL scene, keeping the page fast and the visual directly connected to the portfolio’s systems focus.

All projects share the same editorial row treatment and case-study actions; filters help visitors narrow the list without introducing a featured/archive hierarchy.
