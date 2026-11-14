import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectDialog } from './ProjectDialog'
import { ProjectVisual } from './ProjectVisual'

const projectCategories: Record<string, string> = {
  mentora: 'Full-Stack Platform',
  transport: 'Machine Learning',
  goodfind: 'E-Commerce Frontend',
  docviewer: 'Browser Tools',
  rehabilitation: 'IoT & Firmware',
  'syllabus-ai': 'Study Platform',
  skilltern: 'Web Application',
}

const filters = ['All projects', 'Web applications', 'Data & AI', 'Hardware'] as const
type Filter = typeof filters[number]

function matchesFilter(project: Project, filter: Filter) {
  if (filter === 'All projects') return true
  if (filter === 'Hardware') return project.id === 'rehabilitation'
  if (filter === 'Data & AI') return project.id === 'transport' || project.id === 'syllabus-ai'
  return !['rehabilitation', 'transport', 'syllabus-ai'].includes(project.id)
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const category = projectCategories[project.id] || 'Software Engineering'
  const projectNumber = String(index + 1).padStart(2, '0')

  return (
    <Reveal delay={Math.min(index * 0.035, 0.18)} className="studio-project-card" y={16}>
      <article className="studio-project-article" aria-labelledby={`project-title-${project.id}`}>
        <button className="studio-project-cover-button" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`}>
          <ProjectVisual type={project.visual} />
          <span className="studio-project-cover-action" aria-hidden="true">View project <ArrowUpRight size={17} /></span>
        </button>
        <div className="studio-project-body">
          <div className="studio-project-index" aria-hidden="true">{projectNumber}</div>
          <div className="studio-project-copy">
            <span className="studio-project-category">{category}</span>
            <h3 id={`project-title-${project.id}`}>{project.title}</h3>
            <p className="studio-project-summary">{project.description}</p>
            <ul className="studio-project-stack" aria-label={`${project.title} technology stack`}>
              {project.stack.map(tech => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
          <div className="studio-project-actions">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} code`}><Github size={15} /> Code</a>
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} demo`}><ExternalLink size={15} /> Live demo</a>}
            <button type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} details`}>Case study <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<Filter>('All projects')
  const visibleProjects = portfolio.projects.filter(project => matchesFilter(project, activeFilter))

  return (
    <section className="studio-section studio-work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="studio-section-header">
        <Reveal>
          <h2 className="studio-heading" id="work-title">Ideas put<br /><em>into practice.</em></h2>
        </Reveal>
        <p className="studio-description">A collection of <span className="studio-highlight">applications and systems</span> I’ve built across web, data, AI, and connected hardware.</p>
      </div>
      <div className="studio-project-toolbar">
        <div className="studio-project-filters" role="group" aria-label="Filter projects">
          {filters.map(filter => <button type="button" key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <p className="studio-project-count" role="status" aria-live="polite">Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p>
      </div>
      <div className="studio-project-grid">
        {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}
      </div>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
