import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'

const loadProjectDialog = () => import('./ProjectDialog').then(module => ({ default: module.ProjectDialog }))
const ProjectDialog = lazy(loadProjectDialog)
const filters = ['All projects', 'Web applications', 'Data & AI', 'Hardware'] as const
type Filter = typeof filters[number]
const categories: Record<string, string> = { mentora: 'Full-stack platform', transport: 'Data & machine learning', goodfind: 'Commerce frontend', docviewer: 'Browser tools', rehabilitation: 'Connected hardware', 'syllabus-ai': 'Applied AI', skilltern: 'Web application' }

function matches(project: Project, filter: Filter) {
  if (filter === 'All projects') return true
  if (filter === 'Hardware') return project.id === 'rehabilitation'
  if (filter === 'Data & AI') return ['transport', 'syllabus-ai'].includes(project.id)
  return !['transport', 'syllabus-ai', 'rehabilitation'].includes(project.id)
}

function roleLabel(role: string | undefined) {
  if (role === 'Core developer on a group project') return 'Core developer · Team'
  if (role === 'Team member on a group project') return 'Developer · Team'
  return role
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState<Filter>('All projects')
  const [linkedProject, setLinkedProject] = useState<{ id: string } | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const projects = portfolio.projects.filter(project => matches(project, filter))
  useEffect(() => {
    const revealLinkedProject = (hash: string) => {
      if (!hash.startsWith('#project-')) return
      const id = hash.slice('#project-'.length)
      if (!portfolio.projects.some(project => project.id === id)) return
      setFilter('All projects')
      setLinkedProject({ id })
    }
    const handleHash = () => revealLinkedProject(window.location.hash)
    const handleProjectLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#project-"]') : null
      const href = link?.getAttribute('href')
      if (href) revealLinkedProject(href)
    }
    window.addEventListener('hashchange', handleHash)
    document.addEventListener('click', handleProjectLink)
    handleHash()
    return () => { window.removeEventListener('hashchange', handleHash); document.removeEventListener('click', handleProjectLink) }
  }, [])
  useEffect(() => {
    if (!linkedProject) return
    const frame = requestAnimationFrame(() => {
      const card = document.getElementById('project-' + linkedProject.id)
      card?.focus({ preventScroll: true })
      card?.scrollIntoView({ block: 'start', behavior: 'auto' })
      setLinkedProject(null)
    })
    return () => cancelAnimationFrame(frame)
  }, [linkedProject])
  return (
    <section className="studio-section studio-work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="studio-section-header">
        <div><h2 className="studio-heading" id="work-title">Projects</h2></div>
      </div>
      <div className="studio-project-toolbar">
        <div className="studio-project-filters" role="group" aria-label="Filter projects">
          {filters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <p className="studio-project-count" role="status">{'Showing ' + projects.length + (projects.length === 1 ? ' project' : ' projects')}</p>
      </div>
      <div className="studio-project-grid">
        {projects.map(project => (
          <article
            key={project.id}
            id={'project-' + project.id}
            tabIndex={-1}
            className="studio-project-card"
            aria-labelledby={'project-title-' + project.id}
          >
            <button
              className="studio-project-cover-button"
              type="button"
              onPointerEnter={() => { void loadProjectDialog() }}
              onFocus={() => { void loadProjectDialog() }}
              onClick={() => setSelected(project)}
              aria-label={'View ' + project.title + ' case study'}
            >
              <ProjectVisual type={project.visual} />
              <span className="project-preview-label">Interface concept</span>
              <span className="studio-project-cover-action" aria-hidden="true">Case study <ArrowUpRight size={18} /></span>
            </button>
            <div className="studio-project-body">
              <div className="project-meta">
                <span className="studio-project-category">{categories[project.id]}</span>
                {project.role && <span className="project-role">{roleLabel(project.role)}</span>}
              </div>
              <div className="studio-project-summary">
                <h3 id={'project-title-' + project.id}>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="studio-project-actions">
                {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={project.title + ' code'}><Github size={15} aria-hidden="true" /> Code</a>}
                {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={project.title + ' demo'}><ExternalLink size={15} aria-hidden="true" /> Live demo</a>}
                <button type="button" onPointerEnter={() => { void loadProjectDialog() }} onFocus={() => { void loadProjectDialog() }} onClick={() => setSelected(project)} aria-label={'View ' + project.title + ' details'}>Details <ArrowUpRight size={16} aria-hidden="true" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selected && <Suspense fallback={<p role="status">Loading project details…</p>}><ProjectDialog project={selected} onClose={close} /></Suspense>}
    </section>
  )
}
