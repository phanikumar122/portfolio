import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'

export function About() {
  return (
    <section className="studio-section studio-about section-shell section-padding" id="about" aria-labelledby="about-title">
      <div className="studio-about-grid">
        <div><h2 className="studio-heading" id="about-title">About</h2></div>
        <div className="studio-about-story">
          <p className="studio-description">I’m studying Computer Science &amp; Engineering at {portfolio.education.institution}. I work independently and in teams, including as Mentora’s core developer.</p>
          <a className="studio-text-link" href="#education">Education <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
