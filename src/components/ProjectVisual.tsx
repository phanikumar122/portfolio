import { Activity, ArrowUpRight, Bot, Cpu, Database, FileText, Globe, Layers, Lock, ShieldCheck, Sparkles, Terminal, Wifi } from 'lucide-react'
import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'

interface ProjectVisualProps {
  type: ProjectVisualType
  compact?: boolean
}

export function ProjectVisual({ type, compact = false }: ProjectVisualProps) {
  return (
    <div
      className={`project-visual project-visual--${type} ${compact ? 'project-visual--compact' : ''}`}
      data-visual={type}
      aria-hidden="true"
    >
      {type === 'mentora' && (
        <div className="visual-hud visual-hud--mentora">
          <div className="hud-topline">
            <span className="hud-label"><Globe size={13} /> mentora.app / academic-os</span>
            <span className="hud-status-badge"><span className="hud-live-dot" /> STOMP Active</span>
          </div>
          <div className="hud-body mentora-grid">
            <div className="mentora-card mentora-card--active">
              <span className="mentora-tag">Active Sprint</span>
              <strong>Data Structures & Algos</strong>
              <div className="mentora-metric">
                <span>Attendance</span>
                <b>94.8%</b>
              </div>
            </div>
            <div className="mentora-card">
              <span className="mentora-tag">Workspace</span>
              <strong>Cloud Architectures</strong>
              <div className="mentora-metric">
                <span>Assignments</span>
                <b>04 / 04 Submitted</b>
              </div>
            </div>
          </div>
          <div className="hud-footer">
            <span className="hud-footer-note">WebSocket message bus: Connected</span>
            <span className="hud-footer-role">Role: Admin / Faculty / Student</span>
          </div>
        </div>
      )}

      {type === 'transport' && (
        <div className="visual-hud visual-hud--transport">
          <div className="hud-topline">
            <span className="hud-label"><Terminal size={13} /> apsrtc-demand / olap-pipeline</span>
            <span className="hud-status-badge">Model: XGBoost + SHAP</span>
          </div>
          <div className="transport-stats-row">
            <div><small>ACCURACY</small><strong>94.2%</strong></div>
            <div><small>ANOMALY SCORE</small><strong>0.04</strong></div>
            <div><small>MODES</small><strong>Bus · Rail · Air</strong></div>
          </div>
          <div className="transport-wave-box">
            <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="transport-svg">
              <path d="M0,60 C40,40 70,70 110,35 C150,5 180,55 220,25 C260,-5 280,30 300,10" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <div className="transport-x-axis">
              <span>06:00 (Peak)</span>
              <span>12:00 (Normal)</span>
              <span>18:00 (Peak)</span>
              <span>23:00 (Low)</span>
            </div>
          </div>
        </div>
      )}

      {type === 'goodfind' && (
        <div className="visual-hud visual-hud--goodfind">
          <div className="hud-topline">
            <span className="hud-label"><Layers size={13} /> goodfind.store / merchant-console</span>
            <span className="hud-status-badge">Live Storefront</span>
          </div>
          <div className="goodfind-mock-body">
            <div className="goodfind-hero-banner">
              <span className="banner-kicker">EDITORIAL STOREFRONT</span>
              <h4>Curated Objects with a Point of View</h4>
            </div>
            <div className="goodfind-inventory-row">
              <div className="inventory-pill"><span>01</span> Arc Lighting</div>
              <div className="inventory-pill"><span>02</span> Ceramic Forms</div>
              <div className="inventory-pill"><span>03</span> Minimalist Desk</div>
            </div>
          </div>
          <div className="hud-footer">
            <span>TanStack Query + Zustand store sync</span>
            <b>Bag: 2 items ($184)</b>
          </div>
        </div>
      )}

      {type === 'docviewer' && (
        <div className="visual-hud visual-hud--docviewer">
          <div className="hud-topline">
            <span className="hud-label"><FileText size={13} /> local-doc-engine / indexeddb</span>
            <span className="hud-status-badge"><Lock size={12} /> 100% Private (On-Device)</span>
          </div>
          <div className="docviewer-matrix">
            <div className="doc-tile doc-tile--pdf">
              <span className="doc-ext">PDF</span>
              <strong>technical_spec.pdf</strong>
              <small>Merge / Split / Watermark</small>
            </div>
            <div className="doc-tile doc-tile--code">
              <span className="doc-ext">MD</span>
              <strong>architecture_notes.md</strong>
              <small>Instant Local Parse</small>
            </div>
            <div className="doc-tile doc-tile--data">
              <span className="doc-ext">CSV</span>
              <strong>traffic_metrics.csv</strong>
              <small>Client-Side Table</small>
            </div>
          </div>
          <div className="hud-footer">
            <span>Zero server upload · PDF.js & pdf-lib</span>
            <b>IndexedDB Sync</b>
          </div>
        </div>
      )}

      {type === 'rehabilitation' && (
        <div className="visual-hud visual-hud--rehab">
          <div className="hud-topline">
            <span className="hud-label"><Cpu size={13} /> esp32-sensor-loop / ble-5.0</span>
            <span className="hud-status-badge"><Wifi size={12} /> Paired (Flutter App)</span>
          </div>
          <div className="rehab-telemetry-grid">
            <div className="telemetry-bar-unit">
              <span>Thumb</span>
              <div className="bar-track"><i style={{ width: '42%' }} /></div>
              <strong>42°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Index</span>
              <div className="bar-track"><i style={{ width: '82%' }} /></div>
              <strong>82°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Middle</span>
              <div className="bar-track"><i style={{ width: '65%' }} /></div>
              <strong>65°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Force</span>
              <div className="bar-track"><i style={{ width: '74%' }} /></div>
              <strong>0.74N</strong>
            </div>
          </div>
          <div className="hud-footer">
            <span>Haptic feedback: 120Hz impulse</span>
            <b>OLED Display synced</b>
          </div>
        </div>
      )}

      {type === 'syllabus' && (
        <div className="visual-hud visual-hud--syllabus">
          <div className="hud-topline">
            <span className="hud-label"><Bot size={13} /> syllabi.ai / gemini-parser</span>
            <span className="hud-status-badge">RAG Active</span>
          </div>
          <div className="syllabus-hud-body">
            <div className="syllabus-progress-stat">
              <div className="progress-circle"><strong>78%</strong><small>Structured</small></div>
              <div>
                <h5>Curriculum Plan Generated</h5>
                <p>7-day manageable execution sprint created from raw syllabus PDF</p>
              </div>
            </div>
            <div className="syllabus-queue-item is-current">
              <span>Next Topic</span>
              <strong>Dynamic Programming & Memoization</strong>
            </div>
          </div>
        </div>
      )}

      {type === 'skilltern' && (
        <div className="visual-hud visual-hud--skilltern">
          <div className="hud-topline">
            <span className="hud-label"><ShieldCheck size={13} /> skilltern / deterministic-matching</span>
            <span className="hud-status-badge">Engine v1.0</span>
          </div>
          <div className="skilltern-match-card">
            <div className="match-header">
              <div>
                <span className="candidate-role">Full-Stack Engineering Intern</span>
                <h4>Candidate Match Score: 94%</h4>
              </div>
              <span className="match-score-badge">High Fit</span>
            </div>
            <div className="match-criteria-list">
              <span>✓ React & TypeScript</span>
              <span>✓ Node.js & REST</span>
              <span>✓ CGPA 8.5+</span>
              <span>✓ Location Fit</span>
            </div>
          </div>
        </div>
      )}

      <span className="visual-spotlight" />
      <span className="visual-sheen" />
    </div>
  )
}
