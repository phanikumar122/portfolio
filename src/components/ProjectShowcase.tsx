import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectDialog } from './ProjectDialog'
import { ProjectVisual } from './ProjectVisual'
import { SectionReveal } from './SectionReveal'
import { TiltCard } from './TiltCard'

function ProjectLinks({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <div className="project-links">
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="project-action-link"
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
        aria-label={`Open ${project.title} details`}
      >
        <span>Case Study</span> <ArrowUpRight size={13} />
      </button>
    </div>
  )
}

function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <Reveal delay={index * 0.08} className={`featured-project featured-project--${project.accent}`}>
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

      <div className="featured-project-copy">
        <div className="featured-project-header">
          <span className="project-index-num">0{index + 1} / FEATURED</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <button
          className="round-arrow"
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.title} details`}
        >
          <ArrowUpRight size={19} />
        </button>
      </div>

      <div className="featured-project-footer">
        <div className="project-stack-line">
          <span className="project-stack-text">{project.stack.slice(0, 5).join('  ·  ')}</span>
        </div>
        <ProjectLinks project={project} onOpen={onOpen} />
      </div>
    </Reveal>
  )
}

function GalleryProject({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <Reveal delay={index * 0.06} className={`gallery-project gallery-project--${project.accent}`}>
      <button
        className="visual-button"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View ${project.title} case study`}
      >
        <TiltCard className="project-tilt">
          <ProjectVisual type={project.visual} compact />
        </TiltCard>
      </button>

      <div className="gallery-project-copy">
        <div>
          <span className="project-index-num">0{index + 3} / ARCHITECTURE</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <button
          className="text-link"
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View ${project.title} details`}
        >
          View detail <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="gallery-footer">
        <div className="project-stack-line">
          <span className="project-stack-text">{project.stack.slice(0, 4).join('  ·  ')}</span>
        </div>
        <ProjectLinks project={project} onOpen={onOpen} />
      </div>
    </Reveal>
  )
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const featuredProjects = portfolio.projects.filter((project) => project.featured)
  const galleryProjects = portfolio.projects.filter((project) => !project.featured)

  return (
    <SectionReveal className="work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading--split work-heading">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="work-title">Selected<br /><em>projects.</em></h2>
        </Reveal>
      </div>

      <div className="featured-projects">
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.id} project={project} index={index} onOpen={setSelectedProject} />
        ))}
      </div>

      <div className="work-subheading">
        <span className="subheading-title">Additional Systems & Engineering Projects</span>
        <span className="subheading-desc">Full-stack platforms, low-level sensor loops, and local document processing engines.</span>
      </div>

      <div className="project-gallery">
        {galleryProjects.map((project, index) => (
          <GalleryProject key={project.id} project={project} index={index} onOpen={setSelectedProject} />
        ))}
      </div>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionReveal>
  )
}
