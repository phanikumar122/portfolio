import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const rowVariant = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export function Credentials() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionReveal className="credentials section-shell section-padding" id="credentials" aria-labelledby="credentials-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="credentials-title">My<br /><em>certificates.</em></h2>
        </Reveal>
      </div>

      <motion.div
        className="credential-list"
        variants={reducedMotion ? undefined : listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {portfolio.credentials.map((credential) => (
          <motion.div
            key={credential.url}
            className="credential-row"
            variants={reducedMotion ? undefined : rowVariant}
            whileHover={reducedMotion ? undefined : { x: 4, transition: { duration: 0.2 } }}
          >
            <span className="credential-mark">{credential.mark}</span>
            <div className="credential-copy">
              <h3>{credential.title}</h3>
              <span>{credential.issuer}</span>
            </div>
            <a href={credential.url} target="_blank" rel="noreferrer" aria-label={`Verify ${credential.title}`}>
              <ExternalLink size={16} />
              <span>verify</span>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </SectionReveal>
  )
}
