import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SignatureSculpture } from './SignatureSculpture'

export function Hero() {
  const reduced = useReducedMotion()
  const [portraitFailed, setPortraitFailed] = useState(false)
  const portrait = portfolio.person.portraitUrl
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="studio-section studio-hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-topline"><span>Intro</span><span>Andhra Pradesh, India</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" aria-label="Phani Kumar">
            {['Phani', 'Kumar'].map((word, index) => (
              <span className="hero-title-mask" key={word}>
                <motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : index * 0.1, ease }}>{word}</motion.span>
              </span>
            ))}
          </h1>
          <Reveal delay={0.12} className="hero-details">
            <p className="hero-role">Full-stack developer</p>
            <div className="hero-actions">
              <a className="studio-button studio-button--primary" href="#work">Projects <ArrowDown size={18} aria-hidden="true" /></a>
              <a className="hero-contact-link" href="#contact">Contact <ArrowUpRight size={19} aria-hidden="true" /></a>
            </div>
          </Reveal>
        </div>
        <motion.div className={'hero-portrait' + (!portrait || portraitFailed ? ' hero-portrait--sculpture' : '')} initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : 0.15, ease }}>
          {portrait && !portraitFailed ? (
            <img className="hero-portrait-image" src={portrait} alt="Phani Kumar" width={800} height={1000}
              loading="eager" onError={() => setPortraitFailed(true)} />
          ) : (
            <SignatureSculpture><div className="hero-monogram" aria-hidden="true">
              <span className="monogram-corner monogram-corner--top" />
              <svg viewBox="0 0 400 320" fill="none" className="hero-monogram-mark">
                <motion.path d="M65 270V65H135C215 65 215 165 135 165H65"
                  stroke="currentColor" strokeWidth="30" strokeLinecap="square" strokeLinejoin="round"
                  initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.5, ease }} />
                <motion.path d="M245 65V270M335 65L245 168L342 270"
                  stroke="currentColor" strokeWidth="30" strokeLinecap="square" strokeLinejoin="round"
                  initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.65, ease }} />
              </svg>
              <span className="monogram-corner monogram-corner--bottom" />
            </div></SignatureSculpture>
          )}
          <div className="hero-portrait-caption"><span>Phani Kumar</span></div>
        </motion.div>
      </div>
      <Reveal className="hero-bottom">
        <span className="availability">Open to opportunities</span>
        <div className="hero-socials">
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="Follow on GitHub"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </Reveal>
    </section>
  )
}
