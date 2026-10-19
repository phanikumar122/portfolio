import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Credentials() {
  return (
    <section className="credentials section-shell section-padding" id="credentials" aria-labelledby="credentials-title">
      <div className="section-heading section-heading--split"><Reveal className="section-label"><span>07</span> / credentials</Reveal><Reveal delay={0.08} className="section-title-wrap"><h2 id="credentials-title">Proof of<br /><em>curiosity.</em></h2><p>Learning is part of the system. These credentials are linked to their original verification pages.</p></Reveal></div>
      <div className="credential-list">{portfolio.credentials.map((credential, index) => <Reveal key={credential.url} delay={index * 0.05} className="credential-row"><span className="credential-mark">{credential.mark}</span><span className="credential-number">0{index + 1}</span><div className="credential-copy"><h3>{credential.title}</h3><span>{credential.issuer}</span></div><a href={credential.url} target="_blank" rel="noreferrer" aria-label={`Verify ${credential.title}`}><ExternalLink size={16} /><span>verify</span></a></Reveal>)}</div>
      <Reveal className="credentials-footer"><span>credential links open Credly verification</span><ArrowUpRight size={16} /></Reveal>
    </section>
  )
}
