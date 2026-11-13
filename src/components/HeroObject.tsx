import {
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** A compact WebGL object: an orbital engineering system, not a decorative background. */
export function HeroObject() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas || reducedMotion) return

    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    // jsdom and older browsers can expose a canvas context without the WebGL API.
    // In that case the designed static fallback remains visible.
    if (!context || typeof context.getContextAttributes !== 'function') { setAvailable(false); return }

    const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    const scene = new Scene()
    const camera = new PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 7.4)

    const palette = getComputedStyle(document.documentElement)
    const accent = new Color(palette.getPropertyValue('--accent').trim() || '#f0edee')
    const subtle = new Color(palette.getPropertyValue('--text-secondary').trim() || '#f0edee')
    const world = new Group()
    scene.add(world)

    const coreGeometry = new IcosahedronGeometry(1.12, 2)
    const core = new Mesh(coreGeometry, new MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: .84 }))
    const shell = new LineSegments(new EdgesGeometry(new IcosahedronGeometry(1.52, 1)), new LineBasicMaterial({ color: subtle, transparent: true, opacity: .32 }))
    world.add(core, shell)

    const rings = [
      new Mesh(new TorusGeometry(1.92, .012, 6, 96), new MeshBasicMaterial({ color: accent, transparent: true, opacity: .7 })),
      new Mesh(new TorusGeometry(1.66, .009, 6, 96), new MeshBasicMaterial({ color: subtle, transparent: true, opacity: .5 })),
      new Mesh(new TorusGeometry(2.18, .008, 6, 96), new MeshBasicMaterial({ color: subtle, transparent: true, opacity: .36 })),
    ]
    rings[0].rotation.set(.92, -.28, .14)
    rings[1].rotation.set(-.36, .83, .72)
    rings[2].rotation.set(.22, .48, -.55)
    world.add(...rings)

    const target = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0 }
    let pageVisible = !document.hidden
    const handlePointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width - .5) * .75
      target.y = ((event.clientY - rect.top) / rect.height - .5) * .52
    }
    const handlePointerLeave = () => { target.x = 0; target.y = 0 }
    const handleVisibility = () => { pageVisible = !document.hidden }
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener('pointermove', handlePointerMove, { passive: true })
    host.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    let frame = 0
    let last = performance.now()
    const render = (now: number) => {
      frame = requestAnimationFrame(render)
      const delta = Math.min((now - last) / 1000, .04)
      last = now
      if (!pageVisible) return
      pointer.x += (target.x - pointer.x) * .055
      pointer.y += (target.y - pointer.y) * .055
      world.rotation.y += (.18 + pointer.x - world.rotation.y) * .028
      world.rotation.x += (-.1 - pointer.y - world.rotation.x) * .028
      core.rotation.x += delta * .11
      core.rotation.y += delta * .16
      shell.rotation.x -= delta * .06
      shell.rotation.z += delta * .08
      rings[0].rotation.z += delta * .07
      rings[1].rotation.x -= delta * .05
      rings[2].rotation.y += delta * .04
      renderer.render(scene, camera)
    }
    resize()
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      host.removeEventListener('pointermove', handlePointerMove)
      host.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      coreGeometry.dispose()
      core.material.dispose(); shell.geometry.dispose(); (shell.material as LineBasicMaterial).dispose()
      rings.forEach((ring) => { ring.geometry.dispose(); (ring.material as MeshBasicMaterial).dispose() })
      renderer.dispose()
    }
  }, [reducedMotion])

  return (
    <div ref={hostRef} className={`hero-object ${available && !reducedMotion ? 'is-active' : 'is-static'}`} role="img" aria-label="Interactive three-dimensional orbital systems object">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="hero-object-fallback" aria-hidden="true"><i /><i /><b /></div>
    </div>
  )
}
