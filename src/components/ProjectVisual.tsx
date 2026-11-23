import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
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
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const glow = useMotionValue(0)
  const glowOpacity = useSpring(glow, { stiffness: 160, damping: 26 })
  const highlight = useMotionTemplate`radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,.48), rgba(255,255,255,.08) 35%, transparent 68%)`
  const imageTargetX = useMotionValue(0)
  const imageTargetY = useMotionValue(0)
  const imageX = useSpring(imageTargetX, { stiffness: 160, damping: 28 })
  const imageY = useSpring(imageTargetY, { stiffness: 160, damping: 28 })
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 })
  const reset = () => { x.set(0); y.set(0); glow.set(0); imageTargetX.set(0); imageTargetY.set(0) }
  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const px = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const py = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    glow.set(1)
    lightX.set(px * 100)
    lightY.set(py * 100)
    x.set((.5 - py) * 5)
    y.set((px - .5) * 5)
    imageTargetX.set((px - .5) * -24)
    imageTargetY.set((py - .5) * -24)
  }

  return (
    <div className="studio-project-visual-frame" onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="studio-project-visual" data-visual={type} aria-hidden="true">
        <div className="project-image-depth">
        <motion.img
          style={reducedMotion ? undefined : { x: imageX, y: imageY, rotateX, rotateY }}
          initial={reducedMotion ? false : { scale: 1.08, rotate: 0 }}
          whileInView={reducedMotion ? undefined : { scale: [1.08, 1.22, 1.14, 1.08], rotate: [0, -1.2, .6, 0] }}
          viewport={{ once: false, amount: .35 }}
          transition={{ duration: 4.5, times: [0, .4, .75, 1], ease: 'easeInOut' }}
          whileTap={reducedMotion ? undefined : { scale: 1.15 }}
          src={visuals[type].src} srcSet={visuals[type].srcSet} sizes="(max-width: 700px) calc(100vw - 68px), (max-width: 960px) 760px, 560px" alt="" width={1586} height={992} loading="lazy" decoding="async" />
        </div>
        <motion.div className="project-image-light" style={reducedMotion ? { opacity: 0 } : { background: highlight, opacity: glowOpacity }} />
        <span className="project-image-sheen" />
        <span className="project-image-edge" />
      </div>
    </div>
  )
}
