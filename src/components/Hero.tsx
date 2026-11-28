import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { portfolio } from '../data/portfolio'

export function Hero() {
  const [portraitFailed, setPortraitFailed] = useState(false)
  const { portraitUrl, role, positioning } = portfolio.person
  const showPortrait = Boolean(portraitUrl) && !portraitFailed
  const portraitClass = portraitUrl === import.meta.env.BASE_URL + 'portrait.webp'
    ? 'hero-portrait-image hero-portrait-image--cutout'
    : 'hero-portrait-image'

  return (
    <section className="studio-section studio-hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-intro">
        <p className="hero-role">{role}</p>
        <h1 id="hero-title">Phani Kumar</h1>
        <p className="hero-statement">{positioning}</p>
        <div className="hero-actions">
          <a className="studio-button studio-button--primary" href="#work">Projects <ArrowDown size={18} aria-hidden="true" /></a>
          <a className="hero-contact-link" href="#contact">Contact <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      {showPortrait && (
        <img className={portraitClass} src={portraitUrl} alt="Phani Kumar" width={890} height={1120}
          onError={() => setPortraitFailed(true)} />
      )}
    </section>
  )
}
