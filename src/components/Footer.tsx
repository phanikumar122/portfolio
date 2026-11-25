import { Github, Linkedin } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Footer() {
  return (
    <footer className="studio-footer">
      <Reveal className="studio-footer-inner section-shell" y={12}>
        <div className="studio-footer-identity">
          <div>
            <p className="studio-footer-name">{portfolio.person.name}</p>
            <p className="studio-footer-copyright">© {new Date().getFullYear()}</p>
          </div>
        </div>
        <nav className="studio-footer-links" aria-label="Footer links">
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} aria-hidden="true" />
          </a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} aria-hidden="true" />
          </a>
        </nav>
      </Reveal>
    </footer>
  )
}
