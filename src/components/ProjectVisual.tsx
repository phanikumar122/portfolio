import { Activity, ArrowUpRight, BarChart3, CheckCircle2, Cpu, Database, FileText, Globe, Layers, Lock, ShieldCheck, Terminal, Wifi } from 'lucide-react'
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
      {/* 1. Mentora: Educational Platform Workspace */}
      {type === 'mentora' && (
        <div className="visual-hud visual-hud--mentora">
          <div className="hud-topline">
            <span className="hud-label"><Globe size={13} /> mentora.app · academic workspace</span>
            <span className="hud-status-badge">STOMP WebSockets</span>
          </div>

          <div className="hud-body mentora-grid">
            <div className="mentora-card mentora-card--active">
              <div className="mentora-card-top">
                <span className="mentora-tag">Active Course</span>
              </div>
              <strong>Data Structures & Algorithms</strong>
              <div className="mentora-metric">
                <span>Class Attendance</span>
                <b>94.8%</b>
              </div>
            </div>
            <div className="mentora-card">
              <div className="mentora-card-top">
                <span className="mentora-tag">Workspace</span>
              </div>
              <strong>Cloud & Distributed Systems</strong>
              <div className="mentora-metric">
                <span>Assignments</span>
                <b>4 of 4 Submitted</b>
              </div>
            </div>
          </div>

          <div className="mentora-telemetry-bar">
            <span className="telemetry-bar-label">Next Lecture</span>
            <span className="telemetry-subject">Raft Consensus & Distributed State</span>
            <span className="telemetry-badge">10:00 AM</span>
          </div>

          <div className="hud-footer">
            <span className="hud-footer-note">Spring Boot and STOMP messaging</span>
            <span className="hud-footer-role">Roles: Student · Faculty · Admin</span>
          </div>
        </div>
      )}

      {/* 2. APSRTC Bus Demand Forecasting: ML Analytics */}
      {type === 'transport' && (
        <div className="visual-hud visual-hud--transport">
          <div className="hud-topline">
            <span className="hud-label"><BarChart3 size={13} /> apsrtc-analytics.in · transit engine</span>
            <span className="hud-status-badge">Model: XGBoost</span>
          </div>

          <div className="transport-stats-row">
            <div><small>ACCURACY</small><strong>94.2%</strong></div>
            <div><small>ANOMALY RATE</small><strong>0.04%</strong></div>
            <div><small>TRANSIT MODES</small><strong>Bus · Rail · Feeder</strong></div>
          </div>

          <div className="transport-wave-box">
            <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="transport-svg">
              <defs>
                <linearGradient id="waveGradClean" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b9e35e" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#b9e35e" stopOpacity="1" />
                  <stop offset="100%" stopColor="#435e16" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M0,55 C40,35 70,60 110,30 C150,10 180,50 220,20 C260,5 280,25 300,10"
                fill="none"
                stroke="url(#waveGradClean)"
                strokeWidth="2.5"
                className="transport-wave-path"
              />
            </svg>
            <div className="transport-x-axis">
              <span>06:00 (Morning Peak)</span>
              <span>12:00 (Standard)</span>
              <span>18:00 (Evening Peak)</span>
              <span>23:00 (Off-Peak)</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Historical SHAP feature attribution</span>
            <b>Inference: 45ms</b>
          </div>
        </div>
      )}

      {/* 3. GoodFind Store: Editorial Commerce */}
      {type === 'goodfind' && (
        <div className="visual-hud visual-hud--goodfind">
          <div className="hud-topline">
            <span className="hud-label"><Layers size={13} /> goodfind.store · curated catalog</span>
            <span className="hud-status-badge">Live Storefront</span>
          </div>

          <div className="goodfind-mock-body">
            <div className="goodfind-hero-banner">
              <span className="banner-kicker">CURATED OBJECTS</span>
              <h4>Minimalist Living & Studio Pieces</h4>
            </div>
            <div className="goodfind-inventory-row">
              <div className="inventory-chip">
                <span>01</span> Arc Task Lamp <em>$89</em>
              </div>
              <div className="inventory-chip">
                <span>02</span> Ceramic Vessel <em>$45</em>
              </div>
              <div className="inventory-chip">
                <span>03</span> Walnut Desk <em>$150</em>
              </div>
            </div>
          </div>

          <div className="goodfind-sync-bar">
            <span>Optimistic state sync: TanStack Query and Zustand</span>
          </div>

          <div className="hud-footer">
            <span>Cart: 2 items active ($184)</span>
            <b>Free Delivery Applied</b>
          </div>
        </div>
      )}

      {/* 4. Local Document Viewer: On-Device Engine */}
      {type === 'docviewer' && (
        <div className="visual-hud visual-hud--docviewer">
          <div className="hud-topline">
            <span className="hud-label"><FileText size={13} /> docviewer.local · privacy engine</span>
            <span className="hud-status-badge">
              <Lock size={12} />
              <span>100% On-Device</span>
            </span>
          </div>

          <div className="docviewer-matrix-wrap">
            <div className="docviewer-matrix">
              <div className="doc-tile doc-tile--pdf">
                <span className="doc-ext">PDF</span>
                <strong>technical_spec.pdf</strong>
                <small>Merge · Split · Watermark</small>
              </div>
              <div className="doc-tile doc-tile--code">
                <span className="doc-ext">MD</span>
                <strong>architecture_notes.md</strong>
                <small>Client-Side Render</small>
              </div>
              <div className="doc-tile doc-tile--data">
                <span className="doc-ext">CSV</span>
                <strong>transit_metrics.csv</strong>
                <small>In-Memory Analysis</small>
              </div>
            </div>
          </div>

          <div className="hud-footer">
            <span>Zero server upload · PDF.js and pdf-lib</span>
            <b>IndexedDB Persistence</b>
          </div>
        </div>
      )}

      {/* 5. Hand Rehabilitation: Hardware & Telemetry */}
      {type === 'rehabilitation' && (
        <div className="visual-hud visual-hud--rehab">
          <div className="hud-topline">
            <span className="hud-label"><Cpu size={13} /> rehab-telemetry · esp32</span>
            <span className="hud-status-badge">
              <Wifi size={12} />
              <span>BLE 5.0 Paired</span>
            </span>
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
              <span>Grip</span>
              <div className="bar-track"><i style={{ width: '74%' }} /></div>
              <strong>0.74 N</strong>
            </div>
          </div>

          <div className="haptic-wave-bar">
            <span>Sensory feedback loop: 120 Hz haptic impulse</span>
          </div>

          <div className="hud-footer">
            <span>OLED telemetry readout synchronized</span>
            <b>Flutter App Connected</b>
          </div>
        </div>
      )}

      {/* 6. Syllabi AI: University Study Sprint Planner */}
      {type === 'syllabus' && (
        <div className="visual-hud visual-hud--syllabus">
          <div className="hud-topline">
            <span className="hud-label"><Terminal size={13} /> syllabi-planner · curriculum engine</span>
            <span className="hud-status-badge">Sprint Planner</span>
          </div>

          <div className="syllabus-hud-body">
            <div className="syllabus-progress-stat">
              <div className="progress-ring-box">
                <span className="progress-stat-number">78%</span>
                <span className="progress-stat-caption">Complete</span>
              </div>
              <div>
                <h5>7-Day Execution Sprint</h5>
                <p>Curriculum schedule structured from raw course syllabus document</p>
              </div>
            </div>

            <div className="syllabus-queue-item is-current">
              <div className="queue-status-tag">
                <span>Current Topic</span>
              </div>
              <strong>Dynamic Programming & Memoization</strong>
            </div>
          </div>

          <div className="hud-footer">
            <span>Retrieval pipeline: Gemini API and Pinecone</span>
            <b>Structured Output</b>
          </div>
        </div>
      )}

      {/* 7. SkillTern: Deterministic Talent Matching */}
      {type === 'skilltern' && (
        <div className="visual-hud visual-hud--skilltern">
          <div className="hud-topline">
            <span className="hud-label"><ShieldCheck size={13} /> skilltern.org · internship platform</span>
            <span className="hud-status-badge">Matching Engine</span>
          </div>

          <div className="skilltern-match-card">
            <div className="match-header">
              <div>
                <span className="candidate-role">Software Engineering Intern</span>
                <h4>Candidate Match Score: 94%</h4>
              </div>
              <span className="match-score-badge">High Fit</span>
            </div>

            <div className="match-criteria-list">
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> React & TypeScript</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> Spring Boot & REST APIs</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> CGPA 8.5 or higher</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> Location Match</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Deterministic Scoring Algorithm</span>
            <b>Verified Criteria</b>
          </div>
        </div>
      )}

      <span className="visual-spotlight" />
      <span className="visual-sheen" />
    </div>
  )
}
