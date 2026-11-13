import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectDialog } from './ProjectDialog'
import { ProjectVisual } from './ProjectVisual'
import { SectionReveal } from './SectionReveal'
import { TiltCard } from './TiltCard'

const projectCategories: Record<string, string> = {
  mentora: 'Full-Stack Platform',
  transport: 'Machine Learning',
  goodfind: 'E-Commerce Frontend',
  docviewer: 'Browser Tools',
  rehabilitation: 'IoT & Firmware',
  'syllabus-ai': 'Study Platform',
  skilltern: 'Web Application',
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const category = projectCategories[project.id] || 'Software Engineering'

  return (
    <Reveal delay={(index % 2) * 0.06} className="project-card">
      <button className="project-card-visual" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`}>
        <TiltCard className="project-tilt"><ProjectVisual type={project.visual} /></TiltCard>
        <span className="project-visual-hint mono-label">Explore case study <ArrowUpRight size={12} /></span>
      </button>

      <div className="project-card-body">
        <div className="project-meta-line">
          <span className="project-index-code">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-domain-tag">{category}</span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <ul className="project-stack-list" aria-label={`${project.title} technology stack`}>
          {project.stack.map((tech, stackIndex) => <li key={tech}><span>{String(stackIndex + 1).padStart(2, '0')}</span>{tech}</li>)}
        </ul>
        <div className="project-actions-row">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-action-link" aria-label={`${project.title} code`}><Github size={14} /> Code</a>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="project-action-link" aria-label={`${project.title} demo`}><ExternalLink size={14} /> Live Demo</a>}
          <button type="button" className="project-action-link project-action-link--case" onClick={() => onOpen(project)} aria-label={`View ${project.title} details`}>Case Study <ArrowUpRight size={14} /></button>
        </div>
      </div>
    </Reveal>
  )
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <SectionReveal className="work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading--split work-heading">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="work-title">Project<br /><em>index.</em></h2>
          <p className="section-lead-desc">Seven builds presented with equal weight—from full-stack platforms to data, AI, browser, and embedded systems.</p>
        </Reveal>
      </div>
      <div className="project-grid">
        {portfolio.projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}
      </div>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionReveal>
  )
}