# Vinnakota Phani Kumar — Portfolio

A precise engineering portfolio for **Vinnakota Phani Kumar**, a Computer Science Engineer interested in full-stack software, cloud systems, and agentic AI.

The experience uses an engineering-field-notes visual language built entirely from Onyx (`#0a090c`) and Platinum (`#f0edee`), with transparent derivatives, rounded interface surfaces, blueprint-style project diagrams, and motion that supports navigation without competing with the work.

## Stack

- React 18 + TypeScript
- Vite
- Motion for React
- Three.js (lazy-loaded, scroll-linked global background)
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

The tests cover the complete project list, mobile navigation state, project-detail dialog opening/closing and focus restoration, and copy-email feedback.

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

There is no canonical URL in the metadata because a deployed domain has not been supplied.

## Content editing

All personal and portfolio content is centralized in:

```text
src/data/portfolio.ts
```

Edit the `portfolio.person`, `skills`, `projects`, `credentials`, `achievements`, and `education` objects there. The resume is served from `public/resume.pdf` and linked via `portfolio.person.resumeUrl` — drop a real resume PDF at that path to replace the placeholder.

## Theming

A light/dark toggle lives in the navbar. Both palettes are centralized in `src/styles/tokens.css`, while component styling and responsive rules live in `src/styles/redesign.css`. The choice persists in `localStorage` and follows the OS preference on first visit.

## Contact form

The contact section ships a working form. Leave `FORMSPREE_ENDPOINT` in `src/components/Contact.tsx` blank to fall back to the visitor's mail app, or paste a [Formspree](https://formspree.io) endpoint to send submissions straight to the inbox.

Project descriptions and stacks were written from the supplied GitHub READMEs, repository metadata, and supplied live links. Project visuals are intentionally generated treatments, not claimed screenshots.

The Three.js background scene is loaded only when WebGL and motion preferences permit it. A custom Möbius ribbon, double helix, and flowing wave lattice move with page progress to create a continuous 3D scroll narrative behind the interface. Reduced-motion users and browsers without WebGL receive a static geometric background instead.

All projects share the same card dimensions, visual treatment, and case-study actions; there is no featured/archive hierarchy.
