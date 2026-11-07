import { Code2, Cpu, Database, Network, Sparkles, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const domainMeta: Record<string, { icon: typeof Code2; subtitle: string; focus: string; tag: string }> = {
  Build: {
    icon: Code2,
    subtitle: 'Frontend & API Engineering',
    focus: 'Modular component hierarchies, strict TypeScript contracts, sub-second TTFB, and responsive fluid interfaces.',
    tag: 'UI/UX & Web Architecture',
  },
  Data: {
    icon: Database,
    subtitle: 'Storage & Analytics Pipelines',
    focus: 'ACID transactional integrity, normalized relational schemas, NoSQL document modeling, and streaming ETL workflows.',
    tag: 'Persistence & Pipeline Engine',
  },
  Systems: {
    icon: Network,
    subtitle: 'Infrastructure & Cloud Services',
    focus: 'Containerized microservices, distributed messaging with Kafka, Linux automation, and production-grade CI/CD pipelines.',
    tag: 'Cloud & Distributed Systems',
  },
  'Agentic AI': {
    icon: Sparkles,
    subtitle: 'Autonomous Systems & LLMs',
    focus: 'Multi-turn agent loops, prompt orchestration, retrieval-augmented generation (RAG), and deterministic tool-calling.',
    tag: 'Intelligent Agent Engineering',
  },
}

export function Expertise() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const selectSkill = (index: number, moveFocus = false) => {
    setActive(index)
    if (moveFocus) tabRefs.current[index]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = portfolio.skills.length - 1
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = active === lastIndex ? 0 : active + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = active === 0 ? lastIndex : active - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex

    if (nextIndex !== undefined) {
      event.preventDefault()
      selectSkill(nextIndex, true)
    }
  }

  const currentGroup = portfolio.skills[active]
  const currentMeta = domainMeta[currentGroup.title] || domainMeta.Build

  return (
    <SectionReveal className="expertise section-shell section-padding" id="expertise" aria-labelledby="expertise-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="expertise-title">Technical<br /><em>capabilities.</em></h2>
          <p className="section-lead-desc">Systematic engineering capabilities across frontend architectures, distributed backends, data infrastructure, and autonomous agent loops.</p>
        </Reveal>
      </div>

      <div className="capabilities-console">
        {/* Left Rail: 4 Architectural Domain Tabs */}
        <div className="capabilities-rail" role="tablist" aria-label="Technical expertise groups" aria-orientation="vertical">
          {portfolio.skills.map((group, index) => {
            const meta = domainMeta[group.title] || domainMeta.Build
            const Icon = meta.icon
            const isActive = active === index
            const tabId = `skill-tab-${group.index}`
            const panelId = `skill-panel-${group.index}`

            return (
              <button
                key={group.title}
                ref={(element) => { tabRefs.current[index] = element }}
                className={`capability-domain-card ${isActive ? 'is-active' : ''}`}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectSkill(index)}
                onKeyDown={handleTabKeyDown}
              >
                <div className="domain-card-header">
                  <span className="domain-index-num">DOMAIN {group.index}</span>
                  <span className="domain-skill-count">{group.skills.length} TECHS</span>
                </div>
                <div className="domain-card-body">
                  <span className="domain-icon-box" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div className="domain-card-titles">
                    <strong className="domain-primary-title">{group.title}</strong>
                    <span className="domain-subtitle">{meta.subtitle}</span>
                  </div>
                </div>
                <div className="domain-card-active-line" aria-hidden="true" />
              </button>
            )
          })}
        </div>

        {/* Right Stage: Active Domain Deep-Dive Tabpanel */}
        <div className="capabilities-stage">
          {portfolio.skills.map((group, index) => {
            const isActive = active === index
            const panelId = `skill-panel-${group.index}`
            const meta = domainMeta[group.title] || domainMeta.Build
            const Icon = meta.icon

            return (
              <div
                key={group.title}
                className="capability-panel"
                id={panelId}
                role="tabpanel"
                aria-labelledby={`skill-tab-${group.index}`}
                aria-live="polite"
                hidden={!isActive}
              >
                {isActive && (
                  <motion.div
                    className="capability-panel-inner"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="panel-headline-row">
                      <div>
                        <div className="panel-kicker-bar">
                          <span className="panel-kicker-tag">{meta.tag}</span>
                          <span className="panel-kicker-index">SPEC // {group.index}</span>
                        </div>
                        <h3 className="panel-domain-title">
                          <Icon size={24} className="panel-domain-title-icon" aria-hidden="true" />
                          <span>{group.title}</span>
                          <em className="panel-title-dot">.</em>
                        </h3>
                        <p className="panel-domain-desc">{group.description}</p>
                      </div>
                      <div className="panel-count-badge">
                        <strong className="count-large">{String(group.skills.length).padStart(2, '0')}</strong>
                        <span className="count-label">Production Tools</span>
                      </div>
                    </div>

                    <div className="panel-matrix-section">
                      <div className="matrix-topline">
                        <span className="matrix-title">CORE TECHNOLOGIES & FRAMEWORKS</span>
                        <span className="matrix-counter">{group.skills.length} Items Verified</span>
                      </div>
                      <motion.div
                        className="capability-skills-grid"
                        initial={reducedMotion ? false : 'hidden'}
                        animate="visible"
                        variants={{ hidden: {}, visible: { transition: { delayChildren: 0.05, staggerChildren: 0.025 } } }}
                      >
                        {group.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            className="skill-tech-chip"
                            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="tech-chip-slash">/</span>
                            <span className="tech-chip-name">{skill}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    <div className="panel-engineering-footer">
                      <div className="footer-focus-label">ARCHITECTURAL FOCUS:</div>
                      <p className="footer-focus-text">{meta.focus}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}
