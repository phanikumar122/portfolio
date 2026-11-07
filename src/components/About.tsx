import { ArrowDownRight, Award, BookOpen, Code2 } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

export function About() {
  return (
    <SectionReveal className="about section-shell section-padding" id="about" aria-labelledby="about-title">
      <div className="about-editorial-wrap">
        <div className="about-top-grid">
          <Reveal delay={0.08} className="about-heading-col">
            <h2 id="about-title">
              Engineering<br />
              <em>at depth.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.14} className="about-story-col">
            <p className="about-lead-statement">
              I am a Computer Science Engineer focused on building robust full-stack software, cloud systems, and intelligent digital products.
            </p>
            <p className="about-sub-statement">
              My work spans from crafting resilient frontend interactions to modeling multi-modal data pipelines and engineering agentic AI loops. Currently pursuing Computer Science at {portfolio.education.institution}, I treat every project as an end-to-end production system—cleanly tested, containerized, and deployed.
            </p>
          </Reveal>
        </div>

        <div className="about-pillars-grid">
          <Reveal delay={0.18} className="about-pillar">
            <div className="pillar-num">01</div>
            <h3>Architecture & Code</h3>
            <p>Writing deterministic, type-safe services with Java, TypeScript, and Python that remain maintainable under growth.</p>
          </Reveal>

          <Reveal delay={0.24} className="about-pillar">
            <div className="pillar-num">02</div>
            <h3>Cloud & Infrastructure</h3>
            <p>Designing scalable backend deployments, Docker containers, and CI/CD pipelines backed by AWS certifications.</p>
          </Reveal>

          <Reveal delay={0.3} className="about-pillar">
            <div className="pillar-num">03</div>
            <h3>Intelligent Systems</h3>
            <p>Integrating retrieval-augmented generation, LLM tool execution, and real-time streaming architectures.</p>
          </Reveal>
        </div>
      </div>
    </SectionReveal>
  )
}
