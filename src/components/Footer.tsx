import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { portfolio } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer section-shell"><div><span className="footer-mark">PK</span><span>{portfolio.person.name}</span></div><div className="footer-center">Designed + built with attention to the whole system.</div><div className="footer-right"><a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a><a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a><a href="#top" aria-label="Back to top"><ArrowUp size={15} /></a><span>© {new Date().getFullYear()}</span></div></footer>
  )
}
