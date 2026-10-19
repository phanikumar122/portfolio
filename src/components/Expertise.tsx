import { ChevronDown, Code2, Database, Network, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

const icons = [Code2, Database, Network, Sparkles]

export function Expertise() {
  const [active, setActive] = useState(0)

  return (
    <section className="expertise section-shell section-padding" id="expertise" aria-labelledby="expertise-title">
      <div className="section-heading section-heading--split">
        <Reveal className="section-label"><span>03</span> / expertise</Reveal>
        <Reveal delay={0.08} className="section-title-wrap"><h2 id="expertise-title">A stack with<br /><em>room to move.</em></h2><p>Not a badge wall. A set of connected capabilities I use to explore how software can be built, understood, and improved.</p></Reveal>
      </div>
      <div className="expertise-map">
        <div className="expertise-tabs" role="tablist" aria-label="Technical expertise groups">
          {portfolio.skills.map((group, index) => {
            const Icon = icons[index]
            return <button key={group.title} className={`expertise-tab ${active === index ? 'is-active' : ''}`} type="button" role="tab" aria-selected={active === index} aria-controls={`skill-panel-${group.index}`} onClick={() => setActive(index)}><span className="tab-index">{group.index}</span><Icon size={17} /><span>{group.title}</span><ChevronDown size={15} /></button>
          })}
        </div>
        <div className="expertise-panel" id={`skill-panel-${portfolio.skills[active].index}`} role="tabpanel">
          <div className="panel-topline"><span>{portfolio.skills[active].index} / capability group</span><span>selected</span></div>
          <div className="panel-content"><h3>{portfolio.skills[active].title}<span>.</span></h3><p>{portfolio.skills[active].description}</p></div>
          <div className="skill-list">{portfolio.skills[active].skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          <div className="panel-signal"><i /><span>Curiosity stays in the loop</span></div>
        </div>
      </div>
      <Reveal className="expertise-footer"><span>language → interface → system → context</span><span className="mono-label">04 groups / 34 signals</span></Reveal>
    </section>
  )
}
