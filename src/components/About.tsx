import { ArrowDownRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function About() {
  return (
    <SectionReveal className="about section-shell section-padding" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="section-title-wrap">
          <Reveal delay={0.08}><h2 id="about-title">Main<br /><em>motive.</em></h2></Reveal>
        </div>
        <div className="about-body">
          <Reveal delay={0.12} className="about-lead">
            <p>I move between the interface, the service, the data, and the infrastructure behind a product.</p>
          </Reveal>
          <Reveal delay={0.16} className="about-detail">
            <a className="button button--quiet" href="#expertise">My skills <ArrowDownRight size={16} /></a>
          </Reveal>
        </div>
      </div>
    </SectionReveal>
  )
}
