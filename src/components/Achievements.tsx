import { ArrowUpRight, Trophy } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function Achievements() {
  return (
    <SectionReveal className="achievements section-shell section-padding" id="achievements" aria-labelledby="achievements-title">
      <div className="section-heading"><Reveal delay={0.08} className="section-title-wrap"><h2 id="achievements-title">Hackathons<br /><em>&amp; awards.</em></h2></Reveal></div>
      <div className="achievement-grid">{portfolio.achievements.map((achievement, index) => <Reveal key={achievement.url} delay={index * 0.1} className={`achievement-card achievement-card--${index === 0 ? 'dark' : 'light'}`}><div className="achievement-top"><span>{achievement.mark} · Verified Award</span><Trophy size={19} /></div><div className="achievement-copy"><h3>{achievement.title}</h3><p>{achievement.subtitle}</p></div><a href={achievement.url} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={15} /></a></Reveal>)}</div>
    </SectionReveal>
  )
}
