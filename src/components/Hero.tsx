import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ArchitectureScene } from './ArchitectureScene'

export function Hero() {
  return (
    <section className="studio-section studio-hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="studio-hero-topline">
        <span className="studio-availability">Available for opportunities</span>
        <span className="studio-location">Andhra Pradesh, India</span>
      </div>
      <div className="studio-hero-grid">
        <Reveal className="studio-hero-copy">
          <p className="studio-eyebrow">Hello, I’m Phani Kumar</p>
          <h1 id="hero-title">Thoughtful<br />software.<br /><em>Built to matter.</em></h1>
          <p className="studio-hero-description">A Computer Science engineer connecting <span className="studio-highlight">thoughtful interfaces</span>, <span className="studio-highlight">reliable systems</span>, and practical AI.</p>
          <div className="studio-hero-actions">
            <a className="studio-button studio-button--primary" href="#work">Explore my work <ArrowUpRight size={18} /></a>
            <a className="studio-text-link" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
          </div>
          <div className="studio-hero-socials">
            <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="Follow on GitHub"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} /></a>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="studio-system-sheet">
          <ArchitectureScene />
        </Reveal>
      </div>
      <div className="studio-hero-bottom">
        <div className="studio-hero-disciplines"><span>Full-stack development</span><span>Cloud systems</span><span>Agentic AI</span></div>
        <a href="#about" aria-label="Scroll to about section">A little about me <ArrowDown size={16} /></a>
      </div>
    </section>
  )
}
