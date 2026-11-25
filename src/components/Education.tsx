import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <section className="studio-section section-shell section-padding studio-education" id="education" aria-labelledby="education-title">
      <Reveal className="education-row">
        <h2 className="studio-heading" id="education-title">Education</h2>
        <div className="education-detail">
          <span className="education-years">2024 — 2028</span>
          <h3>B.Tech in Computer Science &amp; Engineering</h3>
          <p>{portfolio.education.institution}</p>
        </div>
      </Reveal>
    </section>
  )
}
