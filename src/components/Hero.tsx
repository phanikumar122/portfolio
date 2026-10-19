import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SystemMap } from './SystemMap'

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-topline section-rule">
        <span><i className="status-dot" /> {portfolio.person.role}</span>
        <span className="mono-label">01 / 09</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal className="eyebrow"><span className="eyebrow-index">/ 001</span> Building across the stack</Reveal>
          <motion.h1
            id="hero-title"
            className="hero-title"
            initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Ideas into<br /><span>intelligent</span><br />experiences.
          </motion.h1>
          <Reveal delay={0.16} className="hero-summary">
            <p>I&apos;m {portfolio.person.shortName}, a Computer Science Engineer interested in full-stack software, cloud systems, and agentic AI that make complex things feel useful.</p>
          </Reveal>
          <Reveal delay={0.24} className="hero-cta-row">
            <a className="button button--primary" href="#work">Explore my work <ArrowDownRight size={16} /></a>
            <a className="button button--quiet" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
          </Reveal>
          <Reveal delay={0.32} className="hero-socials">
            <span className="mono-label">elsewhere</span>
            <a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="hero-visual"><SystemMap /></Reveal>
      </div>
      <div className="hero-bottomline section-rule">
        <span>software / systems / intelligence</span>
        <span className="scroll-cue"><span className="scroll-line" /> scroll to explore</span>
      </div>
    </section>
  )
}
