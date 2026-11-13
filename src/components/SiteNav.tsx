import { FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ResumeModal } from './ResumeModal'

const sectionIds = portfolio.navigation.map((item) => item.href.slice(1))

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(sectionIds)
  const progress = useScrollProgress()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
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
      className="site-nav"
      role="banner"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="nav-inner">
        <a className="brand-mark" href="#top" aria-label="Phani Kumar home">
          <span className="brand-symbol">PK</span>
          <span className="brand-name">Phani Kumar</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
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

        <div className="nav-actions">
          {portfolio.person.resumeUrl && (
            <button
              type="button"
              className="nav-resume"
              onClick={() => setResumeOpen(true)}
              aria-label="View Resume"
            >
              <FileText size={14} /> Resume
            </button>
          )}

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
          {portfolio.person.resumeUrl && (
            <button
              type="button"
              className="mobile-resume-link"
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
        <div className="mobile-nav-footer">
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
