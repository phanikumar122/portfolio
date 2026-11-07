import { AlertCircle, Check, Copy, FileText, Github, Linkedin, Mail, Send, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

// Paste a Formspree endpoint here (e.g. https://formspree.io/f/xxxx) to enable the
// contact form. Left blank, the form falls back to opening the visitor's mail app.
const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) || ''

export function Contact() {
  const { copied, copyError, copy } = useCopyToClipboard()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${portfolio.person.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionReveal className="contact section-shell section-padding" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-intro">
          <Reveal delay={0.08}><h2 id="contact-title">Let&apos;s<br /><em>connect.</em></h2></Reveal>
          <Reveal delay={0.16}><p>Have a project or idea? Send a message below, or email me directly — either way it lands in the same inbox.</p></Reveal>
          <Reveal delay={0.2}>
            {portfolio.person.resumeUrl && (
              <a className="button button--quiet contact-resume" href={portfolio.person.resumeUrl} target="_blank" rel="noreferrer">
                <FileText size={15} /> Resume
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.18} className="contact-action">
          <span className="mono-label">Contact</span>
          <a className="email-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<ArrowUpRight size={21} /></a>
          <button type="button" className="copy-button" onClick={() => copy(portfolio.person.email)}>
            {copied ? <><Check size={15} /> copied</> : copyError ? <><AlertCircle size={15} /> copy failed</> : <><Copy size={15} /> copy email</>}
          </button>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
            <input name="email" type="email" placeholder="Your email" autoComplete="email" required />
            <textarea name="message" placeholder="Tell me about your project or idea…" required />
            <button type="submit" className="button button--primary" disabled={status === 'sending'}>
              <Send size={14} /> {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status === 'sent' && (FORMSPREE_ENDPOINT ? 'Message sent — I\u2019ll get back to you soon.' : 'Opening your mail app…')}
              {status === 'error' && 'Something went wrong — email me directly instead.'}
            </p>
          </form>

          <div className="social-grid">
            <a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </Reveal>
      </div>

      <div className="contact-bottom"><span>Open to connect</span><a href={`mailto:${portfolio.person.email}`}><Mail size={15} /> Email me</a></div>
    </SectionReveal>
  )
}
