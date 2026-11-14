import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'
import mentoraCover from '../assets/projects/mentora-cover.png'
import transportCover from '../assets/projects/transport-cover.png'
import goodfindCover from '../assets/projects/goodfind-cover.png'
import docviewerCover from '../assets/projects/docviewer-cover.png'
import rehabilitationCover from '../assets/projects/rehabilitation-cover.png'
import syllabusCover from '../assets/projects/syllabus-cover.png'
import skillternCover from '../assets/projects/skilltern-cover.png'

interface ProjectVisualProps {
  type: ProjectVisualType
}

const visuals: Record<ProjectVisualType, string> = {
  mentora: mentoraCover,
  transport: transportCover,
  goodfind: goodfindCover,
  docviewer: docviewerCover,
  rehabilitation: rehabilitationCover,
  syllabus: syllabusCover,
  skilltern: skillternCover,
}

export function ProjectVisual({ type }: ProjectVisualProps) {
  return (
    <div className="studio-project-visual" data-visual={type} aria-hidden="true">
      <img src={visuals[type]} alt="" width={1586} height={992} loading="lazy" decoding="async" />
    </div>
  )
}
