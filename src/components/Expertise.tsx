import { ChevronDown, Code2, Database, Network, Sparkles } from 'lucide-react'
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
        <Reveal delay={0.08} className="section-title-wrap"><h2 id="expertise-title">My<br /><em>skills.</em></h2></Reveal>
      </div>
      <div className="expertise-map">
        <div className="expertise-tabs" role="tablist" aria-label="Technical expertise groups" aria-orientation="vertical">
          {portfolio.skills.map((group, index) => {
            const Icon = iconByTitle[group.title] ?? Code2
            const isActive = active === index
            const tabId = `skill-tab-${group.index}`
            const panelId = `skill-panel-${group.index}`

            return (
              <button
                key={group.title}
                ref={(element) => { tabRefs.current[index] = element }}
                className={`expertise-tab ${isActive ? 'is-active' : ''}`}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectSkill(index)}
                onKeyDown={handleTabKeyDown}
              >
                <span className="tab-index">{group.index}</span>
                <span className="tab-icon" aria-hidden="true"><Icon size={17} /></span>
                <span className="tab-copy"><span className="tab-title">{group.title}</span><span className="tab-caption">{group.skills.length} capabilities</span></span>
                <span className="tab-arrow" aria-hidden="true"><ChevronDown size={15} /></span>
              </button>
            )
          })}
        </div>
        <div className="expertise-panel-shell">
          {portfolio.skills.map((group, index) => {
            const isActive = active === index
            const panelId = `skill-panel-${group.index}`

            return (
              <div key={group.title} className="expertise-panel" id={panelId} role="tabpanel" aria-labelledby={`skill-tab-${group.index}`} aria-live="polite" hidden={!isActive}>
                {isActive && (
                  <motion.div
                    className="expertise-panel-stage"
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  >
                    
                    <div className="panel-content"><h3>{group.title}<span>.</span></h3><p>{group.description}</p></div>
                    <motion.div
                      className="skill-list"
                      initial={reducedMotion ? false : 'hidden'}
                      animate="visible"
                      variants={{ hidden: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: 0.045 } } }}
                    >
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
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
