import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function Credentials() {
  return (
    <SectionReveal className="credentials section-shell section-padding" id="credentials" aria-labelledby="credentials-title">
      <div className="section-heading section-heading--split"><Reveal delay={0.08} className="section-title-wrap"><h2 id="credentials-title">My<br /><em>certificates.</em></h2></Reveal></div>
      <div className="credential-list">{portfolio.credentials.map((credential, index) => <Reveal key={credential.url} delay={index * 0.05} className="credential-row"><span className="credential-mark">{credential.mark}</span><div className="credential-copy"><h3>{credential.title}</h3><span>{credential.issuer}</span></div><a href={credential.url} target="_blank" rel="noreferrer" aria-label={`Verify ${credential.title}`}><ExternalLink size={16} /><span>verify</span></a></Reveal>)}</div>
      <Reveal className="credentials-footer"><span>Verify certificates</span><ArrowUpRight size={16} /></Reveal>
    </SectionReveal>
  )
}
