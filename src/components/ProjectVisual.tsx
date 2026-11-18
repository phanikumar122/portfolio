import { motion, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent } from 'react'
import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import mentora480 from '../assets/projects/mentora-cover-480.webp'
import mentora960 from '../assets/projects/mentora-cover-960.webp'
import mentora1586 from '../assets/projects/mentora-cover-1586.webp'
import transport480 from '../assets/projects/transport-cover-480.webp'
import transport960 from '../assets/projects/transport-cover-960.webp'
import transport1586 from '../assets/projects/transport-cover-1586.webp'
import goodfind480 from '../assets/projects/goodfind-cover-480.webp'
import goodfind960 from '../assets/projects/goodfind-cover-960.webp'
import goodfind1586 from '../assets/projects/goodfind-cover-1586.webp'
import docviewer480 from '../assets/projects/docviewer-cover-480.webp'
import docviewer960 from '../assets/projects/docviewer-cover-960.webp'
import docviewer1586 from '../assets/projects/docviewer-cover-1586.webp'
import rehabilitation480 from '../assets/projects/rehabilitation-cover-480.webp'
import rehabilitation960 from '../assets/projects/rehabilitation-cover-960.webp'
import rehabilitation1586 from '../assets/projects/rehabilitation-cover-1586.webp'
import syllabus480 from '../assets/projects/syllabus-cover-480.webp'
import syllabus960 from '../assets/projects/syllabus-cover-960.webp'
import syllabus1586 from '../assets/projects/syllabus-cover-1586.webp'
import skilltern480 from '../assets/projects/skilltern-cover-480.webp'
import skilltern960 from '../assets/projects/skilltern-cover-960.webp'
import skilltern1586 from '../assets/projects/skilltern-cover-1586.webp'

const visuals: Record<ProjectVisualType, { src: string; srcSet: string }> = {
  mentora: { src: mentora1586, srcSet: `${mentora480} 480w, ${mentora960} 960w, ${mentora1586} 1586w` },
  transport: { src: transport1586, srcSet: `${transport480} 480w, ${transport960} 960w, ${transport1586} 1586w` },
  goodfind: { src: goodfind1586, srcSet: `${goodfind480} 480w, ${goodfind960} 960w, ${goodfind1586} 1586w` },
  docviewer: { src: docviewer1586, srcSet: `${docviewer480} 480w, ${docviewer960} 960w, ${docviewer1586} 1586w` },
  rehabilitation: { src: rehabilitation1586, srcSet: `${rehabilitation480} 480w, ${rehabilitation960} 960w, ${rehabilitation1586} 1586w` },
  syllabus: { src: syllabus1586, srcSet: `${syllabus480} 480w, ${syllabus960} 960w, ${syllabus1586} 1586w` },
  skilltern: { src: skilltern1586, srcSet: `${skilltern480} 480w, ${skilltern960} 960w, ${skilltern1586} 1586w` },
}

export function ProjectVisual({ type }: { type: ProjectVisualType }) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 })
  const reset = () => { x.set(0); y.set(0) }
  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((.5 - (event.clientY - bounds.top) / bounds.height) * 5)
    y.set(((event.clientX - bounds.left) / bounds.width - .5) * 5)
  }

  return (
    <div className="studio-project-visual-frame" onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className="studio-project-visual" data-visual={type} aria-hidden="true"
        style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <img src={visuals[type].src} srcSet={visuals[type].srcSet} sizes="(max-width: 700px) calc(100vw - 68px), (max-width: 960px) 760px, 560px" alt="" width={1586} height={992} loading="lazy" decoding="async" />
      </motion.div>
    </div>
  )
}
