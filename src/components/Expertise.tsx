import { ArrowUpRight, Code2, Cpu, Database, Network } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'

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
    <section className="studio-section studio-expertise section-shell section-padding" id="expertise" aria-labelledby="expertise-title">
      <div className="studio-section-header">
        <Reveal>
          <h2 className="studio-heading" id="expertise-title">Different tools.<br /><em>One connected approach.</em></h2>
        </Reveal>
        <p className="studio-description">From the <span className="studio-highlight">first interaction</span> to the <span className="studio-highlight">last deployment</span>. Explore the languages, frameworks, and systems I work with.</p>
      </div>

      <div className="studio-skills-console">
        {/* Left Rail: 4 Domain Selectors */}
        <div className="studio-skills-tabs" role="tablist" aria-label="Technical expertise groups">
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
                className={`studio-skill-tab ${isActive ? 'is-active' : ''}`}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectSkill(index)}
                onKeyDown={handleTabKeyDown}
              >
                <div className="studio-tab-title">
                  <span aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <strong>{group.title}</strong>
                    <span className="studio-tab-subtitle">{meta.subtitle}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Stage: Active Domain Content */}
        <div className="studio-skills-stage">
          {portfolio.skills.map((group, index) => {
            const isActive = active === index
            const panelId = `skill-panel-${group.index}`

            return (
              <div
                key={group.title}
                className="studio-skill-panel"
                id={panelId}
                role="tabpanel"
                aria-labelledby={`skill-tab-${group.index}`}
                aria-live="polite"
                hidden={!isActive}
              >
                {isActive && (
                  <motion.div
                    className="studio-skill-panel-inner"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="studio-panel-head">
                      <div>
                        <h3>
                          <span>{group.title}</span>
                          <em>.</em>
                        </h3>
                        <p>{group.description}</p>
                      </div>
                    </div>

                    <motion.div
                      className="studio-skill-list"
                      variants={reducedMotion ? undefined : chipContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {group.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          className="studio-skill-item"
                          variants={reducedMotion ? undefined : chipItem}
                        >
                          <span>{skill}</span>
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
      <a className="studio-skills-next" href="#work">See these tools in action <ArrowUpRight size={18} /></a>
    </section>
  )
}
