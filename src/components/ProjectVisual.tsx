import { BarChart3, CheckCircle2, Cpu, FileText, Globe, Layers, Lock, ShieldCheck, Terminal, Wifi } from 'lucide-react'
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
      {/* 1. Mentora: Educational Workspace */}
      {type === 'mentora' && (
        <div className="visual-hud visual-hud--mentora">
          <div className="hud-topline">
            <span className="hud-label"><Globe size={13} /> mentora.app</span>
            <span className="hud-status-badge">WebSockets</span>
          </div>

          <div className="hud-body mentora-grid">
            <div className="mentora-card mentora-card--active">
              <span className="mentora-tag">Course</span>
              <strong>Data Structures & Algorithms</strong>
              <div className="mentora-metric">
                <span>Attendance</span>
                <b>94.8%</b>
              </div>
            </div>
            <div className="mentora-card">
              <span className="mentora-tag">Workspace</span>
              <strong>Distributed Systems</strong>
              <div className="mentora-metric">
                <span>Submissions</span>
                <b>4 of 4</b>
              </div>
            </div>
          </div>

          <div className="hud-footer">
            <span>Spring Boot & STOMP</span>
            <b>Active Term</b>
          </div>
        </div>
      )}

      {/* 2. Public Transport Demand Prediction */}
      {type === 'transport' && (
        <div className="visual-hud visual-hud--transport">
          <div className="hud-topline">
            <span className="hud-label"><BarChart3 size={13} /> APSRTC Analytics</span>
            <span className="hud-status-badge">XGBoost Model</span>
          </div>

          <div className="transport-stats-row">
            <div><small>ACCURACY</small><strong>94.2%</strong></div>
            <div><small>ANOMALIES</small><strong>0.04%</strong></div>
            <div><small>TRANSIT</small><strong>Bus & Rail</strong></div>
          </div>

          <div className="transport-wave-box">
            <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="transport-svg">
              <defs>
                <linearGradient id="waveGradClean" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b9e35e" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#b9e35e" stopOpacity="1" />
                  <stop offset="100%" stopColor="#435e16" stopOpacity="0.7" />
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
              <span>06:00 Peak</span>
              <span>12:00 Regular</span>
              <span>18:00 Peak</span>
              <span>23:00 Night</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Multi-modal ETL pipeline</span>
            <b>SHAP Analysis</b>
          </div>
        </div>
      )}

      {/* 3. GoodFind Commerce Frontend */}
      {type === 'goodfind' && (
        <div className="visual-hud visual-hud--goodfind">
          <div className="hud-topline">
            <span className="hud-label"><Layers size={13} /> goodfind.store</span>
            <span className="hud-status-badge">Storefront</span>
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

          <div className="hud-footer">
            <span>TanStack Query & Zustand</span>
            <b>Cart (2 items)</b>
          </div>
        </div>
      )}

      {/* 4. Local Document Viewer */}
      {type === 'docviewer' && (
        <div className="visual-hud visual-hud--docviewer">
          <div className="hud-topline">
            <span className="hud-label"><FileText size={13} /> docviewer.local</span>
            <span className="hud-status-badge">
              <Lock size={12} />
              <span>Private</span>
            </span>
          </div>

          <div className="docviewer-matrix-wrap">
            <div className="docviewer-matrix">
              <div className="doc-tile doc-tile--pdf">
                <span className="doc-ext">PDF</span>
                <strong>technical_spec.pdf</strong>
                <small>Merge & Split</small>
              </div>
              <div className="doc-tile doc-tile--code">
                <span className="doc-ext">MD</span>
                <strong>architecture_notes.md</strong>
                <small>Markdown Preview</small>
              </div>
              <div className="doc-tile doc-tile--data">
                <span className="doc-ext">CSV</span>
                <strong>transit_metrics.csv</strong>
                <small>Table View</small>
              </div>
            </div>
          </div>

          <div className="hud-footer">
            <span>PDF.js & pdf-lib</span>
            <b>IndexedDB</b>
          </div>
        </div>
      )}

      {/* 5. Smart Hand Rehabilitation */}
      {type === 'rehabilitation' && (
        <div className="visual-hud visual-hud--rehab">
          <div className="hud-topline">
            <span className="hud-label"><Cpu size={13} /> Smart Glove Interface</span>
            <span className="hud-status-badge">
              <Wifi size={12} />
              <span>BLE 5.0</span>
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

          <div className="hud-footer">
            <span>ESP32 Flex Sensors</span>
            <b>Haptic Feedback</b>
          </div>
        </div>
      )}

      {/* 6. Syllabi-AI Study Planner */}
      {type === 'syllabus' && (
        <div className="visual-hud visual-hud--syllabus">
          <div className="hud-topline">
            <span className="hud-label"><Terminal size={13} /> Syllabi-AI</span>
            <span className="hud-status-badge">Study Planner</span>
          </div>

          <div className="syllabus-hud-body">
            <div className="syllabus-progress-stat">
              <div className="progress-ring-box">
                <span className="progress-stat-number">78%</span>
                <span className="progress-stat-caption">Structured</span>
              </div>
              <div>
                <h5>7-Day Study Sprint</h5>
                <p>Course schedule organized from syllabus topics</p>
              </div>
            </div>

            <div className="syllabus-queue-item is-current">
              <div className="queue-status-tag">
                <span>Active Topic</span>
              </div>
              <strong>Dynamic Programming & Memoization</strong>
            </div>
          </div>

          <div className="hud-footer">
            <span>Firebase & Gemini API</span>
            <b>Sprint Active</b>
          </div>
        </div>
      )}

      {/* 7. SkillTern Internship Matching */}
      {type === 'skilltern' && (
        <div className="visual-hud visual-hud--skilltern">
          <div className="hud-topline">
            <span className="hud-label"><ShieldCheck size={13} /> SkillTern</span>
            <span className="hud-status-badge">Matching</span>
          </div>

          <div className="skilltern-match-card">
            <div className="match-header">
              <div>
                <span className="candidate-role">Engineering Intern</span>
                <h4>Candidate Match: 94%</h4>
              </div>
              <span className="match-score-badge">Match</span>
            </div>

            <div className="match-criteria-list">
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> React & TypeScript</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> Node.js & REST</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> CGPA 8.5+</span>
              <span className="criteria-item"><CheckCircle2 size={13} className="criteria-check" /> Location Preference</span>
            </div>
          </div>

          <div className="hud-footer">
            <span>Rules Engine</span>
            <b>Direct Application</b>
          </div>
        </div>
      )}

      <span className="visual-spotlight" />
      <span className="visual-sheen" />
    </div>
  )
}
