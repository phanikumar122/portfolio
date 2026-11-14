import { ArrowUpRight, Trophy } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Achievements() {
  return (
    <section className="studio-section section-shell section-padding studio-achievements" id="achievements" aria-labelledby="achievements-title">
      <Reveal className="studio-support-head">
        <p className="studio-eyebrow">Recognition</p>
        <h2 className="studio-heading" id="achievements-title">Hackathons &amp; awards.</h2>
      </Reveal>

      <div className="studio-award-grid">
        {portfolio.achievements.map((achievement, index) => (
          <Reveal
            key={achievement.url}
            className={`studio-award-panel studio-award-panel--${index === 0 ? 'forest' : 'paper'}`}
            delay={index * 0.06}
            y={16}
          >
            <article className="studio-award-content" aria-labelledby={`studio-award-title-${index}`}>
              <div className="studio-award-top">
                <span className="studio-award-label">Verified recognition</span>
                <Trophy size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="studio-award-body">
                <span className="studio-award-place" aria-hidden="true">{achievement.mark}</span>
                <div className="studio-award-copy">
                  <h3 id={`studio-award-title-${index}`}>{achievement.title}</h3>
                  <p>{achievement.subtitle}</p>
                </div>
              </div>
              <a className="studio-award-link" href={achievement.url} target="_blank" rel="noreferrer" aria-label={`View certificate for ${achievement.title} — ${achievement.subtitle}`}>
                View certificate <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
