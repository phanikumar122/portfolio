import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function GlobalScene() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas || reducedMotion) return

    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!context || typeof context.getParameter !== 'function') {
      setAvailable(false)
      return
    }

    let disposed = false
    let cleanup: () => void = () => undefined

    void import('./globalSceneRuntime').then(({ startGlobalScene }) => {
      if (disposed) return
      cleanup = startGlobalScene(host, canvas, context)
    }).catch(() => setAvailable(false))

    return () => {
      disposed = true
      cleanup()
    }
  }, [reducedMotion])

  return (
    <div ref={hostRef} className={`global-scene ${available && !reducedMotion ? 'is-active' : 'is-static'}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="global-scene-fallback"><span /><span /><span /></div>
    </div>
  )
}