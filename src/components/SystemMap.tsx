import { useState, type CSSProperties, type PointerEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const nodes = [
  { label: 'interface', className: 'orbit-node--interface', depth: 'orbit-node--front' },
  { label: 'api', className: 'orbit-node--api', depth: 'orbit-node--back' },
  { label: 'data', className: 'orbit-node--data', depth: 'orbit-node--front' },
  { label: 'cloud', className: 'orbit-node--cloud', depth: 'orbit-node--back' },
  { label: 'agent', className: 'orbit-node--agent', depth: 'orbit-node--front' },
]

export function SystemMap() {
  const reducedMotion = useReducedMotion()
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    })
  }

  const stageStyle = {
    '--pointer-x': `${(pointer.x - 50) * 0.12}deg`,
    '--pointer-y': `${(pointer.y - 50) * -0.1}deg`,
  } as CSSProperties

  return (
    <div className="system-map-wrap orbit-wrap">
      <div className="map-heading">
        <span>System / 001</span>
        <span className="map-live"><i /> live field</span>
      </div>
      <div
        className={`orbit-stage ${reducedMotion ? 'is-reduced' : ''}`}
        style={stageStyle}
        role="img"
        aria-label="An animated 3D system field connecting interface, API, data, cloud, and agent systems"
        onPointerMove={handlePointerMove}
      >
        <div className="orbit-stars" />
        <div className="orbit-scene">
          <div className="orbit-halo orbit-halo--outer" />
          <div className="orbit-halo orbit-halo--inner" />
          <div className="orbit-ring orbit-ring--horizontal" />
          <div className="orbit-ring orbit-ring--vertical" />
          <div className="orbit-ring orbit-ring--diagonal" />
          <div className="orbit-grid-plane" />
          <div className="orbit-track orbit-track--one" />
          <div className="orbit-track orbit-track--two" />
          <div className="orbit-track orbit-track--three" />
          <div className="orbit-core">
            <div className="core-glow" />
            <div className="core-sphere"><span>PK</span></div>
            <span className="core-label">phani.systems</span>
          </div>
          <div className="orbit-node-layer">
            {nodes.map((node, index) => (
              <div key={node.label} className={`orbit-node ${node.className} ${node.depth}`}>
                <span className="node-pulse" />
                <span className="node-shell"><i>{String(index + 1).padStart(2, '0')}</i></span>
                <span className="node-label">{node.label}</span>
              </div>
            ))}
          </div>
          <div className="orbit-satellite orbit-satellite--one" />
          <div className="orbit-satellite orbit-satellite--two" />
        </div>
        <div className="orbit-caption orbit-caption--left">5 connected layers</div>
        <div className="orbit-caption orbit-caption--right">3D / live state</div>
      </div>
      <div className="map-footer">
        <span>input → context → action</span>
        <span>05 nodes / 01 system</span>
      </div>
    </div>
  )
}
