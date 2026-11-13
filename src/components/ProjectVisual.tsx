import { Activity, Bot, Boxes, FileStack, GraduationCap, Hand, ShoppingBag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'

interface ProjectVisualProps {
  type: ProjectVisualType
  compact?: boolean
}

interface VisualConfig {
  code: string
  label: string
  icon: LucideIcon
  metrics: [string, string, string]
}

const visuals: Record<ProjectVisualType, VisualConfig> = {
  mentora: { code: 'EDU/01', label: 'Academic workspace', icon: GraduationCap, metrics: ['3 roles', 'Realtime', 'JWT'] },
  transport: { code: 'DAT/02', label: 'Demand intelligence', icon: Activity, metrics: ['3 modes', 'ETL', 'ML'] },
  goodfind: { code: 'COM/03', label: 'Commerce system', icon: ShoppingBag, metrics: ['Store', 'Console', 'SaaS'] },
  docviewer: { code: 'DOC/04', label: 'Local file toolkit', icon: FileStack, metrics: ['IndexedDB', 'PDF', 'Private'] },
  rehabilitation: { code: 'IOT/05', label: 'Motion telemetry', icon: Hand, metrics: ['ESP32', 'Sensors', 'Haptics'] },
  syllabus: { code: 'AI/06', label: 'Study planner', icon: Bot, metrics: ['Gemini', 'Plans', 'Progress'] },
  skilltern: { code: 'WEB/07', label: 'Rules-based matching', icon: Boxes, metrics: ['3 roles', 'Rules', 'MongoDB'] },
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
      <div className="visual-topline"><span>{config.code}</span><span>System online</span></div>
      <div className="visual-blueprint">
        <span className="visual-axis visual-axis--x" /><span className="visual-axis visual-axis--y" />
        <div className="visual-icon"><Icon size={42} strokeWidth={1.5} /></div>
        <div className="visual-node visual-node--one" /><div className="visual-node visual-node--two" /><div className="visual-node visual-node--three" />
      </div>
      <div className="visual-caption">
        <strong>{config.label}</strong>
        <div>{config.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
      </div>
    </div>
  )
}