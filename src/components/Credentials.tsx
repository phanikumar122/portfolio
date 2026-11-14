import { ExternalLink } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Credentials() {
  return (
    <section className="studio-section section-shell section-padding studio-credentials" id="credentials" aria-labelledby="credentials-title">
      <Reveal className="studio-support-head studio-ledger-heading">
        <div>
          <p className="studio-eyebrow">Credentials</p>
          <h2 className="studio-heading" id="credentials-title">My certificates.</h2>
        </div>
        <p className="studio-ledger-count">{portfolio.credentials.length} verified certificates</p>
      </Reveal>

      <div className="studio-ledger-columns" aria-hidden="true">
        <span>Record</span>
        <span>Certificate and issuer</span>
        <span>Source</span>
      </div>
      <ol className="studio-credential-ledger" role="list">
        {portfolio.credentials.map((credential, index) => (
          <li key={credential.url}>
            <Reveal className="studio-ledger-row" delay={index * 0.03} y={12}>
              <div className="studio-ledger-record" aria-hidden="true">
                <span className="studio-ledger-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="studio-ledger-mark">{credential.mark}</span>
              </div>
              <div className="studio-ledger-copy">
                <h3>{credential.title}</h3>
                <p>{credential.issuer}</p>
              </div>
              <a className="studio-ledger-verify" href={credential.url} target="_blank" rel="noreferrer" aria-label={`Verify ${credential.title}`}>
                <span>Verify</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
