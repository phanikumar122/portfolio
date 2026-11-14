import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section className="studio-section studio-hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="studio-hero-topline">
        <span className="studio-availability">Available for opportunities</span>
        <span className="studio-location">Andhra Pradesh, India</span>
      </div>
      <div className="studio-hero-grid">
        <Reveal className="studio-hero-copy">
          <p className="studio-eyebrow">Hello, I’m Phani Kumar</p>
          <h1 id="hero-title">Thoughtful<br />software.<br /><em>Built to matter.</em></h1>
          <p className="studio-hero-description">A Computer Science engineer connecting <span className="studio-highlight">thoughtful interfaces</span>, <span className="studio-highlight">reliable systems</span>, and practical AI.</p>
          <div className="studio-hero-actions">
            <a className="studio-button studio-button--primary" href="#work">Explore my work <ArrowUpRight size={18} /></a>
            <a className="studio-text-link" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
          </div>
          <div className="studio-hero-socials">
            <a href={portfolio.person.github} target="_blank" rel="noreferrer" aria-label="Follow on GitHub"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a>
            <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} /></a>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="studio-system-sheet">
           <div className="studio-sheet-top"><span>From idea to reliable software</span></div>
          <div className="studio-system-art" role="img" aria-label="Connected architecture diagram from interface to services, data, and cloud">
            <svg viewBox="0 0 480 390" fill="none" aria-hidden="true">
              <defs><pattern id="studio-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" strokeOpacity=".09" /></pattern></defs>
              <rect width="480" height="390" fill="url(#studio-grid)" />
              <g className="studio-system-connectors" stroke="currentColor" strokeWidth="1.5"><path d="M240 72V118M130 178H72V278H154M350 178H408V278H326M240 238V278" /><circle cx="240" cy="72" r="5" fill="currentColor" /><circle cx="72" cy="178" r="5" fill="currentColor" /><circle cx="408" cy="178" r="5" fill="currentColor" /></g>
              <g className="studio-system-layer studio-system-layer--back"><path d="m240 90 133 76-133 77-133-77 133-76Z" fill="#18152e" fillOpacity=".18" stroke="#18152e" /><path d="M107 166v35l133 77 133-77v-35l-133 77-133-77Z" fill="#18152e" fillOpacity=".28" stroke="#18152e" /><path d="M240 243v35" stroke="#18152e" /></g>
              <g className="studio-system-layer studio-system-layer--middle"><path d="m240 57 110 63-110 64-110-64 110-63Z" fill="#18152e" fillOpacity=".08" stroke="#18152e" /><path d="M130 120v26l110 64 110-64v-26l-110 64-110-64Z" fill="#18152e" fillOpacity=".14" stroke="#18152e" /><path d="M240 184v26" stroke="#18152e" /></g>
              <g className="studio-system-layer studio-system-layer--front"><path d="m240 27 85 49-85 49-85-49 85-49Z" fill="#18152e" /><path d="M155 76v23l85 49 85-49V76l-85 49-85-49Z" fill="#18152e" fillOpacity=".88" /><path d="m211 69-14 8 14 8m58-16 14 8-14 8m-19-22-20 28" stroke="#f2f762" strokeWidth="2.5" strokeLinecap="round" /></g>
              <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#18152e"><text x="34" y="150">INTERFACE</text><text x="359" y="150">SERVICES</text><text x="170" y="326">DATA + INFRASTRUCTURE</text></g>
              <g className="studio-system-signal"><circle cx="72" cy="232" r="5" fill="#f2f762" /><circle cx="408" cy="216" r="5" fill="#f2f762" /></g>
              <path d="M154 278h172v26H154z" fill="#c9b8ff" stroke="#18152e" /><path d="M170 290h22m8 0h22m8 0h22m8 0h22m8 0h20" stroke="#18152e" strokeWidth="2" />
            </svg>
          </div>
          <div className="studio-sheet-bottom"><p>Good software is more than a screen.<br /><strong>It’s how everything connects.</strong></p></div>
        </Reveal>
      </div>
      <div className="studio-hero-bottom">
        <div className="studio-hero-disciplines"><span>Full-stack development</span><span>Cloud systems</span><span>Agentic AI</span></div>
        <a href="#about" aria-label="Scroll to about section">A little about me <ArrowDown size={16} /></a>
      </div>
    </section>
  )
}
