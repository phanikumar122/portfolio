import { ArrowRight, Braces, Cloud, Database, Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const buildSteps = [
  { label: 'interface', detail: 'make it usable', icon: Braces },
  { label: 'logic', detail: 'make it clear', icon: Sparkles },
  { label: 'data', detail: 'make it useful', icon: Database },
  { label: 'infrastructure', detail: 'make it last', icon: Cloud },
]

export function Philosophy() {
  return (
    <SectionReveal className="philosophy section-shell section-padding" aria-labelledby="philosophy-title">
      <div className="philosophy-intro">
         <Reveal delay={0.08}><h2 id="philosophy-title">My<br /><em>approach.</em></h2></Reveal>
      </div>
      <div className="philosophy-flow" aria-label="A four-step engineering approach">
        {buildSteps.map(({ label, detail, icon: Icon }, index) => <Reveal key={label} delay={index * 0.08} className="flow-step"><div className="flow-icon"><Icon size={17} /></div><strong>{label}</strong><span>{detail}</span>{index < buildSteps.length - 1 && <ArrowRight className="flow-arrow" size={17} />}</Reveal>)}
      </div>
    </SectionReveal>
  )
}
