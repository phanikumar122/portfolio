import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import type { Project } from '../data/portfolio'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
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
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const reduced = useReducedMotion()
  const projects = portfolio.projects.filter(project => matches(project, filter) && (filter !== 'All projects' || showAll || project.featured))
  const featureId = projects.find(project => project.featured)?.id
  const regularIds = projects.filter(project => project.id !== featureId).map(project => project.id)
  useEffect(() => {
    const revealLinkedProject = (hash: string) => {
      const id = hash.replace('#project-', '')
      if (portfolio.projects.some(project => project.id === id)) { setFilter('All projects'); setShowAll(true) }
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
    if (!window.location.hash.startsWith('#project-')) return
    const frame = requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }))
    return () => cancelAnimationFrame(frame)
  }, [filter, showAll, reduced])
  return (
    <section className="studio-section studio-work section-shell section-padding" id="work" aria-labelledby="work-title">
      <div className="studio-section-header">
        <Reveal><h2 className="studio-heading" id="work-title">Projects</h2></Reveal>
      </div>
      <div className="studio-project-toolbar">
        <div className="studio-project-filters" role="group" aria-label="Filter projects">
          {filters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <p className="studio-project-count" role="status">{filter === 'All projects' && !showAll ? projects.length + ' selected projects' : 'Showing ' + projects.length + (projects.length === 1 ? ' project' : ' projects')}</p>
      </div>
      <motion.div layout={!reduced} className={'studio-project-grid' + (projects.length === 1 ? ' project-grid-single' : '')}>
        <AnimatePresence mode="popLayout">
          {projects.map(project => {
            const feature = project.id === featureId
            const offset = !feature && regularIds.indexOf(project.id) % 2 === 1
            return (
              <motion.article
                layout={!reduced}
                key={project.id}
                id={'project-' + project.id}
                className={'studio-project-card' + (feature ? ' project-card-feature' : '') + (offset ? ' project-card-offset' : '')}
                aria-labelledby={'project-title-' + project.id}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
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
                  <span className="studio-project-cover-action" aria-hidden="true">View project <ArrowUpRight size={18} /></span>
                </button>
                <div className="studio-project-body">
                  <div className="project-meta">
                    <span className="studio-project-category">{categories[project.id]}</span>
                    {project.role && <span className="project-role">{roleLabel(project.role)}</span>}
                  </div>
                  <h3 id={'project-title-' + project.id}>{project.title}</h3>
                  <div className="studio-project-actions">
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={project.title + ' code'}><Github size={15} aria-hidden="true" /> Code</a>}
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={project.title + ' demo'}><ExternalLink size={15} aria-hidden="true" /> Live demo</a>}
                    <button type="button" onPointerEnter={() => { void loadProjectDialog() }} onFocus={() => { void loadProjectDialog() }} onClick={() => setSelected(project)} aria-label={'View ' + project.title + ' details'}>Details <ArrowUpRight size={16} aria-hidden="true" /></button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
      {filter === 'All projects' && <div className="project-index-toggle"><button className="studio-button studio-button--outline" type="button" aria-expanded={showAll} onClick={() => setShowAll(value => !value)}>{showAll ? 'Show selected projects' : 'Show all ' + portfolio.projects.length + ' projects'} <span aria-hidden="true" className="project-expand-icon">{showAll ? '−' : '+'}</span></button></div>}
      <AnimatePresence>{selected && <Suspense fallback={<p role="status">Loading project details…</p>}><ProjectDialog project={selected} onClose={close} /></Suspense>}</AnimatePresence>
    </section>
  )
}
