import { Reveal } from './Reveal'

const buildSteps = [
  {
    num: '01',
    label: 'Interface Architecture',
    detail: 'Accessibility-first semantics, zero-layout-shift UI, and responsive design systems built with modern React and TypeScript.',
  },
  {
    num: '02',
    label: 'Backend & Service Logic',
    detail: 'Deterministic business rules, clean REST & WebSocket interfaces, secure JWT auth, and structured error boundaries.',
  },
  {
    num: '03',
    label: 'Data Foundations',
    detail: 'Relational normalization, scalable NoSQL document modeling, transactional integrity, and analytical data pipelines.',
  },
  {
    num: '04',
    label: 'Cloud & Deployment',
    detail: 'Containerized builds with Docker, reproducible runtime environments, and automated CI/CD validation pipelines.',
  },
]

export function Philosophy() {
  return (
    <section className="studio-section section-shell section-padding studio-philosophy" id="philosophy" aria-labelledby="philosophy-title">
      <div className="studio-process-layout">
        <Reveal className="studio-process-intro">
          <p className="studio-eyebrow">How I build</p>
          <h2 className="studio-heading" id="philosophy-title">Engineering<br />standards.</h2>
        </Reveal>
        <ol className="studio-process-list" aria-label="Engineering standards and core principles" role="list">
          {buildSteps.map(({ num, label, detail }, index) => (
            <li key={label}>
              <Reveal className="studio-process-row" delay={index * 0.04} y={14}>
                <span className="studio-process-number" aria-hidden="true">{num}</span>
                <div className="studio-process-copy">
                  <h3>{label}</h3>
                  <p>{detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
