# Phani Kumar — Portfolio

A portfolio for Vinnakota Phani Kumar, a Computer Science undergraduate building full-stack applications, data tools, and connected systems.

## Design

The monochrome interface pairs a porcelain masthead with a serif name and the supplied monochrome portrait.

The page follows Intro → Projects → Skills → Education → Certifications → Awards → Contact. Projects use custom monochrome conceptual covers in a two-column grid that stacks on narrow screens. All projects appear by default. Actual screenshots, descriptions, technology stacks, confirmed roles, and source limitations remain in case-study evidence galleries and dialogs.

Skills use a porcelain tab workspace. Contact uses a black surface. Education, Certifications, and Awards use porcelain ruled layouts. Contact has readable porcelain form controls and explicit delivery help. Landing section labels stay concise.

Space Grotesk and IBM Plex Mono load locally. Georgia supplies the serif headlines. The layout uses a 1392px maximum content width, fluid gutters and square controls. A fixed, faceted 3D ribbon turns with scroll progress. It holds still while the page is idle or when reduced motion is enabled.

## Development

- Node.js 22.23.3 (see `.nvmrc`) and npm 10+
- React 18, TypeScript, Vite 6, Lucide
- Run `npm ci`, then `npm run dev`
- Open `http://localhost:5173`

## Validation and production

Run checks before delivery:

```sh
npm test
npm run build
npm run test:server
```

The interaction suite exercises optional portrait behavior, project filtering, skill tabs, evidence galleries, navigation, clipboard feedback, and dialog/resume focus behavior.

The build writes static assets plus gzip and Brotli variants to `dist/`. Run `npm start` for the production server; its default port is 5173 and can be overridden with `PORT`. The server supports asset caching, conditional requests, and PDF byte ranges. Static hosts can also serve `dist/` directly.

GitHub Pages uses separate build/upload and deployment jobs in `.github/workflows/deploy.yml`. Deployment waits for a successful build and consumes the explicitly named `github-pages` artifact using the v5 Pages actions.

## Content and portrait

Edit content in `src/data/portfolio.ts`. All seven projects remain available. `ProjectVisual` supplies conceptual landing illustrations; actual public screenshots in `src/assets/projects/` retain their evidence captions and original colors.

`portfolio.person.portraitUrl` is empty while awaiting an authentic personal photo. To add one:

1. Put the photo at `public/portrait.webp`.
2. Set `portraitUrl: './portrait.webp'` in `src/data/portfolio.ts`.

Replace `public/resume.pdf` to update the resume. Update the canonical URL and social metadata in `index.html` when using a domain other than `https://phani-kumar.dev/`.

## Contact

Without `VITE_FORMSPREE_ENDPOINT`, the form prepares a draft in the visitor's email app and explains that they send it there. Configure that build-time environment variable with a Formspree endpoint for direct delivery. Labeled inputs retain content after failed submissions and remain protected while delivery is pending.

## Design sources

`src/styles/tokens.css` defines semantic tokens and `src/styles/portfolio.css` is the application stylesheet. Design context is recorded in `design-system/phani-kumar-portfolio/MASTER.md`.
