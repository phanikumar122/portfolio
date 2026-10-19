import { ArrowRight, Braces, Cloud, Database, Sparkles } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

const buildSteps = [
  { label: 'interface', detail: 'make it usable', icon: Braces },
  { label: 'logic', detail: 'make it clear', icon: Sparkles },
  { label: 'data', detail: 'make it useful', icon: Database },
  { label: 'infrastructure', detail: 'make it last', icon: Cloud },
]

export function Philosophy() {
  return (
    <section className="philosophy section-shell section-padding" aria-labelledby="philosophy-title">
      <div className="philosophy-intro">
        <Reveal className="section-label"><span>05</span> / what I build toward</Reveal>
        <Reveal delay={0.08}><h2 id="philosophy-title">Good software<br /><em>has a point of view.</em></h2></Reveal>
        <Reveal delay={0.16}><p>I&apos;m drawn to engineering problems where the user experience and the underlying system need to be understood as one thing.</p></Reveal>
      </div>
      <div className="philosophy-flow" aria-label="A four-step engineering approach">
        {buildSteps.map(({ label, detail, icon: Icon }, index) => <Reveal key={label} delay={index * 0.08} className="flow-step"><div className="flow-index">0{index + 1}</div><div className="flow-icon"><Icon size={17} /></div><strong>{label}</strong><span>{detail}</span>{index < buildSteps.length - 1 && <ArrowRight className="flow-arrow" size={17} />}</Reveal>)}
      </div>
      <div className="philosophy-bottom"><span>the loop continues with context</span><span className="mono-label">{portfolio.person.positioning.split(' · ').join(' / ')}</span></div>
    </section>
  )
}
