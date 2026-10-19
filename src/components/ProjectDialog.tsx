import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'))
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
      triggerRef.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" ref={dialogRef}>
        <div className="dialog-topline"><span>project detail / {project.id}</span><button ref={closeButtonRef} type="button" className="icon-button" aria-label="Close project details" onClick={onClose}><X size={18} /></button></div>
        <div className="dialog-grid">
          <div className="dialog-visual"><ProjectVisual type={project.visual} /></div>
          <div className="dialog-copy">
            <span className="eyebrow">{project.eyebrow}</span>
            <h2 id="project-dialog-title">{project.title}</h2>
            <p className="dialog-description">{project.description}</p>
            <div className="dialog-block"><span className="mono-label">the problem</span><p>{project.problem}</p></div>
            <div className="dialog-block"><span className="mono-label">implemented signals</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
            <div className="dialog-stack"><span className="mono-label">stack</span><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="dialog-actions"><a className="button button--primary" href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> Source code <ArrowUpRight size={14} /></a>{project.live && <a className="button button--quiet" href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live demo <ArrowUpRight size={14} /></a>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
