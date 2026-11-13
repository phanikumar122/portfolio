import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'

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
    <footer className="site-footer">
      <div className="footer-bar section-shell">
        <div className="footer-bar-left">
          <span className="footer-mark">PK</span>
          <span>{portfolio.person.name}</span>
        </div>
        <div className="footer-bar-center">
          <span className="footer-availability">
            Available for work
          </span>
          <span className="footer-time mono-label">IST {time}</span>
        </div>
        <div className="footer-bar-right">
          <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={15} />
          </a>
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={15} />
          </a>
          <a href="#top" aria-label="Back to top" className="footer-top-btn">
            <ArrowUp size={15} />
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
