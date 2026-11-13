import { Code2, Cpu, Database, Network } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}
const chipItem = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const domainSubtitles: Record<string, { icon: typeof Code2; subtitle: string }> = {
  Build: { icon: Code2, subtitle: 'Frontend & APIs' },
  Data: { icon: Database, subtitle: 'Databases & Storage' },
  Systems: { icon: Network, subtitle: 'Cloud & Infrastructure' },
  'Agentic AI': { icon: Cpu, subtitle: 'Applied AI & Workflows' },
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

  return (
    <SectionReveal className="expertise section-shell section-padding" id="expertise" aria-labelledby="expertise-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="expertise-title">Technical<br /><em>capabilities.</em></h2>
          <p className="section-lead-desc">Core languages, frameworks, and infrastructure tools I work with.</p>
        </Reveal>
      </div>

      <div className="capabilities-console">
        {/* Left Rail: 4 Domain Selectors */}
        <div className="capabilities-rail" role="tablist" aria-label="Technical expertise groups" aria-orientation="vertical">
          {portfolio.skills.map((group, index) => {
            const meta = domainSubtitles[group.title] || domainSubtitles.Build
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
                  <span className="domain-index-num">{group.index}</span>
                  <span className="domain-skill-count">{group.skills.length} skills</span>
                </div>
                <div className="domain-card-body">
                  <span className="domain-icon-box" aria-hidden="true">
                    <Icon size={16} />
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

        {/* Right Stage: Active Domain Content */}
        <div className="capabilities-stage">
          {portfolio.skills.map((group, index) => {
            const isActive = active === index
            const panelId = `skill-panel-${group.index}`

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
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="panel-headline-row">
                      <div>
                        <h3 className="panel-domain-title">
                          <span>{group.title}</span>
                          <em className="panel-title-dot">.</em>
                        </h3>
                        <p className="panel-domain-desc">{group.description}</p>
                      </div>
                    </div>

                    <motion.div
                      className="capability-skills-grid"
                      variants={reducedMotion ? undefined : chipContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {group.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          className="skill-tech-row"
                          variants={reducedMotion ? undefined : chipItem}
                          whileHover={reducedMotion ? undefined : { x: 3 }}
                        >
                          <span className="tech-row-name">{skill}</span>
                        </motion.div>
                      ))}
                    </motion.div>
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
