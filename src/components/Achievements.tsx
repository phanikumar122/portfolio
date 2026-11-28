import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'

export function Achievements() {
  return (
    <section className="studio-section section-shell section-padding studio-achievements" id="achievements" aria-labelledby="achievements-title">
      <div className="studio-support-head">
        <h2 className="studio-heading" id="achievements-title">Awards</h2>
      </div>

      <div className="studio-award-grid">
        {portfolio.achievements.map((achievement, index) => (
          <div
            key={achievement.url}
            className="studio-award-panel"
          >
            <article className="studio-award-content" aria-labelledby={`studio-award-title-${index}`}>
              <div className="studio-award-body">
                <div className="studio-award-copy">
                  <h3 id={`studio-award-title-${index}`}>{achievement.title}</h3>
                  <p>{achievement.subtitle}</p>
                </div>
              </div>
              <a className="studio-award-link" href={achievement.url} target="_blank" rel="noreferrer" aria-label={`View certificate for ${achievement.title} — ${achievement.subtitle}`}>
                View certificate <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
