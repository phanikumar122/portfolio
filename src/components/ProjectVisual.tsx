import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'
import { ProjectArtwork } from './ProjectArtwork'

export function ProjectVisual({ type }: { type: ProjectVisualType }) {
  return (
    <div className="studio-project-visual-frame">
      <div className="studio-project-visual" data-visual={type} aria-hidden="true">
        <ProjectArtwork type={type} />
      </div>
    </div>
  )
}
