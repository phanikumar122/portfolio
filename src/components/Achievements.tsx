import { ArrowUpRight, Trophy } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Achievements() {
  return (
    <section className="achievements section-shell section-padding" aria-labelledby="achievements-title">
      <div className="section-heading"><Reveal className="section-label"><span>08</span> / achievements</Reveal><Reveal delay={0.08} className="section-title-wrap"><h2 id="achievements-title">A couple of<br /><em>bright signals.</em></h2></Reveal></div>
      <div className="achievement-grid">{portfolio.achievements.map((achievement, index) => <Reveal key={achievement.url} delay={index * 0.1} className={`achievement-card achievement-card--${index === 0 ? 'dark' : 'light'}`}><div className="achievement-top"><span>{achievement.mark} / certificate</span><Trophy size={19} /></div><div className="achievement-copy"><h3>{achievement.title}</h3><p>{achievement.subtitle}</p></div><a href={achievement.url} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={15} /></a></Reveal>)}</div>
    </section>
  )
}
