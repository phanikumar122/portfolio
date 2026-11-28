import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/portfolio'
import { ProjectGallery } from './ProjectGallery'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    triggerRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()
    const page = document.getElementById('root')
    const wasInert = page?.hasAttribute('inert')
    page?.setAttribute('inert', '')

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('dialog-is-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('dialog-is-open')
      if (!wasInert) page?.removeAttribute('inert')
      triggerRef.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  return createPortal(
    <div className="studio-project-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="studio-project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description" ref={dialogRef}>
        <div className="studio-project-dialog-top"><span>About this project</span><button ref={closeButtonRef} type="button" className="studio-dialog-close" aria-label="Close project details" onClick={onClose}><X size={20} /></button></div>
        <div className="studio-project-dialog-grid">
          <div className="studio-project-dialog-visual"><ProjectGallery key={project.id} project={project} /></div>
          <div className="studio-project-dialog-copy">
            <h2 id="project-dialog-title">{project.title}</h2>
            <p id="project-dialog-description" className="studio-description">{project.description}</p>
            {project.role && <div className="studio-project-dialog-block"><h3>My role</h3><p>{project.role}</p></div>}
            <div className="studio-project-dialog-block"><h3>Implementation focus</h3><p>{project.focus}</p></div>
            <div className="studio-project-dialog-block"><h3>The challenge</h3><p>{project.problem}</p></div>
            <div className="studio-project-dialog-block"><h3>Project capabilities</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
            {project.decision && <div className="studio-project-dialog-block"><h3>Engineering decision</h3><p>{project.decision}</p></div>}
            {project.lesson && <div className="studio-project-dialog-block"><h3>Technical takeaway</h3><p>{project.lesson}</p></div>}
            <div className="studio-project-dialog-block"><h3>Documented outcome</h3><p>{project.outcome}</p><p className="studio-project-evidence">{project.evidence}</p>{project.evidenceUrl && <a className="studio-text-link" href={project.evidenceUrl} target="_blank" rel="noreferrer">Review source <ArrowUpRight size={14} /></a>}</div>
            <div className="studio-project-dialog-block"><h3>Technology</h3><ul className="studio-project-stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div className="studio-project-dialog-actions">{project.github && <a className="studio-button studio-button--primary" href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> View code <ArrowUpRight size={15} /></a>}{project.live && <a className="studio-button studio-button--outline" href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live demo</a>}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
