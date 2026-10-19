import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!menuOpen) return

    const focusable = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
    const firstLink = focusable()[0]
    firstLink?.focus()

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

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
           <a className="nav-contact" href="#contact">Contact <Mail size={14} /></a>
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

      <div id="mobile-navigation" ref={menuRef} className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-top"><span>navigation</span><span>close with esc</span></div>
        <nav aria-label="Mobile navigation">
          {portfolio.navigation.map((item) => (
           <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav-footer">
           <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Linkedin size={15} /> LinkedIn</a>
           <a href={portfolio.person.github} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Github size={15} /> GitHub</a>
           <a href={`mailto:${portfolio.person.email}`} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Mail size={15} /> Email</a>
        </div>
      </div>
    </header>
  )
}
