import { Reveal } from './Reveal'

const buildSteps = [
  {
    num: '01',
    label: 'Interface Architecture',
    detail: 'Start with readable layouts, semantic controls, keyboard access, and responsive behavior.',
  },
  {
    num: '02',
    label: 'Backend & Service Logic',
    detail: 'Keep business rules separate from presentation; validate inputs and make failures recoverable.',
  },
  {
    num: '03',
    label: 'Data Foundations',
    detail: 'Choose storage around the data and its queries; verify transformations before drawing conclusions.',
  },
  {
    num: '04',
    label: 'Cloud & Deployment',
    detail: 'Use reproducible builds, test important flows, and document the configuration required to run them.',
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
