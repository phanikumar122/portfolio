import { FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ResumeModal } from './ResumeModal'

const sectionIds = portfolio.navigation.map((item) => item.href.slice(1))

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(sectionIds)
  const progress = useScrollProgress()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
      if (event.key === 'Tab' && menuRef.current) {
        const focusable = [menuButtonRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button')].filter((element): element is HTMLElement => element !== null)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.classList.add('menu-is-open')
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.classList.remove('menu-is-open')
    }
  }, [menuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!menuRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <motion.header
      className="studio-nav"
      role="banner"
      initial={reducedMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="studio-nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="studio-nav-inner">
        <a className="studio-brand" href="#top" aria-label="Phani Kumar home">
          <span className="studio-brand-symbol">PK<span>.</span></span>
          <span className="studio-brand-name">Phani Kumar<span>Engineer &amp; builder</span></span>
        </a>

        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {portfolio.navigation.map((item) => {
            const isActive = activeSection === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="studio-nav-actions">
          {portfolio.person.resumeUrl && (
            <button
              type="button"
              className="studio-nav-resume"
              onClick={() => setResumeOpen(true)}
              aria-label="View Resume"
            >
              <FileText size={14} /> Resume
            </button>
          )}

          <a className="studio-nav-contact" href="#contact">Let’s connect <Mail size={14} /></a>
          <button
            ref={menuButtonRef}
            className="studio-menu-toggle"
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

      <div id="mobile-navigation" ref={menuRef} className={`studio-mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="studio-mobile-nav-top"><span>Explore the portfolio</span><span>Esc to close</span></div>
        <nav aria-label="Mobile navigation">
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} aria-current={activeSection === item.href ? 'location' : undefined}>
              {item.label}<span aria-hidden="true">→</span>
            </a>
          ))}
          {portfolio.person.resumeUrl && (
            <button
              type="button"
              className="studio-mobile-resume-link"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                closeMenu()
                setResumeOpen(true)
              }}
            >
              <FileText size={16} /> Resume Preview
            </button>
          )}
        </nav>
        <div className="studio-mobile-nav-footer">
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Linkedin size={15} /> LinkedIn</a>
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Github size={15} /> GitHub</a>
          <a href={`mailto:${portfolio.person.email}`} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Mail size={15} /> Email</a>
        </div>
      </div>

      {portfolio.person.resumeUrl && (
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          resumeUrl={portfolio.person.resumeUrl}
        />
      )}
    </motion.header>
  )
}
