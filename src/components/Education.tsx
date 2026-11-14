import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

const coursework = [
  'Data Structures & Algorithms',
  'Distributed Systems',
  'Database Management Systems (RDBMS & NoSQL)',
  'Object-Oriented Software Design',
  'Cloud Computing Architecture',
  'Operating Systems',
]

export function Education() {
  return (
    <section className="studio-section section-shell section-padding studio-education" id="education" aria-labelledby="education-title">
      <Reveal className="studio-support-head">
        <p className="studio-eyebrow">Education</p>
        <h2 className="studio-heading" id="education-title">Academic foundation.</h2>
      </Reveal>

      <Reveal delay={0.08} y={16}>
        <article className="studio-academic-dossier" aria-labelledby="studio-degree-title">
          <div className="studio-academic-record">
            <p className="studio-academic-label">Academic record</p>
            <p className="studio-academic-years">2024 <span aria-hidden="true">—</span> 2028</p>
            <dl className="studio-academic-meta">
              <div>
                <dt>B.Tech</dt>
                <dd>Computer Science</dd>
              </div>
              <div>
                <dt>Full-Time</dt>
                <dd>Undergraduate</dd>
              </div>
            </dl>
          </div>
          <div className="studio-academic-main">
            <p className="studio-academic-label">Degree program</p>
            <h3 id="studio-degree-title">Bachelor of Technology — Computer Science &amp; Engineering</h3>
            <p className="studio-academic-institution">{portfolio.education.institution}</p>
            <a className="studio-button studio-button--outline studio-academic-contact" href="#contact" aria-label="Contact Phani Kumar">
              Discuss Roles <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="studio-academic-coursework">
            <h4 className="studio-academic-label">Core Focus &amp; Coursework</h4>
            <ul role="list">
              {coursework.map((course) => <li key={course}>{course}</li>)}
            </ul>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
