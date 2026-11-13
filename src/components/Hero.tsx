import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { HeroObject } from './HeroObject'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const disciplines = ['Product engineering', 'Cloud architecture', 'Applied intelligence']

export function Hero() {
  return (
    <SectionReveal className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="availability-line">Available for opportunities</span>
        <span className="mono-label">India , Andhra Pradesh</span>
      </div>

      <div className="hero-canvas">
        <Reveal delay={0.04} className="hero-heading-wrap">
          <p className="hero-kicker mono-label">Computer Science Engineer</p>
          <h1 id="hero-title" className="hero-title">
            <span>Systems with</span>
            <span><em>purpose.</em></span>
            <span>Software with</span>
            <span><em>impact.</em></span>
          </h1>
        </Reveal>

        <Reveal delay={0.12} className="hero-object-reveal"><HeroObject /></Reveal>

      </div>

      <div className="hero-lower">
        <Reveal delay={0.2} className="hero-actions">
          <a className="button button--primary" href="#work">View project index <ArrowDownRight size={16} /></a>
          <a className="button button--quiet" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
          <div className="hero-socials">
            <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="Follow on GitHub"><Github size={17} /></a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={17} /></a>
          </div>
        </Reveal>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span className="mono-label">Enter portfolio</span><ArrowDown size={14} /></a>
    </SectionReveal>
  )
}
