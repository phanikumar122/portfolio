import { AlertCircle, Check, Copy, FileText, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { portfolio } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Reveal } from './Reveal'

// Set VITE_FORMSPREE_ENDPOINT in .env (or paste here, e.g. https://formspree.io/f/xxxx) to enable
// the contact form. If left blank, the form safely opens the visitor's mail client directly.
const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) || ''

export function Contact() {
  const { copied, copyError, copy } = useCopyToClipboard()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'draft' | 'error' | 'invalid'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setStatus('invalid')
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${portfolio.person.email}?subject=${subject}&body=${body}`
      setStatus('draft')
      return
    }

    setStatus('sending')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15_000)
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return (
    <section className="studio-section studio-contact section-shell section-padding" id="contact" aria-labelledby="contact-title">
      <div className="studio-contact-grid">
        <div className="studio-contact-intro">
          <Reveal delay={0.08}>
            <h2 className="studio-heading" id="contact-title">
              Something good<br />
              <em>starts with a hello.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="studio-description">
              Have an <span className="studio-highlight">opportunity</span>, a product idea, or a <span className="studio-highlight">problem worth solving</span>? I’d love to hear about it.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="studio-contact-links">
            <a className="studio-contact-email" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<ArrowUpRight size={20} /></a>
            <button type="button" className="studio-copy-button" onClick={() => copy(portfolio.person.email)}>
              {copied ? <><Check size={15} /> copied</> : copyError ? <><AlertCircle size={15} /> copy failed</> : <><Copy size={15} /> copy email</>}
            </button>
            <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard.' : copyError ? 'Could not copy the email address. You can select it manually.' : ''}</span>
            <div className="studio-contact-channels">
              <a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
              <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
            </div>
            {portfolio.person.resumeUrl && (
              <a className="studio-button studio-button--outline" href={portfolio.person.resumeUrl} target="_blank" rel="noreferrer">
                <FileText size={16} /> View Resume <ArrowUpRight size={16} />
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.18} className="studio-contact-form-wrap">
          <div className="studio-form-heading"><h3>A note, an idea, a hello.</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
          <p id="contact-form-description" className="studio-form-help">{FORMSPREE_ENDPOINT ? 'Send a message directly to my inbox.' : 'This form prepares a draft in your email app. You’ll review and send it there.'}</p>
          <form className="studio-contact-form" onSubmit={handleSubmit} aria-describedby="contact-form-description" onChange={() => { if (status !== 'sending') setStatus('idle') }}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" placeholder="Your name" autoComplete="name" maxLength={120} required />
            </label>
            <label>
              <span>Your email</span>
              <input name="email" type="email" placeholder="you@company.com" autoComplete="email" maxLength={254} required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" placeholder="What are you working on?" rows={4} maxLength={5000} required />
            </label>
            <button type="submit" className="studio-button studio-button--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : FORMSPREE_ENDPOINT ? 'Send message' : 'Prepare email'} <Send size={16} />
            </button>
            <p className="studio-form-status" role="status" aria-live="polite">
              {status === 'sent' && 'Message sent — I’ll get back to you soon.'}
              {status === 'draft' && 'Email draft prepared. If your email app didn’t open, use the email address on this page.'}
              {status === 'error' && 'Something went wrong — email me directly instead.'}
              {status === 'invalid' && 'Please add your name, email, and a message—not just spaces.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
