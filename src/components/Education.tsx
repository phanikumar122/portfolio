import { ArrowUpRight, BookOpen } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function Education() {
  return (
    <SectionReveal className="education section-shell section-padding" aria-labelledby="education-title">
      <div className="section-heading"><Reveal delay={0.08} className="section-title-wrap"><h2 id="education-title">My<br /><em>education.</em></h2></Reveal></div>
      <Reveal className="education-card">
        <div className="education-mark"><BookOpen size={22} /></div>
        <div className="education-copy"><h3>{portfolio.education.institution}</h3></div>
        <a className="round-arrow" href="#contact" aria-label="Contact Phani Kumar"><ArrowUpRight size={19} /></a>
      </Reveal>
    </SectionReveal>
  )
}
