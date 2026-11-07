import { Braces, Cloud, Database, Sparkles } from 'lucide-react'
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

export function Philosophy() {
  return (
    <SectionReveal className="philosophy section-shell section-padding" id="philosophy" aria-labelledby="philosophy-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="philosophy-title">Engineering<br /><em>standards.</em></h2>
        </Reveal>
      </div>

      <div className="philosophy-editorial-grid" aria-label="Engineering standards and core principles">
        {buildSteps.map(({ num, label, detail, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 0.08} className="philosophy-principle-card">
            <div className="principle-card-top">
              <span className="principle-number">{num}</span>
              <Icon size={18} className="principle-icon" />
            </div>
            <h3 className="principle-title">{label}</h3>
            <p className="principle-detail">{detail}</p>
          </Reveal>
        ))}
      </div>
    </SectionReveal>
  )
}
