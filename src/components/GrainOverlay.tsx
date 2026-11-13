/**
 * Ultra-subtle film grain that keeps large flat surfaces from feeling cheap.
 * Purely decorative — pointer-events: none, aria-hidden.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}
