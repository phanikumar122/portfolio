import { ArrowUpRight, Award, BookOpen, Calendar, GraduationCap } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function Education() {
  return (
    <SectionReveal className="education section-shell section-padding" id="education" aria-labelledby="education-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="education-title">Academic<br /><em>foundation.</em></h2>
        </Reveal>
      </div>

      <Reveal delay={0.14} className="education-editorial-card">
        <div className="education-card-main">
          <div className="education-degree-row">
            <div>
              <span className="education-program-label">Degree Program</span>
              <h3 className="education-degree-title">Bachelor of Technology — Computer Science & Engineering</h3>
              <p className="education-institution-name">{portfolio.education.institution}</p>
            </div>
            <div className="education-timeline-box">
              <Calendar size={15} />
              <span>2024 — 2028</span>
            </div>
          </div>

          <div className="education-coursework-block">
            <span className="education-coursework-label">Core Focus & Coursework</span>
            <p className="education-coursework-text">
              Data Structures & Algorithms · Distributed Systems · Database Management Systems (RDBMS & NoSQL) · Object-Oriented Software Design · Cloud Computing Architecture · Operating Systems
            </p>
          </div>
        </div>

        <div className="education-card-side">
          <div className="education-stat-unit">
            <strong>B.Tech</strong>
            <span>Computer Science</span>
          </div>
          <div className="education-stat-unit">
            <strong>Full-Time</strong>
            <span>Undergraduate</span>
          </div>
          <a className="button button--quiet education-contact-link" href="#contact" aria-label="Contact Phani Kumar">
            Discuss Roles <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>
    </SectionReveal>
  )
}
