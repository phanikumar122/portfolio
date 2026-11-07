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
  syllabus: 'Study Platform',
  skilltern: 'Web Application',
}

function ProjectCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project
  index: number
  total: number
  onOpen: (project: Project) => void
}) {
  const category = projectCategories[project.id] || 'Software Engineering'

  return (
    <Reveal delay={index * 0.05} className="project-editorial-card">
      {/* Visual Product Stage */}
      <div className="project-stage-col">
        <button
          className="visual-button"
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View ${project.title} case study`}
        >
          <TiltCard className="project-tilt">
            <ProjectVisual type={project.visual} />
          </TiltCard>
        </button>
      </div>

      {/* Project Information Column */}
      <div className="project-content-col">
        <div className="project-card-header">
          <div className="project-meta-line">
            <span className="project-index-code">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="project-domain-tag">{category}</span>
          </div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>
        </div>

        {/* Tech Stack Chips */}
        <div className="project-stack-wrap">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-actions-row">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-action-link project-action-link--github"
            aria-label={`${project.title} code`}
          >
            <Github size={13} /> <span>Code</span>
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-action-link project-action-link--live"
              aria-label={`${project.title} demo`}
            >
              <ExternalLink size={13} /> <span>Live Demo</span>
            </a>
          )}

          <button
            type="button"
            className="project-action-link project-action-link--case"
            onClick={() => onOpen(project)}
            aria-label={`View ${project.title} details`}
          >
            <span>Case Study</span> <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </Reveal>
  )
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const allProjects = portfolio.projects

  return (
    <SectionReveal className="work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading--split work-heading">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="work-title">Selected<br /><em>projects.</em></h2>
          <p className="section-lead-desc">
            Applications, tools, and platforms built with clean architecture and modern engineering standards.
          </p>
        </Reveal>
      </div>

      <div className="projects-editorial-stream">
        {allProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={allProjects.length}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionReveal>
  )
}
