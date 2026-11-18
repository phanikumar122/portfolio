import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="studio-section studio-about section-shell section-padding" id="about" aria-labelledby="about-title">
      <Reveal className="studio-about-grid">
        <div className="studio-about-intro">
          <h2 className="studio-heading" id="about-title">Curious by nature.<br /><em>Engineer by practice.</em></h2>
          <div className="studio-about-note"><span className="studio-note-label">Currently</span><p>Studying Computer Science &amp; Engineering at {portfolio.education.institution}.</p><a href="#education">My academic journey <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="studio-about-story">
          <p className="studio-about-statement">I like understanding the <span className="studio-highlight">whole picture</span>—not just the part that shows up on a screen.</p>
          <p className="studio-description">My work spans <span className="studio-highlight">full-stack software</span>, cloud systems, and agentic AI. I’m drawn to the connections between them: a frontend that makes sense, a backend you can trust, and infrastructure that keeps it running.</p>
          <p className="studio-description">I learn by building, asking better questions, and taking an idea through to a working application.</p>

        </div>
      </Reveal>
    </section>
  )
}
