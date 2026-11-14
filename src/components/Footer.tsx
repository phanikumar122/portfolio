import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return time
}

export function Footer() {
  const time = useLocalTime()

  return (
    <footer className="studio-footer">
      <Reveal className="studio-footer-inner section-shell" y={12}>
        <div className="studio-footer-identity">
          <span className="studio-footer-mark" aria-hidden="true">PK<span>.</span></span>
          <div>
            <p className="studio-footer-name">{portfolio.person.name}</p>
            <p className="studio-footer-copyright">© {new Date().getFullYear()}</p>
          </div>
        </div>
        <div className="studio-footer-status">
          <span className="studio-footer-availability">Available for work</span>
          <span className="studio-footer-time" aria-label={`Local time in India: ${time || 'loading'}`}>
            IST {time || '—'}
          </span>
        </div>
        <nav className="studio-footer-links" aria-label="Footer links">
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} aria-hidden="true" />
          </a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} aria-hidden="true" />
          </a>
          <a href="#top" aria-label="Back to top" className="studio-footer-top">
            <span>Back to top</span>
            <ArrowUp size={17} aria-hidden="true" />
          </a>
        </nav>
      </Reveal>
    </footer>
  )
}
