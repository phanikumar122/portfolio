import { ArrowUpRight, Code2, Cpu, Database, Network } from 'lucide-react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { portfolio } from '../data/portfolio'

const domainSubtitles: Record<string, { icon: typeof Code2; subtitle: string }> = {
  Build: { icon: Code2, subtitle: 'Frontend & APIs' },
  Data: { icon: Database, subtitle: 'Databases & Storage' },
  'Cloud & DevOps': { icon: Network, subtitle: 'AWS, Docker & CI/CD' },
  'Agentic AI': { icon: Cpu, subtitle: 'LLMs, retrieval & workflows' },
}

const projectProof: Record<string, string[]> = {
  Build: ['mentora', 'goodfind', 'docviewer'],
  Data: ['transport', 'mentora'],
  'Cloud & DevOps': ['mentora', 'syllabus-ai'],
  'Agentic AI': ['syllabus-ai'],
}

export function Expertise() {
  const [active, setActive] = useState(0)
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
        <div>
          <h2 className="studio-heading" id="expertise-title">Skills</h2>
        </div>
      </div>

      <div className="studio-skills-console">
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
                {isActive && <span className="studio-skill-tab-indicator" aria-hidden="true" />}
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
                tabIndex={isActive ? 0 : -1}
              >
                {isActive && (
                  <div className="studio-skill-panel-inner">
                    <div className="studio-panel-head">
                      <h3>{group.title}</h3>
                      <p>{group.description}</p>
                    </div>

                    <div className="studio-skill-list">
                      {group.skills.map((skill) => (
                        <div
                          key={skill}
                          className="studio-skill-item"
                        >
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                    <div className="skill-project-proof"><span>Related projects</span>{portfolio.projects.filter(project => projectProof[group.title]?.includes(project.id)).map(project => <a key={project.id} href={`#project-${project.id}`}>{project.title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
