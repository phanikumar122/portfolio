# Vinnakota Phani Kumar — Portfolio

A dark editorial portfolio for **Vinnakota Phani Kumar**, a Computer Science Engineer interested in full-stack software, cloud systems, and agentic AI.

The experience is built around a “Signal Systems” visual language: technical grids, a restrained signal-lime accent, project-specific abstract visuals, and motion that helps the reader move through the work without blocking the page.

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

Edit the `portfolio.person`, `skills`, `projects`, `credentials`, `achievements`, and `education` objects there. The optional resume field is currently:

```ts
resumeUrl: null
```

When a real resume URL is available, replace `null` with that URL and add a link in the navigation/contact UI if desired. No resume URL has been invented.

Project descriptions and stacks were written from the supplied GitHub READMEs, repository metadata, and supplied live links. Project visuals are intentionally generated treatments, not claimed screenshots.
