# Portfolio review — 19 November 2026

## Measured assets

- Seven 480px WebP covers: 57.2 KiB total.
- Seven 1586px WebP covers: 284.0 KiB total, versus 1007.8 KiB for the previous JPEGs (71.8% reduction).
- Browsers choose one width per image through `srcset`; high-DPI phones may choose a larger version.
- Main JavaScript: 319.8 KiB raw; 96.4 KiB Brotli.
- Main CSS: 73.0 KiB raw; 12.5 KiB Brotli.
- Project details and resume preview are separate chunks, loaded on hover/focus of their triggers or when opened.
- Image dimensions reserve space; below-the-fold covers remain lazy and asynchronously decoded.

## Calculated contrast

These ratios use the specified solid color tokens, not screenshot sampling.

| Pair | Ratio | Check |
|---|---|---|
| Ink text / ivory | 14.85:1 | Pass (4.5:1 normal text) |
| Muted text / ivory | 5.84:1 | Pass (4.5:1 normal text) |
| White text / cobalt | 6.16:1 | Pass (4.5:1 normal text) |
| Field boundary / ivory | 3.38:1 | Pass (3:1 control boundary) |

Form placeholder opacity is now 1, selected skill subtitles retain full opacity, and form boundaries use the stronger border token. Decorative separators intentionally use a softer border.

## Content evidence

Public READMEs and repository file trees were reviewed for six projects. The transport model's committed CSV reports CatBoost test RMSE 54.1542 and R² 0.477527; the README discloses heuristic rail/air passenger targets and synthetic dates. These are artifact results, not independently reproduced results. GoodFind is presented as a frontend demonstration. SkillTern's public repository returned 404. Source links are included in case studies. Individual ownership/team roles remain unconfirmed and are not inferred from repository ownership.

## Mobile and runtime review

- Source review: layouts adapt to a single project column at 960px, mobile navigation at 900px, and narrower text/spacing at 700px. Section anchors remain intact; redundant About interest descriptions were removed.
- Interaction suite covers project filtering, dialogs, keyboard tabs, mobile navigation, contact feedback, and resume preview.
- Production server checks cover Brotli/gzip, q=0 negotiation, immutable asset caching, conditional requests, PDF byte ranges, missing assets, traversal rejection, and allowed methods.
- Browser rendering, real 375px/landscape layout, animation frame timing, and Core Web Vitals (LCP, INP, CLS) **were not measured**: no callable browser automation or Chromium binary is available in this device environment. A passing build/unit suite does not establish browser performance.

## Remaining browser verification

Run a mobile Lighthouse audit against the production URL with Chrome DevTools, and inspect 375px portrait and landscape, keyboard navigation, reduced motion, image requests, and dialogs. Use field data after deployment to establish actual INP and other Core Web Vitals; do not substitute bundle sizes for those measurements.

Final validation: TypeScript and production build passed; 14 interaction tests passed; the production serving integration check passed. Scroll progress uses a motion value rather than rerendering navigation on every scroll frame.
