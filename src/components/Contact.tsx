import { Check, Copy, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Reveal } from './Reveal'

export function Contact() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <section className="contact section-shell section-padding" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid"><div className="contact-intro"><Reveal className="section-label"><span>09</span> / contact</Reveal><Reveal delay={0.08}><h2 id="contact-title">Let&apos;s make<br /><em>something useful.</em></h2></Reveal><Reveal delay={0.16}><p>If you&apos;re thinking about a software problem, a product idea, or a system worth exploring, email is the best place to start.</p></Reveal></div><Reveal delay={0.18} className="contact-action"><span className="mono-label">direct line</span><a className="email-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<ArrowUpRight size={21} /></a><button type="button" className="copy-button" onClick={() => copy(portfolio.person.email)}>{copied ? <><Check size={15} /> copied to clipboard</> : <><Copy size={15} /> copy email</>}</button><div className="social-grid"><a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a><a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a></div></Reveal></div>
      <div className="contact-bottom"><span>open to conversations / collaborations / good questions</span><a href={`mailto:${portfolio.person.email}`}><Mail size={15} /> Start an email</a></div>
    </section>
  )
}
