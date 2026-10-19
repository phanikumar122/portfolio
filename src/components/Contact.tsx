import { AlertCircle, Check, Copy, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function Contact() {
  const { copied, copyError, copy } = useCopyToClipboard()

  return (
    <SectionReveal className="contact section-shell section-padding" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid"><div className="contact-intro"><Reveal delay={0.08}><h2 id="contact-title">Let&apos;s<br /><em>connect.</em></h2></Reveal><Reveal delay={0.16}><p>Have a project or idea? Email is the best place to start.</p></Reveal></div><Reveal delay={0.18} className="contact-action"><span className="mono-label">Contact</span><a className="email-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<ArrowUpRight size={21} /></a><button type="button" className="copy-button" onClick={() => copy(portfolio.person.email)}>{copied ? <><Check size={15} /> copied</> : copyError ? <><AlertCircle size={15} /> copy failed</> : <><Copy size={15} /> copy email</>}</button><div className="social-grid"><a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a><a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a></div></Reveal></div>
      <div className="contact-bottom"><span>Open to connect</span><a href={`mailto:${portfolio.person.email}`}><Mail size={15} /> Email me</a></div>
    </SectionReveal>
  )
}
