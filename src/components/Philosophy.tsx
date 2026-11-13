import { Braces, Cloud, Database, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const buildSteps = [
  {
    num: '01',
    label: 'Interface Architecture',
    detail: 'Accessibility-first semantics, zero-layout-shift UI, and responsive design systems built with modern React and TypeScript.',
    icon: Braces,
  },
  {
    num: '02',
    label: 'Backend & Service Logic',
    detail: 'Deterministic business rules, clean REST & WebSocket interfaces, secure JWT auth, and structured error boundaries.',
    icon: Sparkles,
  },
  {
    num: '03',
    label: 'Data Foundations',
    detail: 'Relational normalization, scalable NoSQL document modeling, transactional integrity, and analytical data pipelines.',
    icon: Database,
  },
  {
    num: '04',
    label: 'Cloud & Deployment',
    detail: 'Containerized builds with Docker, reproducible runtime environments, and automated CI/CD validation pipelines.',
    icon: Cloud,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export function Philosophy() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionReveal className="philosophy section-shell section-padding" id="philosophy" aria-labelledby="philosophy-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="philosophy-title">Engineering<br /><em>standards.</em></h2>
        </Reveal>
      </div>

      <motion.div
        className="philosophy-editorial-grid"
        aria-label="Engineering standards and core principles"
        variants={reducedMotion ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {buildSteps.map(({ num, label, detail, icon: Icon }) => (
          <motion.div
            key={label}
            className="philosophy-principle-card"
            variants={reducedMotion ? undefined : cardVariant}
            whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="principle-card-top">
              <span className="principle-number">{num}</span>
              <Icon size={18} className="principle-icon" />
            </div>
            <h3 className="principle-title">{label}</h3>
            <p className="principle-detail">{detail}</p>
            {/* Accent line revealed on hover via CSS */}
            <div className="principle-accent-line" aria-hidden="true" />
          </motion.div>
        ))}
      </motion.div>
    </SectionReveal>
  )
}
