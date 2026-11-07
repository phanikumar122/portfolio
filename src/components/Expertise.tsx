import { ChevronRight, Code2, Database, Network, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const iconByTitle: Record<string, typeof Code2> = {
  Build: Code2,
  Data: Database,
  Systems: Network,
  'Agentic AI': Sparkles,
  AI: Sparkles,
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
          <p className="section-lead-desc">Core competencies across frontend engineering, distributed cloud backends, and autonomous agent loops.</p>
        </Reveal>
      </div>

      <div className="expertise-editorial-layout">
        <div className="expertise-nav-row" role="tablist" aria-label="Technical expertise groups" aria-orientation="horizontal">
          {portfolio.skills.map((group, index) => {
            const Icon = iconByTitle[group.title] ?? Code2
            const isActive = active === index
            const tabId = `skill-tab-${group.index}`
            const panelId = `skill-panel-${group.index}`

            return (
              <button
                key={group.title}
                ref={(element) => { tabRefs.current[index] = element }}
                className={`expertise-segment-btn ${isActive ? 'is-active' : ''}`}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectSkill(index)}
                onKeyDown={handleTabKeyDown}
              >
                <span className="segment-index">{group.index}</span>
                <span className="segment-icon" aria-hidden="true"><Icon size={16} /></span>
                <span className="segment-title">{group.title}</span>
                <span className="segment-count">{group.skills.length}</span>
              </button>
            )
          })}
        </div>

        <div className="expertise-panel-shell">
          {portfolio.skills.map((group, index) => {
            const isActive = active === index
            const panelId = `skill-panel-${group.index}`

            return (
              <div
                key={group.title}
                className="expertise-panel"
                id={panelId}
                role="tabpanel"
                aria-labelledby={`skill-tab-${group.index}`}
                aria-live="polite"
                hidden={!isActive}
              >
                {isActive && (
                  <motion.div
                    className="expertise-panel-stage"
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="panel-editorial-header">
                      <div>
                        <span className="panel-domain-index">DOMAIN {group.index}</span>
                        <h3>{group.title}<span>.</span></h3>
                        <p>{group.description}</p>
                      </div>
                      <div className="panel-summary-stat">
                        <strong>{String(group.skills.length).padStart(2, '0')}</strong>
                        <span>Verified Technologies</span>
                      </div>
                    </div>

                    <motion.div
                      className="skill-list"
                      initial={reducedMotion ? false : 'hidden'}
                      animate="visible"
                      variants={{ hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: 0.03 } } }}
                    >
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="skill-tech-item"
                          variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                          transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span className="tech-item-mark">/</span>
                          {skill}
                        </motion.span>
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
