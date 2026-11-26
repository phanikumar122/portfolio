import { ArrowDown, ArrowUpRight, Github, Linkedin, Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'

export function Hero() {
  const reduced = useReducedMotion()
  const [backgroundPaused, setBackgroundPaused] = useState(false)
  const [portraitFailed, setPortraitFailed] = useState(false)
  const portrait = portfolio.person.portraitUrl
  const showPortrait = Boolean(portrait) && !portraitFailed
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="studio-section studio-hero" id="top" aria-labelledby="hero-title" data-background-paused={backgroundPaused}>
      <div className="hero-topline"><p className="hero-role">{portfolio.person.role}</p><span>Andhra Pradesh, India</span></div>
      <h1 id="hero-title" aria-label="Phani Kumar">
        {['Phani', 'Kumar'].map((word, index) => (
          <span className="hero-title-mask" key={word}>
            <motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : index * 0.1, ease }}>{word}</motion.span>
          </span>
        ))}
      </h1>
      <div className={showPortrait ? 'hero-grid hero-grid--portrait' : 'hero-grid'}>
        <div className="hero-copy">
          <Reveal delay={0.12} className="hero-details">
            <p className="hero-statement">{portfolio.person.positioning}</p>
            <div className="hero-actions">
              <a className="studio-button studio-button--primary" href="#work">Projects <ArrowDown size={18} aria-hidden="true" /></a>
              <a className="hero-contact-link" href="#contact">Contact <ArrowUpRight size={19} aria-hidden="true" /></a>
            </div>
          </Reveal>
        </div>
        {showPortrait && (
          <div className="hero-portrait">
            <img className="hero-portrait-image" src={portrait} alt="Phani Kumar" width={800} height={1000}
              loading="eager" onError={() => setPortraitFailed(true)} />
          </div>
        )}
      </div>
      <Reveal className="hero-bottom">
        <span className="availability">Open to opportunities</span>
        <div className="hero-socials">
          {!reduced && (
            <button type="button" className="hero-motion-toggle"
              onClick={() => setBackgroundPaused(paused => !paused)}>
              {backgroundPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {backgroundPaused ? 'Play background' : 'Pause background'}
            </button>
          )}
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="Follow on GitHub"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </Reveal>
    </section>
  )
}
