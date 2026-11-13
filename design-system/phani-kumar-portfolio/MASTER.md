# Design System: Phani Kumar Portfolio (Obsidian & Cyber Emerald)

## 1. Visual Direction & Architecture
- **Archetype**: Developer Tool & Engineering Showcase (Linear × Raycast × Swiss Minimalist)
- **Primary Style**: Dark Mode (OLED) + Bento Box Grid + Swiss Typographic Precision
- **Key Tenet**: Anti-slop, content-first engineering. Every element communicates capability, systems maturity, and attention to detail.

## 2. Color System
### Dark Mode (Default)
- `--bg`: `#07090e` (Deep obsidian canvas, low eye strain, OLED friendly)
- `--bg-subtle`: `#0c1017`
- `--bg-raised`: `#121722`
- `--surface`: `#111726` (Clean engineered slate tile)
- `--surface-elevated`: `#172033`
- `--surface-hover`: `#1e293f`
- `--surface-active`: `#263552`
- `--text`: `#f8fafc` (Ice white, 15:1 contrast against canvas)
- `--text-secondary`: `#cbd5e1` (Soft slate, 9:1 contrast)
- `--muted`: `#94a3b8` (Balanced mid-tone slate)
- `--faint`: `#64748b`
- `--accent`: `#10b981` (Run Emerald / Electric Mint, primary signature)
- `--accent-hover`: `#059669`
- `--accent-bright`: `#34d399` (Electric Mint)
- `--accent-soft`: `rgba(16, 185, 129, 0.12)`
- `--accent-glow`: `rgba(16, 185, 129, 0.3)`
- `--accent-border`: `rgba(16, 185, 129, 0.4)`
- `--accent-cyan`: `#06b6d4` (Systems / Telemetry cyan)
- `--accent-cyan-soft`: `rgba(6, 182, 212, 0.12)`
- `--accent-violet`: `#8b5cf6` (Agentic AI electric violet)
- `--accent-violet-soft`: `rgba(139, 92, 246, 0.14)`
- `--accent-amber`: `#f59e0b`
- `--accent-rose`: `#f43f5e`
- `--line`: `rgba(255, 255, 255, 0.08)`
- `--line-soft`: `rgba(255, 255, 255, 0.04)`
- `--line-strong`: `rgba(255, 255, 255, 0.16)`
- `--line-glow`: `rgba(16, 185, 129, 0.35)`

### Light Mode
- `--bg`: `#f8fafc` (Crisp light snow canvas)
- `--bg-subtle`: `#f1f5f9`
- `--bg-raised`: `#e2e8f0`
- `--surface`: `#ffffff`
- `--surface-elevated`: `#f8fafc`
- `--surface-hover`: `#f1f5f9`
- `--surface-active`: `#e2e8f0`
- `--text`: `#0f172a` (Slate black, 14:1 contrast)
- `--text-secondary`: `#334155`
- `--muted`: `#64748b`
- `--faint`: `#94a3b8`
- `--accent`: `#059669` (Emerald 600)
- `--accent-hover`: `#047857`
- `--accent-bright`: `#10b981`
- `--accent-soft`: `rgba(5, 150, 105, 0.1)`
- `--accent-glow`: `rgba(5, 150, 105, 0.22)`
- `--accent-border`: `rgba(5, 150, 105, 0.35)`
- `--line`: `rgba(15, 23, 42, 0.08)`
- `--line-soft`: `rgba(15, 23, 42, 0.04)`
- `--line-strong`: `rgba(15, 23, 42, 0.16)`

## 3. Typography
- **Display / Headings**: Space Grotesk (geometric, distinctive, tech-forward)
- **Monospace / Code & Labels**: IBM Plex Mono / JetBrains Mono (precise, engineering, authentic)
- **Scale**:
  - Hero display: `clamp(36px, 6vw, 68px)` / line-height: 1.08 / tracking: -0.035em
  - Section headers: `clamp(28px, 4.5vw, 46px)` / line-height: 1.15
  - H3 Card Titles: `18px - 22px`
  - Body: `15px - 16px` / line-height: 1.6
  - Labels & Metadata: `11px - 13px` / font-family: mono / tracking: 0.05em uppercase

## 4. Layout & Grid Standards
- Bento Grid with asymmetric spans (`2x2`, `2x1`, `1x1`)
- Consistent container shell: `min(1200px, calc(100% - 48px))`
- Standard gutter: `clamp(20px, 4vw, 48px)`
- Standard radius: `12px - 16px` for cards, `8px` for inner chips, `9999px` for status badges

## 5. Interaction & Motion Rules
- Button & interactive hover states: 180ms ease / spring
- Card hover: `translateY(-4px)` with subtle border highlight
- Accessible focus outlines: `2px solid var(--accent)` with `3px` offset
- Strict `prefers-reduced-motion` compliance on all motion components
