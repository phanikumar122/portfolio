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
      {/* 1. Mentora: Real-Time Academic OS & WebSocket Bus */}
      {type === 'mentora' && (
        <div className="visual-hud visual-hud--mentora">
          <div className="hud-topline">
            <span className="hud-label"><Globe size={13} /> mentora.app / academic-os</span>
            <span className="hud-status-badge">
              <span className="hud-live-beacon" />
              <span>STOMP ACTIVE</span>
            </span>
          </div>

          <div className="hud-body mentora-grid">
            <div className="mentora-card mentora-card--active">
              <div className="mentora-card-top">
                <span className="mentora-tag">ACTIVE SPRINT</span>
                <span className="mentora-live-ping" />
              </div>
              <strong>Data Structures & Algos</strong>
              <div className="mentora-metric">
                <span>Real-Time Attendance</span>
                <b>94.8%</b>
              </div>
            </div>
            <div className="mentora-card">
              <div className="mentora-card-top">
                <span className="mentora-tag">WORKSPACE</span>
              </div>
              <strong>Cloud Architectures</strong>
              <div className="mentora-metric">
                <span>Assignments</span>
                <b>04 / 04 Submitted</b>
              </div>
            </div>
          </div>

          <div className="mentora-telemetry-bar">
            <span className="telemetry-bar-label">WS PACKET STREAM</span>
            <div className="telemetry-equalizer">
              <span className="eq-bar eq-bar-1" />
              <span className="eq-bar eq-bar-2" />
              <span className="eq-bar eq-bar-3" />
              <span className="eq-bar eq-bar-4" />
              <span className="eq-bar eq-bar-5" />
              <span className="eq-bar eq-bar-6" />
              <span className="eq-bar eq-bar-7" />
            </div>
            <span className="telemetry-latency">14ms latency</span>
          </div>

          <div className="hud-footer">
            <span className="hud-footer-note">Spring Boot WebSocket message bus</span>
            <span className="hud-footer-role">Roles: Student · Faculty · Admin</span>
          </div>
        </div>
      )}

      {/* 2. APSRTC Bus Demand Forecasting: ML & OLAP Pipeline */}
      {type === 'transport' && (
        <div className="visual-hud visual-hud--transport">
          <div className="hud-topline">
            <span className="hud-label"><Terminal size={13} /> apsrtc-demand / olap-pipeline</span>
            <span className="hud-status-badge">
              <span className="hud-live-beacon" />
              <span>MODEL: XGBOOST</span>
            </span>
          </div>

          <div className="transport-stats-row">
            <div><small>ACCURACY</small><strong>94.2%</strong></div>
            <div><small>ANOMALY SCORE</small><strong>0.04</strong></div>
            <div><small>TRANSIT MODES</small><strong>Bus · Rail · Air</strong></div>
          </div>

          <div className="transport-wave-box">
            <div className="chart-scanner-beam" />
            <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="transport-svg">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b9e35e" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#b9e35e" stopOpacity="1" />
                  <stop offset="100%" stopColor="#435e16" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C40,40 70,70 110,35 C150,5 180,55 220,25 C260,-5 280,30 300,10"
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth="2.5"
                className="transport-wave-path"
              />
              <circle cx="150" cy="5" r="4" className="transport-peak-beacon" />
            </svg>
            <div className="transport-x-axis">
              <span>06:00 (Peak)</span>
              <span>12:00 (Normal)</span>
              <span>18:00 (Peak)</span>
              <span>23:00 (Low)</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Historical SHAP feature attribution</span>
            <b>Latency: &lt; 85ms</b>
          </div>
        </div>
      )}

      {/* 3. GoodFind Store: E-Commerce Architecture */}
      {type === 'goodfind' && (
        <div className="visual-hud visual-hud--goodfind">
          <div className="hud-topline">
            <span className="hud-label"><Layers size={13} /> goodfind.store / merchant-console</span>
            <span className="hud-status-badge">
              <span className="hud-live-beacon" />
              <span>LIVE STOREFRONT</span>
            </span>
          </div>

          <div className="goodfind-mock-body">
            <div className="goodfind-hero-banner">
              <span className="banner-kicker">EDITORIAL CATALOG</span>
              <h4>Curated Objects with a Point of View</h4>
            </div>
            <div className="goodfind-inventory-row">
              <div className="inventory-chip">
                <span>01</span> Arc Lighting <em>$89</em>
              </div>
              <div className="inventory-chip">
                <span>02</span> Ceramic Forms <em>$45</em>
              </div>
              <div className="inventory-chip">
                <span>03</span> Minimalist Desk <em>$150</em>
              </div>
            </div>
          </div>

          <div className="goodfind-sync-bar">
            <span className="sync-pulse-dot" />
            <span>State synchronized: TanStack Query + Zustand</span>
          </div>

          <div className="hud-footer">
            <span>Cart: 2 items active ($184)</span>
            <b>Optimistic UI Sync</b>
          </div>
        </div>
      )}

      {/* 4. Local Document Viewer: On-Device Engine */}
      {type === 'docviewer' && (
        <div className="visual-hud visual-hud--docviewer">
          <div className="hud-topline">
            <span className="hud-label"><FileText size={13} /> local-doc-engine / indexeddb</span>
            <span className="hud-status-badge">
              <Lock size={12} />
              <span>100% PRIVATE (ON-DEVICE)</span>
            </span>
          </div>

          <div className="docviewer-scanner-stage">
            <div className="scanner-sweep-line" />
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
          </div>

          <div className="hud-footer">
            <span>Zero server upload · PDF.js & pdf-lib</span>
            <b>IndexedDB Sync</b>
          </div>
        </div>
      )}

      {/* 5. Hand Rehabilitation: ESP32 & Haptics Loop */}
      {type === 'rehabilitation' && (
        <div className="visual-hud visual-hud--rehab">
          <div className="hud-topline">
            <span className="hud-label"><Cpu size={13} /> esp32-sensor-loop / ble-5.0</span>
            <span className="hud-status-badge">
              <Wifi size={12} />
              <span>PAIRED (FLUTTER APP)</span>
            </span>
          </div>

          <div className="rehab-telemetry-grid">
            <div className="telemetry-bar-unit">
              <span>Thumb</span>
              <div className="bar-track"><i style={{ width: '42%' }} className="bar-animate-1" /></div>
              <strong>42°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Index</span>
              <div className="bar-track"><i style={{ width: '82%' }} className="bar-animate-2" /></div>
              <strong>82°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Middle</span>
              <div className="bar-track"><i style={{ width: '65%' }} className="bar-animate-3" /></div>
              <strong>65°</strong>
            </div>
            <div className="telemetry-bar-unit">
              <span>Force</span>
              <div className="bar-track"><i style={{ width: '74%' }} className="bar-animate-4" /></div>
              <strong>0.74N</strong>
            </div>
          </div>

          <div className="haptic-wave-bar">
            <div className="haptic-wave-pulse" />
            <span>Haptic feedback: 120Hz oscillating impulse loop</span>
          </div>

          <div className="hud-footer">
            <span>OLED telemetry readout synced</span>
            <b>BLE 5.0 Stable</b>
          </div>
        </div>
      )}

      {/* 6. Syllabi AI: Gemini RAG Curriculum Engine */}
      {type === 'syllabus' && (
        <div className="visual-hud visual-hud--syllabus">
          <div className="hud-topline">
            <span className="hud-label"><Bot size={13} /> syllabi.ai / gemini-parser</span>
            <span className="hud-status-badge">
              <span className="hud-live-beacon" />
              <span>RAG ACTIVE</span>
            </span>
          </div>

          <div className="syllabus-hud-body">
            <div className="syllabus-progress-stat">
              <div className="progress-ring-box">
                <svg viewBox="0 0 44 44" className="progress-ring-svg">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#b9e35e" strokeWidth="3" strokeDasharray="113" strokeDashoffset="25" className="progress-ring-circle" />
                </svg>
                <span className="progress-ring-text">78%</span>
              </div>
              <div>
                <h5>Curriculum Plan Generated</h5>
                <p>7-day manageable execution sprint created from raw syllabus PDF</p>
              </div>
            </div>

            <div className="syllabus-queue-item is-current">
              <div className="queue-status-tag">
                <span className="queue-pulse-dot" />
                <span>Next Topic</span>
              </div>
              <strong>Dynamic Programming & Memoization</strong>
            </div>
          </div>

          <div className="hud-footer">
            <span>Vector embeddings: Pinecone</span>
            <b>Gemini 1.5 Pro</b>
          </div>
        </div>
      )}

      {/* 7. SkillTern: Deterministic Candidate Matching */}
      {type === 'skilltern' && (
        <div className="visual-hud visual-hud--skilltern">
          <div className="hud-topline">
            <span className="hud-label"><ShieldCheck size={13} /> skilltern / deterministic-matching</span>
            <span className="hud-status-badge">
              <span className="hud-live-beacon" />
              <span>ENGINE V1.0</span>
            </span>
          </div>

          <div className="skilltern-match-card">
            <div className="match-header">
              <div>
                <span className="candidate-role">Full-Stack Engineering Intern</span>
                <h4>Candidate Match Score: 94%</h4>
              </div>
              <span className="match-score-badge">94% Fit</span>
            </div>

            <div className="match-criteria-list">
              <span className="criteria-item"><i className="criteria-check">✓</i> React & TypeScript</span>
              <span className="criteria-item"><i className="criteria-check">✓</i> Node.js & REST</span>
              <span className="criteria-item"><i className="criteria-check">✓</i> CGPA 8.5+</span>
              <span className="criteria-item"><i className="criteria-check">✓</i> Location Match</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Deterministic Scoring Algorithm</span>
            <b>Zero Bias Engine</b>
          </div>
        </div>
      )}

      <span className="visual-spotlight" />
      <span className="visual-sheen" />
    </div>
  )
}
