import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a className="brand-mark" href="#top" aria-label="Back to top">
          <span className="brand-symbol">PK</span>
          <span className="brand-name">Phani Kumar</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {portfolio.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="nav-actions">
          <a className="nav-social" href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={16} /></a>
          <a className="nav-contact" href="#contact">Let&apos;s connect <Mail size={14} /></a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-top"><span>navigate / 00</span><span>close with esc</span></div>
        <nav aria-label="Mobile navigation">
          {portfolio.navigation.map((item, index) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav-footer">
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          <a href={portfolio.person.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
          <a href={`mailto:${portfolio.person.email}`}><Mail size={15} /> Email</a>
        </div>
      </div>
    </header>
  )
}
