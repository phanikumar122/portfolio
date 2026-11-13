import { AlertCircle, Check, Copy, ExternalLink, FileText, Mail, Send, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

// Set VITE_FORMSPREE_ENDPOINT in .env (or paste here, e.g. https://formspree.io/f/xxxx) to enable
// the contact form. If left blank, the form safely opens the visitor's mail client directly.
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
          <Reveal delay={0.08}>
            <h2 id="contact-title">
              Let&apos;s<br />
              <em>connect.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="contact-description">
              Have an engineering opportunity, a software product, or an idea? Send a message directly or connect across any of my professional channels.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="contact-intro-actions">
            {portfolio.person.resumeUrl && (
              <a className="button button--quiet contact-resume" href={portfolio.person.resumeUrl} target="_blank" rel="noreferrer">
                <FileText size={15} /> View Resume
              </a>
            )}
          </Reveal>

          <Reveal delay={0.24} className="contact-direct-line">
            <a href={`mailto:${portfolio.person.email}`} className="contact-email-inline">
              <Mail size={15} /> {portfolio.person.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="contact-action">
          <span className="mono-label">Quick Send</span>
          <a className="email-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<ArrowUpRight size={21} /></a>
          <button type="button" className="copy-button" onClick={() => copy(portfolio.person.email)}>
            {copied ? <><Check size={15} /> copied</> : copyError ? <><AlertCircle size={15} /> copy failed</> : <><Copy size={15} /> copy email</>}
          </button>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" placeholder="How should I address you?" autoComplete="name" required />
            </label>
            <label>
              <span>Your email</span>
              <input name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" placeholder="Tell me about the project, team, or opportunity…" required />
            </label>
            <button type="submit" className="button button--primary" disabled={status === 'sending'}>
              <Send size={14} /> {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status === 'sent' && (FORMSPREE_ENDPOINT ? 'Message sent — I\u2019ll get back to you soon.' : 'Opening your mail app…')}
              {status === 'error' && 'Something went wrong — email me directly instead.'}
            </p>
          </form>
        </Reveal>
      </div>

      <div className="contact-bottom">
        <span>Available for full-time roles & projects</span>
        <span className="contact-bottom-links">
          <a href={portfolio.person.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </span>
      </div>
    </SectionReveal>
  )
}
