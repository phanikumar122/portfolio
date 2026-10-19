import { motion } from 'motion/react'
import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const nodes = [
  { label: 'interface', x: 18, y: 29, delay: 0.1 },
  { label: 'api', x: 52, y: 18, delay: 0.25 },
  { label: 'data', x: 78, y: 34, delay: 0.4 },
  { label: 'cloud', x: 70, y: 73, delay: 0.55 },
  { label: 'agent', x: 34, y: 78, delay: 0.7 },
]

export function SystemMap() {
  const reducedMotion = useReducedMotion()
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    })
  }

  return (
    <div className="system-map-wrap">
      <div className="map-heading">
        <span>System / 001</span>
        <span className="map-live"><i /> live map</span>
      </div>
      <svg
        className="system-map"
        viewBox="0 0 100 100"
        role="img"
        aria-label="An abstract map connecting interface, API, data, cloud, and agent systems"
        onPointerMove={handlePointerMove}
      >
        <defs>
          <pattern id="map-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.12" />
          </pattern>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" opacity=".45" />
        <g className="map-orbit" style={{ transform: `translate(${(pointer.x - 50) * 0.03}px, ${(pointer.y - 50) * 0.03}px)` }}>
          <circle cx="50" cy="50" r="21" fill="none" stroke="currentColor" strokeWidth=".25" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth=".15" />
          <path d="M18 29 52 18 78 34 70 73 34 78 18 29ZM52 18 70 73M18 29 70 73M78 34 34 78" fill="none" stroke="currentColor" strokeWidth=".22" opacity=".72" />
          <path d="M50 0v100M0 50h100" stroke="currentColor" strokeWidth=".14" opacity=".48" />
          <circle cx="50" cy="50" r="7.5" fill="var(--surface-strong)" stroke="var(--accent)" strokeWidth=".55" />
          <circle cx="50" cy="50" r="2.4" fill="var(--accent)" filter="url(#node-glow)" />
          <text x="50" y="62" textAnchor="middle" className="map-core-label">phani.systems</text>
          {nodes.map((node) => (
            <g key={node.label} transform={`translate(${node.x} ${node.y})`}>
              <circle r="3.4" fill="var(--surface-strong)" stroke="var(--accent)" strokeWidth=".45" />
              <motion.circle
                r="1.3"
                fill="var(--accent)"
                filter="url(#node-glow)"
                animate={reducedMotion ? undefined : { opacity: [0.45, 1, 0.45], r: [1.1, 1.6, 1.1] }}
                transition={reducedMotion ? undefined : { duration: 2.8, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x="5" y="1" className="map-node-label">{node.label}</text>
            </g>
          ))}
        </g>
      </svg>
      <div className="map-footer">
        <span>input → context → action</span>
        <span>05 nodes / 01 system</span>
      </div>
    </div>
  )
}
