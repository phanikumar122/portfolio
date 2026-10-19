import { ArrowUpRight, BookOpen } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <section className="education section-shell section-padding" aria-labelledby="education-title">
      <div className="section-heading"><Reveal className="section-label"><span>06</span> / education</Reveal><Reveal delay={0.08} className="section-title-wrap"><h2 id="education-title">Where the<br /><em>foundation started.</em></h2></Reveal></div>
      <Reveal className="education-card">
        <div className="education-mark"><BookOpen size={22} /><span>EDU / 01</span></div>
        <div className="education-copy"><span className="eyebrow">{portfolio.education.label}</span><h3>{portfolio.education.institution}</h3><p>My technical interests keep expanding from this foundation into software systems, product interfaces, cloud infrastructure, and intelligent applications.</p></div>
        <a className="round-arrow" href="#contact" aria-label="Contact Phani Kumar"><ArrowUpRight size={19} /></a>
      </Reveal>
    </section>
  )
}
