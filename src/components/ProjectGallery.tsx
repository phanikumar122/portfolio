import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Project } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'

export function ProjectGallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const images = project.images ?? []
  const image = images[index]

  const select = (nextIndex: number) => {
    setIndex(Math.max(0, Math.min(images.length - 1, nextIndex)))
    setFailed(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (images.length < 2) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      select(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      select(index - 1)
    }
  }

  if (!image) {
    return (
      <figure className="project-gallery project-gallery-fallback">
        <ProjectVisual type={project.visual} />
        <figcaption className="project-gallery-caption">{project.id === 'rehabilitation' ? 'Concept artwork. A hardware photograph is not available in the public source.' : 'Concept artwork. Product screenshots are not included for this project.'}</figcaption>
      </figure>
    )
  }

  return (
    <div className="project-gallery" role="region" aria-label={`${project.title} screenshots`} tabIndex={images.length > 1 ? 0 : undefined} onKeyDown={handleKeyDown}>
      <figure>
        <div className="project-gallery-stage">
          {failed ? (
            <div className="project-gallery-error" role="status">
              <p>This screenshot could not be loaded.</p>
              <button className="project-gallery-button" type="button" onClick={() => setFailed(false)} aria-label="Retry screenshot"><RefreshCw size={16} aria-hidden="true" /> Try again</button>
            </div>
          ) : (
            <img className="project-gallery-image" key={image.src} src={image.src} alt={image.alt} width={1440} height={900} decoding="async" onError={() => setFailed(true)} />
          )}
        </div>
        <figcaption className="project-gallery-caption" aria-live="polite">{image.caption}</figcaption>
      </figure>
      {images.length > 1 && (
        <div className="project-gallery-controls">
          <button className="project-gallery-button" type="button" aria-label="Previous screenshot" disabled={index === 0} onClick={() => select(index - 1)}><ArrowLeft size={17} aria-hidden="true" /></button>
          <span className="project-gallery-count" role="status">{index + 1} / {images.length}</span>
          <button className="project-gallery-button" type="button" aria-label="Next screenshot" disabled={index === images.length - 1} onClick={() => select(index + 1)}><ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      )}
    </div>
  )
}
