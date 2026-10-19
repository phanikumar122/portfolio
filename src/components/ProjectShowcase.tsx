import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectDialog } from './ProjectDialog'
import { ProjectVisual } from './ProjectVisual'
import { SectionReveal } from './SectionReveal'
import { TiltCard } from './TiltCard'

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
       <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} code`}><Github size={14} /> code</a>
       {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} demo`}><ExternalLink size={14} /> Live Url</a>}
    </div>
  )
}

function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <Reveal delay={index * 0.08} className={`featured-project featured-project--${project.accent}`}>
      <button className="visual-button" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`}><TiltCard className="project-tilt"><ProjectVisual type={project.visual} /></TiltCard></button>
      <div className="featured-project-copy"><div><h3>{project.title}</h3><p>{project.description}</p></div><button className="round-arrow" type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.title} details`}><ArrowUpRight size={19} /></button></div>
      <div className="featured-project-footer"><div className="stack-tags">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div><ProjectLinks project={project} /></div>
    </Reveal>
  )
}

function GalleryProject({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <Reveal delay={index * 0.06} className={`gallery-project gallery-project--${project.accent}`}>
      <button className="visual-button" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`}><TiltCard className="project-tilt"><ProjectVisual type={project.visual} compact /></TiltCard></button>
      <div className="gallery-project-copy"><div><h3>{project.title}</h3><p>{project.description}</p></div><button className="text-link" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} details`}>View detail <ArrowUpRight size={14} /></button></div>
      <div className="gallery-footer"><div className="stack-tags">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div><ProjectLinks project={project} /></div>
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
         <Reveal delay={0.08} className="section-title-wrap"><h2 id="work-title">Selected<br /><em>projects.</em></h2></Reveal>
       </div>
      <div className="featured-projects">{featuredProjects.map((project, index) => <FeaturedProject key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div>
       <div className="work-subheading"><span className="mono-label">more projects</span><span>Each one starts with a real problem.</span></div>
      <div className="project-gallery">{galleryProjects.map((project, index) => <GalleryProject key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
     </SectionReveal>
  )
}
