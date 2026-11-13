import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import portraitSrc from '../assets/phani-cutout.png'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const disciplines = ['Product engineering', 'Cloud architecture', 'Applied intelligence']

export function Hero() {
  return (
    <SectionReveal className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="availability-line">Available for opportunities</span>
        <span className="mono-label">India / Remote worldwide</span>
      </div>

      <div className="hero-canvas">
        <Reveal delay={0.04} className="hero-heading-wrap">
          <p className="hero-kicker mono-label">Computer Science Engineer · Edition 2026</p>
          <h1 id="hero-title" className="hero-title">
            <span>Systems with</span>
            <span><em>purpose.</em></span>
            <span>Software with</span>
            <span><em>impact.</em></span>
          </h1>
        </Reveal>

        <Reveal delay={0.12} className="hero-portrait">
          <span className="hero-portrait-index mono-label">Profile / 01</span>
          <img src={portraitSrc} alt="Portrait of Vinnakota Phani Kumar" width={640} height={806} decoding="async" />
          <span className="hero-portrait-name">{portfolio.person.shortName}</span>
        </Reveal>

      </div>

      <div className="hero-lower">
        <Reveal delay={0.16} className="hero-intro">
          <span className="hero-intro-number">01</span>
          <p>I design and ship full-stack products, cloud systems, and AI workflows—connecting the interface people use to the infrastructure that keeps it reliable.</p>
        </Reveal>
        <Reveal delay={0.2} className="hero-actions">
          <a className="button button--primary" href="#work">View project index <ArrowDownRight size={16} /></a>
          <a className="button button--quiet" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>

      <div className="hero-index">
        <Reveal delay={0.18} className="hero-disciplines" aria-label="Engineering disciplines">
          {disciplines.map((discipline, index) => <span key={discipline}><b>0{index + 1}</b>{discipline}</span>)}
        </Reveal>
        <Reveal delay={0.24} className="hero-proof">
          <div><strong>{String(portfolio.projects.length).padStart(2, '0')}</strong><span>Shipped builds</span></div>
          <div><strong>{String(portfolio.achievements.length).padStart(2, '0')}</strong><span>Hackathon wins</span></div>
          <div><strong>{String(portfolio.credentials.length).padStart(2, '0')}</strong><span>Credentials</span></div>
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