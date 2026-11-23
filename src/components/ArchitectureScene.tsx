import { Code2, Database, Cloud, Layers, Pause, Play } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'
import type { PointerEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const layers = [
  { Icon: Database, title: 'Data', detail: 'A reliable foundation', className: 'data' },
  { Icon: Cloud, title: 'Systems', detail: 'Connected by design', className: 'systems' },
  { Icon: Code2, title: 'Interface', detail: 'Made for people', className: 'interface' },
]

export function ArchitectureScene() {
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 100, damping: 22 })
  const rotateY = useSpring(y, { stiffness: 100, damping: 22 })
  const reset = () => { x.set(0); y.set(0) }
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    x.set((.5 - (event.clientY - bounds.top) / bounds.height) * 18)
    y.set(((event.clientX - bounds.left) / bounds.width - .5) * 22)
  }
  return (
    <div className={`architecture-scene ${expanded ? 'is-expanded' : ''} ${paused || reducedMotion ? 'is-paused' : ''}`}>
      <div className="architecture-scene-header"><span><i />Software, in motion</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play scene animation' : 'Pause scene animation'} aria-pressed={paused} disabled={reducedMotion}>{paused ? <Play size={15} /> : <Pause size={15} />}</button></div>
      <div className="architecture-viewport" onPointerMove={follow} onPointerLeave={reset} onPointerCancel={reset}>
        <div className="architecture-floor" aria-hidden="true" />
        <motion.div role="img" aria-label="Connected architecture diagram from interface to services, data, and cloud" className="architecture-camera" style={reducedMotion ? undefined : { rotateX, rotateY }}>
          <div className="architecture-stack">
            {layers.map(({ Icon, title, detail, className }) => (
              <div key={title} className={`architecture-layer architecture-layer--${className}`}>
                <div className="architecture-slab"><div className="architecture-slab-face"><Icon size={34} strokeWidth={1.5} /><span>{title}</span><small>{detail}</small><div className="architecture-traces" aria-hidden="true"><i /><i /><i /></div></div></div>
              </div>
            ))}
            <div className="architecture-spine" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </motion.div>
      </div>
      <div className="architecture-scene-footer"><p>Every layer.<br /><strong>Working together.</strong></p><button type="button" onClick={() => setExpanded(!expanded)} aria-pressed={expanded}><Layers size={16} />{expanded ? 'Bring together' : 'Explore layers'}</button></div>
    </div>
  )
}
