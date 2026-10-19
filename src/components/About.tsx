import { ArrowDownRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="about section-shell section-padding" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <Reveal className="section-label"><span>02</span> / about</Reveal>
        <Reveal delay={0.08} className="section-title-wrap"><h2 id="about-title">A curiosity for the<br /><em>whole system.</em></h2></Reveal>
      </div>
      <div className="about-grid">
        <Reveal className="about-lead"><p>I like moving between the parts of a product: the interface someone touches, the service behind it, the data it learns from, and the infrastructure that keeps it dependable.</p></Reveal>
        <Reveal delay={0.12} className="about-detail"><p>My projects move from academic communication and commerce to transport analytics, document tooling, embedded sensing, and AI-assisted learning. That range is intentional: every layer changes how the others should be designed.</p><a className="text-link" href="#expertise">See the toolkit <ArrowDownRight size={15} /></a></Reveal>
      </div>
      <div className="about-ribbon" aria-label="Areas of interest">
        {['full-stack', 'cloud systems', 'product thinking', 'agentic AI'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>
    </section>
  )
}
