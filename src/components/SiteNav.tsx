import { FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { portfolio } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
const loadResumeModal = () => import('./ResumeModal').then(module => ({ default: module.ResumeModal }))
const ResumeModal = lazy(loadResumeModal)

const navigation = portfolio.navigation
const desktopNavigation = navigation.filter(item => ['#top', '#work', '#expertise', '#credentials'].includes(item.href))
const sectionIds = ['top', 'work', 'expertise', 'education', 'credentials', 'achievements', 'contact']

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(sectionIds)
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
      if (event.key === 'Tab' && menuRef.current) {
        const focusable = [menuButtonRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button')].filter((element): element is HTMLElement => element !== null)
        const index = focusable.findIndex(element => element === document.activeElement)
        const nextIndex = (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length
        event.preventDefault()
        focusable[nextIndex]?.focus()
      }
    }

    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'))
      .map(element => ({ element, wasInert: element.hasAttribute('inert') }))
    background.forEach(({ element }) => element.setAttribute('inert', ''))
    document.addEventListener('keydown', handleEscape)
    document.body.classList.add('menu-is-open')
    menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.classList.remove('menu-is-open')
      background.forEach(({ element, wasInert }) => { if (!wasInert) element.removeAttribute('inert') })
    }
  }, [menuOpen, closeMenu])

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

  return (
    <header className="studio-nav">
      <div className="studio-nav-inner">
        <a className="studio-brand" href="#top" aria-label="Phani Kumar home">
          <span className="studio-brand-symbol" aria-hidden="true">PK</span>
          <span className="studio-brand-name">Portfolio</span>
        </a>

        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {desktopNavigation.map((item) => {
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
              onPointerEnter={() => { void loadResumeModal() }}
              onFocus={() => { void loadResumeModal() }}
              onClick={() => setResumeOpen(true)}
              aria-label="View Resume"
            >
              <FileText size={14} /> Resume
            </button>
          )}

          <a className="studio-nav-contact" href="#contact" aria-current={activeSection === '#contact' ? 'location' : undefined}>Contact <Mail size={14} /></a>
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

      {createPortal(<div id="mobile-navigation" ref={menuRef} className={`studio-mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="studio-mobile-nav-top"><span>Menu</span><span>Esc to close</span></div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} aria-current={activeSection === item.href ? 'location' : undefined}>
              <span>{item.label}</span><span aria-hidden="true">↗</span>
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
              <FileText size={16} /> Resume
            </button>
          )}
        </nav>
        <div className="studio-mobile-nav-footer">
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Linkedin size={15} /> LinkedIn</a>
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Github size={15} /> GitHub</a>
          <a href={`mailto:${portfolio.person.email}`} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><Mail size={15} /> Email</a>
        </div>
      </div>, document.body)}

      {portfolio.person.resumeUrl && resumeOpen && (
        <Suspense fallback={<span role="status">Loading resume preview…</span>}><ResumeModal
          isOpen={resumeOpen}
          onClose={closeResume}
          resumeUrl={portfolio.person.resumeUrl}
        /></Suspense>
      )}
    </header>
  )
}
