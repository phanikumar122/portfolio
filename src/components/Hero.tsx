import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTypewriter } from '../hooks/useTypewriter'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'
import portraitSrc from '../assets/phani.jpg'

const ROLES = [
  'Full-Stack Developer',
  'Cloud & Systems Enthusiast',
  'Agentic AI Developer',
  'Software Engineer',
]

export function Hero() {
  const reducedMotion = useReducedMotion()
  const typedRole = useTypewriter(ROLES)
  const displayRole = reducedMotion ? 'Full-Stack Developer' : typedRole

  return (
    <SectionReveal className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal delay={0.06} className="hero-status-pill">
            <span className="hero-status-dot" />
            <span className="hero-status-text">Available for opportunities</span>
            <span className="hero-status-divider">•</span>
            <span className="hero-status-location">India</span>
          </Reveal>

          <motion.h1
            id="hero-title"
            className="hero-title"
            initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            I build<br /><span>useful</span><br />Applications.
          </motion.h1>

          <Reveal delay={0.16} className="hero-summary">
            <div className="hero-role-line" aria-live="polite">
              <span className="hero-prefix">I&apos;m {portfolio.person.shortName} — </span>
              <strong className="hero-typed-role">{displayRole}</strong>
              {!reducedMotion && <span className="hero-cursor" aria-hidden="true">|</span>}
            </div>
            <p className="hero-description">Building high-performance web applications, robust cloud backends, and intelligent digital systems.</p>
          </Reveal>

          <Reveal delay={0.24} className="hero-cta-row">
            <a className="button button--primary" href="#work">View projects <ArrowDownRight size={16} /></a>
            <a className="button button--quiet" href="#contact">Contact <ArrowUpRight size={16} /></a>
          </Reveal>
          <Reveal delay={0.28} className="hero-proof-row">
            <div><strong>{String(portfolio.projects.length).padStart(2, '0')}</strong><span>Projects</span></div>
            <div><strong>{String(portfolio.achievements.length).padStart(2, '0')}</strong><span>Hackathon wins</span></div>
            <div><strong>{String(portfolio.credentials.length).padStart(2, '0')}</strong><span>Certificates</span></div>
          </Reveal>
          <Reveal delay={0.32} className="hero-socials">
            <span className="mono-label">Links</span>
            <a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          </Reveal>
        </div>
        <Reveal delay={0.14} className="hero-visual">
          <motion.div className="portrait-stage" initial={reducedMotion ? undefined : { opacity: 0, scale: .94, y: 22 }} animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: .22, ease: [0.22, 1, 0.36, 1] }}>
            <div className="portrait-glow" />
            <div className="portrait-card">
              <div className="portrait-card-top"><span>PK / 01</span><span>Building</span></div>
              <img
                src={portraitSrc}
                alt="Portrait of Vinnakota Phani Kumar"
                width={640}
                height={806}
                {...{ fetchpriority: 'high' }}
                decoding="async"
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </SectionReveal>
  )
}
