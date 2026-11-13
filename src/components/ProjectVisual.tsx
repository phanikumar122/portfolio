import { Activity, Bot, Boxes, FileStack, GraduationCap, Hand, ShoppingBag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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
  compact?: boolean
}

interface VisualConfig {
  code: string
  label: string
  icon: LucideIcon
  metrics: [string, string, string]
  cover: string
}

const visuals: Record<ProjectVisualType, VisualConfig> = {
  mentora: { code: 'EDU/01', label: 'Academic workspace', icon: GraduationCap, metrics: ['3 roles', 'Realtime', 'JWT'], cover: mentoraCover },
  transport: { code: 'DAT/02', label: 'Demand intelligence', icon: Activity, metrics: ['3 modes', 'ETL', 'ML'], cover: transportCover },
  goodfind: { code: 'COM/03', label: 'Commerce system', icon: ShoppingBag, metrics: ['Store', 'Console', 'SaaS'], cover: goodfindCover },
  docviewer: { code: 'DOC/04', label: 'Local file toolkit', icon: FileStack, metrics: ['IndexedDB', 'PDF', 'Private'], cover: docviewerCover },
  rehabilitation: { code: 'IOT/05', label: 'Motion telemetry', icon: Hand, metrics: ['ESP32', 'Sensors', 'Haptics'], cover: rehabilitationCover },
  syllabus: { code: 'AI/06', label: 'Study planner', icon: Bot, metrics: ['Gemini', 'Plans', 'Progress'], cover: syllabusCover },
  skilltern: { code: 'WEB/07', label: 'Rules-based matching', icon: Boxes, metrics: ['3 roles', 'Rules', 'MongoDB'], cover: skillternCover },
}

export function ProjectVisual({ type, compact = false }: ProjectVisualProps) {
  const config = visuals[type]
  const Icon = config.icon

  if (compact) {
    return (
      <div className={`project-visual project-visual--${type} archive-thumb-abstract`} data-visual={type} aria-hidden="true">
        <Icon size={20} /><span>{config.code}</span>
      </div>
    )
  }

  return (
      <div className={`project-visual project-visual--${type}`} data-visual={type} aria-hidden="true">
      <img className="project-cover" src={config.cover} alt="" loading="lazy" decoding="async" />
      <div className="project-cover-scrim" />
      <div className="visual-topline"><span>{config.code}</span><span>System online</span></div>
      <div className="visual-blueprint">
        <div className="visual-icon"><Icon size={34} strokeWidth={1.4} /></div>
      </div>
      <div className="visual-caption">
        <strong>{config.label}</strong>
        <div>{config.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
      </div>
    </div>
  )
}
