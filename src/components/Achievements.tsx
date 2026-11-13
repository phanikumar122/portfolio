import { ArrowUpRight, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export function Achievements() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionReveal className="achievements section-shell section-padding" id="achievements" aria-labelledby="achievements-title">
      <div className="section-heading">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="achievements-title">Hackathons<br /><em>&amp; awards.</em></h2>
        </Reveal>
      </div>

      <motion.div
        className="achievement-grid"
        variants={reducedMotion ? undefined : gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {portfolio.achievements.map((achievement, index) => (
          <motion.div
            key={achievement.url}
            className={`achievement-card achievement-card--${index === 0 ? 'dark' : 'light'}`}
            variants={reducedMotion ? undefined : cardVariants}
            whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
          >
            <div className="achievement-top">
              <span>{achievement.mark} · Verified Award</span>
              <Trophy size={19} />
            </div>
            <div className="achievement-copy">
              <h3>{achievement.title}</h3>
              <p>{achievement.subtitle}</p>
            </div>
            <a href={achievement.url} target="_blank" rel="noreferrer">
              View certificate <ArrowUpRight size={15} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </SectionReveal>
  )
}
